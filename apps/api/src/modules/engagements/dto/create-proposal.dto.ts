import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateProposalDto {
  @IsString()
  jobId!: string;

  @IsString()
  coverLetter!: string;

  @IsInt()
  @Min(0)
  quoteAmountMin!: number;

  @IsInt()
  @Min(0)
  quoteAmountMax!: number;

  @IsInt()
  @Min(1)
  estimatedDurationDays!: number;

  @IsString()
  @IsOptional()
  freelancerUserId?: string;
}
