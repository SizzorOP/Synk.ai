import type {
  ContractRecord,
  EscrowTransactionRecord,
  MilestoneRecord,
  ProposalRecord,
} from "../../data/engagements.data";

export type EngagementOverview = {
  proposalCount: number;
  activeContractCount: number;
  fundedMilestoneCount: number;
  pendingReleaseAmount: number;
  totalReleasedAmount: number;
};

export type ContractDetail = ContractRecord & {
  transactions: EscrowTransactionRecord[];
};

export type ProposalDetail = ProposalRecord;

export type MilestoneActionResult = {
  contract: ContractDetail;
  milestone: MilestoneRecord;
};
