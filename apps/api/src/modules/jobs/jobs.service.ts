import { Injectable } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CreateJobDto } from "./dto/create-job.dto";
import { MarketplaceDataService } from "../marketplace-data/marketplace-data.service";
import { MatchingService } from "../matching/matching.service";
import { MatchPreviewDto } from "./dto/match-preview.dto";

@Injectable()
export class JobsService {
  constructor(
    private readonly matchingService: MatchingService,
    private readonly marketplaceDataService: MarketplaceDataService,
  ) {}

  findAll() {
    return this.marketplaceDataService.getJobs();
  }

  create(input: CreateJobDto, currentUser: AuthUser) {
    return this.marketplaceDataService.createJob({
      ...input,
      proofSignals: input.proofSignals ?? [],
      requiresVerifiedBadge: input.requiresVerifiedBadge ?? false,
    }, currentUser);
  }

  async previewMatches(input: MatchPreviewDto) {
    return this.matchingService.previewJobMatches({
      ...input,
      proofSignals: input.proofSignals ?? [],
      requiresVerifiedBadge: input.requiresVerifiedBadge ?? false,
      limit: input.limit ?? 5,
    });
  }
}
