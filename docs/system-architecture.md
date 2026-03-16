# AI Freelance Marketplace System Architecture

## Scope

This baseline targets a production-ready, portfolio-first freelance marketplace with:

- Next.js web
- Flutter mobile
- NestJS API orchestration
- FastAPI AI microservices
- PostgreSQL as the system of record
- Qdrant for semantic retrieval
- Redis for caching, sessions, queues, and Socket.io scaling
- Stripe or Razorpay for payments and escrow rails
- S3 or Cloudinary for media storage

Assumption: Auth0 is the default identity provider because it simplifies RBAC, B2B memberships, and JWT-based service boundaries. Firebase Auth can be swapped in without changing the core database design.

## High-Level Architecture

```mermaid
flowchart TB
    subgraph Clients
        WEB["Next.js Web Portal"]
        MOBILE["Flutter Mobile Apps"]
        ADMIN["Admin / Ops Portal"]
    end

    subgraph Edge
        CDN["CDN + WAF + TLS"]
        INGRESS["Kubernetes Ingress / API Gateway"]
        AUTH["Auth0 / Firebase Auth"]
    end

    subgraph Platform["Core Platform (Kubernetes)"]
        API["NestJS API Orchestrator"]
        WS["Socket.io Gateway"]
        WORKERS["NestJS Workers + BullMQ"]

        subgraph AI["AI Services (FastAPI)"]
            EMBED["Embedding + Portfolio Parsing"]
            MATCH["Semantic Retrieval + Re-ranking"]
            MOD["Moderation / Anti-spam"]
        end

        REDIS[("Redis")]
        PG[("PostgreSQL")]
        QDRANT[("Qdrant")]
        STORAGE[("S3 / Cloudinary")]
    end

    subgraph Integrations
        PAY["Stripe / Razorpay"]
        TWILIO["Twilio SMS / 2FA"]
        GITHUB["GitHub"]
        BEHANCE["Behance"]
        LINKEDIN["ConnectSafely.ai / LinkedIn Access"]
        ENRICH["SeleniumBase Enrichment Worker (Phase 4)"]
    end

    subgraph Observability
        OTEL["OpenTelemetry"]
        DASH["Metrics / Logs / Alerts"]
    end

    WEB --> CDN
    MOBILE --> CDN
    ADMIN --> CDN
    CDN --> INGRESS
    WEB --> AUTH
    MOBILE --> AUTH
    ADMIN --> AUTH
    INGRESS --> API
    INGRESS --> WS
    API --> REDIS
    API --> PG
    API --> STORAGE
    API --> PAY
    API --> TWILIO
    API --> GITHUB
    API --> BEHANCE
    API --> LINKEDIN
    API --> WORKERS
    WS --> REDIS
    WORKERS --> REDIS
    WORKERS --> PG
    WORKERS --> STORAGE
    WORKERS --> EMBED
    WORKERS --> MATCH
    WORKERS --> MOD
    EMBED --> QDRANT
    MATCH --> QDRANT
    MATCH --> PG
    PAY --> API
    ENRICH --> API
    API --> OTEL
    WORKERS --> OTEL
    AI --> OTEL
    OTEL --> DASH
```

## Core Service Boundaries

| Layer | Responsibility | Notes |
|---|---|---|
| Next.js | Public marketplace, dashboards, employer console | SSR for SEO, Tailwind UI, signed upload URLs |
| Flutter | Mobile talent and recruiter workflows | Reuses NestJS APIs and Socket.io events |
| NestJS API | AuthZ, business rules, billing, escrow, chat, orchestration | System of action and canonical API boundary |
| FastAPI AI | Embeddings, portfolio parsing, retrieval orchestration, re-ranking, moderation | Compute-isolated from transactional API |
| PostgreSQL | Users, jobs, proposals, contracts, subscriptions, chat, ledger | Source of truth |
| Qdrant | Fast semantic retrieval for jobs and talent | Denormalized search layer only |
| Redis | Cache, rate limit, BullMQ, Socket.io pub/sub | No durable source of truth |
| S3 / Cloudinary | Reels, thumbnails, docs, deliverables | Store only references in PostgreSQL |

## Matching Pipeline

The matching engine should use dedicated embedding models for vector generation and an LLM for normalization, explanation, and re-ranking. Do not use a general chat model directly as the embedding engine.

### Similarity Baseline

\[
S(J, P) = \frac{\mathbf{v}_J \cdot \mathbf{v}_P}{\|\mathbf{v}_J\| \|\mathbf{v}_P\|}
\]

### Two-Stage Retrieval

1. A recruiter creates or updates a job.
2. NestJS persists the job in PostgreSQL.
3. A BullMQ worker sends normalized job content to FastAPI.
4. FastAPI extracts skills, budget, location, and portfolio-proof requirements, then generates embeddings.
5. The job vector is upserted into Qdrant.
6. Candidate discovery queries Qdrant for the top N talent profiles with payload filters for hard constraints.
7. FastAPI re-ranks the shortlisted set using:
   - cosine similarity
   - skill overlap
   - portfolio evidence quality
   - subscription visibility boost
   - trust score
   - response rate
   - verified badge status
8. NestJS stores the ranked output in PostgreSQL for explainability, audit, and recruiter review.

### Matching Sequence

```mermaid
sequenceDiagram
    participant Recruiter as Recruiter Client
    participant API as NestJS API
    participant PG as PostgreSQL
    participant Queue as BullMQ / Redis
    participant AI as FastAPI AI
    participant QD as Qdrant

    Recruiter->>API: Create job post
    API->>PG: Insert job + skill requirements
    API->>Queue: Enqueue indexing task
    Queue->>AI: Normalize job and build embeddings
    AI->>QD: Upsert job vector
    Recruiter->>API: Search matching talent
    API->>QD: Top-K semantic retrieval + payload filters
    QD-->>API: Candidate ids + vector scores
    API->>AI: Re-rank shortlisted candidates
    AI->>PG: Persist explanations and final scores
    API->>Recruiter: Ranked shortlist + proof snippets
```

## Portfolio-First Ingestion Model

Portfolio quality is the main differentiator, so the ingestion pipeline indexes more than profile text:

- project summaries
- reel transcripts
- image OCR / alt-text
- GitHub repo metadata and README summaries
- Behance case study summaries
- completed contract outcomes and ratings

Each portfolio item remains canonical in PostgreSQL, while Qdrant stores denormalized vectors and filter payloads for fast retrieval.

## Payments and Escrow

The payment subsystem is split into three layers:

1. Business contract state in PostgreSQL
2. Provider orchestration in NestJS
3. External movement of funds in Stripe or Razorpay

Milestone approvals, releases, refunds, disputes, and fee calculations are recorded in PostgreSQL even when the actual hold and release happen through the provider.

## Smart Collaboration Hub

Smart Chat is implemented with Socket.io and backed by PostgreSQL plus Redis:

- PostgreSQL stores durable threads, messages, attachments, task records, and read state
- Redis powers fan-out, presence, and Socket.io adapter scaling
- S3 or Cloudinary stores transferred files

## Security and Compliance Baseline

- JWT verification at the NestJS edge, with role- and resource-based authorization
- signed upload URLs for media ingestion
- private media bucket plus CDN tokenization for restricted assets
- KMS-backed secret storage
- audit logs for financial and moderation actions
- KYC / verified badge workflow recorded in PostgreSQL
- consent and policy-version tracking for GDPR readiness
- isolated enrichment worker namespace for SeleniumBase and third-party scraping controls

## Deployment Baseline

- Next.js in a container behind CDN and WAF
- NestJS API and workers on Kubernetes
- FastAPI AI services on Kubernetes with autoscaling separated from transactional APIs
- PostgreSQL on AWS RDS or Google Cloud SQL
- Redis on ElastiCache or Memorystore
- Qdrant as managed cloud or a dedicated stateful deployment
- GitHub Actions for CI/CD, image builds, migrations, and rollout gates

## Core ER Overview

```mermaid
erDiagram
    USERS ||--o| FREELANCER_PROFILES : has
    USERS ||--o{ USER_ROLES : assigned
    USERS ||--o{ EXTERNAL_ACCOUNTS : connects
    USERS ||--o{ PORTFOLIO_PROJECTS : owns
    USERS ||--o{ PROPOSALS : submits
    USERS ||--o{ CHAT_MESSAGES : sends
    USERS ||--o{ REVIEWS : writes
    ORGANIZATIONS ||--o{ ORGANIZATION_MEMBERSHIPS : has
    ORGANIZATIONS ||--o{ JOBS : posts
    ORGANIZATIONS ||--o{ SUBSCRIPTIONS : billed
    PORTFOLIO_PROJECTS ||--o{ PORTFOLIO_PROJECT_ASSETS : contains
    MEDIA_ASSETS ||--o{ PORTFOLIO_PROJECT_ASSETS : linked
    JOBS ||--o{ JOB_SKILLS : requires
    JOBS ||--o{ PROPOSALS : receives
    JOBS ||--o{ JOB_CANDIDATE_MATCHES : ranks
    PROPOSALS ||--o| CONTRACTS : converts
    CONTRACTS ||--o{ MILESTONES : splits
    CONTRACTS ||--o| ESCROW_ACCOUNTS : funds
    MILESTONES ||--o{ MILESTONE_DELIVERABLES : contains
    ESCROW_ACCOUNTS ||--o{ ESCROW_TRANSACTIONS : records
    CHAT_THREADS ||--o{ CHAT_PARTICIPANTS : includes
    CHAT_THREADS ||--o{ CHAT_MESSAGES : stores
    CHAT_THREADS ||--o{ COLLABORATION_TASKS : tracks
```
