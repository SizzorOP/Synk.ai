import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";
import { PortfoliosService } from "./portfolios.service";

@Controller("portfolios")
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Public()
  @Get()
  findAll() {
    return this.portfoliosService.findAll();
  }

  @Roles("FREELANCER", "PLATFORM_ADMIN")
  @Post()
  create(
    @Body() input: CreatePortfolioDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.portfoliosService.create(input, currentUser);
  }

  @Public()
  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.portfoliosService.findBySlug(slug);
  }
}
