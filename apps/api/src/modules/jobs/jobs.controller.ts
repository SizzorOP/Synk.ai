import { Body, Controller, Get, Post, Param } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { CreateJobDto } from "./dto/create-job.dto";
import { MatchPreviewDto } from "./dto/match-preview.dto";
import { QuickApplyDto } from "./dto/quick-apply.dto";
import { JobsService } from "./jobs.service";
import { EngagementsService } from "../engagements/engagements.service";

@Controller("jobs")
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly engagementsService: EngagementsService,
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Roles("RECRUITER", "BRAND_ADMIN", "PLATFORM_ADMIN")
  @Post()
  create(@Body() input: CreateJobDto, @CurrentUser() currentUser: AuthUser) {
    return this.jobsService.create(input, currentUser);
  }

  @Public()
  @Post("preview-match")
  previewMatches(@Body() input: MatchPreviewDto) {
    return this.jobsService.previewMatches(input);
  }

  @Post(":id/apply")
  quickApply(
    @Param("id") jobId: string,
    @Body() input: QuickApplyDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.engagementsService.createProposal(
      {
        jobId,
        coverLetter: "Quick Apply via Platform",
        quoteAmountMin: 0,
        quoteAmountMax: 0,
        estimatedDurationDays: 1,
        answers: input.answers ?? {},
      },
      currentUser,
    );
  }
}
