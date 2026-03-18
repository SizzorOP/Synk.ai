import Link from 'next/link';
import { ProjectAnalyzer } from '../../components/project-analyzer';

export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
<header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-20 py-4">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2 text-primary">
<span className="material-symbols-outlined text-3xl font-bold">layers</span>
<h2 className="text-slate-900 dark:text-white text-xl font-black leading-tight tracking-tight">Synk.ai</h2>
</div>
<nav className="hidden md:flex items-center gap-8">
<Link href="/"className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" >Proof of Work</Link>
<Link href="/"className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" >Tech Stack</Link>
<Link href="/"className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" >History</Link>
</nav>
</div>
<div className="flex items-center gap-4">
<div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700">
<span className="material-symbols-outlined text-slate-400 text-xl">search</span>
<input className="bg-transparent border-none focus:ring-0 text-sm placeholder-slate-500 w-48" placeholder="Search projects..."/>
</div>
<button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
                    Contact Talent
                </button>
</div>
</header>
<main className="flex-1 flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full px-4 md:px-20 py-8 gap-8">
<aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
<div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative group">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-6xl">verified_user</span>
</div>
<div className="relative z-10">
<div className="flex items-center gap-4 mb-6">
<div className="w-16 h-16 rounded-full border-2 border-primary p-1">
<div className="w-full h-full rounded-full bg-cover bg-center" data-alt="Professional headshot of an AI Engineer" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuBWP3BrAwA74V6c_fmWU9Jxl7NkzjuTMFsVS50kxjpOSn6csUbrjniSgqv6XrrA_rVdgf-gvNqMHDWSA_KHHQGmdchoPwel7uVfH12lbYrtAMJvEvNDqfMB6_WGOyEHq4uCfuCz2kD6FGUqLTu1YehJoa5e73xlkXQj2Y3iZ88yGMTUBmlgeYRcOxv3KYJSCmu1Ko6A13kcH3dWIj7BJRwXttLU1pTAVtfdPtso5g8YZSi4fnE0NZx1m2YpFl4MYwBSIB6i4q7SHQ"}')` }}></div>
</div>
<div>
<h3 className="font-bold text-lg dark:text-white">Alex Synk</h3>
<p className="text-sm text-slate-500 dark:text-slate-400">Lead AI Architect</p>
</div>
</div>
<div className="space-y-4">
<div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
<p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-bold mb-1">AI Match Confidence</p>
<div className="flex items-end justify-between">
<span className="text-3xl font-black text-primary">98.4%</span>
<span className="text-emerald-500 text-xs font-bold flex items-center gap-0.5"><span className="material-symbols-outlined text-xs">trending_up</span>+2.1%</span>
</div>
</div>
<div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
<span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">event_available</span> Availability
                                </span>
<span className="text-sm font-bold text-emerald-500">Immediate</span>
</div>
<div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
<span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">work_history</span> Projects
                                </span>
<span className="text-sm font-bold">142 Completed</span>
</div>
<div className="flex justify-between items-center py-2">
<span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">location_on</span> Location
                                </span>
<span className="text-sm font-bold">Remote / Tokyo</span>
</div>
</div>
<div className="mt-8">
<h4 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 font-bold mb-4">Core Tech Stack</h4>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded uppercase">PyTorch</span>
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded uppercase">LLM Ops</span>
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded uppercase">CUDA</span>
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded uppercase">Rust</span>
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded uppercase">React</span>
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded uppercase">Next.js</span>
</div>
</div>
</div>
</div>
<div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 text-white shadow-xl shadow-primary/20">
<h3 className="font-bold text-lg mb-2">Hire Instantly</h3>
<p className="text-white/80 text-sm mb-6">Secured through Synk.ai smart contracts with automated escrow.</p>
<button className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined">bolt</span> Open Contract
                    </button>
</div>
</aside>
<div className="flex-1 flex flex-col gap-8">
<section className="relative h-[400px] rounded-2xl overflow-hidden group">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Abstract futuristic blue neural network visualization" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuBBCmwLnHNjm5l54lYK_iUdwztyZ6_afA4y-7VWIUJ5fd_eQXir0uib3HYJNft3bQSb9PEr6FBB3gRzPZo6Ha9EVbQ3HpkDvj9_ADrTI6J47JoiINg570NiBGYGoy3bI7dz8ECd34MR0a5VF5xG89KIyYwh-pUUeMQmRjJZeRzCeQCdH5aAeGgh5ewqGJYX2YxGq0uj7NqQA3x2E4G9oE8C0MPzqFkqW0nelv4ZTQ2WWOh-7aplXn-vwVwcFDoClvEdKXXI7BPbmg"}')` }}></div>
<div className="absolute inset-0 tech-noir-gradient flex flex-col justify-end p-8 md:p-12">
<div className="max-w-2xl">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                                Featured Showcase
                            </div>
<h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                                Architecting Autonomous <span className="text-primary">Neural Agents</span>
</h1>
<p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Lead developer for the Neon-Pulse algorithm, reducing inference latency by 45% while maintaining high-fidelity emotional intelligence in conversational models.
                            </p>
<div className="flex gap-4">
<button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors">View Case Study</button>
<button className="border border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">Project Source</button>
</div>
</div>
</div>
</section>
<ProjectAnalyzer portfolioSlug="alex-synk" />
<section className="mt-8">
<div className="flex items-center justify-between mb-8">
<div>
<h2 className="text-2xl font-black tracking-tight dark:text-white">Proof of Work</h2>
<p className="text-slate-500 dark:text-slate-400 text-sm">Verified contribution history on the decentralized ledger.</p>
</div>
<div className="flex gap-2">
<button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500"><span className="material-symbols-outlined">grid_view</span></button>
<button className="p-2 rounded-lg text-slate-400"><span className="material-symbols-outlined">list</span></button>
</div>
</div>
<div className="masonry-grid">
<div className="masonry-item-tall relative rounded-xl overflow-hidden group bg-slate-900 border border-slate-800">
<div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" data-alt="Futuristic glowing computer circuits" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuAWsJS-qExQQnekXA-6QfqlUWcNzQNRNoDoOGdOcrq3GqoQS0ByKXqRX9UX-w0hWbgJ2QI4jewd-6akAES2bCPSUWzJToH3wzxR4s3pPzmKN3etUb_mhHAIWHtgeTgv0QTRsoDhIEMIFdOM_TZPmosvyXmp72F9PJSmawkZ6T1c2Nosagimz-iCgzbl0nzNWkiKeJEgnW2FLzdjR-f0xThpBUjPCWdWaDJQco6Fkn1MxEzENYXY__8FrpJamfgV2b4CtH524eFuWA"}')` }}></div>
<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6">
<h4 className="text-white font-bold text-lg">Cyber-Neural Interface v2</h4>
<p className="text-slate-400 text-xs mb-3">Custom kernel optimization for real-time sensor processing.</p>
<div className="flex gap-2">
<span className="text-[10px] border border-white/20 px-2 py-0.5 rounded text-white/70 uppercase">Kernel</span>
<span className="text-[10px] border border-white/20 px-2 py-0.5 rounded text-white/70 uppercase">C++</span>
</div>
</div>
</div>
<div className="relative rounded-xl overflow-hidden group bg-slate-900 border border-slate-800">
<div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" data-alt="Code on a screen with purple neon glow" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuB2k7N4PTZMOoPNjdlWaSV81IImXswbJsXIiDuCCQLB4xPNRtpZtAgwJQhPVTy6xaidge0BCDqHATnC_50A21OFm0eRekgj-_tPQk8yK0lPd_WDVQxsq_aqBXRkVPWoonRGR48tSW-wrflkdaTR1zJ7pLlPmBkGGFomciXxHkTpCyTKeB9pX3GoF36bgyV3Rk7j24EyarDy6TZrklJEGKAKFBTaLSDN-wSoKXTLdgvUmOznIB2kbXDB6-iVKnULUVert_inBFbDsg"}')` }}></div>
<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6">
<h4 className="text-white font-bold">DeepFake Guard</h4>
<p className="text-slate-400 text-xs">Real-time identification of AI media.</p>
</div>
</div>
<div className="relative rounded-xl overflow-hidden group bg-slate-900 border border-slate-800">
<div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" data-alt="Large server room data center" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuA7Vhi6piQGhN-bSWEmsIO88W4FVBBhfFGrReCLUpXET-5qrnpYN2iVrY24Agdl9Jec2wn-xA8RY690r1wznAg6bWr6E3KZQQyUVG36RZyQkhoO3eHIBz1AMo4OuFDRrxABPJCJQP7MURXCDaZ1EnJd6Scmlzp0FxH4uj6hMocNqpTZazcPiaNeRAe4HQU8-I-yJA-XCMMVlFxUURkJKFgSMnepmR9t_CXnYz3Fwg8pZQB3fBd8ojhYTH4nBSLj6YCdXZ6N85zblA"}')` }}></div>
<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6">
<h4 className="text-white font-bold">DataMesh Protocol</h4>
<p className="text-slate-400 text-xs">Decentralized training data storage.</p>
</div>
</div>
<div className="masonry-item-tall relative rounded-xl overflow-hidden group bg-slate-900 border border-slate-800">
<div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" data-alt="AI generated crystalline structure" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuB7kZO8-O6ygD9Y0THwwhMSWkBFAXKzl1yDQEautCHx14EAeRwKNVsS1p9Z_ad6lchxgXqJD7WeR_OaBjqZus4wPSI5y5uPdadEfEL-truaWo54Pk1Cz7O_BSjU_xi-I-0hRaqbmlCLVRTLdV_FvpUFv-MQgaZVV3TDoaE2ZtGhjMtor4rmup8njGhVqZnGURVnlCgZiw8gEc6URLrMkgymTz3tV5HgnbLS9tlQV436Lhu3WzUhp0P9zwM9YGD8UqlBISVYVE5zxA"}')` }}></div>
<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6">
<h4 className="text-white font-bold text-lg">Quantum-Safe Encryption</h4>
<p className="text-slate-400 text-xs mb-3">Lattice-based cryptography for AI model weights.</p>
<div className="flex gap-2">
<span className="text-[10px] border border-white/20 px-2 py-0.5 rounded text-white/70 uppercase">Security</span>
<span className="text-[10px] border border-white/20 px-2 py-0.5 rounded text-white/70 uppercase">Rust</span>
</div>
</div>
</div>
<div className="relative rounded-xl overflow-hidden group bg-slate-900 border border-slate-800">
<div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" data-alt="Microchip macro photography" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuAWVhXHXxJ9BZewcwwb9NgA_2-6P91nevhY4xc_peM1Sld7PlDRdd5zKi_6cNweeMCwXHwcCfj0wB6IjLR5pbrfyg3zboOVmvJm7UA49oTOKSHFM3QiBj9JbxoYK4csPMEO_WbjzAayY02bc8oTI0yJsbQpRyd6Ey01K4xABpzZHoO9QiuISerbmxyAgiTZfR7Zje9p3pSF-WHMvKR3eVdNSvavnAdqQppcuuu8xAD8bTL3e3s-mwVO88vmqvgJUkMvcHqH8khUrA"}')` }}></div>
<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6">
<h4 className="text-white font-bold">LogicGates AI</h4>
<p className="text-slate-400 text-xs">Symbolic AI reasoning engine.</p>
</div>
</div>
</div>
</section>
</div>
</main>
<footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-12 px-6 md:px-20 bg-white dark:bg-slate-950">
<div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
<div className="flex items-center gap-2 text-slate-400">
<span className="material-symbols-outlined">layers</span>
<span className="text-sm font-bold">Synk.ai talent network © 2024</span>
</div>
<div className="flex gap-8">
<Link href="/"className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest" >Protocol</Link>
<Link href="/"className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest" >Privacy</Link>
<Link href="/"className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest" >Legal</Link>
</div>
<div className="flex gap-4">
<button className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary">
<span className="material-symbols-outlined text-lg">terminal</span>
</button>
<button className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary">
<span className="material-symbols-outlined text-lg">public</span>
</button>
</div>
</div>
</footer>
<div className="fixed bottom-8 right-8 z-[100] md:hidden">
<button className="bg-primary text-white size-14 rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center">
<span className="material-symbols-outlined">bolt</span>
</button>
</div>
</div>

    </div>
  );
}
