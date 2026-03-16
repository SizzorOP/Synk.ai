import { CollaborationHub } from "../../components/collaboration-hub";
import { SiteHeader } from "../../components/site-header";

export default function CollaborationHubPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-8">
      <SiteHeader />
      <section className="mt-8 rounded-[2rem] border border-black/10 bg-white/80 p-8 backdrop-blur">
        <div className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Smart Collaboration Hub
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-ink">
            Real-time rooms for hiring, delivery, and support
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            This localhost surface consumes the authenticated chat APIs and the Socket.io collaboration namespace from the NestJS backend.
          </p>
        </div>
        <CollaborationHub />
      </section>
    </main>
  );
}
