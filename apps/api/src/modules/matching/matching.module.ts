import { Module } from "@nestjs/common";

import { MarketplaceDataModule } from "../marketplace-data/marketplace-data.module";
import { MatchingController } from "./matching.controller";
import { MatchingService } from "./matching.service";

@Module({
  imports: [MarketplaceDataModule],
  controllers: [MatchingController],
  providers: [MatchingService],
  exports: [MatchingService],
})
export class MatchingModule {}
