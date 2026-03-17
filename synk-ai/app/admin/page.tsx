import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="flex min-h-screen">
{/* Sidebar Navigation */}
<aside className="w-72 bg-slate-100 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full">
<div className="p-6">
<div className="flex items-center gap-3 mb-10">
<div className="size-10 rounded-lg bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white neon-glow-primary">
<span className="material-symbols-outlined">api</span>
</div>
<div>
<h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">Synk.ai</h1>
<p className="text-xs font-medium text-primary uppercase tracking-widest mt-1">Admin Portal</p>
</div>
</div>
<nav className="space-y-1">
<Link href="/freelancer-dashboard"className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20" >
<span className="material-symbols-outlined">dashboard</span>
<span className="font-medium">Overview</span>
</Link>
<Link href="/"className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" >
<span className="material-symbols-outlined">group</span>
<span className="font-medium">Users</span>
</Link>
<Link href="/"className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" >
<span className="material-symbols-outlined">gavel</span>
<span className="font-medium">Disputes</span>
</Link>
<Link href="/"className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" >
<span className="material-symbols-outlined">analytics</span>
<span className="font-medium">Analytics</span>
</Link>
<Link href="/settings"className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" >
<span className="material-symbols-outlined">settings</span>
<span className="font-medium">Settings</span>
</Link>
</nav>
</div>
<div className="mt-auto p-6">
<div className="p-4 rounded-xl bg-slate-200 dark:bg-slate-800/50 tech-border">
<div className="flex items-center gap-3">
<div className="size-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
<img alt="Admin Avatar" data-alt="Cyberpunk style professional male administrator avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTUvYFSP0WQYiM23W_LJFOR3pfL9IaVfxuMxNJ857ARXqG03kX9weiWqdmrtwVOIa89ODnqD3mRAwc3KV1rDyzTRA5MP__n8Uqovt--F46x01a_ZMeFeAgFeZ_iPFbfxYT4oNvzGmuthuDWeKF4tEPS7K1MGsjPs1-g0Ix4CK71WUyIbocoUAXlAc9u2JlGEXLmpLbmEIm6f_e9t3OYrXRZ40OenwM2nxDtBU4PK0M_A_plRKrj2-S8IMWmaS3PaGvgK9OM1nfXg"/>
</div>
<div>
<p className="text-sm font-bold">Alex Thorne</p>
<p className="text-xs text-slate-500">Super Admin</p>
</div>
</div>
</div>
</div>
</aside>
{/* Main Content Area */}
<main className="flex-1 ml-72">
<header className="h-20 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
<div className="flex flex-col">
<h2 className="text-xl font-bold">Platform Insights</h2>
<p className="text-sm text-slate-500 dark:text-slate-400">High-level overview of Synk.ai performance</p>
</div>
<div className="flex items-center gap-4">
<button className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white font-medium neon-glow-primary">
<span className="material-symbols-outlined text-sm">download</span>
                        Export Report
                    </button>
</div>
</header>
<div className="p-8 space-y-8">
{/* Key Metrics Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
<div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/20 transition-colors"></div>
<p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total GMV</p>
<h3 className="text-3xl font-black mt-2">$4.2M</h3>
<div className="flex items-center gap-1 mt-4 text-emerald-500 font-bold text-sm">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+5.4%</span>
<span className="text-slate-400 font-normal ml-1">vs last month</span>
</div>
</div>
<div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
<div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 rounded-bl-full -mr-8 -mt-8 group-hover:bg-accent-purple/20 transition-colors"></div>
<p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Matches</p>
<h3 className="text-3xl font-black mt-2">1,284</h3>
<div className="flex items-center gap-1 mt-4 text-emerald-500 font-bold text-sm">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+8.1%</span>
<span className="text-slate-400 font-normal ml-1">vs last month</span>
</div>
</div>
<div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
<div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/10 rounded-bl-full -mr-8 -mt-8 group-hover:bg-accent-cyan/20 transition-colors"></div>
<p className="text-sm font-medium text-slate-500 dark:text-slate-400">User Growth</p>
<h3 className="text-3xl font-black mt-2">+12%</h3>
<div className="flex items-center gap-1 mt-4 text-emerald-500 font-bold text-sm">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+2.3%</span>
<span className="text-slate-400 font-normal ml-1">vs last month</span>
</div>
</div>
</div>
{/* Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex items-center justify-between mb-6">
<h4 className="font-bold">User Growth Trend</h4>
<select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1 outline-none ring-0">
<option>Last 30 Days</option>
<option>Last 6 Months</option>
</select>
</div>
<div className="h-64 relative">
{/* SVG Chart Simulation */}
<svg className="w-full h-full" viewBox="0 0 400 150">
<defs>
<linearGradient id="gradient-blue" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#3c83f6" stopOpacity="0.4"></stop>
<stop offset="100%" stopColor="#3c83f6" stopOpacity="0"></stop>
</linearGradient>
</defs>
<path d="M0,120 Q50,110 80,80 T160,60 T240,90 T320,40 T400,20 V150 H0 Z" fill="url(#gradient-blue)"></path>
<path d="M0,120 Q50,110 80,80 T160,60 T240,90 T320,40 T400,20" fill="none" stroke="#3c83f6" strokeWidth="3"></path>
<circle className="neon-glow-primary" cx="320" cy="40" fill="#3c83f6" r="4"></circle>
</svg>
<div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
<span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
</div>
</div>
</div>
<div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex items-center justify-between mb-6">
<h4 className="font-bold">Match Conversion Rates</h4>
<div className="flex gap-2">
<div className="flex items-center gap-1 text-xs">
<span className="size-2 rounded-full bg-accent-purple"></span>
<span>Premium</span>
</div>
<div className="flex items-center gap-1 text-xs">
<span className="size-2 rounded-full bg-accent-cyan"></span>
<span>Standard</span>
</div>
</div>
</div>
<div className="h-64 relative">
{/* SVG Chart Simulation 2 */}
<svg className="w-full h-full" viewBox="0 0 400 150">
<path d="M0,100 C50,90 100,110 150,70 S250,30 300,50 S400,10 400,10" fill="none" stroke="#a855f7" stroke-dasharray="4" strokeWidth="3"></path>
<path d="M0,130 C50,120 100,130 150,110 S250,90 300,100 S400,70 400,70" fill="none" stroke="#06b6d4" strokeWidth="3"></path>
</svg>
<div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
<span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
</div>
</div>
</div>
</div>
{/* Tables / Lists Section */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
{/* Flagged Profiles */}
<div className="xl:col-span-1 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex items-center justify-between mb-6">
<h4 className="font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-rose-500">warning</span>
                                Flagged Profiles
                            </h4>
<span className="bg-rose-500/20 text-rose-500 text-[10px] font-bold px-2 py-0.5 rounded-full">4 ALERT</span>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 tech-border">
<div className="flex items-center gap-3">
<div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
<span className="material-symbols-outlined text-slate-500">person</span>
</div>
<div>
<p className="text-sm font-bold">Vector_X</p>
<p className="text-xs text-slate-500">Suspected Botting</p>
</div>
</div>
<button className="text-slate-400 hover:text-rose-500">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 tech-border">
<div className="flex items-center gap-3">
<div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
<span className="material-symbols-outlined text-slate-500">person</span>
</div>
<div>
<p className="text-sm font-bold">Kora.Sync</p>
<p className="text-xs text-slate-500">Payment Fraud</p>
</div>
</div>
<button className="text-slate-400 hover:text-rose-500">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 tech-border">
<div className="flex items-center gap-3">
<div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
<span className="material-symbols-outlined text-slate-500">person</span>
</div>
<div>
<p className="text-sm font-bold">Zero-Day</p>
<p className="text-xs text-slate-500">TOS Violation</p>
</div>
</div>
<button className="text-slate-400 hover:text-rose-500">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
<button className="w-full mt-6 py-2 text-sm font-medium text-slate-500 dark:hover:text-white transition-colors">View All Flags</button>
</div>
{/* Recent High-Value Hires */}
<div className="xl:col-span-2 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
<div className="flex items-center justify-between mb-6">
<h4 className="font-bold">Recent High-Value Hires</h4>
<button className="text-xs text-primary font-bold">View History</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
<th className="pb-4">Candidate / Role</th>
<th className="pb-4">Company</th>
<th className="pb-4 text-right">Value (ACV)</th>
<th className="pb-4 text-right">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
<tr>
<td className="py-4">
<div className="flex items-center gap-3">
<div className="size-8 rounded bg-primary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-sm">code</span>
</div>
<div>
<p className="text-sm font-bold">Sarah Chen</p>
<p className="text-xs text-slate-500">Sr. AI Engineer</p>
</div>
</div>
</td>
<td className="py-4 text-sm font-medium">NeuroLink Corp</td>
<td className="py-4 text-right text-sm font-bold">$185k</td>
<td className="py-4 text-right">
<span className="px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">ONBOARDED</span>
</td>
</tr>
<tr>
<td className="py-4">
<div className="flex items-center gap-3">
<div className="size-8 rounded bg-accent-purple/20 flex items-center justify-center">
<span className="material-symbols-outlined text-accent-purple text-sm">security</span>
</div>
<div>
<p className="text-sm font-bold">Marcus Vane</p>
<p className="text-xs text-slate-500">Security Architect</p>
</div>
</div>
</td>
<td className="py-4 text-sm font-medium">Cryptek Systems</td>
<td className="py-4 text-right text-sm font-bold">$210k</td>
<td className="py-4 text-right">
<span className="px-2 py-1 rounded text-[10px] font-bold bg-primary/10 text-primary">PROCESSING</span>
</td>
</tr>
<tr>
<td className="py-4">
<div className="flex items-center gap-3">
<div className="size-8 rounded bg-accent-cyan/20 flex items-center justify-center">
<span className="material-symbols-outlined text-accent-cyan text-sm">database</span>
</div>
<div>
<p className="text-sm font-bold">Elena R.</p>
<p className="text-xs text-slate-500">Data Lead</p>
</div>
</div>
</td>
<td className="py-4 text-sm font-medium">OmniGrid AI</td>
<td className="py-4 text-right text-sm font-bold">$165k</td>
<td className="py-4 text-right">
<span className="px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">ONBOARDED</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}
