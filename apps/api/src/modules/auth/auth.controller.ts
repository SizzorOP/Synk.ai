import { Body, Controller, Get, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import type { AuthUser } from "./auth.types";
import { CurrentUser } from "./decorators/current-user.decorator";
import { Public } from "./decorators/public.decorator";
import { DevLoginDto } from "./dto/dev-login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get("personas")
  getDevPersonas() {
    return this.authService.getDevPersonas();
  }

  @Public()
  @Post("dev-login")
  devLogin(@Body() input: DevLoginDto) {
    return this.authService.devLogin(input);
  }

  @Get("me")
  getCurrentUser(@CurrentUser() user: AuthUser) {
    return {
      user,
    };
  }
}
