'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import CreationModal from '../components/CreationModal';

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<'creator' | 'partner'>('creator');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('synkai_role') as 'creator' | 'partner';
    if (savedRole) setRole(savedRole);
  }, []);

  return (
    <div className="bg-[#FFFAEB] text-slate-900 font-display min-h-screen bg-[radial-gradient(circle,#00000015_1px,transparent_1px)] bg-[length:20px_20px]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#FFFAEB] border-b-[3px] border-slate-900 px-4 py-4 flex items-center justify-between shadow-[0_4px_0px_0px_#000]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-900 font-black">menu</span>
          <h1 className="text-xl font-black tracking-tighter uppercase leading-none">SYNK.AI // V2</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center p-1 border-[3px] border-slate-900 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all hover:bg-[#FA520F] group text-slate-900 hover:text-white">
            <span className="material-symbols-outlined font-black">notifications</span>
          </button>
        </div>
      </header>

      {children}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-slate-900 text-white flex items-center justify-center border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FA520F] transition-all hover:-translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1 z-40 group"
      >
        <span className="material-symbols-outlined text-3xl font-black group-hover:rotate-90 transition-transform">add</span>
      </button>

      <CreationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 border-t-[4px] border-slate-900 bg-[#FFFAEB] z-40">
        <div className="flex h-20 items-stretch">
          <Link href="/community" className={`flex-1 flex flex-col items-center justify-center gap-1 border-r-[3px] border-slate-900 transition-colors ${pathname === '/community' ? 'bg-[#FA520F] text-white' : 'text-slate-900 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined font-black">home</span>
            <span className="text-[10px] font-black uppercase">Home</span>
          </Link>
          <Link href="/community/explore" className={`flex-1 flex flex-col items-center justify-center gap-1 border-r-[3px] border-slate-900 transition-colors ${pathname === '/community/explore' ? 'bg-[#FA520F] text-white' : 'text-slate-900 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined font-black">explore</span>
            <span className="text-[10px] font-black uppercase">Explore</span>
          </Link>
          <Link href="/community/jobs" className={`flex-1 flex flex-col items-center justify-center gap-1 border-r-[3px] border-slate-900 transition-colors ${pathname === '/community/jobs' ? 'bg-[#FA520F] text-white' : 'text-slate-900 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined font-black">{role === 'creator' ? 'work' : 'assignment'}</span>
            <span className="text-[10px] font-black uppercase">{role === 'creator' ? 'Jobs' : 'My Posts'}</span>
          </Link>
          <Link href="/profile" className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/profile' ? 'bg-[#FA520F] text-white' : 'text-slate-900 hover:bg-slate-100'}`}>
            <span className="material-symbols-outlined font-black">person</span>
            <span className="text-[10px] font-black uppercase">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
