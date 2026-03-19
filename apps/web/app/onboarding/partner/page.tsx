'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PartnerOnboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    industry: 'Generative AI & LLMs',
    budget: '$5,000 - $10,000',
    experience: 'Mid',
    urgency: 85,
    stack: ['React / Next.js', 'Python / FastAPI', 'PostgreSQL']
  });

  const handleComplete = () => {
    localStorage.setItem('synkai_role', 'partner');
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
          <button className="mistral-gradient text-on-primary px-6 py-2 font-bold tracking-tight uppercase text-xs">Get Started</button>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative">
        {/* Left Column: Editorial Content */}
        <div className="md:col-span-5 flex flex-col justify-start">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 block">Partner Flow V3</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-6 italic uppercase">
            Architect the <br /> <span className="text-transparent bg-clip-text mistral-gradient">Future Force.</span>
          </h1>
          <p className="text-stone-500 font-medium text-sm leading-relaxed max-w-md mb-8">
            Welcome to the synk.ai hiring ecosystem. We've eliminated the friction between project ideation and team deployment. Set your parameters, define your stack, and deploy in minutes.
          </p>
          <div className="space-y-6">
            {/* Data Monolith 1 */}
            <div className="bg-surface-container-lowest p-8 border-l-4 border-primary relative architect-grid-fine">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black tracking-tighter leading-none italic">02</span>
                <span className="text-[10px] font-black uppercase tracking-widest pb-1 leading-none">Minutes</span>
              </div>
              <p className="text-[10px] font-bold text-stone-500 mt-2 uppercase tracking-[0.2em]">Average match-to-hire velocity</p>
            </div>
            {/* Data Monolith 2 */}
            <div className="bg-surface-container-lowest p-8 border-l-4 border-secondary relative architect-grid-fine">
              <div className="flex items-end gap-2 text-on-surface">
                <span className="text-4xl font-black tracking-tighter leading-none italic">98.4<span className="text-lg">%</span></span>
              </div>
              <p className="text-[10px] font-bold text-stone-500 mt-2 uppercase tracking-[0.2em]">Retention rate on synk.ai projects</p>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-step Onboarding Interface */}
        <div className="md:col-span-7 space-y-12 architect-grid-fine p-1 border border-outline-variant/10">
          {/* Section 1: Company Profile */}
          <section className="bg-surface-container-lowest p-10 border border-outline-variant/20 shadow-none relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-on-surface text-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">corporate_fare</span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Company Identity</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Company Name</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-bold uppercase tracking-widest outline-none"
                    placeholder="E.G. ACME ROBOTICS"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Website</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-bold tracking-widest outline-none"
                    placeholder="https://acme.ai"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Industry Vertical</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-black uppercase tracking-widest appearance-none outline-none"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option>Generative AI & LLMs</option>
                    <option>Robotics & Automation</option>
                    <option>Fintech Infrastructure</option>
                    <option>Climate Tech</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Create Project */}
          <section className="bg-surface-container-lowest p-10 border border-outline-variant/20 shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 mistral-gradient h-1.5 w-40 z-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center">
                   <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Define Project</h2>
              </div>
              <div className="space-y-10">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Target Tech Stack</label>
                  <div className="flex flex-wrap gap-2">
                    {formData.stack.map(tag => (
                      <span key={tag} className="bg-on-surface text-surface px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border-l-4 border-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <input className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-bold uppercase tracking-widest outline-none" placeholder="ADD MORE SKILLS..." type="text" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Budget Range (Monthly)</label>
                    <select
                      className="w-full bg-surface-container-low border border-outline-variant/30 p-4 focus:border-primary text-sm font-black uppercase tracking-widest outline-none"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $20,000</option>
                      <option>$20,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Experience Level</label>
                    <div className="flex h-[54px] bg-surface-container-low border border-outline-variant/30 p-1">
                      {['Junior', 'Mid', 'Senior'].map(lvl => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFormData({ ...formData, experience: lvl })}
                          className={`flex-1 text-[10px] font-black uppercase tracking-widest transition-all ${formData.experience === lvl ? 'bg-primary text-on-primary' : 'text-stone-400 hover:text-on-surface'}`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Project Urgency Slider */}
                <div className="space-y-6 pt-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 px-1">Project Urgency</label>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Hire in &lt;2 minutes</span>
                  </div>
                  <div className="relative w-full h-2 flex items-center">
                    <div className="absolute w-full h-full bg-surface-container-highest"></div>
                    <div className="absolute h-full mistral-gradient" style={{ width: `${formData.urgency}%` }}></div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: parseInt(e.target.value) })}
                      className="absolute w-full h-8 opacity-0 cursor-pointer z-30"
                    />
                    <div className="absolute w-10 h-10 border-4 border-primary bg-background pointer-events-none z-20 flex items-center justify-center" style={{ left: `calc(${formData.urgency}% - 20px)` }}>
                       <div className="w-1.5 h-1.5 bg-primary"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[8px] font-black text-stone-400 uppercase tracking-[0.3em] px-1">
                    <span>Exploring</span>
                    <span>Standard</span>
                    <span className="text-primary italic">Critical Priority</span>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex justify-end">
                <button
                  onClick={handleComplete}
                  className="mistral-gradient text-on-primary px-16 py-6 text-xs font-black uppercase tracking-[0.4em] flex items-center gap-6 group transition-all active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  Deploy Search Protocol
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* Bottom Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-surface-container-highest border border-outline-variant/30">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-2 italic">Security Protocol</p>
              <p className="text-[11px] text-stone-500 font-bold uppercase tracking-widest leading-tight">All data encrypted via Enterprise RSA-4096. Your IP is strictly protected.</p>
            </div>
            <div className="p-6 bg-surface-container-highest border border-outline-variant/30">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary mb-2 italic">AI Matching</p>
              <p className="text-[11px] text-stone-500 font-bold uppercase tracking-widest leading-tight">Match vectors being calculated in real-time based on stack density.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Background */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-full overflow-hidden pointer-events-none opacity-[0.05] architect-grid"></div>
    </div>
  );
}
