import { MatchingStudio } from "../../components/matching-studio";
import { SiteHeader } from "../../components/site-header";

export default function MatchingStudioPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-8">
      <SiteHeader />
      <section className="mt-8 rounded-[2rem] border border-black/10 bg-white/80 p-8 backdrop-blur">
        <MatchingStudio />
      </section>
    </main>
  );
}
