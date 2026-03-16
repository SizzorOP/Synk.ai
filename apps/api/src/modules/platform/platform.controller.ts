import { Controller, Get, Post } from "@nestjs/common";

import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { PlatformService } from "./platform.service";

@Controller("platform")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Public()
  @Get("summary")
  getSummary() {
    return this.platformService.getSummary();
  }

  @Roles("PLATFORM_ADMIN")
  @Post("vector/bootstrap")
  bootstrapVectorCollections() {
    return this.platformService.bootstrapVectorCollections();
  }

  @Roles("PLATFORM_ADMIN")
  @Post("vector/sync")
  syncVectorIndexes() {
    return this.platformService.syncVectorIndexes();
  }
}
