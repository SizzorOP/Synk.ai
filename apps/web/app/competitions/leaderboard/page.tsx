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
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <div className="mb-10 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Global Protocol</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Rankings</h2>
          <p className="text-stone-500 text-sm font-bold uppercase tracking-widest mt-4">Top 50 Verified Builders</p>
        </div>

        <div className="border border-outline-variant bg-surface-container-low overflow-hidden">
          <div className="grid grid-cols-12 bg-on-surface text-surface py-4 px-8 text-[10px] font-black uppercase tracking-widest">
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">Identity</div>
            <div className="col-span-2 text-right">Won</div>
            <div className="col-span-2 text-right">Score</div>
          </div>

          <div className="divide-y divide-outline-variant/30">
            {loading ? (
              <div className="py-20 text-center">
                <span className="material-symbols-outlined animate-spin text-primary">update</span>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="py-20 text-center text-[10px] font-black uppercase tracking-widest text-stone-400">
                No scores recorded.
              </div>
            ) : (
              leaderboard.map((entry, index) => (
                <div key={entry.freelancerUserId} className="grid grid-cols-12 items-center py-6 px-8 hover:bg-surface-container transition-all group">
                  <div className="col-span-2 flex items-center gap-4">
                    <span className={`text-xl font-black italic tracking-tighter ${index < 3 ? 'text-primary' : 'text-stone-400'}`}>
                      #{index + 1}
                    </span>
                  </div>
                  <div className="col-span-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-outline-variant">
                         <span className="text-xs font-black">{entry.creatorName?.[0] || 'A'}</span>
                      </div>
                      <span className="font-black uppercase tracking-tight group-hover:text-primary transition-colors">{entry.creatorName || "Anonymous"}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-[10px] font-black">{entry.competitionsWon}</span>
                  </div>
                  <div className="col-span-2 text-right font-black italic tracking-tighter text-lg">
                    {entry.totalScore.toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Legend / Incentive */}
      <section className="bg-surface-container p-8 border border-outline-variant/30 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">Tier 01</p>
            <p className="text-xs font-black uppercase italic">Master Architects</p>
          </div>
          <div className="border-x border-outline-variant/30">
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">Rewards</p>
            <p className="text-xs font-black uppercase italic">$50k Monthly Distribution</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">Next Cycle</p>
            <p className="text-xs font-black uppercase italic">Begins in 4D 12H</p>
          </div>
      </section>
    </div>
  );
}
