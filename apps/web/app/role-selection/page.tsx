'use client';

import Link from 'next/link';

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 block">Identity Verification</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.8] mb-6">Define Your Role</h1>
          <p className="text-stone-500 text-sm font-bold uppercase tracking-widest">Select a protocol to initialize your network node.</p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Partner / Hiring */}
          <Link href="/onboarding/partner" className="group">
            <article className="h-full bg-surface-container-low border-2 border-on-surface p-10 flex flex-col items-start transition-all hover:translate-x-2 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(168,85,247,0.2)]">
              <div className="w-16 h-16 bg-on-surface text-surface flex items-center justify-center mb-8">
                 <span className="material-symbols-outlined text-4xl">corporate_fare</span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight italic mb-4">Enterprise</h2>
              <p className="text-stone-500 font-medium text-sm leading-relaxed mb-12">Scale your engineering operations with AI-verified technical leads and specialized squads.</p>
              
              <div className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary">
                Enter Hiring Mode
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </article>
          </Link>

          {/* Creator / Talent */}
          <Link href="/onboarding/creator" className="group">
            <article className="h-full bg-on-surface text-surface border-2 border-on-surface p-10 flex flex-col items-start transition-all hover:translate-x-2 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(168,85,247,0.5)]">
              <div className="w-16 h-16 bg-primary text-on-primary flex items-center justify-center mb-8">
                 <span className="material-symbols-outlined text-4xl">terminal</span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight italic mb-4">Technical</h2>
              <p className="text-surface/60 font-medium text-sm leading-relaxed mb-12">Monetize your codebase architecture. Proof of Work validated by automated agent orchestration.</p>
              
              <div className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary">
                Enter Talent Mode
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </article>
          </Link>
        </div>

        {/* Footer Link */}
        <div className="mt-20 text-center">
           <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-primary transition-colors border-b border-outline-variant pb-1">
              Already verified? Access terminal
           </Link>
        </div>
      </div>
    </div>
  );
}
