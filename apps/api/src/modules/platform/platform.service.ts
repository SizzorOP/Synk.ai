import { Injectable } from "@nestjs/common";

import { MarketplaceDataService } from "../marketplace-data/marketplace-data.service";

@Injectable()
export class PlatformService {
  constructor(private readonly marketplaceDataService: MarketplaceDataService) {}

  getSummary() {
    return this.marketplaceDataService.getPlatformSummary();
  }

  async bootstrapVectorCollections() {
    const aiServiceUrl = process.env.AI_SERVICE_URL;
    if (!aiServiceUrl) {
      return {
        status: "skipped",
        detail: "AI_SERVICE_URL is not configured.",
      };
    }

    try {
      const response = await fetch(`${aiServiceUrl}/collections/bootstrap`, {
        method: "POST",
      });
      return await response.json();
    } catch (error) {
      return {
        status: "failed",
        detail: `Vector bootstrap failed: ${this.toErrorMessage(error)}`,
      };
    }
  }

  async syncVectorIndexes() {
    const aiServiceUrl = process.env.AI_SERVICE_URL;
    if (!aiServiceUrl) {
      return {
        status: "skipped",
        detail: "AI_SERVICE_URL is not configured.",
      };
    }

    try {
      const [jobs, portfolios] = await Promise.all([
        this.marketplaceDataService.getJobs(),
        this.marketplaceDataService.getPortfolios(),
      ]);

      const [jobResponse, portfolioResponse] = await Promise.all([
        fetch(`${aiServiceUrl}/index/jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobs: jobs.map((job) => ({
              id: job.id,
              slug: job.slug,
              title: job.title,
              brand: job.brand,
              description: job.description,
              location: job.location,
              budget_min: job.budgetMin,
              budget_max: job.budgetMax,
              required_skills: job.requiredSkills,
              proof_signals: job.proofSignals,
              requires_verified_badge: job.requiresVerifiedBadge,
            })),
          }),
        }),
        fetch(`${aiServiceUrl}/index/portfolios`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolios: portfolios.map((portfolio) => ({
              id: portfolio.id,
              slug: portfolio.slug,
              creator_name: portfolio.creatorName,
              title: portfolio.title,
              category: portfolio.category,
              location: portfolio.location,
              hourly_rate_min: portfolio.hourlyRateMin,
              hourly_rate_max: portfolio.hourlyRateMax,
              skills: portfolio.skills,
              proof: portfolio.proof,
              trust_score: portfolio.trustScore,
              verified: portfolio.verified,
              availability: portfolio.availability,
            })),
          }),
        }),
      ]);

      return {
        status: "ok",
        detail: "Vector sync completed.",
        jobs: await jobResponse.json(),
        portfolios: await portfolioResponse.json(),
      };
    } catch (error) {
      return {
        status: "failed",
        detail: `Vector sync failed: ${this.toErrorMessage(error)}`,
      };
    }
  }

  private toErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Unknown error";
  }
}
