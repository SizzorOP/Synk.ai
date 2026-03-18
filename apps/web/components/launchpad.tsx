"use client";

import { startTransition, useEffect, useState } from "react";

import type { AuthSession, RoleCode } from "../lib/api";
import { createJob, createPortfolio } from "../lib/api";
import { DEV_SESSION_EVENT_NAME, readStoredSession } from "../lib/dev-session";

type JobFormState = {
  title: string;
  brand: string;
  description: string;
  location: string;
  budgetMin: string;
  budgetMax: string;
  requiredSkills: string;
  proofSignals: string;
  requiresVerifiedBadge: boolean;
  customQuestions: string;
};

type PortfolioFormState = {
  creatorName: string;
  email: string;
  title: string;
  category: string;
  location: string;
  hourlyRateMin: string;
  hourlyRateMax: string;
  skills: string;
  proof: string;
  verified: boolean;
  availability: "OPEN" | "LIMITED" | "UNAVAILABLE";
};

const initialJobForm: JobFormState = {
  title: "Design a conversion-focused launch campaign",
  brand: "Northstar D2C",
  description:
    "Need a freelancer who can ship visual assets, launch messaging, and short-form creative proof.",
  location: "India",
  budgetMin: "2000",
  budgetMax: "5000",
  requiredSkills: "branding, reels, analytics",
  proofSignals: "brand launches, campaign performance, creator portfolio",
  requiresVerifiedBadge: false,
  customQuestions: "What is your biggest win?, Do you have timezone overlap with PST?",
};

const initialPortfolioForm: PortfolioFormState = {
  creatorName: "Neha Kapoor",
  email: "neha@example.com",
  title: "Lifecycle Marketing Strategist",
  category: "Growth Marketing",
  location: "India",
  hourlyRateMin: "2200",
  hourlyRateMax: "4200",
  skills: "crm, lifecycle, analytics, copywriting",
  proof: "Scaled retention revenue by 28%, Built lifecycle journeys across three brands",
  verified: true,
  availability: "OPEN",
};

function splitCsv(input: string) {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function hasAnyRole(session: AuthSession | null, roles: RoleCode[]) {
  return roles.some((role) => session?.user.roles.includes(role));
}

export function Launchpad() {
  const [jobForm, setJobForm] = useState<JobFormState>(initialJobForm);
  const [portfolioForm, setPortfolioForm] =
    useState<PortfolioFormState>(initialPortfolioForm);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [jobStatus, setJobStatus] = useState("idle");
  const [portfolioStatus, setPortfolioStatus] = useState("idle");
  const [jobMessage, setJobMessage] = useState<string | null>(null);
  const [portfolioMessage, setPortfolioMessage] = useState<string | null>(null);

  const canCreateJobs = hasAnyRole(session, [
    "RECRUITER",
    "BRAND_ADMIN",
    "PLATFORM_ADMIN",
  ]);
  const canCreatePortfolios = hasAnyRole(session, [
    "FREELANCER",
    "PLATFORM_ADMIN",
  ]);
  const isPlatformAdmin = session?.user.roles.includes("PLATFORM_ADMIN") ?? false;

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
    if (!session || isPlatformAdmin || !session.user.roles.includes("FREELANCER")) {
      return;
    }

    setPortfolioForm((current) => ({
      ...current,
      creatorName: session.user.displayName,
      email: session.user.email,
      verified: false,
    }));
  }, [isPlatformAdmin, session]);

  function submitJob() {
    if (!canCreateJobs) {
      setJobStatus("error");
      setJobMessage("Login as a recruiter or platform admin to create jobs.");
      return;
    }

    setJobStatus("submitting");
    setJobMessage(null);

    startTransition(() => {
      void (async () => {
        try {
          const created = await createJob({
            title: jobForm.title,
            brand: jobForm.brand,
            description: jobForm.description,
            location: jobForm.location,
            budgetMin: Number(jobForm.budgetMin),
            budgetMax: Number(jobForm.budgetMax),
            requiredSkills: splitCsv(jobForm.requiredSkills),
            proofSignals: splitCsv(jobForm.proofSignals),
            requiresVerifiedBadge: jobForm.requiresVerifiedBadge,
            customQuestions: splitCsv(jobForm.customQuestions).map(q => ({ question: q, required: true })),
          }, session?.accessToken);
          setJobMessage(`Created job ${created.slug}. Refresh the dashboard to see it.`);
          setJobStatus("success");
        } catch (error) {
          setJobMessage(
            error instanceof Error
              ? error.message
              : "Job creation failed. Check that the API is running.",
          );
          setJobStatus("error");
        }
      })();
    });
  }

  function submitPortfolio() {
    if (!canCreatePortfolios) {
      setPortfolioStatus("error");
      setPortfolioMessage(
        "Login as a freelancer or platform admin to create portfolios.",
      );
      return;
    }

    setPortfolioStatus("submitting");
    setPortfolioMessage(null);

    startTransition(() => {
      void (async () => {
        try {
          const created = await createPortfolio({
            creatorName: portfolioForm.creatorName,
            email: portfolioForm.email,
            title: portfolioForm.title,
            category: portfolioForm.category,
            location: portfolioForm.location,
            hourlyRateMin: Number(portfolioForm.hourlyRateMin),
            hourlyRateMax: Number(portfolioForm.hourlyRateMax),
            skills: splitCsv(portfolioForm.skills),
            proof: splitCsv(portfolioForm.proof),
            verified: portfolioForm.verified,
            availability: portfolioForm.availability,
          }, session?.accessToken);
          setPortfolioMessage(
            `Created portfolio ${created.slug}. Refresh the dashboard to see it.`,
          );
          setPortfolioStatus("success");
        } catch (error) {
          setPortfolioMessage(
            error instanceof Error
              ? error.message
              : "Portfolio creation failed. Check that the API is running.",
          );
          setPortfolioStatus("error");
        }
      })();
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel xl:col-span-2">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Protected localhost workflows
        </div>
        <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-ink">
          Launchpad now uses role-based API access
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use the header dev-session switcher before submitting. Recruiter or admin personas can create jobs. Freelancer or admin personas can create portfolios.
        </p>
        <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {session
            ? `Active persona: ${session.user.displayName} (${session.user.roles.join(", ")}).`
            : "No active persona. Protected POST endpoints will return 401 or 403 until you log in."}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Recruiter launchpad
        </div>
        <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-ink">
          Create a new job brief
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This form posts directly to `POST /api/v1/jobs` and adds a new brief into the current API data layer. Access is restricted to recruiter-side roles.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            submitJob();
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Job title
              </label>
              <input
                value={jobForm.title}
                onChange={(event) =>
                  setJobForm((current) => ({ ...current, title: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Brand
              </label>
              <input
                value={jobForm.brand}
                onChange={(event) =>
                  setJobForm((current) => ({ ...current, brand: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              rows={5}
              value={jobForm.description}
              onChange={(event) =>
                setJobForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                value={jobForm.location}
                onChange={(event) =>
                  setJobForm((current) => ({ ...current, location: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Budget min
              </label>
              <input
                value={jobForm.budgetMin}
                onChange={(event) =>
                  setJobForm((current) => ({ ...current, budgetMin: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Budget max
              </label>
              <input
                value={jobForm.budgetMax}
                onChange={(event) =>
                  setJobForm((current) => ({ ...current, budgetMax: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Required skills
            </label>
            <input
              value={jobForm.requiredSkills}
              onChange={(event) =>
                setJobForm((current) => ({
                  ...current,
                  requiredSkills: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Proof signals
            </label>
            <input
              value={jobForm.proofSignals}
              onChange={(event) =>
                setJobForm((current) => ({
                  ...current,
                  proofSignals: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            />
          </div>

          <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={jobForm.requiresVerifiedBadge}
              onChange={(event) =>
                setJobForm((current) => ({
                  ...current,
                  requiresVerifiedBadge: event.target.checked,
                }))
              }
            />
            Require verified badge
          </label>

          <button
            type="submit"
            disabled={jobStatus === "submitting" || !canCreateJobs}
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {jobStatus === "submitting" ? "Creating job..." : "Create job"}
          </button>

          {jobMessage ? (
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              {jobMessage}
            </div>
          ) : null}
        </form>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Talent launchpad
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-ink">
          Create a new portfolio entry
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This form posts directly to `POST /api/v1/portfolios` and adds a new freelancer profile into the current API data layer. Access is restricted to talent-side roles.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            submitPortfolio();
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Creator name
              </label>
              <input
                value={portfolioForm.creatorName}
                onChange={(event) =>
                  setPortfolioForm((current) => ({
                    ...current,
                    creatorName: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                value={portfolioForm.email}
                onChange={(event) =>
                  setPortfolioForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Headline
              </label>
              <input
                value={portfolioForm.title}
                onChange={(event) =>
                  setPortfolioForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>
              <input
                value={portfolioForm.category}
                onChange={(event) =>
                  setPortfolioForm((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                value={portfolioForm.location}
                onChange={(event) =>
                  setPortfolioForm((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hourly min
              </label>
              <input
                value={portfolioForm.hourlyRateMin}
                onChange={(event) =>
                  setPortfolioForm((current) => ({
                    ...current,
                    hourlyRateMin: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hourly max
              </label>
              <input
                value={portfolioForm.hourlyRateMax}
                onChange={(event) =>
                  setPortfolioForm((current) => ({
                    ...current,
                    hourlyRateMax: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Skills
            </label>
            <input
              value={portfolioForm.skills}
              onChange={(event) =>
                setPortfolioForm((current) => ({
                  ...current,
                  skills: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Proof
            </label>
            <textarea
              rows={4}
              value={portfolioForm.proof}
              onChange={(event) =>
                setPortfolioForm((current) => ({
                  ...current,
                  proof: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={portfolioForm.verified}
                disabled={!isPlatformAdmin}
                onChange={(event) =>
                  setPortfolioForm((current) => ({
                    ...current,
                    verified: event.target.checked,
                  }))
                }
              />
              Verified profile
            </label>

            <select
              value={portfolioForm.availability}
              onChange={(event) =>
                setPortfolioForm((current) => ({
                  ...current,
                  availability: event.target.value as PortfolioFormState["availability"],
                }))
              }
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-ember"
            >
              <option value="OPEN">Open</option>
              <option value="LIMITED">Limited</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={portfolioStatus === "submitting" || !canCreatePortfolios}
            className="rounded-full bg-tide px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {portfolioStatus === "submitting"
              ? "Creating portfolio..."
              : "Create portfolio"}
          </button>

          {portfolioMessage ? (
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              {portfolioMessage}
            </div>
          ) : null}
        </form>
      </section>
    </div>
  );
}
