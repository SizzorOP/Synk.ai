import { randomUUID } from "node:crypto";

import { Injectable } from "@nestjs/common";

import {
  jobSeed,
  portfolioSeed,
  type JobRecord,
  type PortfolioRecord,
} from "../../data/marketplace.data";
import type { AuthUser } from "../auth/auth.types";
import { DatabaseService } from "../database/database.service";

type PlatformSummaryRecord = {
  talentProfiles: number;
  openJobs: number;
  verifiedTalent: number;
  averageTrustScore: number;
};

type CreateJobInput = {
  title: string;
  brand: string;
  description: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
  requiredSkills: string[];
  proofSignals: string[];
  requiresVerifiedBadge: boolean;
};

type CreatePortfolioInput = {
  creatorName: string;
  email: string;
  title: string;
  category: string;
  location: string;
  hourlyRateMin: number;
  hourlyRateMax: number;
  skills: string[];
  proof: string[];
  verified: boolean;
  availability: PortfolioRecord["availability"];
};

@Injectable()
export class MarketplaceDataService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getJobs(): Promise<JobRecord[]> {
    try {
      const rows = await this.databaseService.query<JobRecord>(
        `
          SELECT
            j.id::text AS id,
            j.slug,
            j.title,
            o.name AS brand,
            j.description,
            CASE
              WHEN j.country_code = 'IN' THEN 'India'
              WHEN j.country_code = 'AE' THEN 'UAE'
              ELSE COALESCE(j.city, j.country_code, 'Remote')
            END AS location,
            COALESCE((j.budget_min_minor / 100)::int, 0) AS "budgetMin",
            COALESCE((j.budget_max_minor / 100)::int, 0) AS "budgetMax",
            COALESCE(
              ARRAY_AGG(DISTINCT s.slug) FILTER (WHERE s.slug IS NOT NULL),
              ARRAY[]::text[]
            ) AS "requiredSkills",
            COALESCE(
              ARRAY(
                SELECT jsonb_array_elements_text(j.requirements_json -> 'proofSignals')
              ),
              ARRAY[]::text[]
            ) AS "proofSignals",
            j.requires_verified_badge AS "requiresVerifiedBadge"
          FROM marketplace.jobs j
          JOIN marketplace.organizations o ON o.id = j.organization_id
          LEFT JOIN marketplace.job_skills js ON js.job_id = j.id
          LEFT JOIN marketplace.skills s ON s.id = js.skill_id
          WHERE j.status IN ('OPEN', 'DRAFT')
          GROUP BY j.id, o.name
          ORDER BY j.created_at DESC
        `,
      );

      return rows.length > 0 ? rows : jobSeed;
    } catch {
      return jobSeed;
    }
  }

  async findJobById(jobId: string): Promise<JobRecord | undefined> {
    const jobs = await this.getJobs();
    return jobs.find((job) => job.id === jobId);
  }

  async getPortfolios(): Promise<PortfolioRecord[]> {
    try {
      const rows = await this.databaseService.query<PortfolioRecord>(
        `
          WITH featured_projects AS (
            SELECT DISTINCT ON (pp.user_id)
              pp.user_id,
              pp.slug,
              pp.title
            FROM marketplace.portfolio_projects pp
            ORDER BY pp.user_id, pp.is_featured DESC, pp.updated_at DESC
          ),
          skill_agg AS (
            SELECT
              us.user_id,
              COALESCE(
                ARRAY_AGG(DISTINCT s.slug ORDER BY s.slug),
                ARRAY[]::text[]
              ) AS skills
            FROM marketplace.user_skills us
            JOIN marketplace.skills s ON s.id = us.skill_id
            GROUP BY us.user_id
          ),
          verified_users AS (
            SELECT DISTINCT vc.user_id
            FROM marketplace.verification_checks vc
            WHERE vc.status = 'VERIFIED' AND vc.user_id IS NOT NULL
          )
          SELECT
            u.id::text AS id,
            COALESCE(fp.slug, REPLACE(LOWER(u.display_name), ' ', '-')) AS slug,
            u.display_name AS "creatorName",
            COALESCE(p.headline, fp.title, 'Freelancer') AS title,
            COALESCE(p.metadata ->> 'category', 'General Talent') AS category,
            CASE
              WHEN p.country_code = 'IN' THEN 'India'
              WHEN p.country_code = 'AE' THEN 'UAE'
              ELSE COALESCE(p.city, p.country_code, 'Remote')
            END AS location,
            COALESCE((p.hourly_rate_min_minor / 100)::int, 0) AS "hourlyRateMin",
            COALESCE((p.hourly_rate_max_minor / 100)::int, 0) AS "hourlyRateMax",
            COALESCE(sa.skills, ARRAY[]::text[]) AS skills,
            COALESCE(
              ARRAY(
                SELECT jsonb_array_elements_text(p.metadata -> 'proof')
              ),
              ARRAY[]::text[]
            ) AS proof,
            p.trust_score::float AS "trustScore",
            EXISTS(
              SELECT 1
              FROM verified_users vu
              WHERE vu.user_id = u.id
            ) AS verified,
            p.availability::text AS availability
          FROM marketplace.freelancer_profiles p
          JOIN marketplace.users u ON u.id = p.user_id
          LEFT JOIN featured_projects fp ON fp.user_id = u.id
          LEFT JOIN skill_agg sa ON sa.user_id = u.id
          ORDER BY p.trust_score DESC
        `,
      );

      return rows.length > 0 ? rows : portfolioSeed;
    } catch {
      return portfolioSeed;
    }
  }

  async getPlatformSummary() {
    try {
      const rows = await this.databaseService.query<PlatformSummaryRecord>(
        `
          SELECT
            (SELECT COUNT(*)::int FROM marketplace.freelancer_profiles) AS "talentProfiles",
            (
              SELECT COUNT(*)::int
              FROM marketplace.jobs
              WHERE status IN ('OPEN', 'DRAFT')
            ) AS "openJobs",
            (
              SELECT COUNT(DISTINCT user_id)::int
              FROM marketplace.verification_checks
              WHERE status = 'VERIFIED' AND user_id IS NOT NULL
            ) AS "verifiedTalent",
            COALESCE(
              (
                SELECT AVG(trust_score)::float
                FROM marketplace.freelancer_profiles
              ),
              0
            ) AS "averageTrustScore"
        `,
      );

      const summary = rows[0];
      if (summary) {
        return {
          metrics: summary,
          modules: [
            "portfolio-engine",
            "semantic-matching",
            "escrow-ledger",
            "smart-collaboration-hub",
          ],
        };
      }
    } catch {
      // Fall back to in-memory defaults below.
    }

    const verifiedTalent = portfolioSeed.filter((entry) => entry.verified).length;
    const averageTrust =
      portfolioSeed.reduce((sum, entry) => sum + entry.trustScore, 0) /
      portfolioSeed.length;

    return {
      metrics: {
        talentProfiles: portfolioSeed.length,
        openJobs: jobSeed.length,
        verifiedTalent,
        averageTrustScore: Number(averageTrust.toFixed(4)),
      },
      modules: [
        "portfolio-engine",
        "semantic-matching",
        "escrow-ledger",
        "smart-collaboration-hub",
      ],
    };
  }

  async createJob(input: CreateJobInput, actor?: AuthUser): Promise<JobRecord> {
    const actorUserId = actor?.id ?? "44444444-4444-4444-4444-444444444444";

    try {
      const organizationName = input.brand.trim();
      const organizationSlug = this.uniqueSlug(
        this.slugify(organizationName),
        jobSeed.map((job) => job.brand),
      );

      let organizationId = await this.findOrganizationIdByName(organizationName);
      if (!organizationId) {
        organizationId = randomUUID();
        await this.databaseService.query(
          `
            INSERT INTO marketplace.organizations (
              id,
              name,
              slug,
              description,
              country_code,
              billing_email,
              verified_status,
              created_by_user_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, 'PENDING', $7)
          `,
          [
            organizationId,
            organizationName,
            organizationSlug,
            `${organizationName} organization created from localhost UI.`,
            this.inferCountryCode(input.location),
            `ops+${organizationSlug}@prooflane.local`,
            actorUserId,
          ],
        );
      }

      const jobId = randomUUID();
      const jobSlug = this.slugify(input.title);
      const location = this.normalizeLocation(input.location);
      await this.databaseService.query(
        `
          INSERT INTO marketplace.jobs (
            id,
            organization_id,
            created_by_user_id,
            title,
            slug,
            description,
            job_category,
            work_type,
            location_type,
            country_code,
            city,
            time_zone,
            budget_currency,
            budget_min_minor,
            budget_max_minor,
            requires_verified_badge,
            status,
            requirements_json
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            'FIXED_PRICE',
            'REMOTE',
            $8,
            $9,
            $10,
            'INR',
            $11,
            $12,
            $13,
            'OPEN',
            $14::jsonb
          )
        `,
        [
          jobId,
          organizationId,
          actorUserId,
          input.title.trim(),
          `${jobSlug}-${Date.now()}`,
          input.description.trim(),
          this.slugify(input.title).slice(0, 40),
          location.countryCode,
          location.city,
          location.timeZone,
          input.budgetMin * 100,
          input.budgetMax * 100,
          input.requiresVerifiedBadge,
          JSON.stringify({ proofSignals: input.proofSignals }),
        ],
      );

      await this.upsertSkills(input.requiredSkills);
      if (input.requiredSkills.length > 0) {
        const skillRows = await this.databaseService.query<{ id: number; slug: string }>(
          `
            SELECT id, slug
            FROM marketplace.skills
            WHERE slug = ANY($1::text[])
          `,
          [input.requiredSkills.map((skill) => this.slugify(skill))],
        );

        for (const skill of skillRows) {
          await this.databaseService.query(
            `
              INSERT INTO marketplace.job_skills (job_id, skill_id, weight, is_required)
              VALUES ($1, $2, 1.0, TRUE)
              ON CONFLICT (job_id, skill_id) DO NOTHING
            `,
            [jobId, skill.id],
          );
        }
      }

      const created = await this.findJobById(jobId);
      if (created) {
        return created;
      }
    } catch {
      // Fall through to local fallback store.
    }

    const fallbackJob: JobRecord = {
      id: `job-${Date.now()}`,
      slug: `${this.slugify(input.title)}-${Date.now()}`,
      title: input.title.trim(),
      brand: input.brand.trim(),
      description: input.description.trim(),
      location: input.location.trim(),
      budgetMin: input.budgetMin,
      budgetMax: input.budgetMax,
      requiredSkills: input.requiredSkills,
      proofSignals: input.proofSignals,
      requiresVerifiedBadge: input.requiresVerifiedBadge,
    };

    jobSeed.unshift(fallbackJob);
    return fallbackJob;
  }

  async createPortfolio(
    input: CreatePortfolioInput,
    actor?: AuthUser,
  ): Promise<PortfolioRecord> {
    const isPlatformAdmin = actor?.roles.includes("PLATFORM_ADMIN") ?? false;
    const creatorName =
      actor && !isPlatformAdmin ? actor.displayName : input.creatorName.trim();
    const email = actor && !isPlatformAdmin ? actor.email : input.email.trim();
    const verified = isPlatformAdmin ? input.verified : false;

    try {
      const location = this.normalizeLocation(input.location);
      const userId = await this.findOrCreateUser(
        creatorName,
        email,
        location,
        actor?.id,
      );
      await this.upsertSkills(input.skills);

      await this.databaseService.query(
        `
          INSERT INTO marketplace.freelancer_profiles (
            user_id,
            headline,
            bio,
            country_code,
            city,
            time_zone,
            primary_currency,
            hourly_rate_min_minor,
            hourly_rate_max_minor,
            trust_score,
            availability,
            metadata
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            'INR',
            $7,
            $8,
            0.80,
            $9,
            $10::jsonb
          )
          ON CONFLICT (user_id)
          DO UPDATE SET
            headline = EXCLUDED.headline,
            bio = EXCLUDED.bio,
            country_code = EXCLUDED.country_code,
            city = EXCLUDED.city,
            time_zone = EXCLUDED.time_zone,
            hourly_rate_min_minor = EXCLUDED.hourly_rate_min_minor,
            hourly_rate_max_minor = EXCLUDED.hourly_rate_max_minor,
            availability = EXCLUDED.availability,
            metadata = EXCLUDED.metadata
        `,
        [
          userId,
          input.title.trim(),
          `${creatorName} profile created from localhost UI.`,
          location.countryCode,
          location.city,
          location.timeZone,
          input.hourlyRateMin * 100,
          input.hourlyRateMax * 100,
          input.availability,
          JSON.stringify({
            proof: input.proof,
            category: input.category.trim(),
          }),
        ],
      );

      await this.databaseService.query(
        `
          INSERT INTO marketplace.portfolio_projects (
            id,
            user_id,
            title,
            slug,
            summary,
            description,
            source_type,
            visibility,
            is_featured
          )
          VALUES ($1, $2, $3, $4, $5, $6, 'MANUAL', 'PUBLIC', TRUE)
        `,
        [
          randomUUID(),
          userId,
          input.title.trim(),
          `${this.slugify(input.creatorName)}-${Date.now()}`,
          `${input.category.trim()} portfolio`,
          input.proof.join(". "),
        ],
      );

      const skillRows = await this.databaseService.query<{ id: number; slug: string }>(
        `
          SELECT id, slug
          FROM marketplace.skills
          WHERE slug = ANY($1::text[])
        `,
        [input.skills.map((skill) => this.slugify(skill))],
      );

      for (const skill of skillRows) {
        await this.databaseService.query(
          `
            INSERT INTO marketplace.user_skills (user_id, skill_id, proficiency, years_experience)
            VALUES ($1, $2, 4, 3.0)
            ON CONFLICT (user_id, skill_id)
            DO UPDATE SET proficiency = EXCLUDED.proficiency
          `,
          [userId, skill.id],
        );
      }

      if (verified) {
        await this.databaseService.query(
          `
            INSERT INTO marketplace.verification_checks (
              id,
              user_id,
              verification_type,
              provider,
              status,
              requested_at,
              verified_at
            )
            VALUES ($1, $2, 'identity', 'localhost-ui', 'VERIFIED', NOW(), NOW())
            ON CONFLICT DO NOTHING
          `,
          [randomUUID(), userId],
        );
      }

      const created = (await this.getPortfolios()).find(
        (portfolio) => portfolio.creatorName === creatorName,
      );
      if (created) {
        return created;
      }
    } catch {
      // Fall through to local fallback store.
    }

    const fallbackPortfolio: PortfolioRecord = {
      id: actor?.id ?? `talent-${Date.now()}`,
      slug: `${this.slugify(creatorName)}-${Date.now()}`,
      creatorName,
      title: input.title.trim(),
      category: input.category.trim(),
      location: input.location.trim(),
      hourlyRateMin: input.hourlyRateMin,
      hourlyRateMax: input.hourlyRateMax,
      skills: input.skills,
      proof: input.proof,
      trustScore: 0.8,
      verified,
      availability: input.availability,
    };

    portfolioSeed.unshift(fallbackPortfolio);
    return fallbackPortfolio;
  }

  private async findOrganizationIdByName(name: string) {
    const rows = await this.databaseService.query<{ id: string }>(
      `
        SELECT id::text AS id
        FROM marketplace.organizations
        WHERE LOWER(name) = LOWER($1)
        LIMIT 1
      `,
      [name],
    );

    return rows[0]?.id;
  }

  private async findOrCreateUser(
    creatorName: string,
    email: string,
    location: { countryCode: string; city: string; timeZone: string },
    preferredUserId?: string,
  ) {
    const existing = await this.databaseService.query<{ id: string }>(
      `
        SELECT id::text AS id
        FROM marketplace.users
        WHERE LOWER(email) = LOWER($1)
        LIMIT 1
      `,
      [email],
    );

    if (existing[0]?.id) {
      return existing[0].id;
    }

    const userId = preferredUserId ?? randomUUID();
    await this.databaseService.query(
      `
        INSERT INTO marketplace.users (
          id,
          external_auth_provider,
          external_auth_subject,
          email,
          display_name,
          status,
          email_verified
        )
        VALUES ($1, 'local-dev', $2, $3, $4, 'ACTIVE', TRUE)
      `,
      [userId, `local-dev:${email.toLowerCase()}`, email.toLowerCase(), creatorName.trim()],
    );
    await this.databaseService.query(
      `
        INSERT INTO marketplace.user_roles (user_id, role)
        VALUES ($1, 'FREELANCER')
        ON CONFLICT (user_id, role) DO NOTHING
      `,
      [userId],
    );

    return userId;
  }

  private async upsertSkills(skills: string[]) {
    for (const skill of skills) {
      const slug = this.slugify(skill);
      await this.databaseService.query(
        `
          INSERT INTO marketplace.skills (slug, name, category)
          VALUES ($1, $2, 'general')
          ON CONFLICT (slug) DO NOTHING
        `,
        [slug, this.titleize(slug)],
      );
    }
  }

  private normalizeLocation(location: string) {
    const normalized = location.trim().toLowerCase();
    if (normalized.includes("india")) {
      return {
        countryCode: "IN",
        city: "Bengaluru",
        timeZone: "Asia/Kolkata",
      };
    }

    if (normalized.includes("uae") || normalized.includes("dubai")) {
      return {
        countryCode: "AE",
        city: "Dubai",
        timeZone: "Asia/Dubai",
      };
    }

    return {
      countryCode: "IN",
      city: location.trim() || "Bengaluru",
      timeZone: "Asia/Kolkata",
    };
  }

  private inferCountryCode(location: string) {
    return this.normalizeLocation(location).countryCode;
  }

  private slugify(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48);
  }

  private titleize(value: string) {
    return value
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  private uniqueSlug(base: string, existingLabels: string[]) {
    const existing = new Set(existingLabels.map((label) => this.slugify(label)));
    if (!existing.has(base)) {
      return base;
    }

    return `${base}-${Date.now()}`;
  }
}
