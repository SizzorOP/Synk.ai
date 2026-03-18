"use client";
import Link from 'next/link';
import { useState } from 'react';
import { QuickApplyModal } from '../../components/quick-apply-modal';

export default function Page() {
  const [selectedJob, setSelectedJob] = useState<{ id: string; title: string; questions?: any[] } | null>(null);
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

{/* Navigation */}
<header className="sticky top-0 z-50 glassmorphism border-b border-white/10 px-6 py-3">
<div className="max-w-7xl mx-auto flex items-center justify-between">
<div className="flex items-center gap-10">
<div className="flex items-center gap-3">
<div className="w-10 h-10 tech-gradient rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-white">dataset</span>
</div>
<div className="flex flex-col">
<h1 className="text-xl font-bold tracking-tight text-white leading-none">Synk.ai</h1>
<span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Intelligence Network</span>
</div>
</div>
<nav className="hidden md:flex items-center gap-8">
<Link href="/browse-jobs"className="text-sm font-medium text-primary" >Browse Jobs</Link>
<Link href="/browse-jobs"className="text-sm font-medium text-slate-400 hover:text-white transition-colors" >Talent Pool</Link>
<Link href="/"className="text-sm font-medium text-slate-400 hover:text-white transition-colors" >Benchmarks</Link>
</nav>
</div>
<div className="flex items-center gap-5">
<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="text-xs font-bold text-primary">PRO</span>
</div>
<button className="relative p-2 text-slate-400 hover:text-white transition-colors">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-accent-purple rounded-full"></span>
</button>
<div className="h-10 w-10 rounded-full border border-white/10 p-0.5">
<img alt="User Profile" className="rounded-full w-full h-full object-cover" data-alt="User profile avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcUoceVOWHrjZA1vGV2cTJ2-1-u4kv8GN9jJb_M_IB2QlDXLeACkAVuS0VSzjVOYR8muj5cn88leIz8Yn2Wj8jzE_L3Ixa6f5N7AafyaIJMBNsyltbEyO6SLv4bCWcOSH4BHjsBoICRH78qmmnvxQT_qBx9MkCrdR1cC5S2CifqzVlvSVtbC875XHcXwcYNfQT6YGDVo3kqsanQXI0ZnackEwSR12C-k_1jHXDPbengmWkN4VV1ENPdmECCK1tSsOSZ6yVFhS4WA"/>
</div>
</div>
</div>
</header>
<main className="max-w-7xl mx-auto px-6 py-10">
{/* Search & Filter Section */}
<div className="mb-12">
<div className="flex flex-col md:flex-row gap-4 items-end justify-between mb-8">
<div className="flex-1 w-full max-w-2xl">
<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">Find your next AI mission</h2>
<div className="relative flex items-center group">
<span className="material-symbols-outlined absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
<input className="w-full h-14 pl-12 pr-12 glassmorphism rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-white placeholder:text-slate-500 transition-all" placeholder="Search by role, LLM stack, or company..." type="text"/>
<button className="absolute right-4 p-2 text-slate-400 hover:text-white transition-colors">
<span className="material-symbols-outlined">tune</span>
</button>
</div>
</div>
<div className="flex flex-col items-end gap-2">
<span className="text-sm text-slate-400 font-medium">312 premium jobs available</span>
<div className="flex gap-2">
<button className="px-4 py-2 glassmorphism rounded-lg text-xs font-semibold text-white border-primary/30 flex items-center gap-2">
                            Latest <span className="material-symbols-outlined text-sm">expand_more</span>
</button>
</div>
</div>
</div>
{/* Quick Filters */}
<div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
<button className="px-5 py-2 rounded-full bg-primary text-white text-xs font-bold whitespace-nowrap">All Missions</button>
<button className="px-5 py-2 rounded-full glassmorphism text-slate-300 text-xs font-semibold whitespace-nowrap hover:border-primary/50">LLM Training</button>
<button className="px-5 py-2 rounded-full glassmorphism text-slate-300 text-xs font-semibold whitespace-nowrap hover:border-primary/50">Computer Vision</button>
<button className="px-5 py-2 rounded-full glassmorphism text-slate-300 text-xs font-semibold whitespace-nowrap hover:border-primary/50">Vector DBs</button>
<button className="px-5 py-2 rounded-full glassmorphism text-slate-300 text-xs font-semibold whitespace-nowrap hover:border-primary/50">Agentic RAG</button>
<button className="px-5 py-2 rounded-full glassmorphism text-slate-300 text-xs font-semibold whitespace-nowrap hover:border-primary/50">AI Ethics</button>
</div>
</div>
{/* Job Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Job Card 1 */}
<div className="glassmorphism p-6 rounded-2xl hover:border-primary/40 transition-all group relative overflow-hidden">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl glassmorphism flex items-center justify-center p-2 border-white/5">
<img alt="Anthropic" className="w-full h-full object-contain" data-alt="Anthropic corporate logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3yiaYH0ZkdXo_K4Vr2QBMyHu4zK5ld4OMZlRSoQ-i4C1skwcJOGlXkHeLf9zawmpxtlzjab01XC7Cd7oCNWqCEo-qoTrjWnV38DMBc_nua75-w3x1QmOAvmlryHKEXn9G1fMOA6adX2LN0IDqPfCVGKsqPrhH7j1q-nnn6O7eXZ5ugGt_BZn6WIWJBbzlzZ6Ft08AG_GWW9PrSzMbYiyXb68ClCphXUqxjkSM3CwW4ichWRpLJiE1_CM4a2q0-dMeydLJ5P_k2w"/>
</div>
<div>
<h3 className="font-bold text-white group-hover:text-primary transition-colors">Senior LLM Engineer</h3>
<p className="text-xs text-slate-400">Anthropic • San Francisco / Remote</p>
</div>
</div>
<div className="relative flex items-center justify-center">
<svg className="w-12 h-12 transform -rotate-90">
<circle className="text-white/5" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
<circle className="text-primary glow-accent" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="12.56" strokeWidth="3"></circle>
</svg>
<span className="absolute text-[10px] font-bold text-white">96%</span>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">PyTorch</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Transformer Architecture</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">CUDA</span>
</div>
<div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
<div className="flex flex-col">
<span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Budget Range</span>
<span className="text-sm font-bold text-white">$180k - $240k</span>
</div>
<button onClick={() => setSelectedJob({ id: 'job-1', title: 'Senior LLM Engineer', questions: [{ question: 'What is your PyTorch experience?', required: true }] })} className="px-6 py-2 rounded-xl tech-gradient text-white text-xs font-bold hover:opacity-90 transition-opacity">
                        Apply Now
                    </button>
</div>
</div>
{/* Job Card 2 */}
<div className="glassmorphism p-6 rounded-2xl hover:border-primary/40 transition-all group relative overflow-hidden">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl glassmorphism flex items-center justify-center p-2 border-white/5">
<img alt="OpenAI" className="w-full h-full object-contain" data-alt="OpenAI corporate logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfYW-FkOlijQehF4CRxm59UnyeXhWPYpGeQepYM1h4pu4O3a_kw315NPk2GzwfsyFxJgji0_nX8brhUJyhD1_-r5omdxZ_rPq948_vnVaa_NjILLwfGoTJQdbCrClNRIaedBIwHo3qU91Q8Qpj8r9mJzYYDLPQVTTKC7Dd0B6jdft4UMIMcYrBrlNCgb5v29q8Lweu8SK2EATs34ka7ACN6VFGdk1fFZX2LNcnz5lBShYUxkXULrLcnVa3w9YifltKB9wuEeSSvQ"/>
</div>
<div>
<h3 className="font-bold text-white group-hover:text-primary transition-colors">Product Designer, AI Tools</h3>
<p className="text-xs text-slate-400">OpenAI • London / Hybrid</p>
</div>
</div>
<div className="relative flex items-center justify-center">
<svg className="w-12 h-12 transform -rotate-90">
<circle className="text-white/5" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
<circle className="text-accent-purple shadow-accent-purple/40" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="25.12" strokeWidth="3"></circle>
</svg>
<span className="absolute text-[10px] font-bold text-white">88%</span>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Figma</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">UI/UX</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">GenAI UX</span>
</div>
<div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
<div className="flex flex-col">
<span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Budget Range</span>
<span className="text-sm font-bold text-white">$140k - $190k</span>
</div>
<button className="px-6 py-2 rounded-xl glassmorphism text-white text-xs font-bold hover:bg-white/10 transition-colors border-white/20">
                        View Mission
                    </button>
</div>
</div>
{/* Job Card 3 */}
<div className="glassmorphism p-6 rounded-2xl hover:border-primary/40 transition-all group relative overflow-hidden border-primary/20">
<div className="absolute top-0 right-0 bg-primary/20 text-primary text-[8px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-widest">Sponsored</div>
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl glassmorphism flex items-center justify-center p-2 border-white/5 bg-white">
<img alt="Midjourney" className="w-full h-full object-contain" data-alt="Midjourney corporate logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhLzvuLWS1SY4pg-EbYnXyHPUtDyiUN48K76dL-7vGFfz1luJmOq7U370x26gLR2kaYYnTvPDlhN768LaqqGUZ6wh6h_hVtejyvoSIEXt3qqqe_P9NDXD0AorJ088VSdV1k-tolWuLjeHV2QbP9p8JgCXIOSu8TZbKNCxTdYi3URR6JanlxZduzP8GdGaR0Xon4Cf3-wULMp6veMVAlZjsD6zh0YkdBbDkoiN3-LWkZ902bHleigyzBj6TQYVb3_zJrHEcvvxFIQ"/>
</div>
<div>
<h3 className="font-bold text-white group-hover:text-primary transition-colors">Creative Director, AI Art</h3>
<p className="text-xs text-slate-400">Midjourney • Remote</p>
</div>
</div>
<div className="relative flex items-center justify-center">
<svg className="w-12 h-12 transform -rotate-90">
<circle className="text-white/5" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
<circle className="text-primary glow-accent" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="6.28" strokeWidth="3"></circle>
</svg>
<span className="absolute text-[10px] font-bold text-white">99%</span>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Stable Diffusion</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Art Direction</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Prompt Engineering</span>
</div>
<div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
<div className="flex flex-col">
<span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Budget Range</span>
<span className="text-sm font-bold text-white">$200k+</span>
</div>
<button onClick={() => setSelectedJob({ id: 'job-3', title: 'Creative Director, AI Art', questions: [] })} className="px-6 py-2 rounded-xl tech-gradient text-white text-xs font-bold hover:opacity-90 transition-opacity">
                        Apply Now
                    </button>
</div>
</div>
{/* Job Card 4 */}
<div className="glassmorphism p-6 rounded-2xl hover:border-primary/40 transition-all group relative overflow-hidden">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl glassmorphism flex items-center justify-center p-2 border-white/5">
<img alt="Pinecone" className="w-full h-full object-contain" data-alt="Pinecone corporate logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmkfrnEx6XeHt7NtQRmbtqijQGlVSQBD-qqsfgEK3Ltm_mEttMkylxzENRCT9zWHOhYGYYv0omU9ch7WuOTAzSkTv43Sb6zDm_lIs6zKcooYNB76tgM2uf5mbOghAIyEaliC_sgPBbxcK21WgttExb8-QCRlGmDcspNAQTT8mRvW1Ags-GtYMXMRGj83Sd9J-r795rXbrcq9bhP6tpN-Z9lcdoFRUnr66tCh70jiXnPNSve_4X1M91NclICe76pHxkfHiU-UfIvw"/>
</div>
<div>
<h3 className="font-bold text-white group-hover:text-primary transition-colors">Distributed Systems Eng</h3>
<p className="text-xs text-slate-400">Pinecone • New York / Remote</p>
</div>
</div>
<div className="relative flex items-center justify-center">
<svg className="w-12 h-12 transform -rotate-90">
<circle className="text-white/5" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
<circle className="text-primary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="31.4" strokeWidth="3"></circle>
</svg>
<span className="absolute text-[10px] font-bold text-white">75%</span>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Go</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Kubernetes</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Rust</span>
</div>
<div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
<div className="flex flex-col">
<span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Budget Range</span>
<span className="text-sm font-bold text-white">$160k - $210k</span>
</div>
<button className="px-6 py-2 rounded-xl glassmorphism text-white text-xs font-bold hover:bg-white/10 transition-colors border-white/20">
                        View Mission
                    </button>
</div>
</div>
{/* Job Card 5 */}
<div className="glassmorphism p-6 rounded-2xl hover:border-primary/40 transition-all group relative overflow-hidden">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl glassmorphism flex items-center justify-center p-2 border-white/5 bg-slate-900">
<img alt="Mistral AI" className="w-full h-full object-contain" data-alt="Mistral AI corporate logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC16CQB_N-PJb5bC8jSdFg7q0l2qPmdV_HbkO-iUskoj_laJKq3z-kBQUjveZSvpv9hKCaHvVoRNQAyblU6vBExD-KNAPV1j9Lx4xassSugQwECNLlcx9Qgw9pfnN-rUsGvvbCtery1VAec9SYC-pK4bIT0hYsygw0vOEBLOBSabTVaZhT4-wdW5ca5PZV9ZvdBNvQ8TIde8MsdaU7Hc4H7unhrLh6HnH1p8WQ9ZQVcbHbxxK5lWWetc30oHuqoxoP_QmPmyQRF6w"/>
</div>
<div>
<h3 className="font-bold text-white group-hover:text-primary transition-colors">Machine Learning Researcher</h3>
<p className="text-xs text-slate-400">Mistral AI • Paris / Remote</p>
</div>
</div>
<div className="relative flex items-center justify-center">
<svg className="w-12 h-12 transform -rotate-90">
<circle className="text-white/5" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
<circle className="text-primary glow-accent" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="18.84" strokeWidth="3"></circle>
</svg>
<span className="absolute text-[10px] font-bold text-white">85%</span>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Python</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Deep Learning</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">NLP</span>
</div>
<div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
<div className="flex flex-col">
<span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Budget Range</span>
<span className="text-sm font-bold text-white">€120k - €180k</span>
</div>
<button onClick={() => setSelectedJob({ id: 'job-5', title: 'Machine Learning Researcher', questions: [{ question: 'Link your previous ML papers or blog posts.', required: false }] })} className="px-6 py-2 rounded-xl tech-gradient text-white text-xs font-bold hover:opacity-90 transition-opacity">
                        Apply Now
                    </button>
</div>
</div>
{/* Job Card 6 */}
<div className="glassmorphism p-6 rounded-2xl hover:border-primary/40 transition-all group relative overflow-hidden">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl glassmorphism flex items-center justify-center p-2 border-white/5 bg-slate-800">
<img alt="LangChain" className="w-full h-full object-contain" data-alt="LangChain corporate logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg6DcAsaijlXGn9XVFbia_S5vRDFdSIuPZ0UhlsHOH3UUcVec2oehDvtlCQvVelPHhc7V7T0WsV1nii1YevpUuBFJhtP6aEADIa95NnQY-CiJ0Aqy5cUeLd12LtWuZ_Dn11RQtjRYOBSjec16lYgkonK6eOr0hzU9ChndLA5XHU6F5C33lA5FbR6dK5Le3scBZn3FVtXxFAhg0ZPkjw4g9NsiFXaOg7wTARVfVZF1f7oqaSIC2wP2c6PQZ9dnxrKcItJTyXoaCfg"/>
</div>
<div>
<h3 className="font-bold text-white group-hover:text-primary transition-colors">Developer Advocate, AI SDKs</h3>
<p className="text-xs text-slate-400">LangChain • Remote</p>
</div>
</div>
<div className="relative flex items-center justify-center">
<svg className="w-12 h-12 transform -rotate-90">
<circle className="text-white/5" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
<circle className="text-accent-purple shadow-accent-purple/40" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="10.05" strokeWidth="3"></circle>
</svg>
<span className="absolute text-[10px] font-bold text-white">92%</span>
</div>
</div>
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">TypeScript</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">AI Agents</span>
<span className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">Documentation</span>
</div>
<div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
<div className="flex flex-col">
<span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Budget Range</span>
<span className="text-sm font-bold text-white">$130k - $170k</span>
</div>
<button className="px-6 py-2 rounded-xl glassmorphism text-white text-xs font-bold hover:bg-white/10 transition-colors border-white/20">
                        View Mission
                    </button>
</div>
</div>
</div>
{/* Pagination / Load More */}
<div className="mt-16 flex flex-col items-center gap-6">
<button className="px-10 py-4 rounded-2xl glassmorphism border-primary/30 text-white font-bold hover:bg-primary/5 transition-all flex items-center gap-3 group">
                Load more missions
                <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_arrow_down</span>
</button>
<p className="text-slate-500 text-sm">Showing 6 of 312 available roles</p>
</div>
</main>
{/* Tech-Noir Footer Elements */}
<div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

{selectedJob && (
  <QuickApplyModal
    jobId={selectedJob.id}
    jobTitle={selectedJob.title}
    customQuestions={selectedJob.questions}
    onClose={() => setSelectedJob(null)}
    onApplySuccess={() => {
      setSelectedJob(null);
      alert('Successfully applied to ' + selectedJob.title);
    }}
  />
)}

    </div>
  );
}
