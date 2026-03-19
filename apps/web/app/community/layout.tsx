'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<'creator' | 'partner'>('creator');

  useEffect(() => {
    const savedRole = localStorage.getItem('synkai_role') as 'creator' | 'partner';
    if (savedRole) setRole(savedRole);
  }, []);

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex architect-grid">
      {/* Sidebar Navigation */}
      <aside className="w-20 md:w-64 border-r border-outline-variant bg-surface-container-low flex flex-col fixed h-full z-40 overflow-y-auto no-scrollbar">
        <div className="p-6">
          <div className="text-xl font-black tracking-tighter text-[#b22206] hidden md:block">synk.ai</div>
          <div className="text-xl font-black tracking-tighter text-[#b22206] md:hidden">s.</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2 font-display">
          <Link
            href="/community"
            className={`flex items-center gap-4 px-3 py-3 rounded-none transition-all group ${
              pathname === '/community' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-bold text-xs uppercase tracking-widest hidden md:block">Home</span>
          </Link>
          <Link
            href="/community/explore"
            className={`flex items-center gap-4 px-3 py-3 rounded-none transition-all group ${
              pathname === '/community/explore' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined">explore</span>
            <span className="font-bold text-xs uppercase tracking-widest hidden md:block">Discover</span>
          </Link>
          <Link
            href="/community/rankings"
            className={`flex items-center gap-4 px-3 py-3 rounded-none transition-all group ${
              pathname === '/community/rankings' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-bold text-xs uppercase tracking-widest hidden md:block">Rankings</span>
          </Link>
          <Link
            href="/community/labs"
            className={`flex items-center gap-4 px-3 py-3 rounded-none transition-all group ${
              pathname === '/community/labs' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined">science</span>
            <span className="font-bold text-xs uppercase tracking-widest hidden md:block">Labs</span>
          </Link>
          {role === 'partner' && (
             <Link
             href="/community/jobs"
             className={`flex items-center gap-4 px-3 py-3 rounded-none transition-all group ${
               pathname === '/community/jobs' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'
             }`}
           >
             <span className="material-symbols-outlined">assignment</span>
             <span className="font-bold text-xs uppercase tracking-widest hidden md:block">My Posts</span>
           </Link>
          )}
        </nav>

        <div className="p-4 border-t border-outline-variant mt-auto space-y-4">
          <div className="flex items-center gap-3 md:px-2">
            <div className="w-10 h-10 bg-surface-container-highest border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div className="hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-tighter leading-none">Commander</p>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">v3.0 Verified</p>
            </div>
          </div>
          <Link href="/settings" className="flex items-center gap-4 px-3 py-3 text-on-surface-variant hover:bg-surface-container transition-all group">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-bold text-xs uppercase tracking-widest hidden md:block">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-20 md:ml-64 min-h-screen">
        <header className="h-16 border-b border-outline-variant bg-[#fcf9f8]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Network Status: <span className="text-secondary">Optimal</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-stone-400 hover:text-on-surface transition-colors">search</button>
            <button className="material-symbols-outlined text-stone-400 hover:text-on-surface transition-colors relative">
               notifications
               <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border border-surface"></span>
            </button>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
