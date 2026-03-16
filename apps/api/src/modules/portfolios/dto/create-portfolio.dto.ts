import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  Min,
} from "class-validator";

export class CreatePortfolioDto {
  @IsString()
  creatorName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsString()
  location!: string;

  @IsInt()
  @Min(0)
  hourlyRateMin!: number;

  @IsInt()
  @Min(0)
  hourlyRateMax!: number;

  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @IsArray()
  @IsString({ each: true })
  proof!: string[];

  @IsBoolean()
  verified!: boolean;

  @IsEnum(["OPEN", "LIMITED", "UNAVAILABLE"])
  availability!: "OPEN" | "LIMITED" | "UNAVAILABLE";
}
