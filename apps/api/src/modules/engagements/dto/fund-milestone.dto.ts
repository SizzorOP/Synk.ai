import { IsEnum, IsInt, IsOptional, Min } from "class-validator";

export class FundMilestoneDto {
  @IsEnum(["STRIPE", "RAZORPAY"])
  provider!: "STRIPE" | "RAZORPAY";

  @IsInt()
  @Min(0)
  @IsOptional()
  amount?: number;
}
