import { Injectable, NotFoundException } from "@nestjs/common";

import { MarketplaceDataService } from "../marketplace-data/marketplace-data.service";

type MatchInput = {
  title: string;
  description: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
  requiredSkills: string[];
  proofSignals: string[];
  requiresVerifiedBadge: boolean;
  limit: number;
};

@Injectable()
export class MatchingService {
  constructor(
    private readonly marketplaceDataService: MarketplaceDataService,
  ) {}

  async getSeedMatchesForJob(jobId: string) {
    const job = await this.marketplaceDataService.findJobById(jobId);

    if (!job) {
      throw new NotFoundException(`Job '${jobId}' was not found.`);
    }

    return this.previewJobMatches({
      title: job.title,
      description: job.description,
      location: job.location,
      budgetMin: job.budgetMin,
      budgetMax: job.budgetMax,
      requiredSkills: job.requiredSkills,
      proofSignals: job.proofSignals,
      requiresVerifiedBadge: job.requiresVerifiedBadge,
      limit: 5,
    });
  }

  async previewJobMatches(input: MatchInput) {
    const portfolios = await this.marketplaceDataService.getPortfolios();

    const ranked = portfolios
      .map((portfolio) => {
        const skillOverlap = this.getSkillOverlapScore(
          input.requiredSkills,
          portfolio.skills,
        );
        const budgetScore = this.getBudgetScore(
          input.budgetMin,
          input.budgetMax,
          portfolio.hourlyRateMin,
          portfolio.hourlyRateMax,
        );
        const locationScore =
          input.location.toLowerCase() === portfolio.location.toLowerCase() ? 1 : 0.65;
        const verificationScore =
          !input.requiresVerifiedBadge || portfolio.verified ? 1 : 0;
        const trustScore = portfolio.trustScore;
        const proofScore = this.getProofScore(input.proofSignals, portfolio.proof);

        const finalScore =
          skillOverlap * 0.35 +
          budgetScore * 0.2 +
          locationScore * 0.1 +
          verificationScore * 0.1 +
          trustScore * 0.15 +
          proofScore * 0.1;

        return {
          freelancerId: portfolio.id,
          slug: portfolio.slug,
          creatorName: portfolio.creatorName,
          title: portfolio.title,
          verified: portfolio.verified,
          skills: portfolio.skills,
          proof: portfolio.proof,
          score: Number(finalScore.toFixed(4)),
          breakdown: {
            skillOverlap,
            budgetScore,
            locationScore,
            verificationScore,
            trustScore,
            proofScore,
          },
        };
      })
      .filter((entry) => entry.breakdown.verificationScore > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, input.limit);

    const aiReranked = await this.tryRerankWithAi(input, portfolios);

    if (aiReranked) {
      const candidateMap = new Map(ranked.map((entry) => [entry.freelancerId, entry]));
      const merged = aiReranked
        .map((entry) => {
          const candidate = candidateMap.get(entry.freelancer_id);

          if (!candidate) {
            return null;
          }

          return {
            ...candidate,
            score: entry.score,
            explanation: entry.explanation,
            matchedSkills: entry.matched_skills,
          };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
        .slice(0, input.limit);

      return {
        summary: {
          title: input.title,
          shortlisted: merged.length,
          model: "ai_rerank_v1",
        },
        candidates: merged,
      };
    }

    return {
      summary: {
        title: input.title,
        shortlisted: ranked.length,
        model: "heuristic_v1_placeholder",
      },
      candidates: ranked,
    };
  }

  private async tryRerankWithAi(input: MatchInput, portfolios: Awaited<ReturnType<MarketplaceDataService["getPortfolios"]>>) {
    const serviceUrl = process.env.AI_SERVICE_URL;

    if (!serviceUrl) {
      return null;
    }

    try {
      const response = await fetch(`${serviceUrl}/match/rerank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input.title,
          description: input.description,
          location: input.location,
          budget_min: input.budgetMin,
          budget_max: input.budgetMax,
          required_skills: input.requiredSkills,
          proof_signals: input.proofSignals,
          requires_verified_badge: input.requiresVerifiedBadge,
          candidates: portfolios.map((candidate) => ({
            freelancer_id: candidate.id,
            skills: candidate.skills,
            trust_score: candidate.trustScore,
            verified: candidate.verified,
            rate_min: candidate.hourlyRateMin,
            rate_max: candidate.hourlyRateMax,
            proof: candidate.proof,
          })),
        }),
      });

      if (!response.ok) {
        return null;
      }

      const payload = (await response.json()) as {
        results?: Array<{
          freelancer_id: string;
          score: number;
          explanation: string;
          matched_skills: string[];
        }>;
      };

      return payload.results ?? null;
    } catch {
      return null;
    }
  }

  private getSkillOverlapScore(requiredSkills: string[], portfolioSkills: string[]) {
    const required = new Set(requiredSkills.map((skill) => skill.toLowerCase()));
    const matched = portfolioSkills.filter((skill) =>
      required.has(skill.toLowerCase()),
    ).length;

    return required.size === 0 ? 0 : Number((matched / required.size).toFixed(4));
  }

  private getBudgetScore(
    budgetMin: number,
    budgetMax: number,
    rateMin: number,
    rateMax: number,
  ) {
    if (budgetMax < rateMin || budgetMin > rateMax) {
      return 0.25;
    }

    return 1;
  }

  private getProofScore(requiredSignals: string[], proofSnippets: string[]) {
    if (requiredSignals.length === 0) {
      return 0.8;
    }

    const haystack = proofSnippets.join(" ").toLowerCase();
    const matches = requiredSignals.filter((signal) =>
      haystack.includes(signal.toLowerCase()),
    ).length;

    return Number(Math.max(0.3, matches / requiredSignals.length).toFixed(4));
  }
}
