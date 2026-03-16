import { randomUUID } from "node:crypto";

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  contractSeed,
  escrowTransactionSeed,
  milestoneSeed,
  proposalSeed,
  type ContractRecord,
  type ContractStatus,
  type EscrowStatus,
  type EscrowTransactionRecord,
  type MilestoneRecord,
  type MilestoneStatus,
  type PaymentProvider,
  type ProposalRecord,
  type ProposalStatus,
} from "../../data/engagements.data";
import { devPersonaSeed } from "../../data/auth.data";
import type { AuthUser } from "../auth/auth.types";
import { ChatService } from "../chat/chat.service";
import { DatabaseService } from "../database/database.service";
import { MarketplaceDataService } from "../marketplace-data/marketplace-data.service";
import type {
  ContractDetail,
  EngagementOverview,
  MilestoneActionResult,
  ProposalDetail,
} from "./engagements.types";

type CreateProposalInput = {
  jobId: string;
  coverLetter: string;
  quoteAmountMin: number;
  quoteAmountMax: number;
  estimatedDurationDays: number;
  freelancerUserId?: string;
};

type CreateContractInput = {
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
};

type FundMilestoneInput = {
  provider: PaymentProvider;
  amount?: number;
};

type ContractRow = {
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
  escrowProvider: PaymentProvider | null;
  escrowStatus: EscrowStatus | null;
  totalFunded: number;
  totalReleased: number;
};

type ProposalRow = {
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
  matchScore: number | null;
  submittedAt: string;
};

type MilestoneRow = {
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

type EscrowTransactionRow = {
  id: string;
  contractId: string;
  milestoneId: string | null;
  direction: EscrowTransactionRecord["direction"];
  transactionType: EscrowTransactionRecord["transactionType"];
  amount: number;
  currency: string;
  status: EscrowTransactionRecord["status"];
  providerEventRef: string | null;
  occurredAt: string;
};

@Injectable()
export class EngagementsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly marketplaceDataService: MarketplaceDataService,
    private readonly chatService: ChatService,
  ) {}

  async getOverview(currentUser: AuthUser): Promise<EngagementOverview> {
    const proposals = this.canRecruit(currentUser)
      ? await this.getProposalsForRecruiter(currentUser)
      : await this.getMyProposals(currentUser);
    const contracts = await this.getContracts(currentUser);

    const fundedMilestoneCount = contracts
      .flatMap((contract) => contract.milestones)
      .filter((milestone) =>
        ["FUNDED", "IN_PROGRESS", "SUBMITTED", "APPROVED"].includes(milestone.status),
      ).length;

    const pendingReleaseAmount = contracts
      .flatMap((contract) => contract.milestones)
      .filter((milestone) =>
        ["FUNDED", "IN_PROGRESS", "SUBMITTED", "APPROVED"].includes(milestone.status),
      )
      .reduce((sum, milestone) => sum + milestone.amount, 0);

    const totalReleasedAmount = contracts.reduce(
      (sum, contract) => sum + contract.totalReleased,
      0,
    );

    return {
      proposalCount: proposals.length,
      activeContractCount: contracts.filter((contract) => contract.status === "ACTIVE")
        .length,
      fundedMilestoneCount,
      pendingReleaseAmount,
      totalReleasedAmount,
    };
  }

  async getMyProposals(currentUser: AuthUser): Promise<ProposalDetail[]> {
    if (this.isPlatformAdmin(currentUser)) {
      const rows = await this.getProposalRows();
      return rows.length > 0 ? rows : proposalSeed;
    }

    const rows = await this.getProposalRows(currentUser.id);
    if (rows.length > 0) {
      return rows;
    }

    return proposalSeed.filter(
      (proposal) => proposal.freelancerUserId === currentUser.id,
    );
  }

  async getProposalsForRecruiter(currentUser: AuthUser): Promise<ProposalDetail[]> {
    if (this.isPlatformAdmin(currentUser)) {
      const rows = await this.getProposalRows();
      return rows.length > 0 ? rows : proposalSeed;
    }

    try {
      const rows = await this.databaseService.query<ProposalRow>(
        `
          SELECT
            p.id::text AS id,
            p.job_id::text AS "jobId",
            j.title AS "jobTitle",
            o.name AS brand,
            p.freelancer_user_id::text AS "freelancerUserId",
            u.display_name AS "freelancerName",
            p.status::text AS status,
            COALESCE(p.cover_letter, '') AS "coverLetter",
            COALESCE((p.quote_amount_min_minor / 100)::int, 0) AS "quoteAmountMin",
            COALESCE((p.quote_amount_max_minor / 100)::int, 0) AS "quoteAmountMax",
            COALESCE(p.estimated_duration_days, 0) AS "estimatedDurationDays",
            p.match_score::float AS "matchScore",
            p.submitted_at::text AS "submittedAt"
          FROM marketplace.proposals p
          JOIN marketplace.jobs j ON j.id = p.job_id
          JOIN marketplace.organizations o ON o.id = j.organization_id
          JOIN marketplace.users u ON u.id = p.freelancer_user_id
          JOIN marketplace.organization_memberships om
            ON om.organization_id = j.organization_id
          WHERE om.user_id = $1::uuid
          ORDER BY p.submitted_at DESC
        `,
        [currentUser.id],
      );

      if (rows.length > 0) {
        return rows.map((row) => this.normalizeProposalRow(row));
      }
    } catch {
      // Fall back to the local seed data below.
    }

    const recruiterOrganizationIds = this.getFallbackRecruiterOrganizationIds(
      currentUser,
    );
    return proposalSeed.filter((proposal) =>
      recruiterOrganizationIds.includes(
        this.getFallbackOrganizationId(proposal.brand),
      ),
    );
  }

  async getProposalsForJob(jobId: string, currentUser: AuthUser): Promise<ProposalDetail[]> {
    await this.assertRecruiterAccessToJob(jobId, currentUser);

    try {
      const rows = await this.databaseService.query<ProposalRow>(
        `
          SELECT
            p.id::text AS id,
            p.job_id::text AS "jobId",
            j.title AS "jobTitle",
            o.name AS brand,
            p.freelancer_user_id::text AS "freelancerUserId",
            u.display_name AS "freelancerName",
            p.status::text AS status,
            COALESCE(p.cover_letter, '') AS "coverLetter",
            COALESCE((p.quote_amount_min_minor / 100)::int, 0) AS "quoteAmountMin",
            COALESCE((p.quote_amount_max_minor / 100)::int, 0) AS "quoteAmountMax",
            COALESCE(p.estimated_duration_days, 0) AS "estimatedDurationDays",
            p.match_score::float AS "matchScore",
            p.submitted_at::text AS "submittedAt"
          FROM marketplace.proposals p
          JOIN marketplace.jobs j ON j.id = p.job_id
          JOIN marketplace.organizations o ON o.id = j.organization_id
          JOIN marketplace.users u ON u.id = p.freelancer_user_id
          WHERE p.job_id = $1::uuid
          ORDER BY p.submitted_at DESC
        `,
        [jobId],
      );

      if (rows.length > 0) {
        return rows.map((row) => this.normalizeProposalRow(row));
      }
    } catch {
      // Fall back to the local seed data below.
    }

    return proposalSeed.filter((proposal) => proposal.jobId === jobId);
  }

  async getContracts(currentUser: AuthUser): Promise<ContractDetail[]> {
    try {
      const contracts = await this.getContractRowsForUser(currentUser);
      if (contracts.length > 0) {
        return Promise.all(
          contracts.map((contract) => this.buildContractDetailFromRow(contract)),
        );
      }
    } catch {
      // Fall back to local seed data below.
    }

    return this.getFallbackContractsForUser(currentUser);
  }

  async getContractById(contractId: string, currentUser: AuthUser) {
    const contract = await this.findContractById(contractId, currentUser);
    if (!contract) {
      throw new NotFoundException(`Contract '${contractId}' was not found.`);
    }

    return contract;
  }

  async getTransactions(contractId: string, currentUser: AuthUser) {
    const contract = await this.findContractById(contractId, currentUser);
    if (!contract) {
      throw new NotFoundException(`Contract '${contractId}' was not found.`);
    }

    return contract.transactions;
  }

  async createProposal(input: CreateProposalInput, currentUser: AuthUser) {
    const freelancer = await this.resolveProposalFreelancer(input, currentUser);
    const job = await this.marketplaceDataService.findJobById(input.jobId);
    if (!job) {
      throw new NotFoundException(`Job '${input.jobId}' was not found.`);
    }

    if (input.quoteAmountMin > input.quoteAmountMax) {
      throw new BadRequestException("quoteAmountMin cannot exceed quoteAmountMax.");
    }

    const matchScore = await this.estimateProposalMatchScore(
      input.jobId,
      freelancer.userId,
      freelancer.displayName,
    );
    const proposalId = randomUUID();
    const submittedAt = new Date().toISOString();

    try {
      await this.databaseService.query(
        `
          INSERT INTO marketplace.proposals (
            id,
            job_id,
            freelancer_user_id,
            status,
            cover_letter,
            quote_currency,
            quote_amount_min_minor,
            quote_amount_max_minor,
            estimated_duration_days,
            match_score,
            submitted_at
          )
          VALUES (
            $1::uuid,
            $2::uuid,
            $3::uuid,
            'SUBMITTED',
            $4,
            'INR',
            $5,
            $6,
            $7,
            $8,
            NOW()
          )
        `,
        [
          proposalId,
          input.jobId,
          freelancer.userId,
          input.coverLetter.trim(),
          input.quoteAmountMin * 100,
          input.quoteAmountMax * 100,
          input.estimatedDurationDays,
          matchScore,
        ],
      );

      const created = await this.findProposalById(proposalId);
      if (created) {
        return created;
      }
    } catch {
      // Fall back to the local seed store below.
    }

    const fallbackProposal: ProposalRecord = {
      id: proposalId,
      jobId: job.id,
      jobTitle: job.title,
      brand: job.brand,
      freelancerUserId: freelancer.userId,
      freelancerName: freelancer.displayName,
      status: "SUBMITTED",
      coverLetter: input.coverLetter.trim(),
      quoteAmountMin: input.quoteAmountMin,
      quoteAmountMax: input.quoteAmountMax,
      estimatedDurationDays: input.estimatedDurationDays,
      matchScore,
      submittedAt,
    };

    proposalSeed.unshift(fallbackProposal);
    return fallbackProposal;
  }

  async shortlistProposal(proposalId: string, currentUser: AuthUser) {
    const proposal = await this.findProposalById(proposalId);
    if (!proposal) {
      throw new NotFoundException(`Proposal '${proposalId}' was not found.`);
    }

    await this.assertRecruiterAccessToJob(proposal.jobId, currentUser);
    return this.updateProposalStatus(proposalId, "SHORTLISTED");
  }

  async createContract(input: CreateContractInput, currentUser: AuthUser) {
    const proposal = await this.findProposalById(input.proposalId);
    if (!proposal) {
      throw new NotFoundException(`Proposal '${input.proposalId}' was not found.`);
    }

    await this.assertRecruiterAccessToJob(proposal.jobId, currentUser);

    const milestoneTotal = input.milestones.reduce(
      (sum, milestone) => sum + milestone.amount,
      0,
    );
    if (milestoneTotal !== input.agreedAmount) {
      throw new BadRequestException(
        "Milestone amounts must add up to the agreedAmount.",
      );
    }

    if (!["SUBMITTED", "SHORTLISTED", "ACCEPTED"].includes(proposal.status)) {
      throw new BadRequestException(
        `Proposal '${proposal.id}' cannot be awarded from status '${proposal.status}'.`,
      );
    }

    try {
      const existingRows = await this.databaseService.query<{ id: string }>(
        `
          SELECT id::text AS id
          FROM marketplace.contracts
          WHERE proposal_id = $1::uuid
          LIMIT 1
        `,
        [proposal.id],
      );
      if (existingRows[0]?.id) {
        throw new BadRequestException(
          `Proposal '${proposal.id}' already has a contract.`,
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
    }

    if (contractSeed.some((contract) => contract.proposalId === proposal.id)) {
      throw new BadRequestException(
        `Proposal '${proposal.id}' already has a contract.`,
      );
    }

    const contractId = randomUUID();
    const escrowAccountId = randomUUID();
    const commissionBps = input.commissionBps ?? 1000;
    const fallbackMilestones: MilestoneRecord[] = input.milestones.map(
      (milestone, index) => ({
        id: randomUUID(),
        contractId,
        sequenceNo: index + 1,
        title: milestone.title.trim(),
        description: milestone.description.trim(),
        amount: milestone.amount,
        currency: "INR",
        dueAt: milestone.dueAt ?? null,
        status: "PENDING_FUNDING",
        fundedAt: null,
        submittedAt: null,
        approvedAt: null,
        releasedAt: null,
        deliverableNote: null,
      }),
    );

    try {
      await this.databaseService.withTransaction(async (client) => {
        const proposalRows = await client.query<{
          jobId: string;
          organizationId: string;
          freelancerUserId: string;
        }>(
          `
            SELECT
              p.job_id::text AS "jobId",
              j.organization_id::text AS "organizationId",
              p.freelancer_user_id::text AS "freelancerUserId"
            FROM marketplace.proposals p
            JOIN marketplace.jobs j ON j.id = p.job_id
            WHERE p.id = $1::uuid
            LIMIT 1
          `,
          [proposal.id],
        );

        const proposalRow = proposalRows.rows[0];
        if (!proposalRow) {
          throw new NotFoundException(`Proposal '${proposal.id}' was not found.`);
        }

        await client.query(
          `
            INSERT INTO marketplace.contracts (
              id,
              job_id,
              proposal_id,
              organization_id,
              freelancer_user_id,
              status,
              currency,
              agreed_amount_minor,
              commission_bps,
              started_at
            )
            VALUES (
              $1::uuid,
              $2::uuid,
              $3::uuid,
              $4::uuid,
              $5::uuid,
              'ACTIVE',
              'INR',
              $6,
              $7,
              NOW()
            )
          `,
          [
            contractId,
            proposalRow.jobId,
            proposal.id,
            proposalRow.organizationId,
            proposalRow.freelancerUserId,
            input.agreedAmount * 100,
            commissionBps,
          ],
        );

        await client.query(
          `
            INSERT INTO marketplace.escrow_accounts (
              id,
              contract_id,
              provider,
              provider_escrow_ref,
              status,
              currency,
              total_funded_minor,
              total_released_minor,
              total_refunded_minor
            )
            VALUES (
              $1::uuid,
              $2::uuid,
              $3::payment_provider,
              $4,
              'PENDING',
              'INR',
              0,
              0,
              0
            )
          `,
          [
            escrowAccountId,
            contractId,
            input.provider,
            `local-${input.provider.toLowerCase()}-${contractId.slice(0, 8)}`,
          ],
        );

        for (const milestone of fallbackMilestones) {
          await client.query(
            `
              INSERT INTO marketplace.milestones (
                id,
                contract_id,
                sequence_no,
                title,
                description,
                amount_minor,
                currency,
                due_at,
                status
              )
              VALUES (
                $1::uuid,
                $2::uuid,
                $3,
                $4,
                $5,
                $6,
                'INR',
                $7::timestamptz,
                'PENDING_FUNDING'
              )
            `,
            [
              milestone.id,
              contractId,
              milestone.sequenceNo,
              milestone.title,
              milestone.description,
              milestone.amount * 100,
              milestone.dueAt,
            ],
          );
        }

        await client.query(
          `
            UPDATE marketplace.proposals
            SET status = 'ACCEPTED', updated_at = NOW()
            WHERE id = $1::uuid
          `,
          [proposal.id],
        );
      });

      await this.chatService.createWorkflowThread({
        type: "CONTRACT_ROOM",
        title: `${proposal.brand} / ${proposal.freelancerName} contract room`,
        participantIds: [currentUser.id, proposal.freelancerUserId],
        createdByUserId: currentUser.id,
        contractId,
        initialSystemMessage: `Contract created for ${proposal.jobTitle}.`,
      });

      const created = await this.findContractById(contractId, currentUser);
      if (created) {
        return created;
      }
    } catch {
      // Fall back to in-memory records below.
    }

    const fallbackContract: ContractRecord = {
      id: contractId,
      jobId: proposal.jobId,
      proposalId: proposal.id,
      jobTitle: proposal.jobTitle,
      organizationId: this.getFallbackOrganizationId(proposal.brand),
      organizationName: proposal.brand,
      freelancerUserId: proposal.freelancerUserId,
      freelancerName: proposal.freelancerName,
      status: "ACTIVE",
      currency: "INR",
      agreedAmount: input.agreedAmount,
      commissionBps,
      escrowProvider: input.provider,
      escrowStatus: "PENDING",
      totalFunded: 0,
      totalReleased: 0,
      milestones: fallbackMilestones,
    };

    contractSeed.unshift(fallbackContract);
    milestoneSeed.unshift(...fallbackMilestones);
    fallbackContract.milestones = milestoneSeed
      .filter((milestone) => milestone.contractId === contractId)
      .sort((left, right) => left.sequenceNo - right.sequenceNo);

    await this.chatService.createWorkflowThread({
      type: "CONTRACT_ROOM",
      title: `${proposal.brand} / ${proposal.freelancerName} contract room`,
      participantIds: [currentUser.id, proposal.freelancerUserId],
      createdByUserId: currentUser.id,
      contractId,
      initialSystemMessage: `Contract created for ${proposal.jobTitle}.`,
    });
    await this.updateProposalStatus(proposal.id, "ACCEPTED");

    return this.buildFallbackContractDetail(fallbackContract);
  }

  async fundMilestone(
    contractId: string,
    milestoneId: string,
    input: FundMilestoneInput,
    currentUser: AuthUser,
  ): Promise<MilestoneActionResult> {
    const contract = await this.findContractById(contractId, currentUser);
    if (!contract) {
      throw new NotFoundException(`Contract '${contractId}' was not found.`);
    }

    const milestone = contract.milestones.find((entry) => entry.id === milestoneId);
    if (!milestone) {
      throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
    }

    if (!["PENDING_FUNDING", "FUNDED"].includes(milestone.status)) {
      throw new BadRequestException(
        `Milestone '${milestoneId}' cannot be funded from status '${milestone.status}'.`,
      );
    }

    const amount = input.amount ?? milestone.amount;
    if (amount !== milestone.amount) {
      throw new BadRequestException(
        "This localhost funding flow expects the full milestone amount.",
      );
    }

    const occurredAt = new Date().toISOString();
    const transaction: EscrowTransactionRecord = {
      id: randomUUID(),
      contractId,
      milestoneId,
      direction: "CREDIT",
      transactionType: "FUND",
      amount,
      currency: milestone.currency,
      status: "HELD",
      providerEventRef: `local-${input.provider.toLowerCase()}-fund-${milestoneId.slice(0, 8)}`,
      occurredAt,
    };

    try {
      await this.databaseService.withTransaction(async (client) => {
        const escrowRows = await client.query<{ escrowAccountId: string }>(
          `
            SELECT id::text AS "escrowAccountId"
            FROM marketplace.escrow_accounts
            WHERE contract_id = $1::uuid
            LIMIT 1
          `,
          [contractId],
        );

        const escrowAccountId = escrowRows.rows[0]?.escrowAccountId;
        if (!escrowAccountId) {
          throw new NotFoundException(
            `Escrow account for contract '${contractId}' was not found.`,
          );
        }

        await client.query(
          `
            INSERT INTO marketplace.escrow_transactions (
              id,
              escrow_account_id,
              milestone_id,
              direction,
              transaction_type,
              provider_event_ref,
              amount_minor,
              currency,
              status,
              metadata
            )
            VALUES (
              $1::uuid,
              $2::uuid,
              $3::uuid,
              'CREDIT',
              'FUND',
              $4,
              $5,
              $6,
              'HELD',
              $7::jsonb
            )
          `,
          [
            transaction.id,
            escrowAccountId,
            milestoneId,
            transaction.providerEventRef,
            amount * 100,
            milestone.currency,
            JSON.stringify({ mode: "local-mock", provider: input.provider }),
          ],
        );

        await client.query(
          `
            UPDATE marketplace.milestones
            SET
              status = 'FUNDED',
              funded_at = NOW(),
              updated_at = NOW()
            WHERE id = $1::uuid
          `,
          [milestoneId],
        );

        const nextTotalFunded = contract.totalFunded + amount;
        await client.query(
          `
            UPDATE marketplace.escrow_accounts
            SET
              provider = $2::payment_provider,
              total_funded_minor = $3,
              status = $4::escrow_status,
              updated_at = NOW()
            WHERE contract_id = $1::uuid
          `,
          [
            contractId,
            input.provider,
            nextTotalFunded * 100,
            this.computeEscrowStatus(
              nextTotalFunded,
              contract.totalReleased,
              contract.agreedAmount,
            ),
          ],
        );
      });

      const updatedContract = await this.getContractById(contractId, currentUser);
      const updatedMilestone = updatedContract.milestones.find(
        (entry) => entry.id === milestoneId,
      );
      if (!updatedMilestone) {
        throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
      }

      return {
        contract: updatedContract,
        milestone: updatedMilestone,
      };
    } catch {
      const fallbackContract = contractSeed.find((entry) => entry.id === contractId);
      const fallbackMilestone = milestoneSeed.find(
        (entry) => entry.id === milestoneId && entry.contractId === contractId,
      );

      if (!fallbackContract || !fallbackMilestone) {
        throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
      }

      fallbackMilestone.status = "FUNDED";
      fallbackMilestone.fundedAt = occurredAt;
      fallbackContract.totalFunded += amount;
      fallbackContract.escrowProvider = input.provider;
      fallbackContract.escrowStatus = this.computeEscrowStatus(
        fallbackContract.totalFunded,
        fallbackContract.totalReleased,
        fallbackContract.agreedAmount,
      );
      fallbackContract.milestones = milestoneSeed
        .filter((entry) => entry.contractId === contractId)
        .sort((left, right) => left.sequenceNo - right.sequenceNo);
      escrowTransactionSeed.unshift(transaction);

      return {
        contract: this.buildFallbackContractDetail(fallbackContract),
        milestone: fallbackMilestone,
      };
    }
  }

  async submitMilestone(
    contractId: string,
    milestoneId: string,
    note: string,
    currentUser: AuthUser,
  ): Promise<MilestoneActionResult> {
    const contract = await this.findContractById(contractId, currentUser);
    if (!contract) {
      throw new NotFoundException(`Contract '${contractId}' was not found.`);
    }

    if (
      currentUser.id !== contract.freelancerUserId &&
      !this.isPlatformAdmin(currentUser)
    ) {
      throw new ForbiddenException("Only the assigned freelancer can submit deliverables.");
    }

    const milestone = contract.milestones.find((entry) => entry.id === milestoneId);
    if (!milestone) {
      throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
    }

    if (!["FUNDED", "IN_PROGRESS", "SUBMITTED"].includes(milestone.status)) {
      throw new BadRequestException(
        `Milestone '${milestoneId}' cannot be submitted from status '${milestone.status}'.`,
      );
    }

    const submittedAt = new Date().toISOString();

    try {
      await this.databaseService.withTransaction(async (client) => {
        await client.query(
          `
            UPDATE marketplace.milestones
            SET
              status = 'SUBMITTED',
              submitted_at = NOW(),
              updated_at = NOW()
            WHERE id = $1::uuid
          `,
          [milestoneId],
        );

        await client.query(
          `
            INSERT INTO marketplace.milestone_deliverables (
              id,
              milestone_id,
              submitted_by_user_id,
              note
            )
            VALUES ($1::uuid, $2::uuid, $3::uuid, $4)
          `,
          [randomUUID(), milestoneId, currentUser.id, note.trim()],
        );
      });

      const updatedContract = await this.getContractById(contractId, currentUser);
      const updatedMilestone = updatedContract.milestones.find(
        (entry) => entry.id === milestoneId,
      );
      if (!updatedMilestone) {
        throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
      }

      return {
        contract: updatedContract,
        milestone: updatedMilestone,
      };
    } catch {
      const fallbackContract = contractSeed.find((entry) => entry.id === contractId);
      const fallbackMilestone = milestoneSeed.find(
        (entry) => entry.id === milestoneId && entry.contractId === contractId,
      );

      if (!fallbackContract || !fallbackMilestone) {
        throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
      }

      fallbackMilestone.status = "SUBMITTED";
      fallbackMilestone.submittedAt = submittedAt;
      fallbackMilestone.deliverableNote = note.trim();
      fallbackContract.milestones = milestoneSeed
        .filter((entry) => entry.contractId === contractId)
        .sort((left, right) => left.sequenceNo - right.sequenceNo);

      return {
        contract: this.buildFallbackContractDetail(fallbackContract),
        milestone: fallbackMilestone,
      };
    }
  }

  async approveMilestone(
    contractId: string,
    milestoneId: string,
    currentUser: AuthUser,
  ): Promise<MilestoneActionResult> {
    const contract = await this.findContractById(contractId, currentUser);
    if (!contract) {
      throw new NotFoundException(`Contract '${contractId}' was not found.`);
    }

    const milestone = contract.milestones.find((entry) => entry.id === milestoneId);
    if (!milestone) {
      throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
    }

    if (!["SUBMITTED", "APPROVED"].includes(milestone.status)) {
      throw new BadRequestException(
        `Milestone '${milestoneId}' cannot be approved from status '${milestone.status}'.`,
      );
    }

    const occurredAt = new Date().toISOString();
    const releaseTransaction: EscrowTransactionRecord = {
      id: randomUUID(),
      contractId,
      milestoneId,
      direction: "DEBIT",
      transactionType: "RELEASE",
      amount: milestone.amount,
      currency: milestone.currency,
      status: "RELEASED",
      providerEventRef: `local-release-${milestoneId.slice(0, 8)}`,
      occurredAt,
    };

    try {
      await this.databaseService.withTransaction(async (client) => {
        const escrowRows = await client.query<{ escrowAccountId: string }>(
          `
            SELECT id::text AS "escrowAccountId"
            FROM marketplace.escrow_accounts
            WHERE contract_id = $1::uuid
            LIMIT 1
          `,
          [contractId],
        );

        const escrowAccountId = escrowRows.rows[0]?.escrowAccountId;
        if (!escrowAccountId) {
          throw new NotFoundException(
            `Escrow account for contract '${contractId}' was not found.`,
          );
        }

        await client.query(
          `
            UPDATE marketplace.milestones
            SET
              status = 'RELEASED',
              approved_at = COALESCE(approved_at, NOW()),
              released_at = NOW(),
              updated_at = NOW()
            WHERE id = $1::uuid
          `,
          [milestoneId],
        );

        await client.query(
          `
            INSERT INTO marketplace.escrow_transactions (
              id,
              escrow_account_id,
              milestone_id,
              direction,
              transaction_type,
              provider_event_ref,
              amount_minor,
              currency,
              status,
              metadata
            )
            VALUES (
              $1::uuid,
              $2::uuid,
              $3::uuid,
              'DEBIT',
              'RELEASE',
              $4,
              $5,
              $6,
              'RELEASED',
              $7::jsonb
            )
          `,
          [
            releaseTransaction.id,
            escrowAccountId,
            milestoneId,
            releaseTransaction.providerEventRef,
            milestone.amount * 100,
            milestone.currency,
            JSON.stringify({ mode: "local-mock", action: "milestone-release" }),
          ],
        );

        const nextTotalReleased = contract.totalReleased + milestone.amount;
        await client.query(
          `
            UPDATE marketplace.escrow_accounts
            SET
              total_released_minor = $2,
              status = $3::escrow_status,
              updated_at = NOW()
            WHERE contract_id = $1::uuid
          `,
          [
            contractId,
            nextTotalReleased * 100,
            this.computeEscrowStatus(
              contract.totalFunded,
              nextTotalReleased,
              contract.agreedAmount,
            ),
          ],
        );

        if (nextTotalReleased >= contract.agreedAmount) {
          await client.query(
            `
              UPDATE marketplace.contracts
              SET
                status = 'COMPLETED',
                ended_at = NOW(),
                updated_at = NOW()
              WHERE id = $1::uuid
            `,
            [contractId],
          );
        }
      });

      const updatedContract = await this.getContractById(contractId, currentUser);
      const updatedMilestone = updatedContract.milestones.find(
        (entry) => entry.id === milestoneId,
      );
      if (!updatedMilestone) {
        throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
      }

      return {
        contract: updatedContract,
        milestone: updatedMilestone,
      };
    } catch {
      const fallbackContract = contractSeed.find((entry) => entry.id === contractId);
      const fallbackMilestone = milestoneSeed.find(
        (entry) => entry.id === milestoneId && entry.contractId === contractId,
      );

      if (!fallbackContract || !fallbackMilestone) {
        throw new NotFoundException(`Milestone '${milestoneId}' was not found.`);
      }

      fallbackMilestone.status = "RELEASED";
      fallbackMilestone.approvedAt = fallbackMilestone.approvedAt ?? occurredAt;
      fallbackMilestone.releasedAt = occurredAt;
      fallbackContract.totalReleased += fallbackMilestone.amount;
      fallbackContract.escrowStatus = this.computeEscrowStatus(
        fallbackContract.totalFunded,
        fallbackContract.totalReleased,
        fallbackContract.agreedAmount,
      );
      if (fallbackContract.totalReleased >= fallbackContract.agreedAmount) {
        fallbackContract.status = "COMPLETED";
      }
      fallbackContract.milestones = milestoneSeed
        .filter((entry) => entry.contractId === contractId)
        .sort((left, right) => left.sequenceNo - right.sequenceNo);
      escrowTransactionSeed.unshift(releaseTransaction);

      return {
        contract: this.buildFallbackContractDetail(fallbackContract),
        milestone: fallbackMilestone,
      };
    }
  }

  private async getProposalRows(
    freelancerUserId?: string,
  ): Promise<ProposalDetail[]> {
    try {
      const rows = await this.databaseService.query<ProposalRow>(
        `
          SELECT
            p.id::text AS id,
            p.job_id::text AS "jobId",
            j.title AS "jobTitle",
            o.name AS brand,
            p.freelancer_user_id::text AS "freelancerUserId",
            u.display_name AS "freelancerName",
            p.status::text AS status,
            COALESCE(p.cover_letter, '') AS "coverLetter",
            COALESCE((p.quote_amount_min_minor / 100)::int, 0) AS "quoteAmountMin",
            COALESCE((p.quote_amount_max_minor / 100)::int, 0) AS "quoteAmountMax",
            COALESCE(p.estimated_duration_days, 0) AS "estimatedDurationDays",
            p.match_score::float AS "matchScore",
            p.submitted_at::text AS "submittedAt"
          FROM marketplace.proposals p
          JOIN marketplace.jobs j ON j.id = p.job_id
          JOIN marketplace.organizations o ON o.id = j.organization_id
          JOIN marketplace.users u ON u.id = p.freelancer_user_id
          WHERE ($1::uuid IS NULL OR p.freelancer_user_id = $1::uuid)
          ORDER BY p.submitted_at DESC
        `,
        [freelancerUserId ?? null],
      );

      return rows.map((row) => this.normalizeProposalRow(row));
    } catch {
      return freelancerUserId
        ? proposalSeed.filter(
            (proposal) => proposal.freelancerUserId === freelancerUserId,
          )
        : proposalSeed;
    }
  }

  private async findProposalById(
    proposalId: string,
  ): Promise<ProposalDetail | undefined> {
    try {
      const rows = await this.databaseService.query<ProposalRow>(
        `
          SELECT
            p.id::text AS id,
            p.job_id::text AS "jobId",
            j.title AS "jobTitle",
            o.name AS brand,
            p.freelancer_user_id::text AS "freelancerUserId",
            u.display_name AS "freelancerName",
            p.status::text AS status,
            COALESCE(p.cover_letter, '') AS "coverLetter",
            COALESCE((p.quote_amount_min_minor / 100)::int, 0) AS "quoteAmountMin",
            COALESCE((p.quote_amount_max_minor / 100)::int, 0) AS "quoteAmountMax",
            COALESCE(p.estimated_duration_days, 0) AS "estimatedDurationDays",
            p.match_score::float AS "matchScore",
            p.submitted_at::text AS "submittedAt"
          FROM marketplace.proposals p
          JOIN marketplace.jobs j ON j.id = p.job_id
          JOIN marketplace.organizations o ON o.id = j.organization_id
          JOIN marketplace.users u ON u.id = p.freelancer_user_id
          WHERE p.id = $1::uuid
          LIMIT 1
        `,
        [proposalId],
      );

      if (rows[0]) {
        return this.normalizeProposalRow(rows[0]);
      }
    } catch {
      // Fall through to seed lookup.
    }

    return proposalSeed.find((proposal) => proposal.id === proposalId);
  }

  private async updateProposalStatus(
    proposalId: string,
    status: ProposalStatus,
  ): Promise<ProposalDetail> {
    try {
      await this.databaseService.query(
        `
          UPDATE marketplace.proposals
          SET status = $2::proposal_status, updated_at = NOW()
          WHERE id = $1::uuid
        `,
        [proposalId, status],
      );

      const updated = await this.findProposalById(proposalId);
      if (updated) {
        return updated;
      }
    } catch {
      // Fall through to seed mutation.
    }

    const fallbackProposal = proposalSeed.find((proposal) => proposal.id === proposalId);
    if (!fallbackProposal) {
      throw new NotFoundException(`Proposal '${proposalId}' was not found.`);
    }

    fallbackProposal.status = status;
    return fallbackProposal;
  }

  private async getContractRowsForUser(
    currentUser: AuthUser,
  ): Promise<ContractRow[]> {
    const selectColumns = `
      SELECT
        c.id::text AS id,
        c.job_id::text AS "jobId",
        c.proposal_id::text AS "proposalId",
        j.title AS "jobTitle",
        c.organization_id::text AS "organizationId",
        o.name AS "organizationName",
        c.freelancer_user_id::text AS "freelancerUserId",
        u.display_name AS "freelancerName",
        c.status::text AS status,
        c.currency,
        COALESCE((c.agreed_amount_minor / 100)::int, 0) AS "agreedAmount",
        COALESCE(c.commission_bps, 0) AS "commissionBps",
        ea.provider::text AS "escrowProvider",
        ea.status::text AS "escrowStatus",
        COALESCE((ea.total_funded_minor / 100)::int, 0) AS "totalFunded",
        COALESCE((ea.total_released_minor / 100)::int, 0) AS "totalReleased"
      FROM marketplace.contracts c
      JOIN marketplace.jobs j ON j.id = c.job_id
      JOIN marketplace.organizations o ON o.id = c.organization_id
      JOIN marketplace.users u ON u.id = c.freelancer_user_id
      LEFT JOIN marketplace.escrow_accounts ea ON ea.contract_id = c.id
    `;

    if (this.isPlatformAdmin(currentUser)) {
      const rows = await this.databaseService.query<ContractRow>(
        `${selectColumns} ORDER BY c.created_at DESC`,
      );
      return rows.map((row) => this.normalizeContractRow(row));
    }

    if (this.canRecruit(currentUser)) {
      const rows = await this.databaseService.query<ContractRow>(
        `
          ${selectColumns}
          JOIN marketplace.organization_memberships om
            ON om.organization_id = c.organization_id
          WHERE om.user_id = $1::uuid
          ORDER BY c.created_at DESC
        `,
        [currentUser.id],
      );
      return rows.map((row) => this.normalizeContractRow(row));
    }

    const rows = await this.databaseService.query<ContractRow>(
      `
        ${selectColumns}
        WHERE c.freelancer_user_id = $1::uuid
        ORDER BY c.created_at DESC
      `,
      [currentUser.id],
    );
    return rows.map((row) => this.normalizeContractRow(row));
  }

  private async buildContractDetailFromRow(row: ContractRow): Promise<ContractDetail> {
    const [milestones, transactions] = await Promise.all([
      this.getMilestonesForContract(row.id),
      this.getTransactionsForContract(row.id),
    ]);
    const normalized = this.normalizeContractRow(row);

    return {
      ...normalized,
      escrowProvider: normalized.escrowProvider ?? "STRIPE",
      escrowStatus:
        normalized.escrowStatus ??
        this.computeEscrowStatus(
          normalized.totalFunded,
          normalized.totalReleased,
          normalized.agreedAmount,
        ),
      milestones,
      transactions,
    };
  }

  private async findContractById(
    contractId: string,
    currentUser: AuthUser,
  ): Promise<ContractDetail | undefined> {
    try {
      const contracts = await this.getContractRowsForUser(currentUser);
      const row = contracts.find((entry) => entry.id === contractId);
      if (row) {
        return this.buildContractDetailFromRow(row);
      }
    } catch {
      // Fall back to seed lookup below.
    }

    return this.getFallbackContractsForUser(currentUser).find(
      (contract) => contract.id === contractId,
    );
  }

  private async getMilestonesForContract(contractId: string): Promise<MilestoneRecord[]> {
    try {
      const rows = await this.databaseService.query<MilestoneRow>(
        `
          SELECT
            m.id::text AS id,
            m.contract_id::text AS "contractId",
            m.sequence_no AS "sequenceNo",
            m.title,
            COALESCE(m.description, '') AS description,
            COALESCE((m.amount_minor / 100)::int, 0) AS amount,
            m.currency,
            m.due_at::text AS "dueAt",
            m.status::text AS status,
            m.funded_at::text AS "fundedAt",
            m.submitted_at::text AS "submittedAt",
            m.approved_at::text AS "approvedAt",
            m.released_at::text AS "releasedAt",
            (
              SELECT md.note
              FROM marketplace.milestone_deliverables md
              WHERE md.milestone_id = m.id
              ORDER BY md.created_at DESC
              LIMIT 1
            ) AS "deliverableNote"
          FROM marketplace.milestones m
          WHERE m.contract_id = $1::uuid
          ORDER BY m.sequence_no ASC
        `,
        [contractId],
      );

      if (rows.length > 0) {
        return rows.map((row) => this.normalizeMilestoneRow(row));
      }
    } catch {
      // Fall back to seed data below.
    }

    return milestoneSeed
      .filter((milestone) => milestone.contractId === contractId)
      .sort((left, right) => left.sequenceNo - right.sequenceNo)
      .map((milestone) => ({ ...milestone }));
  }

  private async getTransactionsForContract(
    contractId: string,
  ): Promise<EscrowTransactionRecord[]> {
    try {
      const rows = await this.databaseService.query<EscrowTransactionRow>(
        `
          SELECT
            et.id::text AS id,
            ea.contract_id::text AS "contractId",
            et.milestone_id::text AS "milestoneId",
            et.direction::text AS direction,
            et.transaction_type::text AS "transactionType",
            COALESCE((et.amount_minor / 100)::int, 0) AS amount,
            et.currency,
            et.status::text AS status,
            et.provider_event_ref AS "providerEventRef",
            et.occurred_at::text AS "occurredAt"
          FROM marketplace.escrow_transactions et
          JOIN marketplace.escrow_accounts ea
            ON ea.id = et.escrow_account_id
          WHERE ea.contract_id = $1::uuid
          ORDER BY et.occurred_at DESC, et.created_at DESC
        `,
        [contractId],
      );

      if (rows.length > 0) {
        return rows.map((row) => this.normalizeEscrowTransactionRow(row));
      }
    } catch {
      // Fall back to seed data below.
    }

    return escrowTransactionSeed
      .filter((transaction) => transaction.contractId === contractId)
      .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt))
      .map((transaction) => ({ ...transaction }));
  }

  private async assertRecruiterAccessToJob(jobId: string, currentUser: AuthUser) {
    if (this.isPlatformAdmin(currentUser)) {
      return;
    }

    if (!this.canRecruit(currentUser)) {
      throw new ForbiddenException(
        "Recruiter, finance, brand-admin, or platform-admin access is required.",
      );
    }

    try {
      const rows = await this.databaseService.query<{ jobId: string }>(
        `
          SELECT j.id::text AS "jobId"
          FROM marketplace.jobs j
          JOIN marketplace.organization_memberships om
            ON om.organization_id = j.organization_id
          WHERE j.id = $1::uuid
            AND om.user_id = $2::uuid
          LIMIT 1
        `,
        [jobId, currentUser.id],
      );

      if (rows[0]?.jobId) {
        return;
      }
    } catch {
      // Fall back to in-memory checks below.
    }

    const job = await this.marketplaceDataService.findJobById(jobId);
    if (!job) {
      throw new NotFoundException(`Job '${jobId}' was not found.`);
    }

    const recruiterOrganizationIds = this.getFallbackRecruiterOrganizationIds(
      currentUser,
    );
    if (
      recruiterOrganizationIds.length > 0 &&
      !recruiterOrganizationIds.includes(this.getFallbackOrganizationId(job.brand))
    ) {
      throw new ForbiddenException(
        "You do not have recruiter access to this job.",
      );
    }
  }

  private async resolveProposalFreelancer(
    input: CreateProposalInput,
    currentUser: AuthUser,
  ) {
    if (this.isPlatformAdmin(currentUser)) {
      if (!input.freelancerUserId) {
        throw new BadRequestException(
          "Platform admin proposal creation requires freelancerUserId.",
        );
      }

      return {
        userId: input.freelancerUserId,
        displayName: await this.resolveUserDisplayName(input.freelancerUserId),
      };
    }

    if (!this.isFreelancer(currentUser)) {
      throw new ForbiddenException(
        "Only freelancers or platform admins can create proposals in localhost mode.",
      );
    }

    if (input.freelancerUserId && input.freelancerUserId !== currentUser.id) {
      throw new ForbiddenException(
        "Freelancers can only create proposals for themselves.",
      );
    }

    return {
      userId: currentUser.id,
      displayName: currentUser.displayName,
    };
  }

  private async resolveUserDisplayName(userId: string) {
    try {
      const rows = await this.databaseService.query<{ displayName: string }>(
        `
          SELECT display_name AS "displayName"
          FROM marketplace.users
          WHERE id = $1::uuid
          LIMIT 1
        `,
        [userId],
      );

      if (rows[0]?.displayName) {
        return rows[0].displayName;
      }
    } catch {
      // Fall back to local data below.
    }

    return (
      devPersonaSeed.find((persona) => persona.id === userId)?.displayName ??
      proposalSeed.find((proposal) => proposal.freelancerUserId === userId)?.freelancerName ??
      contractSeed.find((contract) => contract.freelancerUserId === userId)?.freelancerName ??
      `User ${userId.slice(0, 8)}`
    );
  }

  private async estimateProposalMatchScore(
    jobId: string,
    _freelancerUserId: string,
    freelancerName: string,
  ) {
    const job = await this.marketplaceDataService.findJobById(jobId);
    const portfolios = await this.marketplaceDataService.getPortfolios();
    const portfolio =
      portfolios.find(
        (entry) =>
          entry.creatorName.toLowerCase() === freelancerName.toLowerCase(),
      ) ?? null;

    if (!job) {
      return 0.5;
    }

    const requiredSkills = job.requiredSkills.map((skill) => skill.toLowerCase());
    const portfolioSkills = new Set(
      (portfolio?.skills ?? []).map((skill) => skill.toLowerCase()),
    );
    const skillOverlap =
      requiredSkills.length === 0
        ? 0.7
        : requiredSkills.filter((skill) => portfolioSkills.has(skill)).length /
          requiredSkills.length;

    const budgetMidpoint = (job.budgetMin + job.budgetMax) / 2;
    const talentMidpoint = portfolio
      ? (portfolio.hourlyRateMin + portfolio.hourlyRateMax) / 2
      : budgetMidpoint;
    const budgetDelta = Math.abs(talentMidpoint - budgetMidpoint) /
      Math.max(job.budgetMax, 1);
    const budgetScore = Math.max(0.2, 1 - budgetDelta);

    const locationScore =
      !portfolio || portfolio.location === job.location || job.location === "Remote"
        ? 1
        : 0.7;
    const verificationScore = !job.requiresVerifiedBadge || portfolio?.verified ? 1 : 0.35;
    const trustScore = portfolio?.trustScore ?? 0.75;

    const weightedScore =
      skillOverlap * 0.4 +
      budgetScore * 0.15 +
      locationScore * 0.1 +
      verificationScore * 0.15 +
      trustScore * 0.2;

    return Number(weightedScore.toFixed(4));
  }

  private normalizeProposalRow(row: ProposalRow): ProposalDetail {
    return {
      id: row.id,
      jobId: row.jobId,
      jobTitle: row.jobTitle,
      brand: row.brand,
      freelancerUserId: row.freelancerUserId,
      freelancerName: row.freelancerName,
      status: row.status,
      coverLetter: row.coverLetter,
      quoteAmountMin: row.quoteAmountMin,
      quoteAmountMax: row.quoteAmountMax,
      estimatedDurationDays: row.estimatedDurationDays,
      matchScore: Number((row.matchScore ?? 0).toFixed(4)),
      submittedAt: row.submittedAt,
    };
  }

  private normalizeContractRow(row: ContractRow): ContractRow {
    return {
      id: row.id,
      jobId: row.jobId,
      proposalId: row.proposalId,
      jobTitle: row.jobTitle,
      organizationId: row.organizationId,
      organizationName: row.organizationName,
      freelancerUserId: row.freelancerUserId,
      freelancerName: row.freelancerName,
      status: row.status,
      currency: row.currency,
      agreedAmount: row.agreedAmount,
      commissionBps: row.commissionBps,
      escrowProvider: row.escrowProvider,
      escrowStatus: row.escrowStatus,
      totalFunded: row.totalFunded,
      totalReleased: row.totalReleased,
    };
  }

  private normalizeMilestoneRow(row: MilestoneRow): MilestoneRecord {
    return {
      id: row.id,
      contractId: row.contractId,
      sequenceNo: row.sequenceNo,
      title: row.title,
      description: row.description,
      amount: row.amount,
      currency: row.currency,
      dueAt: row.dueAt ?? null,
      status: row.status,
      fundedAt: row.fundedAt ?? null,
      submittedAt: row.submittedAt ?? null,
      approvedAt: row.approvedAt ?? null,
      releasedAt: row.releasedAt ?? null,
      deliverableNote: row.deliverableNote ?? null,
    };
  }

  private normalizeEscrowTransactionRow(
    row: EscrowTransactionRow,
  ): EscrowTransactionRecord {
    return {
      id: row.id,
      contractId: row.contractId,
      milestoneId: row.milestoneId ?? null,
      direction: row.direction,
      transactionType: row.transactionType,
      amount: row.amount,
      currency: row.currency,
      status: row.status,
      providerEventRef: row.providerEventRef ?? null,
      occurredAt: row.occurredAt,
    };
  }

  private buildFallbackContractDetail(contract: ContractRecord): ContractDetail {
    const milestones = milestoneSeed
      .filter((milestone) => milestone.contractId === contract.id)
      .sort((left, right) => left.sequenceNo - right.sequenceNo)
      .map((milestone) => ({ ...milestone }));
    const transactions = escrowTransactionSeed
      .filter((transaction) => transaction.contractId === contract.id)
      .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt))
      .map((transaction) => ({ ...transaction }));

    contract.milestones = milestones;
    contract.escrowStatus = this.computeEscrowStatus(
      contract.totalFunded,
      contract.totalReleased,
      contract.agreedAmount,
    );

    return {
      ...contract,
      milestones,
      transactions,
    };
  }

  private getFallbackContractsForUser(currentUser: AuthUser): ContractDetail[] {
    if (this.isPlatformAdmin(currentUser)) {
      return contractSeed.map((contract) => this.buildFallbackContractDetail(contract));
    }

    if (this.canRecruit(currentUser)) {
      const recruiterOrganizationIds = this.getFallbackRecruiterOrganizationIds(
        currentUser,
      );

      return contractSeed
        .filter(
          (contract) =>
            recruiterOrganizationIds.length === 0 ||
            recruiterOrganizationIds.includes(contract.organizationId),
        )
        .map((contract) => this.buildFallbackContractDetail(contract));
    }

    return contractSeed
      .filter((contract) => contract.freelancerUserId === currentUser.id)
      .map((contract) => this.buildFallbackContractDetail(contract));
  }

  private computeEscrowStatus(
    totalFunded: number,
    totalReleased: number,
    agreedAmount: number,
  ): EscrowStatus {
    if (agreedAmount > 0 && totalReleased >= agreedAmount) {
      return "RELEASED";
    }

    if (totalReleased > 0) {
      return totalFunded > totalReleased ? "RELEASING" : "RELEASED";
    }

    if (agreedAmount > 0 && totalFunded >= agreedAmount) {
      return "FUNDED";
    }

    if (totalFunded > 0) {
      return "PARTIALLY_FUNDED";
    }

    return "PENDING";
  }

  private getFallbackOrganizationId(brand: string) {
    const normalized = brand.trim().toLowerCase();
    if (normalized === "northstar d2c") {
      return "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
    }

    if (normalized === "prooflane labs") {
      return "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
    }

    return `local-org-${normalized.replace(/[^a-z0-9]+/g, "-")}`;
  }

  private getFallbackRecruiterOrganizationIds(currentUser: AuthUser) {
    if (this.isPlatformAdmin(currentUser)) {
      return [...new Set(contractSeed.map((contract) => contract.organizationId))];
    }

    if (currentUser.id === "44444444-4444-4444-4444-444444444444") {
      return [
        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      ];
    }

    return [...new Set(contractSeed.map((contract) => contract.organizationId))];
  }

  private isPlatformAdmin(currentUser: AuthUser) {
    return currentUser.roles.includes("PLATFORM_ADMIN");
  }

  private isFreelancer(currentUser: AuthUser) {
    return currentUser.roles.includes("FREELANCER");
  }

  private canRecruit(currentUser: AuthUser) {
    return currentUser.roles.some((role) =>
      ["RECRUITER", "BRAND_ADMIN", "FINANCE", "PLATFORM_ADMIN"].includes(role),
    );
  }
}
