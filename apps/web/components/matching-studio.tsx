"use client";

import { startTransition, useEffect, useState } from "react";

import {
  fallbackJobs,
  fallbackMatchResponse,
  previewMatches,
  type Job,
  type MatchPreviewInput,
  type MatchResponse,
} from "../lib/api";

type CandidateResult = {
  freelancerId: string;
  creatorName: string;
  title: string;
  score: number;
  explanation?: string;
  matchedSkills?: string[];
  skills: string[];
  llmPercentage?: number;
  llmExplanation?: string;
};

type FormState = {
  title: string;
  description: string;
  location: string;
  budgetMin: string;
  budgetMax: string;
  requiredSkills: string;
  proofSignals: string;
  requiresVerifiedBadge: boolean;
};

function toFormState(job: Job): FormState {
  return {
    title: job.title,
    description: job.description,
    location: job.location,
    budgetMin: String(job.budgetMin),
    budgetMax: String(job.budgetMax),
    requiredSkills: job.requiredSkills.join(", "),
    proofSignals: job.proofSignals.join(", "),
    requiresVerifiedBadge: job.requiresVerifiedBadge,
  };
}

function toPayload(form: FormState): MatchPreviewInput {
  return {
    title: form.title,
    description: form.description,
    location: form.location,
    budgetMin: Number(form.budgetMin),
    budgetMax: Number(form.budgetMax),
    requiredSkills: form.requiredSkills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    proofSignals: form.proofSignals
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    requiresVerifiedBadge: form.requiresVerifiedBadge,
    limit: 5,
  };
}

export function MatchingStudio({
  jobs = fallbackJobs,
  initialMatches = fallbackMatchResponse,
}: {
  jobs?: Job[];
  initialMatches?: MatchResponse;
}) {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id ?? fallbackJobs[0].id);
  const [form, setForm] = useState<FormState>(toFormState(jobs[0] ?? fallbackJobs[0]));
  const [results, setResults] = useState<MatchResponse & { candidates: CandidateResult[] }>(initialMatches as any);
  const [status, setStatus] = useState<"idle" | "running">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const activeJob =
      jobs.find((job) => job.id === selectedJobId) ?? jobs[0] ?? fallbackJobs[0];
    setForm(toFormState(activeJob));
  }, [jobs, selectedJobId]);

  function runPreview(nextForm: FormState) {
    setStatus("running");
    setError(null);

    startTransition(() => {
      void (async () => {
        try {
          const response = await previewMatches(toPayload(nextForm));
          setResults(response);
        } catch {
          setResults(fallbackMatchResponse);
          setError("Could not reach the API. Showing fallback preview output.");
        } finally {
          setStatus("idle");
        }
      })();
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Matching studio
        </div>
        <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-ink">
          Run recruiter-side match previews on localhost
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This form posts a job-like brief to the NestJS API. If the FastAPI service is running, the API will delegate reranking to it.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {jobs.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => setSelectedJobId(job.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                selectedJobId === job.id
                  ? "bg-ink text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {job.brand}
            </button>
          ))}
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            runPreview(form);
          }}
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Job title
            </label>
            <input
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              rows={5}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({ ...current, location: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Budget min
              </label>
              <input
                value={form.budgetMin}
                onChange={(event) =>
                  setForm((current) => ({ ...current, budgetMin: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Budget max
              </label>
              <input
                value={form.budgetMax}
                onChange={(event) =>
                  setForm((current) => ({ ...current, budgetMax: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Required skills
            </label>
            <input
              value={form.requiredSkills}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  requiredSkills: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Proof signals
            </label>
            <input
              value={form.proofSignals}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  proofSignals: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-ember"
            />
          </div>

          <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.requiresVerifiedBadge}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  requiresVerifiedBadge: event.target.checked,
                }))
              }
            />
            Require verified badge
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              {status === "running" ? "Running preview..." : "Run preview"}
            </button>
            {error ? (
              <span className="text-sm font-medium text-amber-700">{error}</span>
            ) : (
              <span className="text-sm text-slate-500">
                API model: {results.summary.model}
              </span>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-3xl bg-ink p-6 text-white shadow-panel">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
          Preview shortlist
        </div>
        <div className="mt-2 text-sm text-white/70">
          {results.summary.shortlisted} candidates ranked for {results.summary.title}
        </div>

        <div className="mt-6 space-y-4">
          {results.candidates.map((candidate, index) => (
            <article key={candidate.freelancerId} className="rounded-3xl bg-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Rank {index + 1}
                  </div>
                  <h2 className="mt-1 text-2xl font-bold">{candidate.creatorName}</h2>
                  <p className="mt-1 text-sm text-white/75">{candidate.title}</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                    {candidate.llmPercentage !== undefined ? "LLM Match" : "Score"}
                  </div>
                  <div className="mt-1 text-3xl font-bold text-amber-500">
                    {candidate.llmPercentage !== undefined
                      ? `${candidate.llmPercentage}%`
                      : candidate.score.toFixed(2)}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/80">
                {candidate.llmExplanation ?? candidate.explanation ?? "Heuristic preview without model explanation."}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(candidate.matchedSkills ?? candidate.skills).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
