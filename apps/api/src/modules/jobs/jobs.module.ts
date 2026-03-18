import { Module } from "@nestjs/common";

import { MarketplaceDataModule } from "../marketplace-data/marketplace-data.module";
import { MatchingModule } from "../matching/matching.module";
import { EngagementsModule } from "../engagements/engagements.module";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";

@Module({
  imports: [MarketplaceDataModule, MatchingModule, EngagementsModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
