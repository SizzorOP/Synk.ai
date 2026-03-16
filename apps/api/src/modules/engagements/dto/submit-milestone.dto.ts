import { IsString } from "class-validator";

export class SubmitMilestoneDto {
  @IsString()
  note!: string;
}
