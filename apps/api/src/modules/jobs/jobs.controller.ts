import { Body, Controller, Get, Post } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { CreateJobDto } from "./dto/create-job.dto";
import { MatchPreviewDto } from "./dto/match-preview.dto";
import { JobsService } from "./jobs.service";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

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
}
