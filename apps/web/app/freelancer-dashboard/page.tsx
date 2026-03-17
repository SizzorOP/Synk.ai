import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
{/* Top Navigation Bar */}
<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-10 py-3 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
<div className="flex items-center gap-8">
<div className="flex items-center gap-3 text-primary">
<div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
<span className="material-symbols-outlined">hub</span>
</div>
<h2 className="text-white text-xl font-black leading-tight tracking-tighter uppercase">Synk.ai</h2>
</div>
<nav className="hidden md:flex items-center gap-9">
<Link href="/freelancer-dashboard"className="text-slate-100 text-sm font-semibold leading-normal hover:text-primary transition-colors" >Dashboard</Link>
<Link href="/"className="text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" >Opportunities</Link>
<Link href="/earnings"className="text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" >Earnings</Link>
<Link href="/portfolio"className="text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" >Portfolio</Link>
</nav>
</div>
<div className="flex flex-1 justify-end gap-6 items-center">
<label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
<div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-primary/5 border border-primary/10">
<div className="text-slate-400 flex items-center justify-center pl-4">
<span className="material-symbols-outlined !text-lg">search</span>
</div>
<input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-slate-100 placeholder:text-slate-500 text-sm" placeholder="Search projects..."/>
</div>
</label>
<div className="flex gap-3">
<button className="flex items-center justify-center rounded-lg size-10 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
<span className="material-symbols-outlined !text-xl">notifications</span>
</button>
<button className="flex items-center justify-center rounded-lg size-10 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
<span className="material-symbols-outlined !text-xl">settings</span>
</button>
</div>
<div className="flex items-center gap-3 pl-4 border-l border-primary/10">
<div className="flex flex-col items-end mr-2">
<span className="text-xs font-bold text-primary">0xTech_Runner</span>
<span className="text-[10px] text-slate-500 uppercase tracking-widest">Level 4 Operator</span>
</div>
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30" data-alt="Futuristic neon-lit avatar profile photo" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuBttI9oNv7zUeehsxFSNnyODidnWS0rHRkIXBiygv1eCVoW0nFFCX8MOEaHt1reErvKHSpzaesr11sPW-I00zxobXD1X8Lmed_oUhiKg86GhcAgv-k6Z8wfuiYHQ_NrXBofDABYCtdRajpc3c8SMztoMgOcoV8E1ckbedWmFWOX5XVlSpdl8RkCY7vEpaW8l_LQqFyQI6VV5UYX53fxUGxLFncSSMmfBdaUtpgKqUBa4IdbSjNRbeE2n-r7jmbVsuKomm5TFwJZcQ"}')` }}></div>
</div>
</div>
</header>
<main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-8 flex flex-col gap-8">
{/* Hero Section */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
<div className="flex flex-col gap-2">
<h1 className="text-white text-4xl font-black leading-tight tracking-tight">
                    Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-neon">Tech-Runner</span>
</h1>
<p className="text-slate-400 text-lg">Your neural matching performance is peaking. <span className="text-primary font-bold">+12% visibility</span> this cycle.</p>
</div>
<div className="flex gap-3">
<button className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2 neon-glow">
<span className="material-symbols-outlined">bolt</span>
                    Sync Now
                </button>
</div>
</div>
{/* Quick Stats Grid (Glassmorphism) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<div className="glass-panel rounded-xl p-6 flex flex-col gap-1 border-l-4 border-l-primary">
<span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Match Rate</span>
<div className="flex items-baseline gap-2">
<span className="text-white text-3xl font-black">94.8%</span>
<span className="text-green-400 text-sm font-bold flex items-center"><span className="material-symbols-outlined !text-sm">trending_up</span> 5.2%</span>
</div>
<div className="w-full bg-primary/10 h-1.5 rounded-full mt-2">
<div className="bg-primary h-full rounded-full" style={{ width: '94%' }}></div>
</div>
</div>
<div className="glass-panel rounded-xl p-6 flex flex-col gap-1">
<span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Bids</span>
<div className="flex items-baseline gap-2">
<span className="text-white text-3xl font-black">12</span>
<span className="text-slate-500 text-sm">/ 20 slots</span>
</div>
<p className="text-[10px] text-slate-500 mt-2 uppercase">Next refresh in 4h 12m</p>
</div>
<div className="glass-panel rounded-xl p-6 flex flex-col gap-1">
<span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Neural Views</span>
<div className="flex items-baseline gap-2">
<span className="text-white text-3xl font-black">1,248</span>
<span className="text-green-400 text-sm font-bold flex items-center"><span className="material-symbols-outlined !text-sm">trending_up</span> 18%</span>
</div>
<p className="text-[10px] text-slate-500 mt-2 uppercase">Global reach increasing</p>
</div>
<div className="glass-panel rounded-xl p-6 flex flex-col gap-1 bg-primary/10 border border-primary/30">
<span className="text-primary text-xs font-bold uppercase tracking-widest">Est. Earnings</span>
<div className="flex items-baseline gap-2">
<span className="text-white text-3xl font-black">$4,820</span>
</div>
<span className="text-[10px] text-primary/70 mt-2 uppercase font-bold tracking-tighter">Withdrawal Available</span>
</div>
</div>
{/* Main Dashboard Content */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* Left Column: Opportunities & Performance */}
<div className="lg:col-span-2 flex flex-col gap-8">
{/* Earnings Visualization (Neon Purple Chart Placeholder) */}
<div className="glass-panel rounded-xl p-6 flex flex-col gap-6 overflow-hidden relative">
<div className="flex justify-between items-center">
<h3 className="text-white text-lg font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-primary">monitoring</span>
                            Earnings Velocity
                        </h3>
<div className="flex bg-background-dark rounded-lg p-1 border border-primary/20">
<button className="px-3 py-1 text-xs font-bold text-white bg-primary rounded">WEEK</button>
<button className="px-3 py-1 text-xs font-bold text-slate-500">MONTH</button>
</div>
</div>
{/* Chart Simulation */}
<div className="h-64 w-full relative mt-4">
<svg className="w-full h-full" viewBox="0 0 800 200">
<defs>
<linearGradient id="purpleGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#a855f7" stopOpacity="0.4"></stop>
<stop offset="100%" stopColor="#a855f7" stopOpacity="0"></stop>
</linearGradient>
</defs>
<path d="M0,150 Q100,140 200,100 T400,120 T600,60 T800,80 L800,200 L0,200 Z" fill="url(#purpleGrad)"></path>
<path d="M0,150 Q100,140 200,100 T400,120 T600,60 T800,80" fill="none" stroke="#a855f7" strokeLinecap="round" strokeWidth="4"></path>
<circle className="neon-glow" cx="200" cy="100" fill="#a855f7" r="6"></circle>
<circle className="neon-glow" cx="600" cy="60" fill="#a855f7" r="6"></circle>
</svg>
<div className="absolute top-10 left-[25%] bg-background-dark border border-primary/40 px-3 py-1.5 rounded-lg shadow-xl">
<span className="text-[10px] text-slate-400 block uppercase font-bold">Peak</span>
<span className="text-white text-sm font-black">$1,240.00</span>
</div>
</div>
</div>
{/* Proof of Work Upload Section */}
<div className="glass-panel rounded-xl p-6 flex flex-col gap-6 border border-dashed border-primary/30">
<div className="flex justify-between items-center">
<h3 className="text-white text-lg font-bold flex items-center gap-2 uppercase tracking-wide">
<span className="material-symbols-outlined text-primary">videocam</span>
                            Manage Proof-of-Work
                        </h3>
<button className="text-primary text-xs font-bold uppercase hover:underline">View All Reels</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="group relative aspect-video bg-background-dark rounded-lg overflow-hidden border border-primary/10 cursor-pointer">
<div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-white text-4xl">play_circle</span>
</div>
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="Retro tech workspace aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh7TdgXR0ivkDEDIHx0LuLPHXAKIwbDJ9Xp3A7pjq82KUFnRfoZbpe4p-m7tYMOTjKhb3p4pgEHcmH9p-QQ7tJi1xoU9V62IteTGLjOL0JRg3JL4EZCxZwAcDJGwdo2YkCnp6LrhIpnwkvuPqKYINH24bTsRscFmxC4mo8elTF1xPRQmBW2RDB0zUR11-R6fdM69B2uJHHM-yQ_Job44UX6UBzK9HdY81qH_6XNLAKPMHA_Bq8NoZofmHc3A0uwXddG-NYZ-MwWQ"/>
<div className="absolute bottom-2 left-2 right-2">
<span className="text-[10px] bg-background-dark/80 px-2 py-0.5 rounded text-primary font-bold">REEL_01.MP4</span>
</div>
</div>
<div className="group relative aspect-video bg-background-dark rounded-lg overflow-hidden border border-primary/10 cursor-pointer">
<div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-white text-4xl">play_circle</span>
</div>
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="Cybernetic robot hand interacting with glass screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-gFBG_X66j73Iy8CDS8OeDseyyCHjIdCqrV9iaXpZ2AqXmVxhVwc3pNDMT_w25UrrhJ1djr3jGhahr3zPGuZlTVltoTe8xSVAtSQNMu2y84XZYazwYbYdLeH4ulMiuX3-KjZeoQlL7Ah5DUjuieOQR1Y8mhIF3lAY5Cj5RoyBKLYWFwP193rfpQ_aX_fIMA_ViL8mxN-5oENKN5QfhViYiRDjU-w1HJ1hwTrUe3dPqypck-pCxhlAO27l0hXOc5iXHxJyapMxiQ"/>
<div className="absolute bottom-2 left-2 right-2">
<span className="text-[10px] bg-background-dark/80 px-2 py-0.5 rounded text-primary font-bold">DEMO_AI.MP4</span>
</div>
</div>
<div className="aspect-video bg-primary/5 border-2 border-dashed border-primary/20 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-primary/10 transition-colors cursor-pointer group">
<span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add_circle</span>
<span className="text-[10px] font-bold text-primary uppercase tracking-widest">Upload Media</span>
</div>
</div>
</div>
</div>
{/* Right Column: Opportunity Alerts */}
<div className="flex flex-col gap-6">
<div className="glass-panel rounded-xl p-6 flex flex-col gap-6 h-full border-t-4 border-t-accent-neon">
<div className="flex items-center justify-between">
<h3 className="text-white text-lg font-bold flex items-center gap-2 uppercase tracking-wide">
<span className="material-symbols-outlined text-accent-neon">radar</span>
                            Opportunity Radar
                        </h3>
<span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-black">4 NEW</span>
</div>
<div className="flex flex-col gap-4">
{/* Opportunity 1 */}
<div className="p-4 rounded-lg bg-background-dark/40 border border-primary/10 hover:border-primary/40 transition-all group cursor-pointer">
<div className="flex justify-between items-start mb-2">
<span className="text-primary text-[10px] font-black uppercase tracking-tighter">AI Training Protocol</span>
<span className="text-slate-500 text-[10px]">2m ago</span>
</div>
<h4 className="text-white font-bold text-sm mb-1 group-hover:text-primary transition-colors">Neural Mesh Architect</h4>
<p className="text-slate-500 text-xs mb-3">Optimize decentralized GPU clusters for LLM inference.</p>
<div className="flex justify-between items-center">
<span className="text-accent-neon font-black text-xs">$85/hr</span>
<span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">98% Match</span>
</div>
</div>
{/* Opportunity 2 */}
<div className="p-4 rounded-lg bg-background-dark/40 border border-primary/10 hover:border-primary/40 transition-all group cursor-pointer">
<div className="flex justify-between items-start mb-2">
<span className="text-primary text-[10px] font-black uppercase tracking-tighter">Smart Contract Audit</span>
<span className="text-slate-500 text-[10px]">14m ago</span>
</div>
<h4 className="text-white font-bold text-sm mb-1 group-hover:text-primary transition-colors">Solidity Hardener v2</h4>
<p className="text-slate-500 text-xs mb-3">Post-quantum security audit for L2 bridge architecture.</p>
<div className="flex justify-between items-center">
<span className="text-accent-neon font-black text-xs">$120/hr</span>
<span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">92% Match</span>
</div>
</div>
{/* Opportunity 3 */}
<div className="p-4 rounded-lg bg-background-dark/40 border border-primary/10 hover:border-primary/40 transition-all group cursor-pointer opacity-80">
<div className="flex justify-between items-start mb-2">
<span className="text-primary text-[10px] font-black uppercase tracking-tighter">UI Design Interface</span>
<span className="text-slate-500 text-[10px]">1h ago</span>
</div>
<h4 className="text-white font-bold text-sm mb-1 group-hover:text-primary transition-colors">Meta-Human HUD Kit</h4>
<p className="text-slate-500 text-xs mb-3">Spatial computing interfaces for AR glasses deployment.</p>
<div className="flex justify-between items-center">
<span className="text-accent-neon font-black text-xs">$6,500 Fix</span>
<span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">88% Match</span>
</div>
</div>
</div>
<button className="w-full mt-auto py-3 bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase rounded-lg hover:bg-primary/10 transition-colors tracking-widest">
                        Access Global Hub
                    </button>
</div>
</div>
</div>
</main>
{/* Footer / Status Bar */}
<footer className="mt-auto px-10 py-4 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center bg-background-dark/50">
<div className="flex items-center gap-6 mb-4 md:mb-0">
<div className="flex items-center gap-2">
<span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
<span className="text-[10px] text-slate-500 uppercase font-bold">Neural Link: Stable</span>
</div>
<div className="flex items-center gap-2">
<span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Region: NEO-TOKYO_01</span>
</div>
</div>
<div className="flex gap-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
<Link href="/"className="hover:text-primary transition-colors" >Privacy Protocol</Link>
<Link href="/"className="hover:text-primary transition-colors" >Service Terms</Link>
<Link href="/"className="hover:text-primary transition-colors" >© 2024 SYNK.AI</Link>
</div>
</footer>
</div>

    </div>
  );
}
