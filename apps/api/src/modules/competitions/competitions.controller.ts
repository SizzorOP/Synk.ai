import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Public } from "../auth/decorators/public.decorator";
import { CompetitionsService } from "./competitions.service";
import { SubmitCompetitionDto } from "./dto/submit-competition.dto";

@Controller("competitions")
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Public()
  @Get()
  findAll() {
    return this.competitionsService.findAll();
  }

  @Public()
  @Get(":id/leaderboard")
  getLeaderboard(@Param("id") id: string) {
    return this.competitionsService.getLeaderboard(id);
  }

  @Post(":id/submit")
  submit(
    @Param("id") competitionId: string,
    @Body() input: SubmitCompetitionDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.competitionsService.submit(competitionId, input, currentUser);
  }
}
