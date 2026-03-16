import { Module } from "@nestjs/common";

import { MarketplaceDataModule } from "../marketplace-data/marketplace-data.module";
import { PlatformController } from "./platform.controller";
import { PlatformService } from "./platform.service";

@Module({
  imports: [MarketplaceDataModule],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
