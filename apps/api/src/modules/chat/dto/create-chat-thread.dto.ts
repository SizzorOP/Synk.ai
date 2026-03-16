import { ArrayMinSize, IsArray, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateChatThreadDto {
  @IsEnum(["DIRECT", "SUPPORT"])
  type!: "DIRECT" | "SUPPORT";

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  participantIds!: string[];

  @IsString()
  @IsOptional()
  title?: string;
}
