'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CompetitionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  const competitionId = params.id as string;

  const [repoUrl, setRepoUrl] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:4000/api/v1/competitions/${competitionId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer placeholder-token'
        },
        body: JSON.stringify({
          repoUrl,
          figmaUrl: figmaUrl || undefined,
          liveUrl: liveUrl || undefined
        })
      });

      if (!res.ok) {
        throw new Error("Failed to submit entry");
      }

      alert("Submission successful! The AI agent will now analyze your entry.");
      router.push("/competitions/leaderboard");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20">
      <Link href="/competitions" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Protocols
      </Link>

      <section>
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Entry Submission</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Apply Protocol</h2>
          <p className="text-stone-500 text-sm font-bold uppercase tracking-widest mt-4">Hardware ID: {competitionId?.slice(0, 8)}...</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-surface-container-low border border-outline-variant p-10 architect-grid">
          <div className="space-y-2">
             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
               Source Code // Github <span className="text-primary">*</span>
             </label>
             <input
               type="url"
               required
               value={repoUrl}
               onChange={(e) => setRepoUrl(e.target.value)}
               placeholder="https://github.com/..."
               className="w-full bg-surface-container-highest border border-outline-variant px-6 py-4 text-sm font-bold placeholder:text-stone-600 focus:border-primary outline-none transition-all"
             />
          </div>

          <div className="space-y-2">
             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
               Design specs // Figma
             </label>
             <input
               type="url"
               value={figmaUrl}
               onChange={(e) => setFigmaUrl(e.target.value)}
               placeholder="https://figma.com/..."
               className="w-full bg-surface-container-highest border border-outline-variant px-6 py-4 text-sm font-bold placeholder:text-stone-600 focus:border-primary outline-none transition-all"
             />
          </div>

          <div className="space-y-2">
             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
               Live Deployment // URL
             </label>
             <input
               type="url"
               value={liveUrl}
               onChange={(e) => setLiveUrl(e.target.value)}
               placeholder="https://..."
               className="w-full bg-surface-container-highest border border-outline-variant px-6 py-4 text-sm font-bold placeholder:text-stone-600 focus:border-primary outline-none transition-all"
             />
          </div>

          {error && (
            <div className="border border-error bg-error-container text-on-error-container p-4 text-[10px] font-black uppercase tracking-widest">
              Error // {error}
            </div>
          )}

          <div className="pt-6">
             <button
               type="submit"
               disabled={loading}
               className="w-full py-6 bg-primary text-on-primary font-black uppercase tracking-[0.3em] italic text-sm hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0 active:translate-y-0 disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
             >
               {loading ? "Initializing Sync..." : "Execute Submission"}
             </button>
          </div>
        </form>
      </section>

      <section className="bg-support-surface p-8 border border-outline-variant/30">
         <h3 className="text-[10px] font-black uppercase tracking-widest mb-4">Verification Steps</h3>
         <ol className="space-y-4">
            <li className="flex gap-4 items-start">
               <span className="text-primary font-black">01</span>
               <p className="text-[10px] font-bold uppercase tracking-widest leading-loose">AI Agents will scan for architectural elegance and test coverage.</p>
            </li>
            <li className="flex gap-4 items-start">
               <span className="text-primary font-black">02</span>
               <p className="text-[10px] font-bold uppercase tracking-widest leading-loose">Git history analyzed for contribution authenticity.</p>
            </li>
            <li className="flex gap-4 items-start">
               <span className="text-primary font-black">03</span>
               <p className="text-[10px] font-bold uppercase tracking-widest leading-loose">Scores cached and broadcast to global leaderboard within 12H.</p>
            </li>
         </ol>
      </section>
    </div>
  );
}
