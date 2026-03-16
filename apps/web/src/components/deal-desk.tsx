"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import {
  approveMilestone,
  createContract,
  createProposal,
  fallbackContracts,
  fallbackEngagementOverview,
  fallbackJobs,
  fallbackProposals,
  fetchContracts,
  fetchEngagementOverview,
  fetchJobProposals,
  fetchJobs,
  fetchMyProposals,
  fundMilestone,
  shortlistProposal,
  submitMilestone,
  type AuthSession,
  type Contract,
  type EngagementOverview,
  type Job,
  type Proposal,
} from "../lib/api";
import { DEV_SESSION_EVENT_NAME, readStoredSession } from "../lib/dev-session";

function formatMoney(value: number) {
  return `Rs ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value)}`;
}

function formatDate(value: string | null) {
  if (!value) {
    return "TBD";
  }

  return new Date(value).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function buildMilestones(proposal: Proposal) {
  const total = proposal.quoteAmountMax;
  const first = Math.round(total * 0.3);
  const second = Math.round(total * 0.4);
  const third = total - first - second;

  return [
    {
      title: "Kickoff and proof plan",
      description: `Scope lock and execution plan for ${proposal.jobTitle}.`,
      amount: first,
    },
    {
      title: "Primary delivery",
      description: "Main delivery tranche for the awarded scope.",
      amount: second,
    },
    {
      title: "QA and release handoff",
      description: "Final polish, revisions, and release handoff.",
      amount: third,
    },
  ];
}

export function DealDesk() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [overview, setOverview] = useState<EngagementOverview>(fallbackEngagementOverview);
  const [jobs, setJobs] = useState<Job[]>(fallbackJobs);
  const [proposals, setProposals] = useState<Proposal[]>(fallbackProposals);
  const [contracts, setContracts] = useState<Contract[]>(fallbackContracts);
  const [selectedJobId, setSelectedJobId] = useState(fallbackJobs[0]?.id ?? "");
  const [noteByMilestone, setNoteByMilestone] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [proposalDraft, setProposalDraft] = useState({
    jobId: fallbackJobs[0]?.id ?? "",
    coverLetter:
      "I can deliver this scope with a proof-led workflow and clear milestone ownership.",
    quoteAmountMin: "2500",
    quoteAmountMax: "4200",
    estimatedDurationDays: "14",
  });
  const [isPending, startTransition] = useTransition();

  const isRecruiter = useMemo(
    () =>
      session?.user.roles.some((role) =>
        ["RECRUITER", "BRAND_ADMIN", "FINANCE", "PLATFORM_ADMIN"].includes(role),
      ) ?? false,
    [session],
  );
  const isFreelancer = useMemo(
    () => session?.user.roles.includes("FREELANCER") ?? false,
    [session],
  );

  async function refresh(activeSession: AuthSession) {
    const [overviewResult, jobsResult, contractsResult, proposalsResult] =
      await Promise.allSettled([
        fetchEngagementOverview(activeSession.accessToken),
        fetchJobs(),
        fetchContracts(activeSession.accessToken),
        isRecruiter
          ? fetchJobProposals(selectedJobId || fallbackJobs[0].id, activeSession.accessToken)
          : fetchMyProposals(activeSession.accessToken),
      ]);

    setOverview(
      overviewResult.status === "fulfilled"
        ? overviewResult.value
        : fallbackEngagementOverview,
    );
    setJobs(jobsResult.status === "fulfilled" ? jobsResult.value : fallbackJobs);
    setContracts(
      contractsResult.status === "fulfilled" ? contractsResult.value : fallbackContracts,
    );
    setProposals(
      proposalsResult.status === "fulfilled" ? proposalsResult.value : fallbackProposals,
    );
    setWarning(
      [overviewResult, jobsResult, contractsResult, proposalsResult].some(
        (result) => result.status === "rejected",
      )
        ? "Some deal-desk panels are using fallback localhost data."
        : null,
    );
  }

  useEffect(() => {
    const syncSession = () => {
      setSession(readStoredSession());
    };

    syncSession();
    window.addEventListener(DEV_SESSION_EVENT_NAME, syncSession);
    return () => {
      window.removeEventListener(DEV_SESSION_EVENT_NAME, syncSession);
    };
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    void refresh(session);
  }, [session, isRecruiter, selectedJobId]);

  async function runAction(work: () => Promise<void>) {
    if (!session) {
      return;
    }

    setStatus(null);
    startTransition(() => {
      void (async () => {
        try {
          await work();
          await refresh(session);
        } catch (error) {
          setStatus(error instanceof Error ? error.message : "Action failed.");
        }
      })();
    });
  }

  if (!session) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-panel">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Deal Desk
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-ink">
          Login to operate proposals, contracts, milestones, and escrow
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Use the header dev-session switcher first. The deal desk is wired to the authenticated engagements API and adapts to freelancer or recruiter roles.
        </p>
      </section>
    );
  }

  const existingContractProposalIds = new Set(contracts.map((contract) => contract.proposalId));

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-5">
        <article className="rounded-3xl bg-slate-950 p-5 text-white">
          <div className="text-xs uppercase tracking-[0.18em] text-white/60">Proposals</div>
          <div className="mt-3 text-3xl font-bold">{overview.proposalCount}</div>
        </article>
        <article className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Active contracts</div>
          <div className="mt-3 text-3xl font-bold text-ink">{overview.activeContractCount}</div>
        </article>
        <article className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Funded milestones</div>
          <div className="mt-3 text-3xl font-bold text-ink">{overview.fundedMilestoneCount}</div>
        </article>
        <article className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Pending release</div>
          <div className="mt-3 text-3xl font-bold text-ink">{formatMoney(overview.pendingReleaseAmount)}</div>
        </article>
        <article className="rounded-3xl bg-tide p-5 text-white">
          <div className="text-xs uppercase tracking-[0.18em] text-white/70">Released</div>
          <div className="mt-3 text-3xl font-bold">{formatMoney(overview.totalReleasedAmount)}</div>
        </article>
      </section>

      {warning ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {warning}
        </div>
      ) : null}

      {status ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {status}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {isRecruiter ? "Proposal pipeline" : "Submit proposal"}
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-ink">
                {isRecruiter ? "Review and award talent fast" : "Create proof-led proposals"}
              </h2>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {session.user.displayName}
            </div>
          </div>

          {isFreelancer ? (
            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void runAction(async () => {
                  await createProposal(
                    {
                      jobId: proposalDraft.jobId,
                      coverLetter: proposalDraft.coverLetter,
                      quoteAmountMin: Number(proposalDraft.quoteAmountMin),
                      quoteAmountMax: Number(proposalDraft.quoteAmountMax),
                      estimatedDurationDays: Number(proposalDraft.estimatedDurationDays),
                    },
                    session.accessToken,
                  );
                  setStatus("Proposal submitted.");
                });
              }}
            >
              <select
                value={proposalDraft.jobId}
                onChange={(event) =>
                  setProposalDraft((current) => ({ ...current, jobId: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
              >
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.brand}: {job.title}
                  </option>
                ))}
              </select>
              <textarea
                rows={5}
                value={proposalDraft.coverLetter}
                onChange={(event) =>
                  setProposalDraft((current) => ({
                    ...current,
                    coverLetter: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
              />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["quoteAmountMin", "Quote min"],
                  ["quoteAmountMax", "Quote max"],
                  ["estimatedDurationDays", "Days"],
                ].map(([field, label]) => (
                  <input
                    key={field}
                    value={proposalDraft[field as keyof typeof proposalDraft]}
                    onChange={(event) =>
                      setProposalDraft((current) => ({
                        ...current,
                        [field]: event.target.value,
                      }))
                    }
                    placeholder={label}
                    className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
              >
                {isPending ? "Submitting..." : "Submit proposal"}
              </button>
            </form>
          ) : (
            <div className="mt-5 space-y-4">
              <select
                value={selectedJobId}
                onChange={(event) => setSelectedJobId(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
              >
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.brand}: {job.title}
                  </option>
                ))}
              </select>
              <div className="space-y-3">
                {proposals
                  .filter((proposal) => proposal.jobId === selectedJobId)
                  .map((proposal) => (
                    <div
                      key={proposal.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="text-sm font-semibold text-ink">{proposal.freelancerName}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                            {proposal.status} • score {proposal.matchScore.toFixed(2)}
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {proposal.coverLetter}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                          {formatMoney(proposal.quoteAmountMin)} to {formatMoney(proposal.quoteAmountMax)}
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {proposal.status === "SUBMITTED" ? (
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() =>
                              void runAction(async () => {
                                await shortlistProposal(proposal.id, session.accessToken);
                                setStatus(`Shortlisted ${proposal.freelancerName}.`);
                              })
                            }
                            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                          >
                            Shortlist
                          </button>
                        ) : null}
                        {!existingContractProposalIds.has(proposal.id) ? (
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() =>
                              void runAction(async () => {
                                await createContract(
                                  {
                                    proposalId: proposal.id,
                                    agreedAmount: proposal.quoteAmountMax,
                                    provider: "STRIPE",
                                    milestones: buildMilestones(proposal),
                                  },
                                  session.accessToken,
                                );
                                setStatus(`Created contract for ${proposal.freelancerName}.`);
                              })
                            }
                            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                          >
                            Award contract
                          </button>
                        ) : (
                          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Contract active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contracts and milestones
          </div>
          <div className="mt-5 space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {contract.organizationName}
                    </div>
                    <h3 className="mt-1 text-xl font-semibold text-ink">{contract.jobTitle}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Freelancer: {contract.freelancerName} • {contract.status} • {contract.escrowStatus}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                    {formatMoney(contract.totalReleased)} released / {formatMoney(contract.agreedAmount)}
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {contract.milestones.map((milestone) => (
                    <div key={milestone.id} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="font-semibold text-ink">
                            {milestone.sequenceNo}. {milestone.title}
                          </div>
                          <div className="mt-1 text-sm text-slate-600">
                            {milestone.description}
                          </div>
                          <div className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                            {milestone.status} • due {formatDate(milestone.dueAt)}
                          </div>
                        </div>
                        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                          {formatMoney(milestone.amount)}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {isRecruiter && milestone.status === "PENDING_FUNDING" ? (
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() =>
                              void runAction(async () => {
                                await fundMilestone(
                                  contract.id,
                                  milestone.id,
                                  { provider: contract.escrowProvider, amount: milestone.amount },
                                  session.accessToken,
                                );
                                setStatus(`Funded milestone ${milestone.sequenceNo}.`);
                              })
                            }
                            className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                          >
                            Fund escrow
                          </button>
                        ) : null}
                        {isFreelancer && milestone.status === "FUNDED" ? (
                          <>
                            <input
                              value={noteByMilestone[milestone.id] ?? ""}
                              onChange={(event) =>
                                setNoteByMilestone((current) => ({
                                  ...current,
                                  [milestone.id]: event.target.value,
                                }))
                              }
                              placeholder="Delivery note"
                              className="min-w-[240px] flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-ember"
                            />
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() =>
                                void runAction(async () => {
                                  await submitMilestone(
                                    contract.id,
                                    milestone.id,
                                    noteByMilestone[milestone.id] || "Localhost delivery submitted.",
                                    session.accessToken,
                                  );
                                  setStatus(`Submitted milestone ${milestone.sequenceNo}.`);
                                })
                              }
                              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                            >
                              Submit delivery
                            </button>
                          </>
                        ) : null}
                        {isRecruiter && milestone.status === "SUBMITTED" ? (
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() =>
                              void runAction(async () => {
                                await approveMilestone(contract.id, milestone.id, session.accessToken);
                                setStatus(`Released milestone ${milestone.sequenceNo}.`);
                              })
                            }
                            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                          >
                            Approve and release
                          </button>
                        ) : null}
                        {milestone.deliverableNote ? (
                          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            {milestone.deliverableNote}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
