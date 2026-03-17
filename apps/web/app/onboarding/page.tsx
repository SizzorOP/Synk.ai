export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

{/* Top Navigation */}
<header className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
<div className="max-w-7xl mx-auto flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="size-8 bg-primary rounded flex items-center justify-center">
<span className="material-symbols-outlined text-white">hub</span>
</div>
<h2 className="text-xl font-black tracking-tighter uppercase italic">Synk.ai</h2>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex flex-col items-end mr-4">
<span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">System Status</span>
<span className="text-xs text-primary font-mono flex items-center gap-1">
<span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                        OPERATIONAL
                    </span>
</div>
<button className="size-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
<span className="material-symbols-outlined text-xl">settings</span>
</button>
<button className="size-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
<span className="material-symbols-outlined text-xl">help_outline</span>
</button>
</div>
</div>
</header>
<main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
{/* Left Column: Main Wizard */}
<div className="lg:col-span-8 flex flex-col gap-8">
{/* Progress Tracker */}
<div className="glass-panel rounded-xl p-6">
<div className="flex items-center justify-between mb-4">
<h3 className="text-sm font-bold uppercase tracking-widest text-primary">Onboarding Protocol</h3>
<span className="text-xs font-mono text-slate-400">01 / 04</span>
</div>
<div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
<div className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(60,131,246,0.5)] w-1/4"></div>
</div>
<div className="flex justify-between mt-3">
<span className="text-[11px] font-bold text-primary">TECH STACK</span>
<span className="text-[11px] font-bold text-slate-600">ROLE DETAILS</span>
<span className="text-[11px] font-bold text-slate-600">TALENT POOL</span>
<span className="text-[11px] font-bold text-slate-600">FINALIZE</span>
</div>
</div>
{/* Content Area */}
<div className="flex flex-col gap-6">
<div className="space-y-2">
<h1 className="text-4xl font-black tracking-tight text-slate-100 uppercase italic">Define Hiring Focus</h1>
<p className="text-slate-400 text-lg">Select the core disciplines your project requires. Our neural network will filter candidates based on these vectors.</p>
</div>
{/* Grid of Selectable Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{/* Card 1 */}
<div className="group cursor-pointer glass-panel rounded-xl p-6 border-white/10 card-glow transition-all ring-1 ring-primary/40 bg-primary/5">
<div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary text-3xl">developer_mode_tv</span>
</div>
<h4 className="text-lg font-bold text-slate-100 mb-1">Frontend</h4>
<p className="text-sm text-slate-500">React, Vue, Next.js, and Modern Web UI/UX.</p>
<div className="mt-4 flex justify-end">
<span className="material-symbols-outlined text-primary">check_circle</span>
</div>
</div>
{/* Card 2 */}
<div className="group cursor-pointer glass-panel rounded-xl p-6 border-white/5 card-glow transition-all">
<div className="size-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-slate-400 text-3xl">database</span>
</div>
<h4 className="text-lg font-bold text-slate-100 mb-1">Backend</h4>
<p className="text-sm text-slate-500">Node, Go, Python, and Scalable Architecture.</p>
<div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-slate-600">add_circle</span>
</div>
</div>
{/* Card 3 */}
<div className="group cursor-pointer glass-panel rounded-xl p-6 border-white/5 card-glow transition-all">
<div className="size-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-slate-400 text-3xl">psychology</span>
</div>
<h4 className="text-lg font-bold text-slate-100 mb-1">AI / ML</h4>
<p className="text-sm text-slate-500">LLMs, PyTorch, Neural Networks &amp; Data Science.</p>
<div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-slate-600">add_circle</span>
</div>
</div>
{/* Card 4 */}
<div className="group cursor-pointer glass-panel rounded-xl p-6 border-white/5 card-glow transition-all">
<div className="size-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-slate-400 text-3xl">shield</span>
</div>
<h4 className="text-lg font-bold text-slate-100 mb-1">Cybersecurity</h4>
<p className="text-sm text-slate-500">Ethical Hacking, SecOps, and Data Privacy.</p>
<div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-slate-600">add_circle</span>
</div>
</div>
{/* Card 5 */}
<div className="group cursor-pointer glass-panel rounded-xl p-6 border-white/5 card-glow transition-all">
<div className="size-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-slate-400 text-3xl">terminal</span>
</div>
<h4 className="text-lg font-bold text-slate-100 mb-1">DevOps</h4>
<p className="text-sm text-slate-500">Kubernetes, CI/CD, and Cloud Infrastructure.</p>
<div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-slate-600">add_circle</span>
</div>
</div>
{/* Card 6 */}
<div className="group cursor-pointer glass-panel rounded-xl p-6 border-white/5 card-glow transition-all">
<div className="size-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-slate-400 text-3xl">currency_bitcoin</span>
</div>
<h4 className="text-lg font-bold text-slate-100 mb-1">Web3</h4>
<p className="text-sm text-slate-500">Smart Contracts, Solidity, and dApps.</p>
<div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-slate-600">add_circle</span>
</div>
</div>
</div>
{/* Action Footer */}
<div className="flex items-center justify-between mt-8 border-t border-white/5 pt-8">
<button className="px-6 h-12 flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors">
<span className="material-symbols-outlined">arrow_back</span>
                        Back
                    </button>
<button className="px-10 h-12 bg-primary text-white font-black uppercase italic tracking-wider rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 group">
                        Proceed to Role Details
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>
</div>
{/* Right Column: AI Assistant Panel */}
<aside className="lg:col-span-4 flex flex-col gap-6">
{/* Synk.bot Card */}
<div className="glass-panel rounded-xl overflow-hidden border-primary/20 sticky top-28">
<div className="bg-primary/10 border-b border-white/5 p-4 flex items-center gap-3">
<div className="size-10 rounded-full bg-primary flex items-center justify-center border-2 border-background-dark">
<span className="material-symbols-outlined text-white">smart_toy</span>
</div>
<div>
<h4 className="text-sm font-black uppercase text-primary leading-none">Synk.bot</h4>
<span className="text-[10px] text-slate-500 font-mono tracking-tighter">AI ONBOARDING ASSISTANT</span>
</div>
</div>
<div className="p-6 space-y-6">
{/* Bot Message */}
<div className="space-y-3">
<div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/5">
<p className="text-sm text-slate-300 leading-relaxed">
                                Welcome to the Synk network. I'm here to ensure your hiring protocol is optimized.
                            </p>
</div>
<div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/5">
<p className="text-sm text-slate-300 leading-relaxed italic">
                                "Tip: Selecting 'Frontend' and 'AI/ML' together will trigger our Full-stack Intelligence filter for more specialized results."
                            </p>
</div>
</div>
{/* Bot Quick Actions */}
<div className="space-y-3">
<h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Optimization Tips</h5>
<button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-left group">
<span className="material-symbols-outlined text-primary text-lg">lightbulb</span>
<span className="text-xs text-slate-400 group-hover:text-slate-100 transition-colors">How to combine stacks?</span>
</button>
<button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-left group">
<span className="material-symbols-outlined text-primary text-lg">info</span>
<span className="text-xs text-slate-400 group-hover:text-slate-100 transition-colors">What is a neural filter?</span>
</button>
</div>
{/* Hiring Progress */}
<div className="pt-4 border-t border-white/5">
<div className="flex items-center justify-between mb-2">
<span className="text-[10px] font-bold text-slate-500 uppercase">Syncing Efficiency</span>
<span className="text-[10px] font-mono text-primary">84%</span>
</div>
<div className="h-1 bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-primary w-[84%]"></div>
</div>
</div>
</div>
<div className="p-4 bg-black/20 flex gap-2">
<input className="w-full bg-transparent border-none text-xs focus:ring-0 placeholder:text-slate-600" placeholder="Ask Synk.bot..." type="text"/>
<button className="size-8 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center text-primary transition-colors">
<span className="material-symbols-outlined text-sm">send</span>
</button>
</div>
</div>
{/* Stats Mini Panel */}
<div className="glass-panel rounded-xl p-4 border-white/5">
<div className="flex items-center gap-3">
<div className="p-2 rounded bg-green-500/10 text-green-500">
<span className="material-symbols-outlined text-lg">groups</span>
</div>
<div>
<p className="text-xs text-slate-500 font-bold uppercase leading-none mb-1">Available Talent</p>
<p className="text-xl font-black text-slate-100 tracking-tight leading-none">12,842</p>
</div>
</div>
</div>
</aside>
</main>
{/* Footer Decorative */}
<footer className="mt-12 py-8 border-t border-white/5 text-center">
<p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
            Encrypted Connection Secured // System Vers. 2.0.48 // © 2024 SYNK.AI
        </p>
</footer>

    </div>
  );
}
