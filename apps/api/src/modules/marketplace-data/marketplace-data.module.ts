import { Module } from "@nestjs/common";

import { MarketplaceDataService } from "./marketplace-data.service";

@Module({
  providers: [MarketplaceDataService],
  exports: [MarketplaceDataService],
})
export class MarketplaceDataModule {}
