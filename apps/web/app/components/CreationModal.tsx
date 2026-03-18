'use client';
import { useState } from 'react';

export default function CreationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'Post Project' | 'Create Job'>('Post Project');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#FFFAEB]/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:24px_24px] opacity-5 pointer-events-none"></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[540px] bg-white/70 backdrop-blur-xl border-[4px] border-black shadow-[16px_16px_0px_0px_#000] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-[4px] border-black bg-white">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#FA520F] font-black text-3xl">terminal</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none mt-1">synk.ai / initialize</h2>
          </div>
          <button onClick={onClose} className="flex h-12 w-12 items-center justify-center border-[3px] border-black hover:bg-[#FA520F] hover:text-white transition-colors group shadow-[3px_3px_0px_0px_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5">
            <span className="material-symbols-outlined font-black group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b-[4px] border-black bg-[#FFFAEB]">
          <button 
            onClick={() => setActiveTab('Post Project')}
            className={`flex-1 py-5 text-sm font-black uppercase tracking-widest border-r-[4px] border-black transition-colors ${activeTab === 'Post Project' ? 'bg-[#FA520F] text-white shadow-[inset_0_-6px_0_0_#000]' : 'text-slate-500 hover:bg-white'} `}
          >
            Post Project
          </button>
          <button 
            onClick={() => setActiveTab('Create Job')}
            className={`flex-1 py-5 text-sm font-black uppercase tracking-widest transition-colors ${activeTab === 'Create Job' ? 'bg-[#FA520F] text-white shadow-[inset_0_-6px_0_0_#000]' : 'text-slate-500 hover:bg-white'} `}
          >
            Create Job
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 space-y-8 bg-white/50">
          
          {activeTab === 'Post Project' ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Project Title Input */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest text-black">Project Identifier / Title</label>
                <input className="w-full h-16 bg-white border-[3px] border-black px-5 font-mono text-sm focus:ring-0 focus:border-[#FA520F] placeholder:opacity-30 shadow-[4px_4px_0px_0px_#000]" placeholder="PROJ_ALPHA_SYNTH" type="text"/>
              </div>

              {/* Media Upload Box */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest text-black">Asset Ingestion</label>
                <div className="border-[4px] border-dashed border-black bg-white/40 p-8 flex flex-col items-center justify-center gap-5 group cursor-pointer hover:bg-white transition-colors">
                  <div className="h-20 w-20 bg-black flex items-center justify-center group-hover:-translate-y-1 group-hover:bg-[#FA520F] transition-all">
                    <span className="material-symbols-outlined text-white text-4xl">upload_file</span>
                  </div>
                  <div className="text-center">
                    <p className="font-black text-sm uppercase text-black">Drop Technical Specs</p>
                    <p className="text-[10px] font-bold opacity-60 mt-2 uppercase tracking-widest text-black">Max 500MB .ZIP / .CAD / .PDF / .MP4</p>
                  </div>
                  <button className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest mt-2 group-hover:bg-[#FA520F] transition-colors shadow-[3px_3px_0px_0px_#000]">Browse Files</button>
                </div>
              </div>

              {/* GitHub URL Input */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest text-black">Source Control Repository</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-black font-black">link</span>
                  <input className="w-full h-16 bg-white border-[3px] border-black pl-14 pr-5 font-mono text-sm focus:ring-0 focus:border-[#FA520F] shadow-[4px_4px_0px_0px_#000]" placeholder="https://github.com/org/repo" type="url"/>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest text-black">Role Specification</label>
                <input type="text" placeholder="Lead Systems Architect" className="w-full h-16 bg-white border-[3px] border-black px-5 font-mono text-sm focus:ring-0 focus:border-[#FA520F] shadow-[4px_4px_0px_0px_#000]" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="block text-xs font-black uppercase tracking-widest text-black">Budget [USD]</label>
                    <input type="text" placeholder="120k - 180k" className="w-full h-16 bg-white border-[3px] border-black px-5 font-mono text-sm focus:ring-0 focus:border-[#FA520F] shadow-[4px_4px_0px_0px_#000]" />
                </div>
                <div className="space-y-3 relative">
                    <label className="block text-xs font-black uppercase tracking-widest text-black">Priority</label>
                    <select className="w-full h-16 bg-white border-[3px] border-black pl-5 pr-12 font-mono text-xs font-black uppercase focus:ring-0 focus:border-[#FA520F] appearance-none shadow-[4px_4px_0px_0px_#000]">
                        <option>CRITICAL</option>
                        <option>STANDARD</option>
                        <option>LOW_PRIORITY</option>
                    </select>
                    <span className="absolute right-5 top-[50px] material-symbols-outlined text-black font-black pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <div className="pt-8">
            <button className="bg-gradient-to-r from-[#FA520F] via-[#FF8A00] to-[#FFC700] w-full h-24 border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-4 group">
              <span className="material-symbols-outlined text-white font-black text-4xl group-hover:rotate-12 transition-transform">bolt</span>
              <span className="text-white font-black uppercase tracking-tighter text-3xl">Initialize Asset</span>
            </button>
          </div>

        </div>

        {/* Footer Meta */}
        <div className="px-8 pb-6 bg-white/50 flex items-center justify-between text-[10px] font-black tracking-widest opacity-40 uppercase">
          <span>Node: US-EAST-1</span>
          <span>v3.0.4-brutal</span>
        </div>
      </div>
    </div>
  );
}
