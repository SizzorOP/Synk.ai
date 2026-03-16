import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateJobDto {
  @IsString()
  title!: string;

  @IsString()
  brand!: string;

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
}
