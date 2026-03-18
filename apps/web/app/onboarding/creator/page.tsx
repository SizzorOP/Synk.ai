'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatorOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    githubSynced: false
  });

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      localStorage.setItem('synkai_role', 'creator');
      router.push('/community');
    }
  };

  const syncGitHub = () => {
    setFormData({ ...formData, githubSynced: true });
    // Simulate sync
    setTimeout(() => alert('GitHub Protocol Synced.'), 500);
  };

  return (
    <div className="bg-[#FFFAEB] text-[#1a1608] font-display selection:bg-[#FA520F] selection:text-white min-h-screen border-x-[8px] border-[#1a1608] max-w-2xl mx-auto flex flex-col">
      {/* Navigation */}
      <div className="flex items-center p-6 justify-between border-b-[4px] border-[#1a1608]">
        <Link href="/role-selection" className="text-[#1a1608] flex size-10 shrink-0 items-center justify-center border-2 border-[#1a1608] bg-white shadow-[3px_3px_0px_0px_#1a1608] hover:bg-[#FA520F]/10">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </Link>
        <h2 className="text-[#1a1608] text-xl font-black uppercase tracking-tighter flex-1 text-center">SYNK.AI / V2</h2>
        <div className="size-10"></div>
      </div>

      {/* Progress Section */}
      <div className="flex flex-col gap-4 p-6 bg-[#FA520F]/10 border-b-[4px] border-[#1a1608]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="text-[#1a1608] text-xs font-black uppercase tracking-widest">Step 0{step} / 02</p>
            <p className="text-[#1a1608] text-2xl font-black leading-none uppercase">
              {step === 1 ? 'Identity' : 'Sync DataSource'}
            </p>
          </div>
          <p className="text-[#1a1608] text-4xl font-black italic opacity-20">{step === 1 ? '50%' : '100%'}</p>
        </div>
        <div className="border-[3px] border-[#1a1608] bg-white h-6 w-full relative overflow-hidden">
          <div 
            className="h-full bg-[#FA520F] border-r-[3px] border-[#1a1608] transition-all duration-500" 
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
        </div>
      </div>

      <main className="flex-1 bg-white/50">
        {step === 1 ? (
          <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-8">
              Define <br/> Your <br/> <span className="text-[#FA520F]">Protocol</span>
            </h1>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#1a1608] text-sm font-black uppercase tracking-widest">Full Name</label>
                <input 
                  className="border-[3px] border-[#1a1608] shadow-[4px_4px_0px_0px_#1a1608] w-full bg-white p-4 text-xl font-bold focus:ring-0 focus:outline-none placeholder:text-[#1a1608]/30" 
                  placeholder="COMMANDER NAME" 
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#1a1608] text-sm font-black uppercase tracking-widest">Bio / Transmission</label>
                <textarea 
                  className="border-[3px] border-[#1a1608] shadow-[4px_4px_0px_0px_#1a1608] w-full bg-white p-4 text-xl font-bold focus:ring-0 focus:outline-none min-h-40 placeholder:text-[#1a1608]/30" 
                  placeholder="DESCRIBE YOUR ARCHITECTURE..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                ></textarea>
              </div>
            </div>
            <button 
              onClick={handleNext}
              disabled={!formData.fullName}
              className="w-full bg-[#FA520F] text-white border-[3px] border-[#1a1608] shadow-[6px_6px_0px_0px_#1a1608] p-6 text-center transition-all hover:bg-[#1a1608] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed uppercase font-black tracking-tighter text-2xl"
            >
              Continue Integration →
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col">
              <h2 className="text-4xl font-black leading-none uppercase tracking-tight">Sync <br/> Data Source</h2>
            </div>
            <p className="text-lg font-bold leading-tight max-w-sm">Connect your development history to the synk.ai neural engine protocol.</p>
            
            <button 
              onClick={syncGitHub}
              className="w-full bg-gradient-to-r from-[#FA520F] via-[#FFD700] to-[#4facfe] border-[3px] border-[#1a1608] shadow-[8px_8px_0px_0px_#1a1608] p-8 group transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-between"
            >
              <span className="text-white text-3xl font-black uppercase italic tracking-tighter">
                {formData.githubSynced ? 'Source Synced' : 'Sync GitHub Profile'}
              </span>
              <span className={`material-symbols-outlined text-white text-5xl font-bold ${formData.githubSynced ? '' : 'animate-spin'}`} style={{ animationDuration: '3s' }}>
                sync_alt
              </span>
            </button>

            <div className="flex items-start gap-4 p-6 border-2 border-dashed border-[#1a1608] bg-[#FA520F]/5">
              <span className="material-symbols-outlined text-[#FA520F] font-bold">info</span>
              <p className="text-xs font-bold uppercase leading-tight">
                By entering, you agree to the synk.ai v2 neural protocols, data integrity standards, and ecosystem governance.
              </p>
            </div>

            <button 
              onClick={handleNext}
              className="w-full bg-[#1a1608] text-white border-[3px] border-[#1a1608] shadow-[6px_6px_0px_0px_#1a1608] p-6 text-center group transition-all hover:bg-[#FA520F] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-3"
            >
              <span className="text-3xl font-black uppercase tracking-tighter italic">Enter Ecosystem</span>
              <span className="material-symbols-outlined text-3xl font-bold">arrow_forward</span>
            </button>
          </div>
        )}
      </main>

      <footer className="p-6 border-t-[8px] border-[#1a1608] bg-[#1a1608] text-[#FFFAEB] flex justify-between items-center mt-auto">
        <div className="flex flex-col">
          <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-50 text-[#FA520F]">System Status</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">All Nodes Operational</span>
        </div>
        <div className="text-[8px] font-black tracking-widest uppercase opacity-50">
          © 2024 SYNK.AI FRONTIER
        </div>
      </footer>
    </div>
  );
}
