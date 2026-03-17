import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="flex h-screen overflow-hidden">
{/* Side Navigation */}
<aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col glass-panel">
<div className="p-6 flex items-center gap-3">
<div className="bg-primary rounded-lg p-2">
<span className="material-symbols-outlined text-white">bolt</span>
</div>
<div>
<h1 className="text-slate-900 dark:text-slate-100 font-bold leading-none">Synk.ai</h1>
<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Founder Workspace</p>
</div>
</div>
<nav className="flex-1 px-4 space-y-2 mt-4">
<Link href="/freelancer-dashboard"className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" >
<span className="material-symbols-outlined">dashboard</span>
<span className="text-sm font-medium">Dashboard</span>
</Link>
<Link href="/workspace"className="flex items-center gap-3 px-3 py-2 bg-primary/20 text-primary rounded-lg" >
<span className="material-symbols-outlined">work</span>
<span className="text-sm font-medium">Projects</span>
</Link>
<Link href="/browse-jobs"className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" >
<span className="material-symbols-outlined">group</span>
<span className="text-sm font-medium">Talent Pool</span>
</Link>
<Link href="/"className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" >
<span className="material-symbols-outlined">account_balance_wallet</span>
<span className="text-sm font-medium">Finances</span>
</Link>
<Link href="/settings"className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" >
<span className="material-symbols-outlined">settings</span>
<span className="text-sm font-medium">Settings</span>
</Link>
</nav>
<div className="p-4 border-t border-slate-200 dark:border-slate-800">
<button className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">add</span>
                Post Project
            </button>
</div>
</aside>
{/* Main Content */}
<main className="flex-1 flex flex-col overflow-hidden">
{/* Header */}
<header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 glass-panel z-10">
<div className="flex items-center gap-4 flex-1 max-w-xl">
<div className="relative w-full">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
<input className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100" placeholder="Search active projects, milestones, or talent..." type="text"/>
</div>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-3">
<button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
</button>
<button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
<span className="material-symbols-outlined">chat_bubble</span>
</button>
</div>
<div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
<div className="text-right">
<p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">Alex Sterling</p>
<p className="text-xs text-slate-500 mt-1">Pro Founder</p>
</div>
<div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 bg-cover bg-center" data-alt="Portrait of a male professional founder" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuDWZeby0Zroz-HdI9m9w7UxKGqeyHfDzPVpfd_Ddcmzx-u0l1aaA93-cL_NGmj0VmHltkHXfvNWsmcNZEwPRIWcdCfMhxty1uexwHxEHWqoB48fuqq02KFHC_73pnTFPIBcxFTeZPOuOPRz8hoTZGJJ1C1y-KMxSpTNsrIU2WrJIrmpaW4cAEkOwK1178tBG5o1RmB4YAbEe5enHfFqMYlkS31Dud4vWb45giBjH9sQrYsu7cNEGb9oa4yEF8rIhF3kDZcf80RF8g'.replace(/^'|'$/g, "")})` }}></div>
</div>
</div>
</header>
{/* Content Area */}
<div className="flex-1 overflow-y-auto p-8">
{/* Filter Bar */}
<div className="flex items-center justify-between mb-8">
<div>
<h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Project Workspace</h2>
<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">You have 12 active freelance projects across 3 teams.</p>
</div>
<div className="flex gap-2">
<button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
<span className="material-symbols-outlined text-lg">filter_list</span>
                        Status: All
                    </button>
<button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
<span className="material-symbols-outlined text-lg">sort</span>
                        Latest
                    </button>
</div>
</div>
{/* Project Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
{/* Project Card 1: In Progress */}
<div className="glass-panel rounded-xl p-6 flex flex-col gap-5 hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start">
<span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider">In Progress</span>
<button className="text-slate-500 hover:text-primary"><span className="material-symbols-outlined">more_horiz</span></button>
</div>
<div>
<h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Neural Engine Refactor</h3>
<p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">Optimization of the core inference engine for low-latency mobile deployment.</p>
</div>
<div className="flex items-center gap-3 py-3 border-y border-slate-200 dark:border-slate-800">
<div className="w-8 h-8 rounded-full bg-slate-700 bg-cover bg-center" data-alt="Female developer profile picture" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuAxz2ytn3jyjR-JQixlXD0UuWN6ZtoTAFGcRTS-mgmQq2oPPUWDg0VFUZwvzrcl6piKbyP3tMXjGoQ-u2dRTjjhWMurpp7-f6l_ivlbxiQeqtxe9HcFMe8EApOXEp8JtnntN4FnlXnmpF9kLvC6Mk1csINHHcxLXBJ4qgrb84AENF_fLQw_f389xMIqWqiUJGFZrSe-uxzP1UA6a9GGed4OCJo0gUQvt8OPm2NTVtNo4xipkSyO0eaRGY14q7AGvtrKOllIvVic3w'.replace(/^'|'$/g, "")})` }}></div>
<div className="flex-1">
<p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Sarah Chen</p>
<p className="text-[10px] text-slate-500 uppercase tracking-tighter">Backend Architect</p>
</div>
<div className="text-right">
<p className="text-xs font-bold text-primary">$4,200</p>
<p className="text-[10px] text-slate-500">Fixed Price</p>
</div>
</div>
<div className="space-y-3">
<div className="flex justify-between text-[11px] font-medium text-slate-500 uppercase">
<span>Milestones</span>
<span>65% Complete</span>
</div>
<div className="flex gap-1 h-1.5 w-full">
<div className="bg-primary rounded-full flex-1"></div>
<div className="bg-primary rounded-full flex-1"></div>
<div className="bg-slate-200 dark:bg-slate-800 rounded-full flex-1"></div>
</div>
<div className="grid grid-cols-3 gap-2">
<div className="text-[10px] text-primary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">check_circle</span>
                                Setup
                            </div>
<div className="text-[10px] text-primary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">check_circle</span>
                                Core Logic
                            </div>
<div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">radio_button_unchecked</span>
                                Testing
                            </div>
</div>
</div>
</div>
{/* Project Card 2: Under Review */}
<div className="glass-panel rounded-xl p-6 flex flex-col gap-5 hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start">
<span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider">Under Review</span>
<button className="text-slate-500 hover:text-primary"><span className="material-symbols-outlined">more_horiz</span></button>
</div>
<div>
<h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Visual Identity 2.0</h3>
<p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">Design and brand guidelines for the new Synk.ai enterprise suite.</p>
</div>
<div className="flex items-center gap-3 py-3 border-y border-slate-200 dark:border-slate-800">
<div className="w-8 h-8 rounded-full bg-slate-700 bg-cover bg-center" data-alt="Male designer profile picture" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuCdiQtsfuHR92tdwf-xKQrQzYXR9dkN-vt6kdZDYC3U40F6ju8sOWIv2rmS0a_EiWs8LoBlvEqBBd6Rip1yXcvYUJYhuJLdpk5lVDLUB7DAu-NmMfGU43VR21jee7BJH1RCBQqrU5i40zFBbu7p2hW6ttmrfrNoCSXkL4yk7YWFo3MtqKivdSRBx3K0Tby95RgdekA-VJ1PyXynOD-Ehd_T6SkusCQ9SwkuO3lywD3AMZMMw4mwbXUwgk6JWGTjr21Wt2j4QXTl6w'.replace(/^'|'$/g, "")})` }}></div>
<div className="flex-1">
<p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Marcus Thorne</p>
<p className="text-[10px] text-slate-500 uppercase tracking-tighter">Brand Designer</p>
</div>
<div className="text-right">
<p className="text-xs font-bold text-primary">$120/hr</p>
<p className="text-[10px] text-slate-500">Hourly</p>
</div>
</div>
<div className="space-y-3">
<div className="flex justify-between text-[11px] font-medium text-slate-500 uppercase">
<span>Milestones</span>
<span>90% Complete</span>
</div>
<div className="flex gap-1 h-1.5 w-full">
<div className="bg-primary rounded-full flex-1"></div>
<div className="bg-primary rounded-full flex-1"></div>
<div className="bg-primary/50 rounded-full flex-1"></div>
</div>
<div className="grid grid-cols-3 gap-2">
<div className="text-[10px] text-primary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">check_circle</span>
                                Strategy
                            </div>
<div className="text-[10px] text-primary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">check_circle</span>
                                Assets
                            </div>
<div className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">pending</span>
                                Feedback
                            </div>
</div>
</div>
</div>
{/* Project Card 3: Completed */}
<div className="glass-panel rounded-xl p-6 flex flex-col gap-5 hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start">
<span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">Completed</span>
<button className="text-slate-500 hover:text-primary"><span className="material-symbols-outlined">more_horiz</span></button>
</div>
<div>
<h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">API Documentation</h3>
<p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">Comprehensive technical writing for the public-facing GraphQL API endpoints.</p>
</div>
<div className="flex items-center gap-3 py-3 border-y border-slate-200 dark:border-slate-800">
<div className="w-8 h-8 rounded-full bg-slate-700 bg-cover bg-center" data-alt="Technical writer profile picture" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuDeNwNe0bKIrFenkRU0n_-F9qULeXZA91u_-AAJlqDnFLq27OJM0G41fJntBQxtL-J1bHzTGTcgnuEHFrx_-Cf_3_1RJ_Iqvm5SnE9DSYhqsQ58-mX8_QRVpjCMBQWsb1TDhDlLjgtnLtPA0gKjYnxiWxAP3LH9ldoRkG2jCf5ZFqw00Dho2R4A51bWMcBx_RlBVTBBvyZ_DliLRQEJXrcG9wvuGMyhR832SY-PJQSxgwoSh8P5iGZt9h0aCm0i0SyW-4a3MvoAOg'.replace(/^'|'$/g, "")})` }}></div>
<div className="flex-1">
<p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Elena Kovic</p>
<p className="text-[10px] text-slate-500 uppercase tracking-tighter">Technical Writer</p>
</div>
<div className="text-right">
<p className="text-xs font-bold text-primary">$1,850</p>
<p className="text-[10px] text-slate-500">Paid</p>
</div>
</div>
<div className="space-y-3">
<div className="flex justify-between text-[11px] font-medium text-slate-500 uppercase">
<span>Milestones</span>
<span>100% Complete</span>
</div>
<div className="flex gap-1 h-1.5 w-full">
<div className="bg-emerald-500 rounded-full flex-1"></div>
<div className="bg-emerald-500 rounded-full flex-1"></div>
<div className="bg-emerald-500 rounded-full flex-1"></div>
</div>
<div className="grid grid-cols-3 gap-2">
<div className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">check_circle</span>
                                Draft
                            </div>
<div className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">check_circle</span>
                                Edits
                            </div>
<div className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">check_circle</span>
                                Final
                            </div>
</div>
</div>
</div>
{/* Card 4: In Progress */}
<div className="glass-panel rounded-xl p-6 flex flex-col gap-5 hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start">
<span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider">In Progress</span>
<button className="text-slate-500 hover:text-primary"><span className="material-symbols-outlined">more_horiz</span></button>
</div>
<div>
<h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Market Analysis Q3</h3>
<p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">In-depth research into European AI expansion opportunities.</p>
</div>
<div className="flex items-center gap-3 py-3 border-y border-slate-200 dark:border-slate-800">
<div className="w-8 h-8 rounded-full bg-slate-700 bg-cover bg-center" data-alt="Market analyst profile picture" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuCmo-ma_QDvGXHFtqQRX-Ux1t47PntSCJFxge5UVMn5Nu3gq9bMUpFQtjg2lIZgiOYqiZ0MNFtaCNjQLmA2lalc0VUyHrSfvHxND-diETAEOnBiwtxpfvoP4X_XK5bSy74wBw3NU8mMjyECEgq0k727ox6DP7t1KmwGJMX8yQVGz7fNcW3RkCAY01PuVpDI0uVRWOHOKGdYKYjACmSGqijOJ5AiF9faP3nTL0YspaSSW5J1pFdd3HpHWJR40DM4juONDH4TI0RFZg'.replace(/^'|'$/g, "")})` }}></div>
<div className="flex-1">
<p className="text-xs font-semibold text-slate-900 dark:text-slate-100">David Low</p>
<p className="text-[10px] text-slate-500 uppercase tracking-tighter">Business Analyst</p>
</div>
<div className="text-right">
<p className="text-xs font-bold text-primary">$3,000</p>
<p className="text-[10px] text-slate-500">Fixed</p>
</div>
</div>
<div className="space-y-3">
<div className="flex justify-between text-[11px] font-medium text-slate-500 uppercase">
<span>Milestones</span>
<span>33% Complete</span>
</div>
<div className="flex gap-1 h-1.5 w-full">
<div className="bg-primary rounded-full flex-1"></div>
<div className="bg-slate-200 dark:bg-slate-800 rounded-full flex-1"></div>
<div className="bg-slate-200 dark:bg-slate-800 rounded-full flex-1"></div>
</div>
<div className="grid grid-cols-3 gap-2">
<div className="text-[10px] text-primary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">check_circle</span>
                                Research
                            </div>
<div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">radio_button_unchecked</span>
                                Synthesis
                            </div>
<div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-xs">radio_button_unchecked</span>
                                Deck
                            </div>
</div>
</div>
</div>
{/* Card 5: Empty Slot for New Project */}
<div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer">
<div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
<span className="material-symbols-outlined text-slate-400 group-hover:text-primary">add</span>
</div>
<div className="text-center">
<p className="text-sm font-bold text-slate-900 dark:text-slate-100">Start New Project</p>
<p className="text-[11px] text-slate-500 mt-1">Hire from your talent pool or post a new brief.</p>
</div>
</div>
</div>
{/* Talent Pool Summary (Mini Section) */}
<div className="mt-12 glass-panel rounded-xl p-8 border border-primary/20">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-bold">Top Matched Talent</h3>
<Link href="/"className="text-xs font-bold text-primary hover:underline" >View All Pool</Link>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-cover bg-center" data-alt="Female developer profile" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuAnKnSUyZ0R1Yd9JdX__k7RLC4TE6Do-sZca4tjI-CceruoQCOwtpSKGhAro3_PSYEJsVLSEFfghRYHschLFw8Jycr_qdlA3kRQj_z0grNNpQ8icemwg56vrWQ8D78Uhllq6mTcSbum3_yj2VVBzzvSU3eOuoihzhYRgxl9sDtCdbnPmbaAThXy9-9N3mq4GdPj3nfGqzNZZsq3oQ87dTPzIsIusDuqNBFjo341AVoJtwErRXjMNMiRYZIpMsVZ1gH2gZKG9vxfNA'.replace(/^'|'$/g, "")})` }}></div>
<div>
<p className="text-xs font-bold">Aria V.</p>
<p className="text-[10px] text-slate-400">ML Engineer</p>
</div>
</div>
<div className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-cover bg-center" data-alt="Male designer profile" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuBwtLktjlkb6bZgZmctBaxEx9RMCAVmiruB7xvL4XX7pXHyNY1mMH5hcRc4_q9vxT4DXqqOKsSlG8S58ichb_BPr03QCeOp5Qwnu4lcmcN6VOqfUyHxINOyZwdFcAQ4bH5XJI_JGufRUjKmkpBiapMYqFsNCiqP5wQ7R9mXuIuUQ_lOxAP56r0TW0xD-uEIO3YoHIv3gsh-hLi1A56EnskfU12NTL516R9sYaX-rpTlvgtCBkxPhBdzyvCM1r_O7Oo7E9vvn_Vi5w'.replace(/^'|'$/g, "")})` }}></div>
<div>
<p className="text-xs font-bold">Kenji S.</p>
<p className="text-[10px] text-slate-400">UI Expert</p>
</div>
</div>
<div className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-cover bg-center" data-alt="Female designer profile" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuCtcx-cI4lU_sWqT52dPD5p1orzRD1rkqmsc9MzMyVWiC5lSRDEtg1hECpDfqE2OP0fouzcju-aBFQYGHjOuMlukLpttVnKqAEO9Z6nnlLoNAwoCuI3WxyvPh6wgS4Ddfuby-AAGTr7iEmu5QCuaOz2KM6jVGjpHnSoKCBbG8jegipVUKwvt99oPOwYeLetMJylG9ehOmZw8Ic9qnQiYli1yrT-kubY2kA28N6vAgFPo5SuU6NFKKodFC90S03A-6dx0IJuLo0lAA'.replace(/^'|'$/g, "")})` }}></div>
<div>
<p className="text-xs font-bold">Mila R.</p>
<p className="text-[10px] text-slate-400">Illustrator</p>
</div>
</div>
<div className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-cover bg-center" data-alt="Male developer profile" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuD2jQmDotblJQEYqxfOLDMzYuDZACHWe3f3y3u0RDbg4IAF0llpLh_My_pZU2qBWoZWea5zSLRaB4v0RMK0O5I4bwV8tZXVHsHHCpDuCktPK073iz1Bc__O6VaxrqJ7h2pGWiS70Pqpnhh2ycTJ12Mgznpynpltah949Qq8FDpayeb3J9UFjIGk_2_QnXip3vjEJEWiKD6TCe7RnyRQwS9tO5Zq_-_vcyA415p_AQSEqQhUHnYfzAuy5XAQMyeoyBCrVqCqAU6JHQ'.replace(/^'|'$/g, "")})` }}></div>
<div>
<p className="text-xs font-bold">Toby G.</p>
<p className="text-[10px] text-slate-400">DevOps</p>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}
