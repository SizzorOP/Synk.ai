import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
<div className="layout-container flex h-full grow flex-col">
{/* Navigation */}
<header className="flex items-center justify-between whitespace-nowrap border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 md:px-10 py-4 sticky top-0 z-50">
<div className="flex items-center gap-8">
<div className="flex items-center gap-3 text-primary">
<div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
<span className="material-symbols-outlined text-primary">layers</span>
</div>
<h2 className="text-slate-100 text-xl font-black leading-tight tracking-tighter uppercase">Synk.ai</h2>
</div>
<label className="hidden lg:flex flex-col min-w-64 h-10">
<div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-800/50 border border-white/5 focus-within:border-primary/50 transition-colors">
<div className="text-slate-400 flex items-center justify-center pl-4">
<span className="material-symbols-outlined text-[20px]">search</span>
</div>
<input className="form-input flex w-full border-none bg-transparent focus:ring-0 text-slate-100 placeholder:text-slate-500 text-sm" placeholder="Search contracts or transactions..." value=""/>
</div>
</label>
</div>
<div className="flex flex-1 justify-end gap-6 items-center">
<nav className="hidden md:flex items-center gap-8">
<Link href="/freelancer-dashboard"className="text-slate-400 hover:text-primary text-sm font-semibold transition-colors" >Dashboard</Link>
<Link href="/earnings"className="text-primary text-sm font-semibold transition-colors border-b-2 border-primary py-1" >Contracts</Link>
<Link href="/earnings"className="text-slate-400 hover:text-primary text-sm font-semibold transition-colors" >Earnings</Link>
<Link href="/"className="text-slate-400 hover:text-primary text-sm font-semibold transition-colors" >Security</Link>
</nav>
<div className="flex gap-3">
<button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-800/50 border border-white/5 text-slate-300 hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[20px]">notifications</span>
</button>
<div className="h-10 w-10 rounded-full border-2 border-primary/30 p-0.5 overflow-hidden">
<img alt="User Profile" className="h-full w-full rounded-full object-cover" data-alt="A professional headshot of a developer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU-sgJBENzuDG4fw3j3rBh5OkcRx-bOnuGexXjMiZk9O5isS81O_Dfpflhh83UKQyGqN4mXt37OMdLNltxkl-prmDFJIq5_HOPClXkWo-JrqolOt_YHEi_Ysakk0R3v2kZFdBzb9KpWSfiM2mV9US8DNgAlzIhPZCeSWVrQuY8mKQvWrxnbWXIaKtCVoTGw2XFSuh2qy0puBIPMnb48Mj19GgyU-hwSxuuyJgxmkXd0GJpTqBUsZ4dpjocg1YJ6yrVyF9PQ_qAvQ"/>
</div>
</div>
</div>
</header>
<main className="flex-1 flex flex-col max-w-[1200px] mx-auto w-full p-6 md:p-10 gap-8">
{/* Page Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2 text-primary mb-2">
<span className="material-symbols-outlined text-sm">verified</span>
<span className="text-xs font-bold tracking-widest uppercase">Verified Nexus Node</span>
</div>
<h1 className="text-slate-100 text-4xl font-black leading-tight tracking-tight">Financial Ledger</h1>
<p className="text-slate-400 text-lg">Real-time performance metrics and contract settlements.</p>
</div>
<div className="flex gap-3">
<button className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-slate-800 border border-white/10 text-slate-100 font-bold text-sm hover:bg-slate-700 transition-all">
<span className="material-symbols-outlined">download</span>
                            Export CSV
                        </button>
</div>
</div>
{/* Financial Grid */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Glassmorphism Withdrawal Card */}
<div className="lg:col-span-2 glass-panel rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group">
<div className="absolute top-0 right-0 p-8 opacity-10">
<span className="material-symbols-outlined text-[120px] text-primary">account_balance_wallet</span>
</div>
<div className="relative z-10">
<p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-1">Available for Withdrawal</p>
<h2 className="text-slate-100 text-5xl font-black mb-6">$12,450.32 <span className="text-xl text-slate-500 font-medium">USD</span></h2>
<div className="flex flex-wrap gap-8 items-center">
<div>
<p className="text-slate-500 text-xs font-bold uppercase mb-1">Pending Clearance</p>
<p className="text-slate-100 text-xl font-bold">$2,105.00</p>
</div>
<div className="h-10 w-px bg-white/10"></div>
<div>
<p className="text-slate-500 text-xs font-bold uppercase mb-1">Lifetime Earnings</p>
<p className="text-slate-100 text-xl font-bold">$142,890.00</p>
</div>
</div>
</div>
<div className="mt-10 flex gap-4 relative z-10">
<button className="flex-1 md:flex-none min-w-[180px] flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-primary text-slate-100 font-black text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
<span className="material-symbols-outlined">payments</span>
                                Instant Withdraw
                            </button>
<button className="flex items-center justify-center rounded-lg h-12 w-12 bg-white/5 border border-white/10 text-slate-100 hover:bg-white/10 transition-all">
<span className="material-symbols-outlined">settings</span>
</button>
</div>
</div>
{/* Small Stat Cards */}
<div className="flex flex-col gap-6">
<div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
<span className="material-symbols-outlined text-emerald-500">trending_up</span>
</div>
<span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">+12.5%</span>
</div>
<div>
<p className="text-slate-500 text-sm font-semibold">Net Income Margin</p>
<p className="text-slate-100 text-2xl font-black">94.2%</p>
</div>
</div>
<div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">description</span>
</div>
<span className="text-slate-500 text-xs font-bold">4 Active</span>
</div>
<div>
<p className="text-slate-500 text-sm font-semibold">Active Contracts</p>
<p className="text-slate-100 text-2xl font-black">$42,100 <span className="text-sm text-slate-500 font-medium">Value</span></p>
</div>
</div>
</div>
</div>
{/* Monthly Growth Chart Area */}
<div className="bg-slate-900/40 border border-white/5 rounded-xl p-8">
<div className="flex items-center justify-between mb-8">
<div>
<h3 className="text-slate-100 text-xl font-bold">Revenue Distribution</h3>
<p className="text-slate-500 text-sm">Monthly income trend for the last 6 cycles</p>
</div>
<select className="bg-slate-800 border-none text-slate-300 text-xs font-bold rounded-lg focus:ring-primary">
<option>Fiscal Year 2024</option>
<option>Fiscal Year 2023</option>
</select>
</div>
<div className="grid grid-cols-6 items-end gap-4 md:gap-8 h-48 px-2">
<div className="flex flex-col items-center gap-3 h-full justify-end group">
<div className="w-full bg-slate-800 rounded-t-lg transition-all group-hover:bg-primary/40" ></div>
<p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">Jan</p>
</div>
<div className="flex flex-col items-center gap-3 h-full justify-end group">
<div className="w-full bg-slate-800 rounded-t-lg transition-all group-hover:bg-primary/40" ></div>
<p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">Feb</p>
</div>
<div className="flex flex-col items-center gap-3 h-full justify-end group">
<div className="w-full bg-primary rounded-t-lg shadow-[0_0_20px_rgba(60,131,246,0.3)]" ></div>
<p className="text-primary text-[10px] font-black tracking-widest uppercase">Mar</p>
</div>
<div className="flex flex-col items-center gap-3 h-full justify-end group">
<div className="w-full bg-slate-800 rounded-t-lg transition-all group-hover:bg-primary/40" ></div>
<p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">Apr</p>
</div>
<div className="flex flex-col items-center gap-3 h-full justify-end group">
<div className="w-full bg-slate-800 rounded-t-lg transition-all group-hover:bg-primary/40" ></div>
<p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">May</p>
</div>
<div className="flex flex-col items-center gap-3 h-full justify-end group">
<div className="w-full bg-slate-800 rounded-t-lg transition-all group-hover:bg-primary/40" ></div>
<p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">Jun</p>
</div>
</div>
</div>
{/* Contracts List */}
<div className="flex flex-col gap-6">
<div className="flex items-center justify-between">
<h3 className="text-slate-100 text-2xl font-black">Active Engagements</h3>
<div className="flex items-center gap-4">
<div className="flex p-1 bg-slate-900 rounded-lg border border-white/5">
<button className="px-4 py-1.5 bg-slate-800 text-slate-100 text-xs font-bold rounded-md">Active</button>
<button className="px-4 py-1.5 text-slate-500 hover:text-slate-300 text-xs font-bold rounded-md transition-colors">Completed</button>
</div>
</div>
</div>
<div className="space-y-4">
{/* Contract Item 1 */}
<div className="bg-slate-900/60 border border-white/5 hover:border-primary/30 transition-all rounded-xl p-5 flex flex-col md:flex-row items-center gap-6 group">
<div className="size-14 rounded-xl overflow-hidden flex-shrink-0">
<img alt="Company Logo" className="h-full w-full object-cover" data-alt="Cyberpunk style corporate logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMKQpFv4kTcMWRFgqViXUNJMHx-B-FdDRNPdPytnh1l_1VEUTXTPaxyrWy32shxbG0S3Ev5T9An-VKtmVDfrHYjM8E8hvMQtXl5T7mlEkQiEVhXWHjcdfcSJkTiy_Ad10PtDg-aW_FlWSKhVJ5fgNmqqrFj2zXkHlJonMEd9vdFvtWaHiXma9WUi7TL2ozY1blpo7YvlId9r9IoxZ8HG8cvHscy2JviiaVjYXkXnSis3rgl-i-O0X0XBQK9o0aUUPKBClnWZOKlA"/>
</div>
<div className="flex-1 min-w-0">
<h4 className="text-slate-100 font-bold text-lg truncate">Neural Interface Optimization</h4>
<p className="text-slate-500 text-sm">Client: Aether Dynamics Corp.</p>
</div>
<div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
<div>
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Budget</p>
<p className="text-slate-100 font-bold">$18,500</p>
</div>
<div>
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Status</p>
<div className="flex items-center gap-1.5">
<div className="size-1.5 bg-primary rounded-full animate-pulse"></div>
<p className="text-primary font-bold text-sm">In Progress</p>
</div>
</div>
<div className="hidden md:block">
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Deadline</p>
<p className="text-slate-100 font-bold">Oct 24, 2024</p>
</div>
</div>
<button className="w-full md:w-auto h-10 px-6 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-bold border border-white/5">
                                Manage
                            </button>
</div>
{/* Contract Item 2 */}
<div className="bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition-all rounded-xl p-5 flex flex-col md:flex-row items-center gap-6 group">
<div className="size-14 rounded-xl overflow-hidden flex-shrink-0">
<img alt="Company Logo" className="h-full w-full object-cover" data-alt="Abstract geometric corporate emblem" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeXdDNHYowoBYkxoFrugIlHRGRUxInV6ilF1ShYpRv8AyXf3EKU9xacWRhmZgVApaZLdD7mKvRzPGgYnt_bfzHh10rIW4rSlgTVXApAmdHzWGNmSG1z3TGRnKzC2A6QEj8CRGVsJj7JSatZHyB9L1lgs6lIgRTK62LjC_3-0kSxDGEX_LnSU3cQr-ulgz9irMlGaVnt5j4OYKF5S-rMANOZaWePCSs5Q21E7jZmOpFBiUgiU7FZZbU-aDdKmXWZ37qoDtaJMYhlQ"/>
</div>
<div className="flex-1 min-w-0">
<h4 className="text-slate-100 font-bold text-lg truncate">Security Audit - Node #772</h4>
<p className="text-slate-500 text-sm">Client: Specter Solutions</p>
</div>
<div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
<div>
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Budget</p>
<p className="text-slate-100 font-bold">$4,200</p>
</div>
<div>
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Status</p>
<div className="flex items-center gap-1.5">
<div className="size-1.5 bg-emerald-500 rounded-full"></div>
<p className="text-emerald-500 font-bold text-sm">Paid</p>
</div>
</div>
<div className="hidden md:block">
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Completed</p>
<p className="text-slate-100 font-bold">Sep 12, 2024</p>
</div>
</div>
<button className="w-full md:w-auto h-10 px-6 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-bold border border-white/5">
                                View Invoice
                            </button>
</div>
{/* Contract Item 3 */}
<div className="bg-slate-900/60 border border-white/5 hover:border-amber-500/30 transition-all rounded-xl p-5 flex flex-col md:flex-row items-center gap-6 group">
<div className="size-14 rounded-xl overflow-hidden flex-shrink-0">
<img alt="Company Logo" className="h-full w-full object-cover" data-alt="Minimalist futuristic tech brand mark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh-46if49D62V3TjQJGiwyxJnfYMJEV_K1mf_qbQDMBA_sFfM5H50FWUJpNiDGhm5ES4KAxv0UtDX2ktWfRxKnSKsbC15D_UXqSt1Tz_YJ_lzudhoS1JyBnWX0nh8WVD2P6-jL9KJM9eXe_t-wRT9iI0qN8AjZgKqhnPWzLcVrfWiAy-P60PJt0gnvvE7g5cnpPMtCGFpV__k-za5-kLBECi6qSk4L9cdpqjHi_pjW15NIhffIyW4Vy5jqYnJ9LUt05A9Tt4E2-g"/>
</div>
<div className="flex-1 min-w-0">
<h4 className="text-slate-100 font-bold text-lg truncate">Smart Contract Deployment</h4>
<p className="text-slate-500 text-sm">Client: Ledger Labs</p>
</div>
<div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
<div>
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Budget</p>
<p className="text-slate-100 font-bold">$12,000</p>
</div>
<div>
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Status</p>
<div className="flex items-center gap-1.5">
<div className="size-1.5 bg-amber-500 rounded-full"></div>
<p className="text-amber-500 font-bold text-sm">Pending</p>
</div>
</div>
<div className="hidden md:block">
<p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">ETA</p>
<p className="text-slate-100 font-bold">In 2 days</p>
</div>
</div>
<button className="w-full md:w-auto h-10 px-6 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-bold border border-white/5">
                                Details
                            </button>
</div>
</div>
</div>
</main>
{/* Footer */}
<footer className="bg-slate-950/80 border-t border-white/5 p-10 mt-12">
<div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
<div className="flex flex-col gap-2">
<div className="flex items-center gap-3 text-slate-500 grayscale opacity-50">
<span className="material-symbols-outlined">layers</span>
<span className="font-black uppercase tracking-widest text-sm">Synk.ai</span>
</div>
<p className="text-slate-600 text-xs">Decentralized Talent Protocol v4.0.2</p>
</div>
<div className="flex gap-10">
<Link href="/"className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest" >Protocol Stats</Link>
<Link href="/"className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest" >Support</Link>
<Link href="/"className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest" >Governance</Link>
</div>
<p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">System Status: All Nodes Operational</p>
</div>
</footer>
</div>
</div>

    </div>
  );
}
