# Qdrant Vector Schema

## Decision

Use Qdrant as the vector database for the first production baseline.

Why Qdrant for this marketplace:

- straightforward payload filtering for hard constraints
- good support for hybrid search and named vectors
- clean fit for candidate matching plus proof retrieval
- simpler operational profile than a heavier Milvus deployment for an MVP-to-scale path

Qdrant remains a search layer only. PostgreSQL is still the canonical database for every business entity.

## Collection Strategy

Use three collections:

1. `talent_profiles_v1`
2. `portfolio_evidence_v1`
3. `jobs_v1`

This split keeps retrieval fast while preserving the portfolio-first proof model.

## Collection 1: `talent_profiles_v1`

Point granularity: one point per freelancer profile.

Purpose:

- recruiter-side talent discovery
- fast top-K candidate retrieval
- reverse matching seeds for job recommendations

### Named Vectors

- `profile_semantic`
- `skills_semantic`
- `proof_semantic`

All three vectors should share the same embedding size for operational simplicity. Make the dimension configurable through `EMBEDDING_DIM`. A strong default is `3072` if your embedding provider supports it.

### Example Collection Definition

```json
{
  "vectors": {
    "profile_semantic": { "size": 3072, "distance": "Cosine" },
    "skills_semantic": { "size": 3072, "distance": "Cosine" },
    "proof_semantic": { "size": 3072, "distance": "Cosine" }
  },
  "on_disk_payload": true,
  "hnsw_config": { "m": 32, "ef_construct": 256 }
}
```

### Payload Schema

| Field | Type | Source | Filterable |
|---|---|---|---|
| `user_id` | keyword | `users.id` | yes |
| `country_code` | keyword | `freelancer_profiles.country_code` | yes |
| `city` | keyword | `freelancer_profiles.city` | yes |
| `time_zone` | keyword | `freelancer_profiles.time_zone` | yes |
| `availability` | keyword | `freelancer_profiles.availability` | yes |
| `hourly_rate_min_minor` | integer | `freelancer_profiles.hourly_rate_min_minor` | yes |
| `hourly_rate_max_minor` | integer | `freelancer_profiles.hourly_rate_max_minor` | yes |
| `primary_currency` | keyword | `freelancer_profiles.primary_currency` | yes |
| `subscription_plan_code` | keyword | active subscription | yes |
| `visibility_multiplier` | float | active subscription | yes |
| `verified_badge` | bool | verification aggregate | yes |
| `trust_score` | float | derived in PostgreSQL | yes |
| `average_rating` | float | `freelancer_profiles.average_rating` | yes |
| `response_rate` | float | `freelancer_profiles.response_rate` | yes |
| `completed_contracts_count` | integer | `freelancer_profiles.completed_contracts_count` | yes |
| `top_skill_slugs` | keyword[] | user/project skills | yes |
| `featured_project_ids` | keyword[] | portfolio summary | no |
| `primary_proof_asset_ids` | keyword[] | portfolio summary | no |
| `last_active_at` | integer timestamp | activity aggregate | yes |

## Collection 2: `portfolio_evidence_v1`

Point granularity: one point per evidence unit.

Evidence units can be:

- a portfolio project summary
- a reel transcript chunk
- a code repository summary
- a Behance case-study summary
- a deliverable/result summary from a completed contract

Purpose:

- proof retrieval for explainable matching
- portfolio-first quality boosts
- richer re-ranking context for the LLM or cross-encoder

### Vectors

- `evidence_semantic`

### Example Collection Definition

```json
{
  "vectors": {
    "evidence_semantic": { "size": 3072, "distance": "Cosine" }
  },
  "on_disk_payload": true,
  "hnsw_config": { "m": 32, "ef_construct": 256 }
}
```

### Payload Schema

| Field | Type | Source | Filterable |
|---|---|---|---|
| `point_kind` | keyword | project / reel / repo / deliverable | yes |
| `user_id` | keyword | owner id | yes |
| `project_id` | keyword | nullable project id | yes |
| `asset_id` | keyword | nullable media id | yes |
| `source_type` | keyword | upload / github / behance / manual | yes |
| `skill_slugs` | keyword[] | derived tags | yes |
| `quality_score` | float | moderation + proof heuristic | yes |
| `verified_badge` | bool | verification aggregate | yes |
| `public_url` | keyword | canonical asset or project URL | no |
| `thumbnail_url` | keyword | derived preview | no |
| `duration_sec` | float | media metadata | yes |
| `created_at` | integer timestamp | source entity | yes |

## Collection 3: `jobs_v1`

Point granularity: one point per job.

Purpose:

- reverse matching for freelancer job feeds
- re-indexing when job requirements change
- semantic recommendations in under two minutes

### Vectors

- `job_semantic`
- optional `hard_constraints_semantic` if you later add hybrid ranking

### Example Collection Definition

```json
{
  "vectors": {
    "job_semantic": { "size": 3072, "distance": "Cosine" }
  },
  "on_disk_payload": true,
  "hnsw_config": { "m": 32, "ef_construct": 256 }
}
```

### Payload Schema

| Field | Type | Source | Filterable |
|---|---|---|---|
| `job_id` | keyword | `jobs.id` | yes |
| `organization_id` | keyword | `jobs.organization_id` | yes |
| `status` | keyword | `jobs.status` | yes |
| `work_type` | keyword | `jobs.work_type` | yes |
| `location_type` | keyword | `jobs.location_type` | yes |
| `country_code` | keyword | `jobs.country_code` | yes |
| `city` | keyword | `jobs.city` | yes |
| `budget_currency` | keyword | `jobs.budget_currency` | yes |
| `budget_min_minor` | integer | `jobs.budget_min_minor` | yes |
| `budget_max_minor` | integer | `jobs.budget_max_minor` | yes |
| `required_skill_slugs` | keyword[] | `job_skills` | yes |
| `requires_verified_badge` | bool | `jobs.requires_verified_badge` | yes |
| `early_access_until` | integer timestamp | `jobs.early_access_until` | yes |
| `created_at` | integer timestamp | `jobs.created_at` | yes |

## Retrieval Workflow

### Recruiter Searching for Talent

1. Create a normalized job document from the title, description, skills, budget, location, and desired proof examples.
2. Embed the job document.
3. Query `talent_profiles_v1` with:
   - cosine similarity against `profile_semantic`
   - payload filters for budget, location, availability, verification, and early-access rules
4. Take the top 100 to 200 profiles.
5. For the top 30 to 50 profiles, query `portfolio_evidence_v1` to collect the best supporting proof snippets.
6. Re-rank in FastAPI using:
   - vector score
   - hard-constraint pass or fail
   - skill overlap
   - evidence quality
   - trust score
   - subscription visibility boost
   - recruiter-specific preferences
7. Persist the final ranked output in PostgreSQL `job_candidate_matches`.

### Freelancer Discovering Jobs

1. Build a candidate intent vector from the freelancer profile plus top portfolio proofs.
2. Query `jobs_v1` with filters for early-access eligibility, budget floor, and location.
3. Re-rank with trust, fit, recency, and proposal competitiveness signals.

## Hard Constraints

Hard constraints are enforced before or during re-ranking and should zero out candidates that do not qualify. Typical hard constraints:

- budget mismatch
- country or city restriction
- verified badge required
- timezone overlap minimum
- language requirement
- subscription-based early access window

## Data Ownership Rules

- PostgreSQL owns entity lifecycle, billing state, and audit history.
- Qdrant owns only denormalized vectors and filter payloads.
- Every Qdrant point must store the canonical PostgreSQL id needed to hydrate the final response.
- Deletes and privacy requests must trigger synchronous tombstoning in PostgreSQL and asynchronous delete jobs in Qdrant.

## Recommended Payload Indexes

Create payload indexes for:

- `country_code`
- `city`
- `availability`
- `subscription_plan_code`
- `verified_badge`
- `budget_min_minor`
- `budget_max_minor`
- `required_skill_slugs`
- `created_at`

## Operational Notes

- use async upserts from workers, never from synchronous request handlers
- version collections with `_v1`, `_v2` to support re-embedding migrations
- keep raw transcripts and OCR in PostgreSQL or object storage, not as oversized Qdrant payloads
- store only short explainable snippets in Qdrant payloads
