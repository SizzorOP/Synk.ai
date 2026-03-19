'use client';

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
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      {/* Main Feed: 8 Columns */}
      <div className="xl:col-span-8 space-y-12">
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Global Protocol</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Active Bounties</h2>
            </div>
            <Link href="/competitions/leaderboard" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">leaderboard</span>
              Leaderboard
            </Link>
          </div>

          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-20 border border-outline-variant bg-surface-container-low">
                <span className="material-symbols-outlined animate-spin text-2xl text-primary">update</span>
                <p className="text-[10px] font-black uppercase tracking-widest mt-4">Syncing Bounties...</p>
              </div>
            ) : competitions.length === 0 ? (
              <div className="text-center py-20 border border-outline-variant bg-surface-container-low">
                <p className="text-[10px] font-black uppercase tracking-widest">No active protocols detected.</p>
              </div>
            ) : (
              competitions.map((comp) => (
                <article key={comp.id} className="bg-surface-container-lowest border border-outline-variant group hover:shadow-xl transition-all duration-500 overflow-hidden p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-surface-container flex items-center justify-center border border-outline-variant">
                         <span className="material-symbols-outlined text-primary">emoji_events</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tight uppercase leading-none group-hover:text-primary transition-colors">{comp.title}</h3>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Status: {comp.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Reward Pool</p>
                       <p className="text-2xl font-black tracking-tighter text-secondary italic">${comp.rewardPool.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <p className="text-stone-500 text-sm font-medium mb-8 leading-relaxed max-w-2xl">{comp.description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-outline-variant/30">
                    <div className="flex gap-4">
                       <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-surface-container">GitHub Verified</span>
                       <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-surface-container">AI Scoring</span>
                    </div>
                    <Link href={`/competitions/${comp.id}`} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                      View Protocol
                      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Sidebar: 4 Columns */}
      <div className="xl:col-span-4 space-y-8">
        <section className="bg-support-surface p-8 border border-outline-variant/30 architect-grid">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] italic mb-6">Network Stats</h3>
           <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                 <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Total Rewarded</span>
                 <span className="text-xl font-black tracking-tighter">$2.4M</span>
              </div>
              <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                 <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Active Hunters</span>
                 <span className="text-xl font-black tracking-tighter">1,204</span>
              </div>
              <div className="flex justify-between items-end pb-2">
                 <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Global Rank</span>
                 <span className="text-xl font-black tracking-tighter">#412</span>
              </div>
           </div>
        </section>

        <section className="bg-on-surface text-surface p-8 relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] italic mb-4 text-surface/50">Pro Tip</h3>
              <p className="text-lg font-bold leading-tight uppercase tracking-tight italic text-surface/90">AI Agents scan repositories for architectural elegance.</p>
           </div>
           <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl"></div>
        </section>
      </div>
    </div>
  );
}
