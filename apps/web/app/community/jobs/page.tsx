'use client';

import Link from 'next/link';

const JOBS = [
  { 
    title: "Senior Frontend Engineer", 
    status: "NEW", 
    stacks: ["Next.js", "TypeScript", "Tailwind"], 
    budget: "$140k - $180k", 
    exp: "5+ Years",
    company: "NeuralLabs"
  },
  { 
    title: "Lead Product Designer", 
    status: "HOT", 
    stacks: ["Figma", "Prototyping"], 
    budget: "$160k - $210k", 
    exp: "7+ Years",
    company: "Mistral Digital"
  },
  { 
    title: "Backend Systems Architect", 
    status: "", 
    stacks: ["Go", "Kubernetes", "Rust"], 
    budget: "$190k - $240k", 
    exp: "10+ Years",
    company: "CoreData"
  }
];

export default function JobsFeed() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <section>
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Protocol Active // 2024</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Hiring Feed</h2>
        </div>

        {/* Filter Bar */}
        <div className="flex border border-outline-variant bg-surface-container-low mb-12">
          <button className="flex-1 py-4 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest border-r border-outline-variant">All Jobs</button>
          <button className="flex-1 py-4 text-on-surface-variant text-[10px] font-black uppercase tracking-widest border-r border-outline-variant hover:bg-surface-container transition-all">Remote</button>
          <button className="flex-1 py-4 text-on-surface-variant text-[10px] font-black uppercase tracking-widest hover:bg-surface-container transition-all">Contract</button>
        </div>

        {/* Job List */}
        <div className="space-y-6">
          {JOBS.map((job, i) => (
            <article key={i} className="bg-surface-container-lowest border border-outline-variant p-8 group hover:border-primary transition-all duration-300 relative overflow-hidden">
              {job.status && (
                <div className="absolute top-0 right-0 py-1 px-4 bg-secondary text-on-secondary text-[8px] font-black uppercase tracking-widest">
                  {job.status}
                </div>
              )}
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{job.company}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{job.title}</h3>
                </div>
                
                <div className="flex gap-2">
                  {job.stacks.map((stack, j) => (
                    <span key={j} className="text-[9px] font-black uppercase tracking-widest py-1 px-3 border border-outline-variant bg-surface-container">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-y border-outline-variant/30 mb-8">
                <div>
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Budget</p>
                  <p className="text-lg font-black tracking-tight leading-none">{job.budget}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">XP Required</p>
                  <p className="text-lg font-black tracking-tight leading-none">{job.exp}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-lg font-black tracking-tight leading-none uppercase">Remote</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Posted</p>
                  <p className="text-lg font-black tracking-tight leading-none">2H AGO</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="/chat" className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
                  Apply Protocol
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
