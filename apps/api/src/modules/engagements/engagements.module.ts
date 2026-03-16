import { Module } from "@nestjs/common";

import { ChatModule } from "../chat/chat.module";
import { MarketplaceDataModule } from "../marketplace-data/marketplace-data.module";
import { ContractsController } from "./contracts.controller";
import { EngagementsController } from "./engagements.controller";
import { ProposalsController } from "./proposals.controller";
import { EngagementsService } from "./engagements.service";

@Module({
  imports: [ChatModule, MarketplaceDataModule],
  controllers: [EngagementsController, ProposalsController, ContractsController],
  providers: [EngagementsService],
  exports: [EngagementsService],
})
export class EngagementsModule {}
