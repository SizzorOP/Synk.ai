import { randomUUID } from "node:crypto";
import { Injectable, BadRequestException, NotFoundException, Logger } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import type { AuthUser } from "../auth/auth.types";
import { SubmitCompetitionDto } from "./dto/submit-competition.dto";

@Injectable()
export class CompetitionsService {
  private readonly logger = new Logger(CompetitionsService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    try {
      const rows = await this.databaseService.query(`
        SELECT id, title, description, status, prize_pool_amount, created_at
        FROM marketplace.competitions
        ORDER BY created_at DESC
      `);
      return rows;
    } catch {
      return [];
    }
  }

  async getLeaderboard(competitionId: string) {
    try {
      const rows = await this.databaseService.query(`
        SELECT 
          s.id, s.github_url, s.ai_score, s.status, s.submitted_at, 
          u.display_name as "userName"
        FROM marketplace.competition_submissions s
        JOIN marketplace.users u ON u.id = s.user_id
        WHERE s.competition_id = $1::uuid
        ORDER BY s.ai_score DESC NULLS LAST
      `, [competitionId]);
      return rows;
    } catch {
      return [];
    }
  }

  async submit(competitionId: string, input: SubmitCompetitionDto, currentUser: AuthUser) {
    try {
      const compCheck = await this.databaseService.query(`
        SELECT id FROM marketplace.competitions WHERE id = $1::uuid
      `, [competitionId]);

      if (compCheck.length === 0) {
        throw new NotFoundException(`Competition ${competitionId} not found`);
      }

      const submissionId = randomUUID();
      await this.databaseService.query(`
        INSERT INTO marketplace.competition_submissions (
          id, competition_id, user_id, github_url, figma_url, live_url, status
        ) VALUES (
          $1::uuid, $2::uuid, $3::uuid, $4, $5, $6, 'SUBMITTED'
        )
      `, [submissionId, competitionId, currentUser.id, input.githubUrl ?? null, input.figmaUrl ?? null, input.liveUrl ?? null]);

      // Fire off AI analysis asynchronously
      this.analyzeSubmission(submissionId, input.githubUrl);
      
      return { id: submissionId, status: "SUBMITTED" };
    } catch (error) {
       this.logger.error(error);
       throw error;
    }
  }

  private async analyzeSubmission(submissionId: string, githubUrl?: string) {
    if (!githubUrl) return;

    const serviceUrl = process.env.AI_SERVICE_URL;
    if (!serviceUrl) return;

    try {
      const response = await fetch(`${serviceUrl}/analyze/github`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_repo_url: githubUrl, tasks: [] }),
      });

      if (!response.ok) return;

      const data = await response.json();
      
      await this.databaseService.query(`
        UPDATE marketplace.competition_submissions
        SET ai_score = $1, ai_feedback = $2::jsonb, status = 'SCORED'
        WHERE id = $3::uuid
      `, [data.score, JSON.stringify(data.feedback), submissionId]);
      
    } catch (e) {
      this.logger.error("Failed to analyze submission", e);
    }
  }
}
