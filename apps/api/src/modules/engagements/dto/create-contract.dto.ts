import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class ContractMilestoneInputDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsInt()
  @Min(0)
  amount!: number;

  @IsString()
  @IsOptional()
  dueAt?: string;
}

export class CreateContractDto {
  @IsString()
  proposalId!: string;

  @IsInt()
  @Min(0)
  agreedAmount!: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  commissionBps?: number;

  @IsEnum(["STRIPE", "RAZORPAY"])
  provider!: "STRIPE" | "RAZORPAY";

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ContractMilestoneInputDto)
  milestones!: ContractMilestoneInputDto[];
}
