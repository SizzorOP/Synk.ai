import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { CreateProposalDto } from "./dto/create-proposal.dto";
import { EngagementsService } from "./engagements.service";

@Controller("engagements")
export class ProposalsController {
  constructor(private readonly engagementsService: EngagementsService) {}

  @Get("proposals/me")
  getMyProposals(@CurrentUser() currentUser: AuthUser) {
    return this.engagementsService.getMyProposals(currentUser);
  }

  @Roles("RECRUITER", "BRAND_ADMIN", "FINANCE", "PLATFORM_ADMIN")
  @Get("jobs/:jobId/proposals")
  getProposalsForJob(
    @Param("jobId") jobId: string,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.getProposalsForJob(jobId, currentUser);
  }

  @Post("proposals")
  createProposal(
    @Body() input: CreateProposalDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.createProposal(input, currentUser);
  }

  @Roles("RECRUITER", "BRAND_ADMIN", "PLATFORM_ADMIN")
  @Post("proposals/:proposalId/shortlist")
  shortlistProposal(
    @Param("proposalId") proposalId: string,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.shortlistProposal(proposalId, currentUser);
  }
}
