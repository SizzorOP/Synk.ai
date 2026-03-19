'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatorOnboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    github: '',
    twitter: '',
    portfolio: '',
    primaryStack: 'React / Next.js',
    experience: 'Senior (5+ yrs)',
    availability: 40,
    githubSynced: false
  });

  const syncGitHub = () => {
    setFormData({ ...formData, githubSynced: true });
    // Simulate sync
    setTimeout(() => alert('GitHub Protocol Synced.'), 500);
  };

  const handleComplete = () => {
    localStorage.setItem('synkai_role', 'creator');
    router.push('/community');
  };

  return (
    <div className="bg-background font-body text-on-surface architect-grid min-h-screen">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-6 py-4 bg-background/90 backdrop-blur-md fixed top-0 z-50 border-b-0">
        <div className="text-xl font-black tracking-tighter text-primary">synk.ai</div>
        <div className="hidden md:flex gap-8 items-center">
          <Link className="text-stone-600 font-bold tracking-tight uppercase text-xs hover:text-primary transition-colors duration-150" href="#">Product</Link>
          <Link className="text-stone-600 font-bold tracking-tight uppercase text-xs hover:text-primary transition-colors duration-150" href="#">Solutions</Link>
          <Link className="text-stone-600 font-bold tracking-tight uppercase text-xs hover:text-primary transition-colors duration-150" href="#">Pricing</Link>
          <Link className="text-stone-600 font-bold tracking-tight uppercase text-xs hover:text-primary transition-colors duration-150" href="#">Contact</Link>
          <button className="bg-on-surface text-surface px-6 py-2 font-bold tracking-tight uppercase text-xs">Get Started</button>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative">
        {/* Left Column: Editorial Content */}
        <div className="md:col-span-5 flex flex-col justify-start">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 block">Creator Flow V3</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-6 italic uppercase">
            Sync your <br /> <span className="text-transparent bg-clip-text mistral-gradient">Technical DNA.</span>
          </h1>
          <p className="text-stone-500 font-medium text-sm leading-relaxed max-w-md mb-8">
            The synk.ai ecosystem is built for speed. By syncing your development history, we calculate your performance vectors and match you with projects that reward technical excellence.
          </p>
          <div className="space-y-6">
            {/* Data Monolith 1 */}
            <div className="bg-surface-container-lowest p-8 border-l-4 border-primary relative architect-grid-fine">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black tracking-tighter leading-none italic">94<span className="text-lg">%</span></span>
              </div>
              <p className="text-[10px] font-bold text-stone-500 mt-2 uppercase tracking-[0.2em]">Placement rate for verified profiles</p>
            </div>
            {/* Data Monolith 2 */}
            <div className="bg-surface-container-lowest p-8 border-l-4 border-secondary relative architect-grid-fine text-on-surface">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black tracking-tighter leading-none italic">4.8</span>
                <span className="material-symbols-outlined text-secondary text-2xl pb-1">star</span>
              </div>
              <p className="text-[10px] font-bold text-stone-500 mt-2 uppercase tracking-[0.2em]">Average creator satisfaction score</p>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-step Onboarding Interface */}
        <div className="md:col-span-7 space-y-12 architect-grid-fine p-1 border border-outline-variant/10">
          {/* Section 1: Identity & Socials */}
          <section className="bg-surface-container-lowest p-10 border border-outline-variant/20 shadow-none relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-on-surface text-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">person</span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Identity & Socials</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Full Name</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-bold uppercase tracking-widest outline-none"
                    placeholder="COMMANDER NAME"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">GitHub Username</label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-bold tracking-widest pr-24 outline-none"
                      placeholder="@username"
                      type="text"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    />
                    <button
                      onClick={syncGitHub}
                      className={`absolute right-2 top-2 px-4 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all ${formData.githubSynced ? 'bg-secondary text-on-primary' : 'bg-on-surface text-surface hover:bg-primary'}`}
                    >
                      {formData.githubSynced ? 'Synced' : 'Sync'}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">X (Twitter)</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-bold tracking-widest outline-none"
                    placeholder="@handle"
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Portfolio / Link</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-bold tracking-widest outline-none"
                    placeholder="https://yourwork.com"
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Technical DNA */}
          <section className="bg-surface-container-lowest p-10 border border-outline-variant/20 shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 mistral-gradient h-1.5 w-40 z-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">terminal</span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Technical DNA</h2>
              </div>
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Primary Stack</label>
                    <select
                      className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-black uppercase tracking-widest appearance-none outline-none"
                      value={formData.primaryStack}
                      onChange={(e) => setFormData({ ...formData, primaryStack: e.target.value })}
                    >
                      <option>React / Next.js</option>
                      <option>Python / FastAPI</option>
                      <option>Rust / Solana</option>
                      <option>Solidity / EVM</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Experience Level</label>
                    <select
                      className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-black uppercase tracking-widest appearance-none outline-none"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    >
                      <option>Junior (0-2 yrs)</option>
                      <option>Mid (2-5 yrs)</option>
                      <option>Senior (5+ yrs)</option>
                    </select>
                  </div>
                </div>

                {/* Weekly Availability Slider */}
                <div className="space-y-6 pt-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Weekly Availability</label>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">{formData.availability} Hours / Week</span>
                  </div>
                  <div className="relative w-full h-2 flex items-center">
                    <div className="absolute w-full h-full bg-surface-container-highest"></div>
                    <div className="absolute h-full mistral-gradient" style={{ width: `${(formData.availability / 60) * 100}%` }}></div>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: parseInt(e.target.value) })}
                      className="absolute w-full h-8 opacity-0 cursor-pointer z-30"
                    />
                    <div className="absolute w-10 h-10 border-4 border-primary bg-background pointer-events-none z-20 flex items-center justify-center" style={{ left: `calc(${(formData.availability / 60) * 100}% - 20px)` }}>
                       <div className="w-1.5 h-1.5 bg-primary"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[8px] font-black text-stone-400 uppercase tracking-[0.3em] px-1">
                    <span>Part Time</span>
                    <span>Full Time</span>
                    <span className="text-primary italic">Hyper-Growth</span>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex justify-end">
                <button
                  onClick={handleComplete}
                  className="bg-on-surface text-surface px-16 py-6 text-xs font-black uppercase tracking-[0.4em] flex items-center gap-6 group transition-all active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  Enter Ecosystem
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* Verification Protocol Link */}
          <div className="p-10 border-2 border-dashed border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-stone-400 mt-1">verified_user</span>
              <p className="text-stone-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed max-w-sm italic">
                By entering, you agree to the synk.ai v3 neural protocols, data integrity standards, and ecosystem governance.
              </p>
            </div>
            <Link className="text-[10px] font-black uppercase tracking-[0.3em] text-primary underline decoration-2 underline-offset-8" href="#">
              Read Protocol
            </Link>
          </div>
        </div>
      </main>

      {/* Decorative Background */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-full overflow-hidden pointer-events-none opacity-[0.05] architect-grid"></div>
    </div>
  );
}
