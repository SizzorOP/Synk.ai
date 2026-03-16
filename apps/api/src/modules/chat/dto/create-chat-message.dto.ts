import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateChatMessageDto {
  @IsString()
  body!: string;

  @IsEnum(["TEXT", "FILE", "SYSTEM", "TASK"])
  @IsOptional()
  messageKind?: "TEXT" | "FILE" | "SYSTEM" | "TASK";

  @IsString()
  @IsOptional()
  replyToMessageId?: string;
}
