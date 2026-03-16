"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  fallbackJobs,
  fallbackMatchResponse,
  fallbackPortfolios,
  fallbackSummary,
  fetchJobs,
  fetchMatchesForJob,
  fetchPlatformSummary,
  fetchPortfolios,
  type Job,
  type MatchResponse,
  type PlatformSummary,
  type Portfolio,
} from "../lib/api";
import { SiteHeader } from "./site-header";

type DashboardState = {
  summary: PlatformSummary;
  jobs: Job[];
  portfolios: Portfolio[];
  matches: MatchResponse;
  warning: string | null;
  status: "loading" | "ready";
};

const initialState: DashboardState = {
  summary: fallbackSummary,
  jobs: fallbackJobs,
  portfolios: fallbackPortfolios,
  matches: fallbackMatchResponse,
  warning: null,
  status: "loading",
};

function formatMoney(value: number) {
  return `Rs ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value)}`;
}

function availabilityTone(availability: Portfolio["availability"]) {
  if (availability === "OPEN") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (availability === "LIMITED") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-200 text-slate-600";
}

export function DashboardShell() {
  const [state, setState] = useState<DashboardState>(initialState);

  useEffect(() => {
    let active = true;

    async function load() {
      const [summaryResult, jobsResult, portfoliosResult, matchesResult] =
        await Promise.allSettled([
          fetchPlatformSummary(),
          fetchJobs(),
          fetchPortfolios(),
          fetchMatchesForJob("job-2"),
        ]);

      if (!active) {
        return;
      }

      const warning = [summaryResult, jobsResult, portfoliosResult, matchesResult].some(
        (result) => result.status === "rejected",
      )
        ? "API is partially unavailable. Fallback data is being shown for some panels."
        : null;

      setState({
        summary:
          summaryResult.status === "fulfilled"
            ? summaryResult.value
            : fallbackSummary,
        jobs: jobsResult.status === "fulfilled" ? jobsResult.value : fallbackJobs,
        portfolios:
          portfoliosResult.status === "fulfilled"
            ? portfoliosResult.value
            : fallbackPortfolios,
        matches:
          matchesResult.status === "fulfilled"
            ? matchesResult.value
            : fallbackMatchResponse,
        warning,
        status: "ready",
      });
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  const topMatch = state.matches.candidates[0];

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-8">
      <SiteHeader />

      <section className="mt-8 rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-panel backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Product dashboard
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-ink">
              Localhost control room for the marketplace MVP
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              This UI is wired for local development. It surfaces platform metrics, live seed-backed data from the API, and the current matching output.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/matching-studio"
              className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Open matching studio
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Overview
            </Link>
          </div>
        </div>

        {state.warning ? (
          <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {state.warning}
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <div className="text-sm text-white/60">Talent profiles</div>
            <div className="mt-3 text-4xl font-bold">
              {state.summary.metrics.talentProfiles}
            </div>
            <div className="mt-2 text-sm text-white/70">
              Profile-first discovery index
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
            <div className="text-sm text-slate-500">Open jobs</div>
            <div className="mt-3 text-4xl font-bold text-ink">
              {state.summary.metrics.openJobs}
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Recruiter demand currently visible
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
            <div className="text-sm text-slate-500">Verified talent</div>
            <div className="mt-3 text-4xl font-bold text-ink">
              {state.summary.metrics.verifiedTalent}
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Badge-eligible creators and builders
            </div>
          </div>
          <div className="rounded-3xl bg-tide p-6 text-white">
            <div className="text-sm text-white/70">Average trust score</div>
            <div className="mt-3 text-4xl font-bold">
              {state.summary.metrics.averageTrustScore.toFixed(2)}
            </div>
            <div className="mt-2 text-sm text-white/80">
              Composite trust from delivery and verification
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Live jobs
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Current project briefs surfaced by the API.
                </p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {state.status}
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {state.jobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {job.brand}
                      </div>
                      <h2 className="mt-1 text-xl font-semibold text-ink">{job.title}</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        {job.description}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
                      {formatMoney(job.budgetMin)} to {formatMoney(job.budgetMax)}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl bg-ink p-6 text-white">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                AI shortlist
              </div>
              {topMatch ? (
                <>
                  <h2 className="mt-3 text-3xl font-bold">{topMatch.creatorName}</h2>
                  <p className="mt-1 text-white/75">{topMatch.title}</p>
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-xs uppercase tracking-[0.15em] text-white/60">
                        Score
                      </div>
                      <div className="mt-2 text-3xl font-bold">
                        {topMatch.score.toFixed(2)}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-xs uppercase tracking-[0.15em] text-white/60">
                        Model
                      </div>
                      <div className="mt-2 text-lg font-semibold">
                        {state.matches.summary.model}
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-white/80">
                    {topMatch.explanation ??
                      "Current shortlist uses the local matching heuristic."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(topMatch.matchedSkills ?? topMatch.skills).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Core modules
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {state.summary.modules.map((module) => (
                  <span
                    key={module}
                    className="rounded-full border border-ember/20 bg-ember/10 px-4 py-2 text-sm font-semibold text-ember"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Talent proof feed
          </div>
          <p className="mt-1 text-sm text-slate-600">
            Portfolio-first talent cards currently served by the API.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {state.portfolios.map((portfolio) => (
              <article
                key={portfolio.id}
                className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {portfolio.category}
                    </div>
                    <h2 className="mt-1 text-xl font-semibold text-ink">
                      {portfolio.creatorName}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">{portfolio.title}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${availabilityTone(
                      portfolio.availability,
                    )}`}
                  >
                    {portfolio.availability.toLowerCase()}
                  </span>
                </div>

                <div className="mt-4 text-sm text-slate-600">
                  {formatMoney(portfolio.hourlyRateMin)} to{" "}
                  {formatMoney(portfolio.hourlyRateMax)} / hr
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  Trust score {portfolio.trustScore.toFixed(2)} in {portfolio.location}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {portfolio.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {portfolio.proof.map((proof) => (
                    <div
                      key={proof}
                      className="rounded-2xl bg-white px-3 py-3 ring-1 ring-slate-200"
                    >
                      {proof}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
