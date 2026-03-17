import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div className="layout-container flex h-full grow flex-col">
<header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-6 lg:px-40 py-4 glass-panel sticky top-0 z-50">
<div className="flex items-center gap-3">
<div className="size-8 bg-primary rounded-lg flex items-center justify-center neon-glow">
<span className="material-symbols-outlined text-white">bolt</span>
</div>
<h2 className="text-white text-xl font-bold tracking-tight">Synk.ai</h2>
</div>
<div className="flex flex-1 justify-end gap-8 items-center">
<nav className="hidden md:flex items-center gap-8">
<Link href="/"className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" >Network</Link>
<Link href="/"className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" >Ecosystem</Link>
<Link href="/"className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" >Pricing</Link>
</nav>
<div className="flex items-center gap-4">
<span className="text-slate-400 text-sm hidden sm:inline">Already a member?</span>
<button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-bold transition-all">
                            Log In
                        </button>
</div>
</div>
</header>
<main className="flex-1 px-4 md:px-10 lg:px-40 py-10 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
<div className="lg:col-span-4 flex flex-col gap-6">
<div className="glass-panel p-8 rounded-xl flex flex-col gap-4 border-l-4 border-l-primary">
<h1 className="text-3xl font-black leading-tight tracking-tight text-white">Get Hired in <span className="text-primary">Minutes</span>.</h1>
<p className="text-slate-400 text-base leading-relaxed">
                            Our AI-driven matching engine analyzes your technical DNA to connect you with high-growth tech teams instantly.
                        </p>
<div className="flex flex-col gap-4 mt-4">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-xl">verified</span>
<span className="text-sm font-medium text-slate-200">Verified AI Roles</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-xl">payments</span>
<span className="text-sm font-medium text-slate-200">Competitive Hourly Rates</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-xl">rocket_launch</span>
<span className="text-sm font-medium text-slate-200">Direct-to-CTO Matching</span>
</div>
</div>
</div>
<div className="glass-panel p-6 rounded-xl hidden lg:block">
<div className="flex justify-between items-center mb-4">
<p className="text-white text-sm font-bold">Profile Completion</p>
<p className="text-primary text-sm font-bold">35%</p>
</div>
<div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[35%] neon-glow transition-all duration-500"></div>
</div>
<p className="text-slate-500 text-xs mt-3 uppercase tracking-widest font-bold">Next: Portfolio Details</p>
</div>
</div>
<div className="lg:col-span-8 flex flex-col gap-8">
<section className="glass-panel rounded-xl overflow-hidden">
<div className="p-6 border-b border-white/5 bg-white/5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">person</span>
<h3 className="text-xl font-bold text-white">1. Personal Information</h3>
</div>
</div>
<div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium">Full Name</label>
<input className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" type="text"/>
</div>
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium">Email Address</label>
<input className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@synk.ai" type="email"/>
</div>
<div className="flex flex-col gap-2 md:col-span-2">
<label className="text-slate-300 text-sm font-medium">Create Password</label>
<input className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="••••••••" type="password"/>
</div>
</div>
</section>
<section className="glass-panel rounded-xl overflow-hidden">
<div className="p-6 border-b border-white/5 bg-white/5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">code</span>
<h3 className="text-xl font-bold text-white">2. Technical Profile</h3>
</div>
</div>
<div className="p-8 space-y-8">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium">Primary Role</label>
<select className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none">
<option>Frontend Engineer</option>
<option>Backend Engineer</option>
<option>Fullstack Engineer</option>
<option>AI / ML Specialist</option>
<option>DevOps Architect</option>
</select>
</div>
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium">Years of Experience</label>
<input className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="5" type="number"/>
</div>
</div>
<div className="flex flex-col gap-4">
<label className="text-slate-300 text-sm font-medium">Top Skills &amp; Tech Stack</label>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold flex items-center gap-2">React <span className="material-symbols-outlined text-xs cursor-pointer">close</span></span>
<span className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold flex items-center gap-2">TypeScript <span className="material-symbols-outlined text-xs cursor-pointer">close</span></span>
<span className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold flex items-center gap-2">Python <span className="material-symbols-outlined text-xs cursor-pointer">close</span></span>
<span className="px-3 py-1.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-full text-xs font-bold cursor-pointer hover:bg-slate-700 transition-colors">+ Add Skill</span>
</div>
</div>
</div>
</section>
<section className="glass-panel rounded-xl overflow-hidden">
<div className="p-6 border-b border-white/5 bg-white/5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">auto_awesome</span>
<h3 className="text-xl font-bold text-white">3. Portfolio-First Integration</h3>
</div>
</div>
<div className="p-8 space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-xs">link</span> GitHub Profile URL
                                    </label>
<input className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none" placeholder="github.com/username" type="url"/>
</div>
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-xs">language</span> Personal Website
                                    </label>
<input className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none" placeholder="https://portfolio.me" type="url"/>
</div>
</div>
<div className="flex flex-col gap-3">
<label className="text-slate-300 text-sm font-medium">Upload Top Project (Zip/PDF)</label>
<div className="border-2 border-dashed border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors cursor-pointer bg-slate-900/30">
<span className="material-symbols-outlined text-primary text-4xl">cloud_upload</span>
<div className="text-center">
<p className="text-white font-medium">Drag and drop your project file</p>
<p className="text-slate-500 text-xs mt-1">Maximum file size 50MB</p>
</div>
</div>
</div>
</div>
</section>
<section className="glass-panel rounded-xl overflow-hidden">
<div className="p-6 border-b border-white/5 bg-white/5">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">query_stats</span>
<h3 className="text-xl font-bold text-white">4. AI Matching Preferences</h3>
</div>
</div>
<div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium">Availability</label>
<select className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none appearance-none">
<option>Immediate</option>
<option>2 Weeks Notice</option>
<option>1 Month Notice</option>
<option>Open for Gigs</option>
</select>
</div>
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium">Preferred Rate ($/hr)</label>
<div className="relative">
<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
<input className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none" placeholder="85" type="number"/>
</div>
</div>
<div className="flex flex-col gap-2">
<label className="text-slate-300 text-sm font-medium">Work Style</label>
<select className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none appearance-none">
<option>Fully Remote</option>
<option>Hybrid</option>
<option>On-site Only</option>
</select>
</div>
</div>
</section>
<div className="flex items-center justify-between pt-4 pb-10">
<div className="flex items-center gap-2 text-slate-500 text-sm">
<input className="rounded bg-slate-800 border-slate-700 text-primary focus:ring-primary" type="checkbox"/>
<span>I agree to the <Link href="/"className="text-primary hover:underline" >Terms of Service</Link></span>
</div>
<button className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-lg neon-glow transition-all flex items-center gap-2 group">
                            Finalize Profile
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>
</main>
<footer className="border-t border-white/5 py-10 px-6 lg:px-40 glass-panel mt-auto">
<div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">bolt</span>
<p className="text-slate-500 text-sm">© 2024 Synk.ai - High Fidelity Matching Engine</p>
</div>
<div className="flex gap-8">
<Link href="/"className="text-slate-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest" >Privacy</Link>
<Link href="/"className="text-slate-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest" >Security</Link>
<Link href="/"className="text-slate-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest" >Docs</Link>
<Link href="/"className="text-slate-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest" >Status</Link>
</div>
</div>
</footer>
</div>
</div>

    </div>
  );
}
