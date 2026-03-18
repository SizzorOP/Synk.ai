import { IsOptional, IsString } from "class-validator";

export class SubmitCompetitionDto {
  @IsString()
  @IsOptional()
  githubUrl?: string;

  @IsString()
  @IsOptional()
  figmaUrl?: string;

  @IsString()
  @IsOptional()
  liveUrl?: string;
}
