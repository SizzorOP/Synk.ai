import Link from "next/link";

import { SiteHeader } from "../components/site-header";

const recruiterSignals = [
  "Visual proof over resume bullet points",
  "Semantic matching in under two minutes",
  "Milestone escrow and chat in one contract room",
];

const talentProof = [
  {
    title: "Reels and case studies",
    body: "Creators and engineers lead with media, shipped work, and measurable outcomes instead of CV padding.",
  },
  {
    title: "GitHub and Behance ingestion",
    body: "External profiles sync into a single portfolio graph that the matching engine can score and explain.",
  },
  {
    title: "Trust before proposals",
    body: "Verification, ratings, delivery history, and response signals shape visibility before bidding wars start.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-8 lg:px-8 lg:py-12">
        <SiteHeader />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white/75 p-8 shadow-panel backdrop-blur">
            <div className="mb-6 inline-flex rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              Build faster trust
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-space-grotesk)] text-5xl font-bold tracking-tight text-ink sm:text-6xl">
              Match brands to creators and builders through proof, not resumes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Prooflane combines visual portfolios, semantic retrieval, and milestone escrow so hiring moves from job post to shortlist in minutes.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {recruiterSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700"
                >
                  {signal}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                View live dashboard
              </Link>
              <Link
                href="/matching-studio"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900"
              >
                Open matching studio
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] bg-ink p-6 text-white shadow-panel">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                Subscription signals
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-sm text-white/70">Free</div>
                  <div className="mt-1 text-2xl font-bold">10 proposals / mo</div>
                  <div className="mt-1 text-sm text-white/70">10% commission</div>
                </div>
                <div className="rounded-2xl bg-ember p-4 text-white">
                  <div className="text-sm text-white/80">Pro</div>
                  <div className="mt-1 text-2xl font-bold">2x visibility</div>
                  <div className="mt-1 text-sm text-white/80">100 proposals / mo</div>
                </div>
                <div className="rounded-2xl bg-tide p-4 text-white">
                  <div className="text-sm text-white/80">Elite</div>
                  <div className="mt-1 text-2xl font-bold">5x visibility</div>
                  <div className="mt-1 text-sm text-white/80">48-hour early job access</div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6 backdrop-blur">
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Portfolio engine
              </div>
              <div className="mt-4 space-y-4">
                {talentProof.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                    <h2 className="font-semibold text-ink">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Route 01
            </div>
            <h2 className="mt-3 text-2xl font-bold text-ink">Dashboard</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Live localhost control room for jobs, portfolios, platform health, and AI shortlist output.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Route 02
            </div>
            <h2 className="mt-3 text-2xl font-bold text-ink">Matching Studio</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Recruiter-side preview surface that posts briefs to the API and shows ranked candidates with explanations.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Route 03
            </div>
            <h2 className="mt-3 text-2xl font-bold text-ink">Launchpad</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Authenticated localhost surface for recruiter job creation and freelancer portfolio onboarding.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Route 04
            </div>
            <h2 className="mt-3 text-2xl font-bold text-ink">Collaboration Hub</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Real-time contract rooms and direct threads backed by authenticated chat APIs and Socket.io.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Architecture Pack
            </div>
            <h2 className="mt-3 text-2xl font-bold text-ink">Architecture Pack</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              System architecture, PostgreSQL schema, vector collections, and the running build log are already in-repo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
