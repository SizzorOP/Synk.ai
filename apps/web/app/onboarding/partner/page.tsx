'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PartnerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    bio: '',
    industry: 'QUANTUM ARCHITECTURE',
    teamSize: '0-50'
  });

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      localStorage.setItem('synkai_role', 'partner');
      router.push('/community');
    }
  };

  return (
    <div className="bg-[#FFFAEB] font-display text-slate-900 min-h-screen selection:bg-[#FA520F] selection:text-white flex flex-col items-center py-8 px-4 bg-[radial-gradient(#f0ede0_1px,transparent_1px)] bg-[length:24px_24px]">
      <div className="relative flex h-auto w-full max-w-lg flex-col border-[3px] border-black bg-[#FFFAEB] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        {/* Top App Bar */}
        <div className="flex items-center border-b-[3px] border-black bg-[#FFFAEB] p-4 justify-between">
          <Link href="/role-selection" className="text-slate-900 flex size-12 shrink-0 items-center justify-center border-2 border-black bg-white hover:bg-[#FA520F]/10 transition-colors shadow-[4px_4px_0px_0px_#000]">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="text-slate-900 text-xl font-black leading-tight tracking-tighter flex-1 text-center uppercase">SYNK.AI // PARTNER</h2>
          <div className="size-12"></div>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-3 p-6 border-b-[3px] border-black bg-white">
          <div className="flex justify-between items-end">
            <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest">Protocol Step 0{step} / 02</p>
            <p className="text-[#FA520F] text-[10px] font-black tracking-widest uppercase">{step === 1 ? '50% LOADED' : 'INITIALIZATION READY'}</p>
          </div>
          <div className="border-2 border-black h-6 bg-slate-100 relative overflow-hidden">
            <div 
              className="h-full bg-[#FA520F] border-r-2 border-black transition-all duration-700" 
              style={{ width: step === 1 ? '50%' : '100%' }}
            ></div>
          </div>
        </div>

        {/* Hero Title */}
        <div className="p-6 bg-black">
          <h1 className="text-white tracking-tighter text-4xl font-black leading-none uppercase italic underline decoration-[4px] decoration-[#FA520F]">
            Initialize<br/>Partner Node
          </h1>
        </div>

        <main>
          {step === 1 ? (
            <div className="p-6 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2">
                <div className="size-4 bg-[#FA520F]"></div>
                <h3 className="text-slate-900 text-xl font-black uppercase tracking-tight">01. Company Profile</h3>
              </div>
              <div className="flex flex-col gap-6">
                <label className="flex flex-col gap-2">
                  <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest opacity-50">Entity Name</p>
                  <input 
                    className="w-full border-2 border-black bg-white p-4 text-slate-900 focus:ring-0 focus:border-[#FA520F] font-bold shadow-[4px_4px_0px_0px_#000]" 
                    placeholder="e.g. SYNK_PROTO_LABS" 
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest opacity-50">Terminal URL</p>
                  <input 
                    className="w-full border-2 border-black bg-white p-4 text-slate-900 focus:ring-0 focus:border-[#FA520F] font-bold shadow-[4px_4px_0px_0px_#000]" 
                    placeholder="https://synk.ai/node-01" 
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest opacity-50">Mission Manifest / Bio</p>
                  <textarea 
                    className="w-full border-2 border-black bg-white p-4 text-slate-900 focus:ring-0 focus:border-[#FA520F] font-bold min-h-[140px] shadow-[4px_4px_0px_0px_#000]" 
                    placeholder="Define industrial parameters..."
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  ></textarea>
                </label>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.companyName}
                className="w-full bg-black text-white border-2 border-black p-5 font-black text-xl uppercase tracking-tighter shadow-[6px_6px_0px_0px_rgba(250,82,15,1)] hover:bg-[#FA520F] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 group mb-4"
              >
                Continue Initialization
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          ) : (
            <div className="p-6 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2">
                <div className="size-4 bg-[#FA520F]"></div>
                <h3 className="text-slate-900 text-xl font-black uppercase tracking-tight">02. Search Protocol</h3>
              </div>
              <div className="flex flex-col gap-8">
                <label className="flex flex-col gap-2">
                  <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest opacity-50">Target Industry Vertical</p>
                  <div className="relative">
                    <select 
                      className="w-full border-2 border-black bg-white p-5 text-slate-900 focus:ring-0 focus:border-[#FA520F] font-black appearance-none shadow-[4px_4px_0px_0px_#000]"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    >
                      <option>QUANTUM ARCHITECTURE</option>
                      <option>NEURAL LOGISTICS</option>
                      <option>KINETIC INFRASTRUCTURE</option>
                      <option>AI SYSTEMS ENGINE</option>
                      <option>CRITICAL DATA OPERATIONS</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="material-symbols-outlined font-black">expand_more</span>
                    </div>
                  </div>
                </label>

                <div className="flex flex-col gap-4">
                  <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest opacity-50">Node Density (Team Size)</p>
                  <div className="grid grid-cols-3 gap-4">
                    {['0-50', '50-200', '200+'].map((size) => (
                      <button 
                        key={size}
                        onClick={() => setFormData({...formData, teamSize: size})}
                        className={`border-2 border-black p-4 font-black text-sm transition-all shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${formData.teamSize === size ? 'bg-[#FA520F] text-white underline decoration-2' : 'bg-white text-black hover:bg-[#FA520F]/10'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-6 flex flex-col items-center border-[2px] border-dashed border-black opacity-30 mt-4">
                  <span className="text-[8px] font-black uppercase text-center tracking-[0.4em]">SYNK.V2 // ARCH_BRL_NODE_DEPLOY</span>
                  <span className="text-[8px] font-black uppercase text-center tracking-[0.2em] mt-1">LAT: 52.5200 N / LON: 13.4050 E</span>
                </div>

                <button 
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-[#FA520F] via-[#FF8A00] to-[#FFC700] border-2 border-black p-6 text-white font-black text-2xl uppercase tracking-tighter shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all group mt-2 mb-4"
                >
                  Deploy Search Protocol →
                </button>
              </div>
            </div>
          )}
        </main>
        <div className="h-6 bg-black mt-auto"></div>
      </div>
    </div>
  );
}
