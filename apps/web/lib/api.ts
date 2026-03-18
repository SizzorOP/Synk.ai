export type PlatformSummary = {
  metrics: {
    talentProfiles: number;
    openJobs: number;
    verifiedTalent: number;
    averageTrustScore: number;
  };
  modules: string[];
};

export type Job = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  description: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
  requiredSkills: string[];
  proofSignals: string[];
  requiresVerifiedBadge: boolean;
};

export type Portfolio = {
  id: string;
  slug: string;
  creatorName: string;
  title: string;
  category: string;
  location: string;
  hourlyRateMin: number;
  hourlyRateMax: number;
  skills: string[];
  proof: string[];
  trustScore: number;
  verified: boolean;
  availability: "OPEN" | "LIMITED" | "UNAVAILABLE";
};

export type MatchResponse = {
  summary: {
    title: string;
    shortlisted: number;
    model: string;
  };
  candidates: Array<{
    freelancerId: string;
    slug: string;
    creatorName: string;
    title: string;
    verified: boolean;
    skills: string[];
    proof: string[];
    score: number;
    explanation?: string;
    matchedSkills?: string[];
    llmPercentage?: number;
    llmExplanation?: string;
    breakdown?: {
      skillOverlap: number;
      budgetScore: number;
      locationScore: number;
      verificationScore: number;
      trustScore: number;
      proofScore: number;
    };
  }>;
};

export type MatchPreviewInput = {
  title: string;
  description: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
  requiredSkills: string[];
  proofSignals: string[];
  requiresVerifiedBadge: boolean;
  limit?: number;
};

export type RoleCode =
  | "FREELANCER"
  | "BRAND_ADMIN"
  | "RECRUITER"
  | "FINANCE"
  | "SUPPORT"
  | "PLATFORM_ADMIN";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  roles: RoleCode[];
};

export type DevPersona = AuthUser & {
  description: string;
};

export type AuthSession = {
  accessToken: string;
  tokenType: "Bearer";
  expiresAt: string;
  user: AuthUser;
};

export type ChatThread = {
  id: string;
  type: "DIRECT" | "JOB_ROOM" | "CONTRACT_ROOM" | "SUPPORT";
  title: string;
  participantIds: string[];
  participantNames: string[];
  lastMessagePreview: string;
  lastMessageAt: string;
  jobId: string | null;
  contractId: string | null;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  senderUserId: string | null;
  senderName: string;
  messageKind: "TEXT" | "FILE" | "SYSTEM" | "TASK";
  body: string;
  createdAt: string;
  replyToMessageId: string | null;
};

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

export type Proposal = {
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

export type Milestone = {
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

export type EscrowTransaction = {
  id: string;
  contractId: string;
  milestoneId: string | null;
  direction: "DEBIT" | "CREDIT";
  transactionType: "FUND" | "HOLD" | "RELEASE" | "REFUND" | "FEE" | "PAYOUT" | "REVERSAL";
  amount: number;
  currency: string;
  status:
    | "INITIATED"
    | "AUTHORIZED"
    | "CAPTURED"
    | "HELD"
    | "RELEASED"
    | "REFUNDED"
    | "FAILED"
    | "DISPUTED";
  providerEventRef: string | null;
  occurredAt: string;
};

export type Contract = {
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
  milestones: Milestone[];
  transactions: EscrowTransaction[];
};

export type EngagementOverview = {
  proposalCount: number;
  activeContractCount: number;
  fundedMilestoneCount: number;
  pendingReleaseAmount: number;
  totalReleasedAmount: number;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

type RequestOptions = RequestInit & {
  accessToken?: string;
};

async function requestJson<T>(path: string, init?: RequestOptions): Promise<T> {
  const { accessToken, ...requestInit } = init ?? {};
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestInit,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {}),
      ...(requestInit.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const responseText = await response.text();
    let message = `API request failed for ${path}: ${response.status}`;

    if (responseText) {
      try {
        const parsed = JSON.parse(responseText) as {
          message?: string | string[];
          error?: string;
        };
        if (Array.isArray(parsed.message)) {
          message = parsed.message.join(", ");
        } else if (parsed.message) {
          message = parsed.message;
        } else if (parsed.error) {
          message = parsed.error;
        }
      } catch {
        message = responseText;
      }
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export async function fetchDevPersonas() {
  return requestJson<DevPersona[]>("/auth/personas");
}

export async function devLogin(email: string) {
  return requestJson<AuthSession>("/auth/dev-login", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function fetchCurrentUser(accessToken: string) {
  return requestJson<{ user: AuthUser }>("/auth/me", {
    accessToken,
  });
}

export async function fetchChatThreads(accessToken: string) {
  return requestJson<ChatThread[]>("/chat/threads", {
    accessToken,
  });
}

export async function createChatThread(
  input: {
    type: "DIRECT" | "SUPPORT";
    participantIds: string[];
    title?: string;
  },
  accessToken: string,
) {
  return requestJson<ChatThread>("/chat/threads", {
    method: "POST",
    body: JSON.stringify(input),
    accessToken,
  });
}

export async function fetchChatMessages(threadId: string, accessToken: string) {
  return requestJson<ChatMessage[]>(`/chat/threads/${threadId}/messages`, {
    accessToken,
  });
}

export async function createChatMessage(
  threadId: string,
  input: {
    body: string;
    messageKind?: "TEXT" | "FILE" | "SYSTEM" | "TASK";
    replyToMessageId?: string;
  },
  accessToken: string,
) {
  return requestJson<ChatMessage>(`/chat/threads/${threadId}/messages`, {
    method: "POST",
    body: JSON.stringify(input),
    accessToken,
  });
}

export async function fetchEngagementOverview(accessToken: string) {
  return requestJson<EngagementOverview>("/engagements/overview", {
    accessToken,
  });
}

export async function fetchMyProposals(accessToken: string) {
  return requestJson<Proposal[]>("/engagements/proposals/me", {
    accessToken,
  });
}

export async function fetchJobProposals(jobId: string, accessToken: string) {
  return requestJson<Proposal[]>(`/engagements/jobs/${jobId}/proposals`, {
    accessToken,
  });
}

export async function createProposal(
  input: {
    jobId: string;
    coverLetter: string;
    quoteAmountMin: number;
    quoteAmountMax: number;
    estimatedDurationDays: number;
    freelancerUserId?: string;
  },
  accessToken: string,
) {
  return requestJson<Proposal>("/engagements/proposals", {
    method: "POST",
    body: JSON.stringify(input),
    accessToken,
  });
}

export async function shortlistProposal(proposalId: string, accessToken: string) {
  return requestJson<Proposal>(`/engagements/proposals/${proposalId}/shortlist`, {
    method: "POST",
    accessToken,
  });
}

export async function fetchContracts(accessToken: string) {
  return requestJson<Contract[]>("/engagements/contracts", {
    accessToken,
  });
}

export async function fetchContract(contractId: string, accessToken: string) {
  return requestJson<Contract>(`/engagements/contracts/${contractId}`, {
    accessToken,
  });
}

export async function fetchContractTransactions(
  contractId: string,
  accessToken: string,
) {
  return requestJson<EscrowTransaction[]>(
    `/engagements/contracts/${contractId}/transactions`,
    {
      accessToken,
    },
  );
}

export async function createContract(
  input: {
    proposalId: string;
    agreedAmount: number;
    commissionBps?: number;
    provider: PaymentProvider;
    milestones: Array<{
      title: string;
      description: string;
      amount: number;
      dueAt?: string;
    }>;
  },
  accessToken: string,
) {
  return requestJson<Contract>("/engagements/contracts", {
    method: "POST",
    body: JSON.stringify(input),
    accessToken,
  });
}

export async function fundMilestone(
  contractId: string,
  milestoneId: string,
  input: {
    provider: PaymentProvider;
    amount?: number;
  },
  accessToken: string,
) {
  return requestJson<{ contract: Contract; milestone: Milestone }>(
    `/engagements/contracts/${contractId}/milestones/${milestoneId}/fund`,
    {
      method: "POST",
      body: JSON.stringify(input),
      accessToken,
    },
  );
}

export async function submitMilestone(
  contractId: string,
  milestoneId: string,
  note: string,
  accessToken: string,
) {
  return requestJson<{ contract: Contract; milestone: Milestone }>(
    `/engagements/contracts/${contractId}/milestones/${milestoneId}/submit`,
    {
      method: "POST",
      body: JSON.stringify({ note }),
      accessToken,
    },
  );
}

export async function approveMilestone(
  contractId: string,
  milestoneId: string,
  accessToken: string,
) {
  return requestJson<{ contract: Contract; milestone: Milestone }>(
    `/engagements/contracts/${contractId}/milestones/${milestoneId}/approve`,
    {
      method: "POST",
      accessToken,
    },
  );
}

export async function fetchPlatformSummary() {
  return requestJson<PlatformSummary>("/platform/summary");
}

export async function fetchJobs() {
  return requestJson<Job[]>("/jobs");
}

export async function fetchPortfolios() {
  return requestJson<Portfolio[]>("/portfolios");
}

export async function fetchMatchesForJob(jobId: string) {
  return requestJson<MatchResponse>(`/matching/job/${jobId}`);
}

export async function previewMatches(input: MatchPreviewInput) {
  return requestJson<MatchResponse>("/jobs/preview-match", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function createJob(
  input: Omit<MatchPreviewInput, "limit"> & { brand: string; customQuestions?: { question: string; required: boolean }[] },
  accessToken?: string,
) {
  return requestJson<Job>("/jobs", {
    method: "POST",
    body: JSON.stringify(input),
    accessToken,
  });
}

export async function createPortfolio(input: {
  creatorName: string;
  email: string;
  title: string;
  category: string;
  location: string;
  hourlyRateMin: number;
  hourlyRateMax: number;
  skills: string[];
  proof: string[];
  verified: boolean;
  availability: "OPEN" | "LIMITED" | "UNAVAILABLE";
}, accessToken?: string) {
  return requestJson<Portfolio>("/portfolios", {
    method: "POST",
    body: JSON.stringify(input),
    accessToken,
  });
}

export const fallbackDevPersonas: DevPersona[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    email: "aira@example.com",
    displayName: "Aira Mehta",
    roles: ["FREELANCER"],
    description: "Freelancer persona for portfolio creation and talent-side flows.",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    email: "ravi@example.com",
    displayName: "Ravi Kulkarni",
    roles: ["FREELANCER"],
    description: "Freelancer persona aligned with the engineering marketplace seed.",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    email: "sana@example.com",
    displayName: "Sana Arora",
    roles: ["FREELANCER"],
    description: "Freelancer persona for creative portfolio workflows.",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    email: "ops@prooflane.dev",
    displayName: "Prooflane Recruiter",
    roles: ["RECRUITER"],
    description: "Recruiter persona for job creation and talent discovery.",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    email: "admin@prooflane.dev",
    displayName: "Prooflane Admin",
    roles: ["PLATFORM_ADMIN"],
    description: "Platform admin persona for cross-role testing and vector sync controls.",
  },
];

export const fallbackSummary: PlatformSummary = {
  metrics: {
    talentProfiles: 3,
    openJobs: 2,
    verifiedTalent: 2,
    averageTrustScore: 0.9133,
  },
  modules: [
    "portfolio-engine",
    "semantic-matching",
    "escrow-ledger",
    "smart-collaboration-hub",
  ],
};

export const fallbackJobs: Job[] = [
  {
    id: "job-1",
    slug: "creator-led-launch-reels",
    title: "Launch 20 creator-led product reels",
    brand: "Northstar D2C",
    description:
      "Need a freelancer who can concept, script, and deliver high-converting launch reels for a skincare brand.",
    location: "India",
    budgetMin: 1500,
    budgetMax: 4000,
    requiredSkills: ["ugc", "reels", "scriptwriting", "analytics"],
    proofSignals: ["brand launches", "short-form performance", "creator portfolio"],
    requiresVerifiedBadge: false,
  },
  {
    id: "job-2",
    slug: "marketplace-platform-mvp",
    title: "Build the first marketplace MVP",
    brand: "Prooflane Labs",
    description:
      "Looking for a full-stack engineer to build Next.js, NestJS, PostgreSQL, and Redis foundations with AI matching hooks.",
    location: "India",
    budgetMin: 2500,
    budgetMax: 6500,
    requiredSkills: ["next.js", "nestjs", "postgresql", "redis", "docker"],
    proofSignals: ["marketplace builds", "B2B SaaS", "infra ownership"],
    requiresVerifiedBadge: true,
  },
];

export const fallbackPortfolios: Portfolio[] = [
  {
    id: "talent-1",
    slug: "aira-social-reels",
    creatorName: "Aira Mehta",
    title: "UGC Video Strategist",
    category: "Creator Marketing",
    location: "India",
    hourlyRateMin: 1800,
    hourlyRateMax: 3500,
    skills: ["ugc", "reels", "scriptwriting", "capcut", "analytics"],
    proof: ["12 brand reel launches", "4.8 average rating", "2.1M aggregate views"],
    trustScore: 0.91,
    verified: true,
    availability: "OPEN",
  },
  {
    id: "talent-2",
    slug: "ravi-nextjs-platforms",
    creatorName: "Ravi Kulkarni",
    title: "Full-Stack Product Engineer",
    category: "Software Engineering",
    location: "India",
    hourlyRateMin: 3000,
    hourlyRateMax: 6000,
    skills: ["next.js", "nestjs", "postgresql", "redis", "docker"],
    proof: ["Shipped 3 SaaS marketplaces", "99.95% uptime on prior platform", "Open-source maintainer"],
    trustScore: 0.95,
    verified: true,
    availability: "LIMITED",
  },
  {
    id: "talent-3",
    slug: "sana-brand-motion",
    creatorName: "Sana Arora",
    title: "Motion Designer",
    category: "Design",
    location: "UAE",
    hourlyRateMin: 2500,
    hourlyRateMax: 4200,
    skills: ["after-effects", "storyboarding", "branding", "reels", "figma"],
    proof: ["Behance feature", "14 campaign explainers", "92% repeat client rate"],
    trustScore: 0.88,
    verified: false,
    availability: "OPEN",
  },
];

export const fallbackEngagementOverview: EngagementOverview = {
  proposalCount: 3,
  activeContractCount: 1,
  fundedMilestoneCount: 1,
  pendingReleaseAmount: 2200,
  totalReleasedAmount: 1800,
};

export const fallbackProposals: Proposal[] = [
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

export const fallbackContracts: Contract[] = [
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
    milestones: [
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
    ],
    transactions: [
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
    ],
  },
];

export const fallbackMatchResponse: MatchResponse = {
  summary: {
    title: "Build the first marketplace MVP",
    shortlisted: 2,
    model: "ai_rerank_v1",
  },
  candidates: [
    {
      freelancerId: "talent-2",
      slug: "ravi-nextjs-platforms",
      creatorName: "Ravi Kulkarni",
      title: "Full-Stack Product Engineer",
      verified: true,
      skills: ["next.js", "nestjs", "postgresql", "redis", "docker"],
      proof: ["Shipped 3 SaaS marketplaces", "99.95% uptime on prior platform", "Open-source maintainer"],
      score: 0.8925,
      explanation:
        "Matched 5 required skills, trust 0.95, budget score 1.00, proof score 0.33.",
      matchedSkills: ["docker", "nestjs", "next.js", "postgresql", "redis"],
    },
    {
      freelancerId: "talent-1",
      slug: "aira-social-reels",
      creatorName: "Aira Mehta",
      title: "UGC Video Strategist",
      verified: true,
      skills: ["ugc", "reels", "scriptwriting", "capcut", "analytics"],
      proof: ["12 brand reel launches", "4.8 average rating", "2.1M aggregate views"],
      score: 0.2765,
      explanation:
        "Matched 0 required skills, trust 0.91, budget score 0.20, proof score 0.00.",
      matchedSkills: [],
    },
  ],
};
