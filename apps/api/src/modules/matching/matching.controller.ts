import { Controller, Get, Param } from "@nestjs/common";

import { Public } from "../auth/decorators/public.decorator";
import { MatchingService } from "./matching.service";

@Controller("matching")
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Public()
  @Get("job/:jobId")
  getMatchesForJob(@Param("jobId") jobId: string) {
    return this.matchingService.getSeedMatchesForJob(jobId);
  }
}
