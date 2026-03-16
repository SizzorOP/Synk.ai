import { Controller, Get } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { EngagementsService } from "./engagements.service";

@Controller("engagements")
export class EngagementsController {
  constructor(private readonly engagementsService: EngagementsService) {}

  @Get("overview")
  getOverview(@CurrentUser() currentUser: AuthUser) {
    return this.engagementsService.getOverview(currentUser);
  }
}
