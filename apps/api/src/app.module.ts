import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./modules/auth/auth.module";
import { ChatModule } from "./modules/chat/chat.module";
import { DatabaseModule } from "./modules/database/database.module";
import { EngagementsModule } from "./modules/engagements/engagements.module";
import { HealthModule } from "./modules/health/health.module";
import { JobsModule } from "./modules/jobs/jobs.module";
import { MarketplaceDataModule } from "./modules/marketplace-data/marketplace-data.module";
import { MatchingModule } from "./modules/matching/matching.module";
import { PlatformModule } from "./modules/platform/platform.module";
import { PortfoliosModule } from "./modules/portfolios/portfolios.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ChatModule,
    DatabaseModule,
    EngagementsModule,
    HealthModule,
    JobsModule,
    MarketplaceDataModule,
    MatchingModule,
    PlatformModule,
    PortfoliosModule,
  ],
})
export class AppModule {}
