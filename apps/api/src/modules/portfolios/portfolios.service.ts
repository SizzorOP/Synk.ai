import { Injectable, NotFoundException } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { MarketplaceDataService } from "../marketplace-data/marketplace-data.service";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

@Injectable()
export class PortfoliosService {
  constructor(private readonly marketplaceDataService: MarketplaceDataService) {}

  findAll() {
    return this.marketplaceDataService.getPortfolios();
  }

  create(input: CreatePortfolioDto, currentUser: AuthUser) {
    return this.marketplaceDataService.createPortfolio(input, currentUser);
  }

  async findBySlug(slug: string) {
    const portfolio = (await this.marketplaceDataService.getPortfolios()).find(
      (entry) => entry.slug === slug,
    );

    if (!portfolio) {
      throw new NotFoundException(`Portfolio '${slug}' was not found.`);
    }

    return portfolio;
  }
}
