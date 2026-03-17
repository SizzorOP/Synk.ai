import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="flex h-screen overflow-hidden">
<aside className="w-72 glass-panel border-r border-primary/20 flex flex-col h-full z-20">
<div className="p-6 border-b border-primary/10 flex items-center gap-3">
<div className="size-8 bg-primary rounded flex items-center justify-center shadow-[0_0_15px_rgba(60,131,246,0.5)]">
<span className="material-symbols-outlined text-white text-xl">terminal</span>
</div>
<h2 className="text-lg font-bold tracking-tight neon-text-blue">SYNK.AI</h2>
</div>
<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-8 custom-scrollbar">
<div>
<h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 px-2">Quick Actions</h3>
<nav className="flex flex-col gap-1">
<Link href="/"className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary transition-all hover:bg-primary/20" >
<span className="material-symbols-outlined text-xl">search</span>
<span className="text-sm font-medium">Initiate Search</span>
</Link>
<Link href="/"className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all" >
<span className="material-symbols-outlined text-xl">description</span>
<span className="text-sm font-medium">View Protocol</span>
</Link>
<Link href="/synk-terminal"className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all" >
<span className="material-symbols-outlined text-xl">settings</span>
<span className="text-sm font-medium">Terminal Settings</span>
</Link>
</nav>
</div>
<div>
<h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 px-2">Active Contracts</h3>
<div className="flex flex-col gap-4 px-2">
<div className="space-y-2">
<div className="flex justify-between text-xs">
<span className="text-slate-300">AEON-5 Neural Link</span>
<span className="text-accent-cyan font-bold">84%</span>
</div>
<div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ width: '84%' }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-xs">
<span className="text-slate-300">Nexus Architecture</span>
<span className="text-accent-purple font-bold">42%</span>
</div>
<div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-accent-purple shadow-[0_0_8px_rgba(168,85,247,0.6)]" style={{ width: '42%' }}></div>
</div>
</div>
</div>
</div>
<div className="mt-auto glass-panel p-4 rounded-xl border border-primary/10">
<div className="flex items-center gap-3 mb-3">
<div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
<span className="text-xs font-medium text-slate-300">System Link Verified</span>
</div>
<div className="flex items-center justify-between">
<div className="flex -space-x-2">
<div className="size-7 rounded-full border-2 border-background-dark bg-slate-700 overflow-hidden" data-alt="User avatar 1">
<img alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEmIbKOOb6yq1cHzm_ciBZGXoX4xKVU9nMc3GOPPN5RKJ7-JZ3eUkdKGA9wEQhFSEiIxR94dNCWl6NNbKnuMFMmyMOGeR7N-prGQlR2_GRcMkcj5AUL3cX4N_Z7kszPMdaHput61Dr3zaSGcdmUErm2LIBvC3awIWK2DlhDtoksGRAPXjXNKZGpXcyGG_OremfaC0RiPcgIYInVqlvuLct-uPVqaYKW0U6AFJdTRrQFtQKiIgbhwE0-Fknaa9GuWjOuJTiETVcVw"/>
</div>
<div className="size-7 rounded-full border-2 border-background-dark bg-slate-700 overflow-hidden" data-alt="User avatar 2">
<img alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh2YgeNJ7YZ6y3prf4boKcLL94godduLTAnBw45U_uJpa9_UReXB9cSIAX-d5UcinVq8wc9sdJ8oxhpMoPMy2Sn30H7SKHWcz35i6hUjhbbr7fmeadEpoj2z0cGPY9NyKGMynNVmGBuFfIDU09iaNICe8hqbxYcG6fJMfbors3StDSnDvEHZNyFGJUir2zzxLFjWGihINfuMqYqeqK30pml7Ncd37SU9auMTVoKTyFmk8eVAUgIDQn-B_wUSe3FI5jfZmJUeyqAg"/>
</div>
<div className="size-7 rounded-full border-2 border-background-dark bg-slate-700 overflow-hidden flex items-center justify-center text-[10px] bg-slate-800">
                                +12
                            </div>
</div>
<button className="text-xs text-primary hover:underline">Manage Team</button>
</div>
</div>
</div>
</aside>
<main className="flex-1 flex flex-col h-full relative overflow-hidden">
<header className="h-20 glass-panel border-b border-primary/20 px-8 flex items-center justify-between z-10">
<div className="flex gap-12">
<div className="flex flex-col">
<span className="text-[10px] uppercase tracking-tighter text-slate-500">Sync Status</span>
<div className="flex items-center gap-2">
<span className="text-sm font-bold text-slate-100">OPTIMAL</span>
<span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
</div>
</div>
<div className="flex flex-col">
<span className="text-[10px] uppercase tracking-tighter text-slate-500">Neural Link</span>
<div className="flex items-center gap-2">
<span className="text-sm font-bold text-slate-100">STABLE</span>
<span className="material-symbols-outlined text-accent-cyan text-sm">wifi_tethering</span>
</div>
</div>
<div className="flex flex-col">
<span className="text-[10px] uppercase tracking-tighter text-slate-500">Active Nodes</span>
<div className="flex items-center gap-2">
<span className="text-sm font-bold text-slate-100">1,242</span>
<span className="material-symbols-outlined text-accent-purple text-sm">hub</span>
</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center gap-2 px-3 py-1.5 glass-panel rounded-lg border border-primary/20">
<span className="material-symbols-outlined text-slate-400 text-lg">search</span>
<input className="bg-transparent border-none focus:ring-0 text-sm w-48 text-slate-200 placeholder:text-slate-600" placeholder="Omni-search..." type="text"/>
</div>
<button className="size-10 flex items-center justify-center glass-panel rounded-lg border border-primary/20 text-slate-400 hover:text-primary hover:border-primary/50 transition-all">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="size-10 rounded-full border border-primary/40 p-0.5" data-alt="Main user profile picture">
<img alt="User" className="rounded-full w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdQq48tL18HZcdZy1X2aDsLvuxO2EkpKnLW4H5czigX400wfHfOunfUGxRXwTmnCaFW6azZ6P16gr7lw5drFsIgAazu3ZzZs7iSBzqnsLYFzgcoKYCDZ2dlECqAlrvH8YjFizOTw7GuWVD0dI3S07dxl_WpPuIp0_VNkyjX_dQIrFdIXhoVaVjyOcR4WjM9LihaHAf9TwmBBUTXV0uGy8dacwWmXlt2ZEZdUltqqx4tZV1XUyXlIElZZzdT_D8MG0h6YTtBmqdmQ"/>
</div>
</div>
</header>
<div className="flex-1 overflow-y-auto p-8 custom-scrollbar pb-32">
<div className="mb-8 flex items-center justify-between">
<div>
<h1 className="text-2xl font-bold tracking-tight text-slate-100">Neural Feed</h1>
<p className="text-slate-400 text-sm">Latest high-match pings from your network</p>
</div>
<div className="flex gap-2">
<button className="px-4 py-2 rounded-lg text-xs font-bold border border-primary/20 bg-primary/5 text-primary">All Updates</button>
<button className="px-4 py-2 rounded-lg text-xs font-bold border border-transparent text-slate-500 hover:text-slate-300">Talent</button>
<button className="px-4 py-2 rounded-lg text-xs font-bold border border-transparent text-slate-500 hover:text-slate-300">Projects</button>
</div>
</div>
<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
<div className="glass-panel rounded-xl border border-primary/20 overflow-hidden break-inside-avoid glow-border group">
<div className="relative h-48 bg-slate-800" data-alt="Futuristic neon city project visual">
<img alt="Project AEON" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN0_AejjWOcHkiEHmPiUiRbdNTUVbED6q4UZnfOqEKEextsNkNuRk8DXFbEmBrcxPbZmvScirlFhW4RbAzzc3Pr-ggfbhmGz3asC5iWh7ne3IKMXb1ILvHHJopRPywET8EQ8rjbapSQbpqbd5yxVBPHX_DOZ0mgiJBZA_I4rsmk33-gOZrEmxqGfB8YYfDhqbSwCefF4x6pL_0xYG9FdpUEpRPF64Pu-Kjp8vHsv1RuJTYdUzr1Dg9aYe-iQj188V5ky4Z_PmCxA"/>
<div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background-dark/80 backdrop-blur-md border border-accent-cyan/50 text-accent-cyan text-xs font-bold neon-text-blue">
                                98% MATCH
                            </div>
</div>
<div className="p-5 space-y-4">
<div>
<h3 className="font-bold text-lg text-slate-100">Project: AEON-5</h3>
<p className="text-slate-400 text-sm line-clamp-2">Neural architecture redesign for deep-sea data centers. High priority link required.</p>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] text-primary uppercase font-bold tracking-wider">Neural Link</span>
<span className="px-2 py-1 rounded-md bg-accent-purple/10 border border-accent-purple/20 text-[10px] text-accent-purple uppercase font-bold tracking-wider">Infrastructure</span>
</div>
<button className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(60,131,246,0.4)] hover:bg-primary/90 transition-all">Interface Request</button>
</div>
</div>
<div className="glass-panel rounded-xl border border-primary/20 p-5 break-inside-avoid glow-border hover:border-accent-purple/50 transition-all">
<div className="flex items-center justify-between mb-4">
<div className="size-12 rounded-lg border border-accent-purple/40 overflow-hidden" data-alt="Portrait of a tech professional">
<img alt="Talent" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7jeKru7-nSEtWSdiOPAAOYuiugYFTTLFZyGRuwrsUVonlNdSHHwq733zot6kk7XgN7Xo8wi31zG7QatZE5mK9xggUu4YcpuVIWjrvO1CmBKiY5d30z_L_gSqaRtx3oLwSO9lDsUA_YH_xK92NH8afMGQ9-bNogoT5BNQdgJjn2k0bT0h2dVUFYsKEeSdqDb2nRs3jvz3Y13IqLFZtK2v2IVURkwoLM7I8q6yhYshJjpnZ3QSVeDkg2prtq0Ebro7W0J-ghyuSYA"/>
</div>
<div className="text-right">
<div className="text-accent-purple text-xs font-bold neon-text-purple">94% MATCH</div>
<div className="text-[10px] text-slate-500">Lead Architect</div>
</div>
</div>
<div className="space-y-3">
<h3 className="font-bold text-slate-100">Marcus Thorne</h3>
<p className="text-slate-400 text-sm">Specialist in decentralized autonomous protocols. Previously at Synk.Core.</p>
<div className="flex gap-3 pt-2">
<div className="flex-1 border border-primary/20 rounded-lg p-2 bg-primary/5 text-center">
<div className="text-[10px] text-slate-500 uppercase">Latency</div>
<div className="text-xs font-bold text-slate-200">14ms</div>
</div>
<div className="flex-1 border border-accent-purple/20 rounded-lg p-2 bg-accent-purple/5 text-center">
<div className="text-[10px] text-slate-500 uppercase">Trust</div>
<div className="text-xs font-bold text-slate-200">9.8/10</div>
</div>
</div>
</div>
</div>
<div className="glass-panel rounded-xl border border-primary/20 overflow-hidden break-inside-avoid glow-border group">
<div className="relative h-40 bg-slate-800" data-alt="Abstract purple network node visualization">
<img alt="Nexus Protocol" className="w-full h-full object-cover opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF9vNoWX5Hn7FDpl9SFL79E0bAl-RPNsPXpm15lGFrKj063Mt7Yrx62Z-rderxDZPZkBeBsdbi1diXZCK8hdE83iiuNtK8jq2vAlHVL0JGWQHf0_gCmgdqR0whM95Hpkkihb4PRZXrUAAWKg4epHefV8saoGRMxok_lt5SBVrb7Dd7DhEwaVYL0C1KQ51g1CXVyueP2kbnIH6Y6z6qCwwnBtq_JJRBjEtZSjQM15Px-FX0eaS_mj7gjfn6YmuVPNlICqEcrgaH_w"/>
<div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background-dark/80 backdrop-blur-md border border-accent-cyan/50 text-accent-cyan text-xs font-bold">
                                91% MATCH
                            </div>
</div>
<div className="p-5">
<h3 className="font-bold text-slate-100">Nexus Protocol Ping</h3>
<p className="text-slate-400 text-sm mt-2">Anomaly detected in sub-layer 4. Optimization required to maintain neural stability.</p>
<div className="mt-4 flex items-center justify-between">
<span className="text-[10px] text-slate-500">2 MINUTES AGO</span>
<button className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                    ANALYZE <span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
<div className="glass-panel rounded-xl border border-primary/20 p-5 break-inside-avoid glow-border group">
<div className="flex gap-4 items-start">
<div className="size-14 rounded-full border-2 border-primary/30 p-1 flex-shrink-0" data-alt="AI assistant avatar icon">
<div className="w-full h-full rounded-full bg-gradient-to-tr from-primary to-accent-purple animate-pulse"></div>
</div>
<div className="space-y-1">
<div className="flex items-center gap-2">
<h3 className="font-bold text-slate-100">System Notification</h3>
<span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-500 text-[8px] font-bold">URGENT</span>
</div>
<p className="text-slate-400 text-sm italic">"Your profile synchronization has reached a new threshold. Unlock advanced node control?"</p>
<div className="pt-3 flex gap-2">
<button className="px-3 py-1 bg-primary/20 border border-primary/40 rounded text-[10px] font-bold text-primary">ACCEPT</button>
<button className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] font-bold text-slate-400">DISMISS</button>
</div>
</div>
</div>
</div>
<div className="glass-panel rounded-xl border border-primary/20 p-5 break-inside-avoid glow-border hover:border-accent-cyan/50 transition-all">
<div className="flex items-center justify-between mb-4">
<div className="size-12 rounded-lg border border-accent-cyan/40 overflow-hidden" data-alt="Security specialist profile image">
<img alt="Talent" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnD_F6qcMJaAMg8b01wVCT1XQY0jcfBHHSzFSK_CXaynwLzZfCjdW7wsozhcko89CrjXjxAhiQfEgncpQWOeD7CRnbbIgTJf-joYIU_Re8dyNl2XkAlR-ry0iipsyB7bFfDR0jlAvtxI_2_0KH5LsTcVPYD3i4PL6L1NN9aqp2e390sQnB5QFBV080vnujiml-UdMt34YrEukC4XSsO2J5QsKiR5PTug3Wmlf9PuSRc_9FhcOWXWzi0MULzp7eQf6gaEZQw32-Kg"/>
</div>
<div className="text-right">
<div className="text-accent-cyan text-xs font-bold neon-text-blue">89% MATCH</div>
<div className="text-[10px] text-slate-500">Security Expert</div>
</div>
</div>
<div className="space-y-3">
<h3 className="font-bold text-slate-100">Elena Rossi</h3>
<p className="text-slate-400 text-sm">Offensive security specialist. Expert in biometric bypass protocols.</p>
<div className="flex flex-wrap gap-1">
<span className="px-2 py-0.5 bg-slate-800 rounded text-[9px] text-slate-400 border border-slate-700">Exploitation</span>
<span className="px-2 py-0.5 bg-slate-800 rounded text-[9px] text-slate-400 border border-slate-700">Encrypted Comms</span>
</div>
</div>
</div>
</div>
</div>
<div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8 z-30">
<div className="glass-panel rounded-2xl border border-primary/30 p-2 shadow-[0_0_30px_rgba(60,131,246,0.2)]">
<div className="flex items-center gap-3 px-4 py-2 bg-background-dark/40 rounded-xl border border-primary/10">
<span className="text-primary font-mono font-bold text-sm">$</span>
<input className="bg-transparent border-none focus:ring-0 text-sm flex-1 text-slate-200 placeholder:text-slate-600 font-mono" placeholder="Enter command... (e.g. /hire, /chat, /sync)" type="text"/>
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-500 font-mono">CMD+K</span>
<button className="size-8 flex items-center justify-center bg-primary rounded-lg text-white shadow-[0_0_10px_rgba(60,131,246,0.5)]">
<span className="material-symbols-outlined text-sm">keyboard_return</span>
</button>
</div>
</div>
</div>
</div>
<div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
<div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full"></div>
<div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-purple/5 blur-[100px] rounded-full"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" ></div>
</div>
</main>
</div>

    </div>
  );
}
