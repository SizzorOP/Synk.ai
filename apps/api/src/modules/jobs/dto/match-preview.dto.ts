import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class MatchPreviewDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  location!: string;

  @IsInt()
  @Min(0)
  budgetMin!: number;

  @IsInt()
  @Min(0)
  budgetMax!: number;

  @IsArray()
  @IsString({ each: true })
  requiredSkills!: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  proofSignals?: string[];

  @IsBoolean()
  @IsOptional()
  requiresVerifiedBadge?: boolean;

  @IsInt()
  @Min(1)
  @Max(20)
  @IsOptional()
  limit?: number;
}
