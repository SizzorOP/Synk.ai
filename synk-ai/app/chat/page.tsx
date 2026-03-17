import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="flex h-screen w-full">
{/* Sidebar Navigation (Narrow) */}
<aside className="w-20 lg:w-64 border-r border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark flex flex-col items-center py-6 gap-8">
<div className="flex items-center gap-3 px-4 lg:w-full">
<div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white tech-glow">
<span className="material-symbols-outlined">hub</span>
</div>
<h1 className="hidden lg:block text-xl font-bold tracking-tight">Synk.ai</h1>
</div>
<nav className="flex flex-col gap-2 w-full px-3">
<Link href="/chat"className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20" >
<span className="material-symbols-outlined">chat</span>
<span className="hidden lg:block font-medium">Messages</span>
</Link>
<Link href="/earnings"className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" >
<span className="material-symbols-outlined">description</span>
<span className="hidden lg:block font-medium">Contracts</span>
</Link>
<Link href="/"className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" >
<span className="material-symbols-outlined">group</span>
<span className="hidden lg:block font-medium">Network</span>
</Link>
<Link href="/browse-jobs"className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" >
<span className="material-symbols-outlined">psychology</span>
<span className="hidden lg:block font-medium">Talent AI</span>
</Link>
</nav>
<div className="mt-auto w-full px-3 flex flex-col gap-2">
<Link href="/settings"className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" >
<span className="material-symbols-outlined">settings</span>
<span className="hidden lg:block font-medium">Settings</span>
</Link>
<div className="px-3 py-3 flex items-center gap-3">
<div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border-2 border-primary/30" data-alt="User profile avatar circle" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuDos_SZOCLJyVuUrmY1TlWuvcSyAOGlU7WyJNI99d0V3U1F6VfOziJ3gpFxMavhRgBGecTc6BNZprNiYBO8cmP8UxvD2ktN4hkKrm6D9lrnvKltE2rK3C7fXpX9td9NOf9bfT0vOlAoUdGcKH1K8vgtnn5Snkt8eo66Y5LOueSKfRFDEQJ2IUZc0qkPcaIGyYGkY0Xi1tRji9VzTwiKllNo_0H17ppV-lsa0ZmQyRnutM6RxFfzlNzzddWSTICAV7CNlc7PGAbKZw"}')` }}></div>
<div className="hidden lg:block">
<p className="text-sm font-semibold">Founder Portal</p>
<p className="text-xs text-slate-500">Premium Plan</p>
</div>
</div>
</div>
</aside>
{/* Conversation List (Split View Left) */}
<main className="flex flex-1">
<section className="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-900/30">
<div className="p-6 border-b border-slate-200 dark:border-slate-800">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
<input className="w-full bg-slate-100 dark:bg-tech-surface border-none rounded-lg pl-10 text-sm focus:ring-1 focus:ring-primary" placeholder="Search conversations..." type="text"/>
</div>
</div>
<div className="flex-1 overflow-y-auto">
<div className="p-2 space-y-1">
<div className="flex items-center gap-4 p-3 rounded-xl bg-primary/10 border-l-4 border-primary">
<div className="relative">
<div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800" data-alt="Freelancer profile portrait Alex" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuCaFAzZgAcCl7caDXm2UzNzpAW3eY4_rIcfarLCda0WD9zklY8LeYYeZSQojGpE5f1PnI5HR_sKHy1mB9A8geMil1fmWHChmF1ZlKQgMsHcmLQAFIqwuEhpW63zPNzKmxP1b30NF5UX916ZhLwPj4R9udKyPIxMPRJtk-gHcl_2-udSe_iymcCUb13zohZPMkrnDrTGG-aZYf2j78JGdpN-ObP0HaL02yOOwFn2KcnKAyM6KI18LsFQZwLUlD1LTHt9OCHYX-zurw"}')` }}></div>
<div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-background-dark rounded-full"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center">
<h4 className="font-bold truncate text-sm">Alex (Freelancer)</h4>
<span className="text-[10px] text-slate-400">2m</span>
</div>
<p className="text-xs text-slate-500 truncate">Ready to sync assets...</p>
</div>
</div>
<div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
<div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800" data-alt="Designer profile portrait Sarah" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuDCe66-aoSIXlAPEAzs8LiulvCl-3zESHPacFy0GKFH0VlTaWb28TX4wc7ZnNgVHcfvLCJiPhL6PR-trzFzI3Ut4MkrRhQUiqWFGmlvi76d8-XeqPi2T-PpVt-UsnMgAmZ7uDgqBo1n-VtGzFS_VpFc2b2oRmc_9KPgdUeJUGuMCgmcmxKlVptOKNNeSUEnkfGxknrA_SbK_Qz2nc0--Nnjj-3NVh5BWuT6p7nrppRI_rBxPg1GLrHv521uZsR3t6MozXlhqwRd0g"}')` }}></div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center">
<h4 className="font-semibold truncate text-sm">Sarah Jenkins</h4>
<span className="text-[10px] text-slate-400">1h</span>
</div>
<p className="text-xs text-slate-500 truncate">The wireframes are complete.</p>
</div>
</div>
<div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
<div className="size-12 rounded-full bg-slate-200 dark:bg-slate-800" data-alt="Developer profile portrait Marco" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuB_BY7aixRhJEhZfEMakK1oH_q0D_gYoE_4p6MG6k7WBFyC3XDIo-dxDzMtkIXvlfTsakjgmZSiLJSpsv5hrPJsNWfGp8gtMJzqQxDLTS2h6EunFC-HOcKt89dHNLK0DilO5mSXINtMzX4nYpsrwbiAztUtYSyhJ-IzPRm0oMHRlyTq9DJtvsYLBIlKhTf575G_Hk4eQdvkkvv19lcDhGCLppVwbvrfchCieOMdWivTBtjyIYDWBh6KcYr-H5LcNzSWVvY-gY35yg"}')` }}></div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center">
<h4 className="font-semibold truncate text-sm">Marco Russo</h4>
<span className="text-[10px] text-slate-400">3h</span>
</div>
<p className="text-xs text-slate-500 truncate">PR approved for the module.</p>
</div>
</div>
</div>
</div>
</section>
{/* Main Chat Window (Split View Right) */}
<section className="flex-1 flex flex-col bg-background-light dark:bg-background-dark relative">
{/* Chat Header */}
<header className="h-20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
<div className="flex items-center gap-3">
<div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800" data-alt="Freelancer profile portrait Alex" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuDKd1n048ccLEy_b8jQpqa-a-z66WDlYCGT6XpTUF9kWAWRIvU2OKsp7JZ4Dp4LIUmHTYI-blGjMN5cHcgExLubgEj4eLv9a05pF7HAcvuvDSzoJ65uVkzbTjYF3-WguQRMzNOpDWyzluq6RNwHhSR5lBhrI5aivGFSc0maVU5kuHURbbbClmLoPJ29ZLyiEVKUSRbX9VBGgbUmyNgVCmcimcaUdm8DIgktF60rER6R5TV6Jri1gRTUse6Bigp7o0TPXr6dprSNMA"}')` }}></div>
<div>
<h3 className="font-bold text-base">Alex</h3>
<div className="flex items-center gap-1">
<span className="size-2 bg-green-500 rounded-full"></span>
<span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Active Now</span>
</div>
</div>
</div>
<div className="flex items-center gap-3">
<div className="hidden sm:flex items-center gap-2 bg-primary/5 dark:bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg text-primary text-xs font-bold">
<span className="material-symbols-outlined text-sm">smart_toy</span>
                            AI Insights: Ready to Close
                        </div>
<button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all tech-glow">
<span className="material-symbols-outlined text-sm">handshake</span>
                            Quick Hire
                        </button>
<button className="bg-slate-200 dark:bg-tech-surface hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
<span className="material-symbols-outlined text-sm">description</span>
                            Create Contract
                        </button>
<button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</header>
{/* Chat Content */}
<div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
<div className="flex justify-center">
<span className="px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 uppercase tracking-widest font-bold border border-slate-200 dark:border-slate-700">Today, Oct 24</span>
</div>
{/* Message Left */}
<div className="flex items-end gap-3 max-w-[80%]">
<div className="size-8 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" data-alt="Freelancer profile Alex small" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuBtAxa7PBcoeDGqmn_YbYDLryNxqdVDMB34FGRJtEJL-i8xHR0T9c7bFPoOGNcK9T2XUTv-EX27cOM83P2rBx0Lroa2c6j2RhzkMUTifueHvYz-64Cv4IZSq4ngfIqsy_-M-rDgvOUt4cbCxpbqccWJoI1YxrTaZaltFlvBFDroont4wjilCFL8wruyZKgj-p9E0O6ANTyv_4JpA0BuL1U-z0nwn2XosAklZ97izYQGSTIUwVWAoU3B3j_3mhqxQxz-ebe49SpBNw"}')` }}></div>
<div className="flex flex-col gap-1.5">
<div className="glass-bubble-left p-4 rounded-2xl rounded-bl-none text-slate-800 dark:text-slate-100 shadow-sm leading-relaxed">
                                I've finished the initial review of the project specs for the neural-interface module. The API documentation is comprehensive. Ready to sync the first batch of assets.
                            </div>
<span className="text-[10px] text-slate-400 ml-1">10:42 AM</span>
</div>
</div>
{/* Message Right */}
<div className="flex items-end gap-3 max-w-[80%] ml-auto flex-row-reverse">
<div className="size-8 shrink-0 rounded-full bg-primary" data-alt="Founder avatar profile small" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuC3-GU6Gf3BpywTqAEV_dMDaAjf2RjQ2xlnWtnypVIA3JwW1zpOCg_UZcbajPJHlWLa9Z36IIxQGpXfJz_pmZVHFJeIxhtXk022Z6qJedN5uyK_ZG-K_nENSuNdwvbl8JUVaJgGPqbWuznHJFSuyvPoUc-ipQ9KrqC9TTvLS2I_OPy1jv5n-9fb5B-T2qjU8MeXbden9b5PY4lFu7BA87RGTbigUpIDEOsP55pHdqb3KoEOek2XtYM9P-ERpbxkNpMo7g5BmlVcrQ"}')` }}></div>
<div className="flex flex-col gap-1.5 items-end">
<div className="glass-bubble-right p-4 rounded-2xl rounded-br-none text-white shadow-sm leading-relaxed">
                                Excellent progress, Alex. Can the AI-generated assets be integrated into the module by EOD for the staging deployment?
                            </div>
<div className="flex items-center gap-1 mr-1">
<span className="text-[10px] text-slate-400">10:45 AM</span>
<span className="material-symbols-outlined text-primary text-xs">done_all</span>
</div>
</div>
</div>
{/* AI Suggested Action */}
<div className="mx-auto max-w-lg">
<div className="bg-primary/5 dark:bg-tech-surface/50 border border-primary/20 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
<div className="absolute top-0 right-0 p-2 opacity-20">
<span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
</div>
<div className="relative z-10 flex flex-col gap-3">
<div className="flex items-center gap-2 text-primary">
<span className="material-symbols-outlined text-lg">smart_toy</span>
<span className="text-xs font-bold uppercase tracking-wider">Synk AI Assistant</span>
</div>
<p className="text-sm dark:text-slate-300">Based on your conversation, Alex is ready to start. I recommend initiating a <strong>Neural Module Milestone</strong> contract for $2,400.</p>
<div className="flex gap-2">
<button className="bg-primary text-white text-xs font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all">Generate Draft</button>
<button className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold py-2 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">View Analytics</button>
</div>
</div>
</div>
</div>
{/* Message Left */}
<div className="flex items-end gap-3 max-w-[80%]">
<div className="size-8 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" data-alt="Freelancer profile Alex small" style={{ backgroundImage: `url('${"https://lh3.googleusercontent.com/aida-public/AB6AXuBUYNhXGclvBcg1vn0M5gkaL8GbBbbzjpoXze4uqtVxPFXQNg9t9i7tCfPeUGw_6TXW8v6mhNVCdra-nH5F_a1TDMmXpGkvwxAWzzlVYsl0LmPw83b9mCIxy03mRNygQp3SjUNClkooN8Q9jPJLcjoGOi_Go-FErsrexPz84g-8B83efSWD9yM2a_xh_TeBOq9aOZCjzKGw_wozwbfcsGezTX0n_kjsGOop1LxVH9494xliOEfm3W1oCUzO3Peu8tynkioeB_iOKA"}')` }}></div>
<div className="flex flex-col gap-1.5">
<div className="glass-bubble-left p-4 rounded-2xl rounded-bl-none text-slate-800 dark:text-slate-100 shadow-sm leading-relaxed">
                                Absolutely. I'll prioritize the export. I'll also send over the updated component map for your review in 15 minutes.
                            </div>
<span className="text-[10px] text-slate-400 ml-1">10:52 AM</span>
</div>
</div>
</div>
{/* Chat Input */}
<footer className="p-6 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
<div className="max-w-4xl mx-auto">
<div className="bg-slate-100 dark:bg-tech-surface border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex flex-col gap-2">
<textarea className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none py-2 px-3 placeholder:text-slate-500" placeholder="Message Alex..." rows={1}></textarea>
<div className="flex items-center justify-between px-2 pb-1">
<div className="flex items-center gap-2">
<button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span className="material-symbols-outlined text-xl">attach_file</span>
</button>
<button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span className="material-symbols-outlined text-xl">image</span>
</button>
<button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span className="material-symbols-outlined text-xl">mic</span>
</button>
<div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
<button className="flex items-center gap-1.5 px-2 py-1 text-primary hover:bg-primary/10 rounded-lg text-xs font-bold transition-colors">
<span className="material-symbols-outlined text-sm">smart_toy</span>
                                        Smart Reply
                                    </button>
</div>
<button className="bg-primary text-white size-10 rounded-xl flex items-center justify-center tech-glow hover:scale-105 transition-transform">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</div>
<p className="text-center text-[10px] text-slate-500 mt-3 flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[12px]">security</span>
                            End-to-end encrypted with Synk.ai Quantum Guard
                        </p>
</div>
</footer>
</section>
</main>
</div>

    </div>
  );
}
