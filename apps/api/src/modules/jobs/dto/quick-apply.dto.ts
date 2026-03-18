import { IsObject, IsOptional } from "class-validator";

export class QuickApplyDto {
  @IsObject()
  @IsOptional()
  answers?: Record<string, string>;
}
