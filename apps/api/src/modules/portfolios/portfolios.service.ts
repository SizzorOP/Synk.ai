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

  async analyze(slug: string) {
    const portfolio = await this.findBySlug(slug);
    
    const serviceUrl = process.env.AI_SERVICE_URL;
    if (!serviceUrl) {
      return { score: 0, feedback: "AI service unavailable", improvements: [] };
    }

    try {
      const response = await fetch(`${serviceUrl}/analyze/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_title: portfolio.title,
          project_description: portfolio.proof.join(" ") || "No description provided",
          project_url: `https://marketplace.com/portfolios/${slug}`
        }),
      });

      if (!response.ok) {
         return { score: 0, feedback: "AI analysis failed", improvements: [] };
      }
      return await response.json();
    } catch {
      return { score: 0, feedback: "AI analysis failed", improvements: [] };
    }
  }
}
