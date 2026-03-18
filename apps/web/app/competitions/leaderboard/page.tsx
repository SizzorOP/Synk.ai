"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

type LeaderboardEntry = {
  freelancerUserId: string;
  creatorName: string;
  totalScore: number;
  competitionsWon: number;
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/competitions/leaderboard/global')
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load global leaderboard:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">
      <header className="sticky top-0 z-50 glassmorphism border-b border-white/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 tech-gradient rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white">emoji_events</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">Synk.ai</h1>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Global Leaderboard</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/browse-jobs" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Browse Jobs</Link>
              <Link href="/competitions" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Competitions</Link>
              <Link href="/competitions/leaderboard" className="text-sm font-medium text-primary">Leaderboard</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500 text-4xl">trophy</span>
            Top Builders
          </h2>
          <p className="text-slate-400 text-lg">The most elite AI builders ranked by their aggregate competition scores.</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-amber-500">update</span>
            <p className="text-slate-500 mt-4">Loading top builders...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <span className="material-symbols-outlined text-6xl text-slate-600 mb-4">leaderboard</span>
            <p className="text-slate-400">No scores recorded yet. Be the first to submit a winning entry!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div key={entry.freelancerUserId} className={`glassmorphism p-6 rounded-2xl flex items-center justify-between border ${index === 0 ? 'border-amber-500/50 bg-amber-500/5' : index === 1 ? 'border-zinc-400/50 bg-zinc-400/5' : index === 2 ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/5 hover:border-white/20'} transition-all`}>
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black ${index === 0 ? 'bg-amber-500 text-slate-900' : index === 1 ? 'bg-zinc-400 text-slate-900' : index === 2 ? 'bg-orange-500 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white">{entry.creatorName || "Anonymous Builder"}</h3>
                    <p className="text-sm text-slate-400 mt-1">{entry.competitionsWon} Competitions Won</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Total Score</span>
                  <span className={`text-3xl font-black ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-zinc-400' : index === 2 ? 'text-orange-500' : 'text-primary'}`}>
                    {entry.totalScore.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
