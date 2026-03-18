"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
      // In a real scenario, accessToken would come from auth context
      const res = await fetch(`http://localhost:4000/api/v1/competitions/${competitionId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer placeholder-token' // Assuming mock session
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
    <div className="bg-background-dark font-display text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 glassmorphism border-b border-white/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/competitions" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-bold uppercase tracking-widest">Back to Competitions</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">Submit Your Entry</h2>
          <p className="text-slate-400 text-lg">Provide your GitHub repository and Figma designs for the AI agent to evaluate.</p>
        </div>

        <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
             <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
               GitHub Repository URL <span className="text-red-500">*</span>
             </label>
             <input
               type="url"
               required
               value={repoUrl}
               onChange={(e) => setRepoUrl(e.target.value)}
               placeholder="https://github.com/username/repo"
               className="w-full h-14 bg-slate-900/50 border border-slate-700 rounded-xl px-4 text-white focus:border-primary outline-none transition-colors"
             />
             <p className="text-xs text-slate-500 mt-2">Required for the AI code and test coverage analyzer.</p>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
               Figma Design URL
             </label>
             <input
               type="url"
               value={figmaUrl}
               onChange={(e) => setFigmaUrl(e.target.value)}
               placeholder="https://www.figma.com/file/..."
               className="w-full h-14 bg-slate-900/50 border border-slate-700 rounded-xl px-4 text-white focus:border-primary outline-none transition-colors"
             />
             <p className="text-xs text-slate-500 mt-2">Optional. Used for design criteria analysis.</p>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
               Live URL
             </label>
             <input
               type="url"
               value={liveUrl}
               onChange={(e) => setLiveUrl(e.target.value)}
               placeholder="https://myapp.vercel.app"
               className="w-full h-14 bg-slate-900/50 border border-slate-700 rounded-xl px-4 text-white focus:border-primary outline-none transition-colors"
             />
          </div>

          {error && <div className="text-red-500 text-sm font-bold bg-red-900/20 p-4 rounded-xl border border-red-500/30">{error}</div>}

          <div className="pt-6">
             <button
               type="submit"
               disabled={loading}
               className="w-full h-14 tech-gradient rounded-xl text-white font-bold text-lg hover:opacity-90 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
             >
               {loading ? (
                 <>
                   <span className="material-symbols-outlined animate-spin">refresh</span>
                   Submitting to AI Agent...
                 </>
               ) : (
                 <>
                   <span className="material-symbols-outlined">rocket_launch</span>
                   Submit Entry
                 </>
               )}
             </button>
          </div>
        </form>
      </main>
    </div>
  );
}
