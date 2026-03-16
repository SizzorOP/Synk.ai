export type ProposalStatus =
  | "SUBMITTED"
  | "SHORTLISTED"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN"
  | "EXPIRED";

export type ContractStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "TERMINATED"
  | "DISPUTED"
  | "CANCELLED";

export type MilestoneStatus =
  | "PENDING_FUNDING"
  | "FUNDED"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "APPROVED"
  | "RELEASED"
  | "DISPUTED"
  | "CANCELLED";

export type EscrowStatus =
  | "PENDING"
  | "PARTIALLY_FUNDED"
  | "FUNDED"
  | "RELEASING"
  | "RELEASED"
  | "REFUNDED"
  | "DISPUTED"
  | "CLOSED";

export type PaymentProvider = "STRIPE" | "RAZORPAY";

export type EscrowTransactionStatus =
  | "INITIATED"
  | "AUTHORIZED"
  | "CAPTURED"
  | "HELD"
  | "RELEASED"
  | "REFUNDED"
  | "FAILED"
  | "DISPUTED";

export type EscrowTransactionType =
  | "FUND"
  | "HOLD"
  | "RELEASE"
  | "REFUND"
  | "FEE"
  | "PAYOUT"
  | "REVERSAL";

export type TransactionDirection = "DEBIT" | "CREDIT";

export type ProposalRecord = {
  id: string;
  jobId: string;
  jobTitle: string;
  brand: string;
  freelancerUserId: string;
  freelancerName: string;
  status: ProposalStatus;
  coverLetter: string;
  quoteAmountMin: number;
  quoteAmountMax: number;
  estimatedDurationDays: number;
  matchScore: number;
  submittedAt: string;
};

export type MilestoneRecord = {
  id: string;
  contractId: string;
  sequenceNo: number;
  title: string;
  description: string;
  amount: number;
  currency: string;
  dueAt: string | null;
  status: MilestoneStatus;
  fundedAt: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  releasedAt: string | null;
  deliverableNote: string | null;
};

export type EscrowTransactionRecord = {
  id: string;
  contractId: string;
  milestoneId: string | null;
  direction: TransactionDirection;
  transactionType: EscrowTransactionType;
  amount: number;
  currency: string;
  status: EscrowTransactionStatus;
  providerEventRef: string | null;
  occurredAt: string;
};

export type ContractRecord = {
  id: string;
  jobId: string;
  proposalId: string;
  jobTitle: string;
  organizationId: string;
  organizationName: string;
  freelancerUserId: string;
  freelancerName: string;
  status: ContractStatus;
  currency: string;
  agreedAmount: number;
  commissionBps: number;
  escrowProvider: PaymentProvider;
  escrowStatus: EscrowStatus;
  totalFunded: number;
  totalReleased: number;
  milestones: MilestoneRecord[];
};

export const proposalSeed: ProposalRecord[] = [
  {
    id: "proposal-1",
    jobId: "job-2",
    jobTitle: "Build the first marketplace MVP",
    brand: "Prooflane Labs",
    freelancerUserId: "22222222-2222-2222-2222-222222222222",
    freelancerName: "Ravi Kulkarni",
    status: "ACCEPTED",
    coverLetter:
      "I can ship the web, API, and AI boundary quickly and keep the contracts explicit.",
    quoteAmountMin: 4800,
    quoteAmountMax: 5800,
    estimatedDurationDays: 28,
    matchScore: 0.8925,
    submittedAt: "2026-03-15T10:00:00.000Z",
  },
  {
    id: "proposal-2",
    jobId: "job-1",
    jobTitle: "Launch 20 creator-led product reels",
    brand: "Northstar D2C",
    freelancerUserId: "11111111-1111-1111-1111-111111111111",
    freelancerName: "Aira Mehta",
    status: "SHORTLISTED",
    coverLetter:
      "I can own scripting, shot planning, and performance reporting for the launch pack.",
    quoteAmountMin: 2200,
    quoteAmountMax: 3600,
    estimatedDurationDays: 14,
    matchScore: 0.814,
    submittedAt: "2026-03-15T12:30:00.000Z",
  },
  {
    id: "proposal-3",
    jobId: "job-1",
    jobTitle: "Launch 20 creator-led product reels",
    brand: "Northstar D2C",
    freelancerUserId: "33333333-3333-3333-3333-333333333333",
    freelancerName: "Sana Arora",
    status: "SUBMITTED",
    coverLetter:
      "My motion-first campaign workflow can support the reel package with stronger brand consistency.",
    quoteAmountMin: 2500,
    quoteAmountMax: 4100,
    estimatedDurationDays: 18,
    matchScore: 0.674,
    submittedAt: "2026-03-16T08:15:00.000Z",
  },
];

export const milestoneSeed: MilestoneRecord[] = [
  {
    id: "milestone-1",
    contractId: "contract-1",
    sequenceNo: 1,
    title: "System architecture and repo baseline",
    description: "Architecture docs, monorepo setup, and localhost baseline.",
    amount: 1800,
    currency: "INR",
    dueAt: "2026-03-18T12:00:00.000Z",
    status: "RELEASED",
    fundedAt: "2026-03-15T14:00:00.000Z",
    submittedAt: "2026-03-16T10:00:00.000Z",
    approvedAt: "2026-03-16T12:00:00.000Z",
    releasedAt: "2026-03-16T12:15:00.000Z",
    deliverableNote: "Architecture pack and runnable baseline delivered.",
  },
  {
    id: "milestone-2",
    contractId: "contract-1",
    sequenceNo: 2,
    title: "Auth, matching, and collaboration workflows",
    description: "Protected writes, matching UI, and realtime collaboration room.",
    amount: 2200,
    currency: "INR",
    dueAt: "2026-03-20T12:00:00.000Z",
    status: "FUNDED",
    fundedAt: "2026-03-16T13:00:00.000Z",
    submittedAt: null,
    approvedAt: null,
    releasedAt: null,
    deliverableNote: null,
  },
  {
    id: "milestone-3",
    contractId: "contract-1",
    sequenceNo: 3,
    title: "Payments and persistence hardening",
    description: "Escrow flows, persisted recruiter workflow, and production auth handoff.",
    amount: 1800,
    currency: "INR",
    dueAt: "2026-03-24T12:00:00.000Z",
    status: "PENDING_FUNDING",
    fundedAt: null,
    submittedAt: null,
    approvedAt: null,
    releasedAt: null,
    deliverableNote: null,
  },
];

export const contractSeed: ContractRecord[] = [
  {
    id: "contract-1",
    jobId: "job-2",
    proposalId: "proposal-1",
    jobTitle: "Build the first marketplace MVP",
    organizationId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    organizationName: "Prooflane Labs",
    freelancerUserId: "22222222-2222-2222-2222-222222222222",
    freelancerName: "Ravi Kulkarni",
    status: "ACTIVE",
    currency: "INR",
    agreedAmount: 5800,
    commissionBps: 1000,
    escrowProvider: "STRIPE",
    escrowStatus: "PARTIALLY_FUNDED",
    totalFunded: 4000,
    totalReleased: 1800,
    milestones: milestoneSeed.filter((milestone) => milestone.contractId === "contract-1"),
  },
];

export const escrowTransactionSeed: EscrowTransactionRecord[] = [
  {
    id: "escrow-tx-1",
    contractId: "contract-1",
    milestoneId: "milestone-1",
    direction: "CREDIT",
    transactionType: "FUND",
    amount: 1800,
    currency: "INR",
    status: "HELD",
    providerEventRef: "mock-fund-1",
    occurredAt: "2026-03-15T14:00:00.000Z",
  },
  {
    id: "escrow-tx-2",
    contractId: "contract-1",
    milestoneId: "milestone-1",
    direction: "DEBIT",
    transactionType: "RELEASE",
    amount: 1800,
    currency: "INR",
    status: "RELEASED",
    providerEventRef: "mock-release-1",
    occurredAt: "2026-03-16T12:15:00.000Z",
  },
  {
    id: "escrow-tx-3",
    contractId: "contract-1",
    milestoneId: "milestone-2",
    direction: "CREDIT",
    transactionType: "FUND",
    amount: 2200,
    currency: "INR",
    status: "HELD",
    providerEventRef: "mock-fund-2",
    occurredAt: "2026-03-16T13:00:00.000Z",
  },
];
