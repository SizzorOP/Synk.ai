"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Competition = {
  id: string;
  title: string;
  description: string;
  rewardPool: number;
  endsAt: string;
  status: 'DRAFT' | 'OPEN' | 'JUDGING' | 'COMPLETED';
};

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/competitions')
      .then(res => res.json())
      .then(data => {
        setCompetitions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load competitions:", err);
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
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Competitions</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/browse-jobs" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Browse Jobs</Link>
              <Link href="/competitions" className="text-sm font-medium text-primary">Competitions</Link>
              <Link href="/competitions/leaderboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Leaderboard</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-12 flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">Active Competitions</h2>
            <p className="text-slate-400">Participate in cutting-edge AI bounties, submit your GitHub repositories, and let our AI agents score your implementation to win rewards.</p>
          </div>
          <Link href="/competitions/leaderboard" className="px-6 py-3 rounded-xl glassmorphism text-white text-sm font-bold border-primary/20 hover:bg-white/10 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">leaderboard</span>
            View Global Leaderboard
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">update</span>
            <p className="text-slate-500 mt-4">Loading competitions...</p>
          </div>
        ) : competitions.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <span className="material-symbols-outlined text-6xl text-slate-600 mb-4">event_busy</span>
            <p className="text-slate-400">No active competitions right now. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((comp) => (
              <div key={comp.id} className="glassmorphism p-6 rounded-2xl hover:border-primary/40 transition-all group relative overflow-hidden flex flex-col">
                {comp.status === 'OPEN' && (
                   <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-widest">Active</div>
                )}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{comp.title}</h3>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-3">{comp.description}</p>
                </div>
                
                <div className="flex items-center gap-4 mb-6 pt-4 border-t border-white/5">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Reward Pool</span>
                    <span className="text-lg font-bold text-accent-green">${comp.rewardPool.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Status</span>
                    <span className="text-sm font-bold text-white">{comp.status}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href={`/competitions/${comp.id}`} className="block text-center w-full px-6 py-3 rounded-xl tech-gradient text-white text-sm font-bold hover:opacity-90 transition-opacity">
                    View Details & Submit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
