import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { CreateContractDto } from "./dto/create-contract.dto";
import { FundMilestoneDto } from "./dto/fund-milestone.dto";
import { SubmitMilestoneDto } from "./dto/submit-milestone.dto";
import { EngagementsService } from "./engagements.service";

@Controller("engagements")
export class ContractsController {
  constructor(private readonly engagementsService: EngagementsService) {}

  @Get("contracts")
  getContracts(@CurrentUser() currentUser: AuthUser) {
    return this.engagementsService.getContracts(currentUser);
  }

  @Get("contracts/:contractId")
  getContractById(
    @Param("contractId") contractId: string,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.getContractById(contractId, currentUser);
  }

  @Get("contracts/:contractId/transactions")
  getTransactions(
    @Param("contractId") contractId: string,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.getTransactions(contractId, currentUser);
  }

  @Roles("RECRUITER", "BRAND_ADMIN", "PLATFORM_ADMIN")
  @Post("contracts")
  createContract(
    @Body() input: CreateContractDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.createContract(input, currentUser);
  }

  @Roles("RECRUITER", "BRAND_ADMIN", "FINANCE", "PLATFORM_ADMIN")
  @Post("contracts/:contractId/milestones/:milestoneId/fund")
  fundMilestone(
    @Param("contractId") contractId: string,
    @Param("milestoneId") milestoneId: string,
    @Body() input: FundMilestoneDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.fundMilestone(
      contractId,
      milestoneId,
      input,
      currentUser,
    );
  }

  @Post("contracts/:contractId/milestones/:milestoneId/submit")
  submitMilestone(
    @Param("contractId") contractId: string,
    @Param("milestoneId") milestoneId: string,
    @Body() input: SubmitMilestoneDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.submitMilestone(
      contractId,
      milestoneId,
      input.note,
      currentUser,
    );
  }

  @Roles("RECRUITER", "BRAND_ADMIN", "PLATFORM_ADMIN")
  @Post("contracts/:contractId/milestones/:milestoneId/approve")
  approveMilestone(
    @Param("contractId") contractId: string,
    @Param("milestoneId") milestoneId: string,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.approveMilestone(
      contractId,
      milestoneId,
      currentUser,
    );
  }
}
