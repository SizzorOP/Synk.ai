import { DealDesk } from "../../components/deal-desk";
import { SiteHeader } from "../../components/site-header";

export default function DealDeskPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-8">
      <SiteHeader />
      <section className="mt-8 rounded-[2rem] border border-black/10 bg-white/80 p-8 backdrop-blur">
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Commercial Ops
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-ink">
            Deal desk for proposals, awards, milestones, and escrow
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            This localhost surface uses the authenticated engagements APIs to move from proposal review to contract funding and milestone release.
          </p>
        </div>
        <DealDesk />
      </section>
    </main>
  );
}
