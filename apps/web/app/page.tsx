import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
{/* Navigation */}
<nav className="fixed top-0 z-50 w-full glass border-b border-white/5">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="size-8 bg-primary rounded flex items-center justify-center text-white">
<span className="material-symbols-outlined">api</span>
</div>
<span className="text-xl font-black tracking-tighter uppercase">Synk.ai</span>
</div>
<div className="hidden md:flex items-center gap-10">
<Link href="/"className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" >Platform</Link>
<Link href="/browse-jobs"className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" >Talent</Link>
<Link href="/"className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" >Solutions</Link>
<Link href="/"className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" >Pricing</Link>
</div>
<div className="flex items-center gap-4">
<Link href="/login" className="hidden sm:block text-sm font-bold px-4 py-2 text-slate-300 hover:text-white transition-colors">Login</Link>
<Link href="/role-selection" className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center">
                        Get Started
                    </Link>
</div>
</div>
</nav>
{/* Hero Section */}
<main className="pt-32 pb-20 px-6">
<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
<div className="flex flex-col gap-8">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase w-fit">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
                        Next-Gen Staffing
                    </div>
<h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500">Global Talent in <span className="text-primary">Minutes</span>
</h1>
<p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                        AI-powered matching with a portfolio-first philosophy. Eliminate the friction of global hiring through deep-code verification and cultural alignment algorithms.
                    </p>
<div className="flex flex-col sm:flex-row gap-4 pt-4">
<Link href="/role-selection" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-xl transition-all flex items-center justify-center gap-2 group">
                            Start Hiring 
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</Link>
<Link href="/browse-jobs" className="glass hover:bg-white/5 text-white font-bold h-14 px-8 rounded-xl transition-all flex items-center justify-center">
                            View Talent Pool
                        </Link>
</div>
<div className="flex items-center gap-6 pt-6 border-t border-white/5">
<div className="flex -space-x-3">
<div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-800" data-alt="User avatar 1"></div>
<div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-700" data-alt="User avatar 2"></div>
<div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-600" data-alt="User avatar 3"></div>
</div>
<p className="text-sm text-slate-500 font-medium">Trusted by 500+ tech leaders globally</p>
</div>
</div>
{/* Visual Asset */}
<div className="relative group">
<div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
<div className="relative glass rounded-2xl p-4 tech-glow">
<div className="bg-background-dark/80 rounded-xl overflow-hidden border border-white/10 aspect-square flex items-center justify-center relative">
<div className="absolute inset-0 opacity-20" data-alt="Abstract neural network representation of AI matching" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuDYpPovif2S6M1mBmrFFNvUlw7uodBX4RGnLnKrfxYCPYTTVVBVQD3KMTmx1zqZpZYzLDvHKALApmC5_Rn5AVOyTP3rvFaJKhntJBfxZJu29OO3HEguuD_qrlwxsoRRZIt_C036rLMqyVS3BQx4XO_vsHCDjzOL_7UdKciWokEpsl3tDnssAE6kj9-iLvzT6lK_qxUKipAussuPVqu4AwUr11-gifG-U2LHUYR2sFawN7T_NX6Zlyo5VHoqJOqNd3dbuZWbWaAgKQ'.replace(/^'|'$/g, "")})` }}></div>
{/* Mock UI Interface */}
<div className="z-10 w-full max-w-sm flex flex-col gap-4 p-6">
<div className="glass p-4 rounded-xl flex items-center gap-4 animate-pulse">
<div className="size-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">person_search</span>
</div>
<div className="flex-1 space-y-2">
<div className="h-2 w-24 bg-primary/30 rounded"></div>
<div className="h-2 w-32 bg-slate-700 rounded"></div>
</div>
</div>
<div className="glass p-4 rounded-xl flex items-center gap-4 translate-x-8">
<div className="size-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
<span className="material-symbols-outlined text-green-500">check_circle</span>
</div>
<div className="flex-1 space-y-2">
<div className="h-2 w-28 bg-green-500/30 rounded"></div>
<div className="h-2 w-20 bg-slate-700 rounded"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
{/* Features Section */}
<section className="py-24 px-6 relative overflow-hidden">
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
<div className="max-w-7xl mx-auto">
<div className="text-center mb-16 space-y-4">
<h2 className="text-3xl md:text-4xl font-black">Engineered for Precision</h2>
<p className="text-slate-400 max-w-2xl mx-auto">We've replaced the traditional resume with objective technical truth.</p>
</div>
<div className="grid md:grid-cols-3 gap-8">
<div className="glass p-8 rounded-2xl hover:bg-white/5 transition-colors group">
<div className="size-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">psychology</span>
</div>
<h3 className="text-xl font-bold mb-3">AI Deep-Matching</h3>
<p className="text-slate-400 text-sm leading-relaxed">Our proprietary LLM analyzes source code, architectural patterns, and commit history to find the perfect technical match.</p>
</div>
<div className="glass p-8 rounded-2xl hover:bg-white/5 transition-colors group">
<div className="size-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">terminal</span>
</div>
<h3 className="text-xl font-bold mb-3">Portfolio-First</h3>
<p className="text-slate-400 text-sm leading-relaxed">Stop reading buzzwords. Browse sandbox environments and actual project outputs from pre-vetted senior engineering talent.</p>
</div>
<div className="glass p-8 rounded-2xl hover:bg-white/5 transition-colors group">
<div className="size-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">gavel</span>
</div>
<h3 className="text-xl font-bold mb-3">Instant Compliance</h3>
<p className="text-slate-400 text-sm leading-relaxed">One contract, local tax compliance in 150+ countries, and automated payroll. Scale globally without the legal overhead.</p>
</div>
</div>
</div>
</section>
{/* Social Proof / Testimonial Carousel */}
<section className="py-24 px-6 bg-slate-900/30">
<div className="max-w-5xl mx-auto">
<div className="glass p-12 rounded-3xl relative overflow-hidden">
<div className="absolute top-0 right-0 p-8 opacity-10">
<span className="material-symbols-outlined text-9xl">format_quote</span>
</div>
<div className="relative z-10 flex flex-col items-center text-center gap-8">
<div className="flex items-center gap-1 text-yellow-500">
<span className="material-symbols-outlined fill-1">star</span>
<span className="material-symbols-outlined fill-1">star</span>
<span className="material-symbols-outlined fill-1">star</span>
<span className="material-symbols-outlined fill-1">star</span>
<span className="material-symbols-outlined fill-1">star</span>
</div>
<blockquote className="text-2xl md:text-3xl font-medium leading-tight">
                            "Synk.ai cut our engineering recruitment cycle from 45 days to just 36 hours. The talent quality is consistently in the top 1%."
                        </blockquote>
<div className="flex flex-col items-center gap-2">
<div className="size-16 rounded-full bg-slate-800 border-2 border-primary" data-alt="Portrait of CTO Sarah Jenkins"></div>
<cite className="not-italic">
<span className="block font-bold text-lg">Sarah Jenkins</span>
<span className="block text-slate-500 text-sm uppercase tracking-widest">CTO, Nexus Dynamics</span>
</cite>
</div>
<div className="flex gap-4 mt-4">
<button className="size-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="size-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors border-primary/50">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</section>
{/* Footer */}
<footer className="py-12 border-t border-white/5 px-6">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
<div className="flex items-center gap-3">
<div className="size-6 bg-primary rounded flex items-center justify-center text-white">
<span className="material-symbols-outlined text-xs">api</span>
</div>
<span className="text-lg font-black tracking-tighter uppercase">Synk.ai</span>
</div>
<div className="flex gap-8 text-sm text-slate-500">
<Link href="/"className="hover:text-primary transition-colors" >Privacy Policy</Link>
<Link href="/"className="hover:text-primary transition-colors" >Terms of Service</Link>
<Link href="/"className="hover:text-primary transition-colors" >Contact</Link>
</div>
<div className="text-sm text-slate-600">
                    © 2024 Synk.ai Inc. All rights reserved.
                </div>
</div>
</footer>
{/* Sticky CTA Button */}
<div className="fixed bottom-8 right-8 z-[60]">
<Link href="/signup" className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-black px-6 py-4 rounded-full shadow-2xl shadow-primary/40 transition-all hover:-translate-y-1">
<span className="material-symbols-outlined">rocket_launch</span>
                Hire Now
            </Link>
</div>
</div>

    </div>
  );
}
