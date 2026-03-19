'use client';

import Link from 'next/link';

export default function SynkTerminal() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar: Control Panel */}
      <aside className="w-80 border-r border-outline-variant bg-surface-container-low flex flex-col architect-grid overflow-hidden">
        <div className="p-8 border-b border-outline-variant">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Terminal System</span>
           <h2 className="text-2xl font-black tracking-tighter uppercase italic leading-none">Synk.v2</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
           <div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 mb-6">Operations</h3>
             <nav className="space-y-2">
                <Link href="#" className="flex items-center gap-4 p-4 border border-primary bg-primary text-on-primary">
                   <span className="material-symbols-outlined text-sm">search</span>
                   <span className="text-[11px] font-black uppercase tracking-widest">Global Scan</span>
                </Link>
                <Link href="#" className="flex items-center gap-4 p-4 border border-outline-variant text-on-surface hover:bg-surface-container transition-all">
                   <span className="material-symbols-outlined text-sm">radar</span>
                   <span className="text-[11px] font-black uppercase tracking-widest">Node Radar</span>
                </Link>
                <Link href="#" className="flex items-center gap-4 p-4 border border-outline-variant text-on-surface hover:bg-surface-container transition-all">
                   <span className="material-symbols-outlined text-sm">hub</span>
                   <span className="text-[11px] font-black uppercase tracking-widest">Protocol Mesh</span>
                </Link>
             </nav>
           </div>

           <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 mb-6">Active Syncs</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                       <span>Aeon-5 Link</span>
                       <span className="text-primary italic">84%</span>
                    </div>
                    <div className="h-1 bg-surface-container-highest">
                       <div className="h-full bg-primary" style={{ width: '84%' }}></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                       <span>Nexus Auth</span>
                       <span className="text-secondary italic">42%</span>
                    </div>
                    <div className="h-1 bg-surface-container-highest">
                       <div className="h-full bg-secondary" style={{ width: '42%' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 border-t border-outline-variant bg-surface-container">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-primary animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest">System Optimal</span>
           </div>
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-none border border-on-surface bg-surface-container-highest overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Peer" />
                </div>
              ))}
              <div className="w-8 h-8 border border-on-surface bg-on-surface text-surface flex items-center justify-center text-[10px] font-black">+12</div>
           </div>
        </div>
      </aside>

      {/* Main Execution Environment */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
         <header className="h-24 border-b border-outline-variant px-12 flex items-center justify-between architect-grid-fine bg-surface-container-lowest/50 backdrop-blur-md">
            <div className="flex gap-16">
               <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Latency</span>
                  <span className="text-xl font-black tracking-tighter italic">14ms</span>
               </div>
               <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Uptime</span>
                  <span className="text-xl font-black tracking-tighter italic">99.9%</span>
               </div>
               <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Trust Index</span>
                  <span className="text-xl font-black tracking-tighter italic text-primary">9.8/10</span>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <button className="material-symbols-outlined p-2 border border-outline-variant hover:bg-surface-container transition-all">notifications</button>
               <div className="w-10 h-10 border-2 border-primary overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="User" />
               </div>
            </div>
         </header>

         <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
            <div className="mb-12 flex justify-between items-end">
               <div>
                  <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Neural Feed</h1>
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em] mt-3">Monitoring High-Match Anomalies</p>
               </div>
               <div className="flex border border-outline-variant">
                  <button className="px-6 py-2 bg-on-surface text-surface text-[10px] font-black uppercase tracking-widest">Timeline</button>
                  <button className="px-6 py-2 hover:bg-surface-container text-[10px] font-black uppercase tracking-widest transition-all">Map</button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
               {/* Card 01 */}
               <article className="border border-outline-variant bg-surface-container-low group hover:border-primary transition-all duration-500 overflow-hidden">
                  <div className="h-48 bg-surface-container-highest relative overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800" alt="AEON-5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" />
                     <div className="absolute top-0 right-0 py-1 px-4 bg-primary text-on-primary text-[10px] font-black">98% SYNC</div>
                  </div>
                  <div className="p-8 space-y-6">
                     <h3 className="text-2xl font-black uppercase tracking-tight italic">Protocol AEON-5</h3>
                     <p className="text-sm font-medium text-stone-500 leading-relaxed">Infrastructure redesign for deep-sea compute nodes. Verification required.</p>
                     
                     <div className="pt-6 border-t border-outline-variant/30 flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase tracking-widest py-1 px-2 bg-surface-container-highest">Hardware</span>
                        <button className="text-[11px] font-black uppercase tracking-widest text-primary hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                           Interface
                           <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                     </div>
                  </div>
               </article>

               {/* Card 02 */}
               <article className="border border-outline-variant p-8 bg-on-surface text-surface flex flex-col justify-between">
                  <div className="space-y-4">
                     <div className="flex justify-between items-start">
                        <div className="w-12 h-12 border border-surface bg-surface flex items-center justify-center">
                           <span className="material-symbols-outlined text-on-surface">warning</span>
                        </div>
                        <span className="text-primary font-black italic tracking-tighter">94% MATCH</span>
                     </div>
                     <h3 className="text-2xl font-black uppercase tracking-tight italic">System Alert</h3>
                     <p className="text-surface/60 text-sm font-medium leading-relaxed italic">"Synchronization integrity compromised in sub-layer 04. Optimization mandatory."</p>
                  </div>
                  
                  <div className="mt-12 flex gap-4">
                     <button className="flex-1 py-3 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest">Rectify</button>
                     <button className="flex-1 py-3 border border-surface text-[10px] font-black uppercase tracking-widest">Ignore</button>
                  </div>
               </article>

               {/* Card 03 */}
               <article className="border border-outline-variant bg-surface-container-low p-8 architect-grid">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-14 h-14 border border-outline-variant overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=elena" alt="Elena" />
                     </div>
                     <div>
                        <h4 className="font-black uppercase tracking-tight">Elena Rossi</h4>
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Security Specialist</p>
                     </div>
                  </div>
                  <p className="text-sm font-medium text-stone-500 mb-8 italic">"Biometric bypass successful on AEON-4 grid. Awaiting instruction."</p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 border border-outline-variant bg-surface-container">
                        <span className="text-[8px] font-bold text-stone-400 uppercase block mb-1">Latency</span>
                        <span className="text-sm font-black italic">12ms</span>
                     </div>
                     <div className="p-4 border border-outline-variant bg-surface-container">
                        <span className="text-[8px] font-bold text-stone-400 uppercase block mb-1">Trust</span>
                        <span className="text-sm font-black italic">9.9</span>
                     </div>
                  </div>
               </article>
            </div>
         </div>

         {/* Command Interface */}
         <div className="p-12 architect-grid-fine bg-surface-container-lowest border-t border-outline-variant">
            <div className="max-w-4xl mx-auto flex items-center gap-6 p-4 border-2 border-on-surface bg-surface-container-low focus-within:border-primary transition-colors">
               <span className="text-xl font-black italic text-primary">$</span>
               <input type="text" placeholder="ENTER SYSTEM COMMAND (e.g. /sync, /radar, /broadcast)" className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-black uppercase tracking-widest placeholder:text-stone-400" />
               <div className="flex items-center gap-4">
                  <span className="hidden md:block text-[9px] font-black text-stone-400 uppercase tracking-[0.2em]">Press [Enter] to Execute</span>
                  <button className="w-10 h-10 bg-on-surface text-surface flex items-center justify-center">
                     <span className="material-symbols-outlined text-sm">keyboard_return</span>
                  </button>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}
