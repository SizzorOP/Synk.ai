"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase';

export default function Page() {
  const router = useRouter();
  const supabase = createClient();
  const handleOAuth = async (provider: 'google' | 'github') => {
    // TEMPORARY: For local testing, skip real auth and go straight to assigned page
    router.push('/community');
    return;
    /*
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      },
    });
    */
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/community');
  };
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="flex min-h-screen w-full flex-col @container">
{/* Top Navigation */}
<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 lg:px-10 py-4 absolute w-full z-10 bg-transparent">
<div className="flex items-center gap-4">
<div className="size-8 text-primary">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
</svg>
</div>
<h2 className="text-slate-900 dark:text-white text-xl font-black leading-tight tracking-tight">Synk.ai</h2>
</div>
<div className="flex items-center gap-4">
<span className="hidden sm:inline text-slate-500 dark:text-slate-400 text-sm">Already have an account?</span>
<Link href="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold transition-colors hover:bg-slate-300 dark:hover:bg-slate-700">
                    Log In
                </Link>
</div>
</header>
<main className="flex flex-1 flex-col lg:flex-row min-h-screen">
{/* Left Side: Visual / Marketing Copy (Portfolio-First) */}
<section className="relative hidden lg:flex flex-1 flex-col justify-end p-12 overflow-hidden bg-slate-900">
<div className="absolute inset-0 z-0 opacity-50 grayscale hover:grayscale-0 transition-all duration-700" data-alt="Abstract cinematic dark tech landscape with neon blue accents" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuC0vG82xqKAASH1SHX-MCDGhRM0Gktru_Vw3wEykySIquFbaO-heXBEJGOIrd6KRzgAbH9oYIJG0eJ-FZ2VcW8b6-QXSykg5oabMaZj8mkndNB_vbLkDpVN2U1Y6AWdYDhnvTJEFWKCrerEFKN-W7oTyzSbND12UGueSdndRC05Ayb5fF3AVo7Ia_cVDbiCAkDFRLeMt8AN-F72C5UypautjIjNBIJvkQC5V3Gad7jo_xTYE895zEwRI6M2yJ6RoTfXOYSZJQZeYA'.replace(/^'|'$/g, "")})` }}>
</div>
<div className="absolute inset-0 z-[1] bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
<div className="absolute inset-0 z-[1] tech-noir-gradient"></div>
<div className="relative z-[2] max-w-xl">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest mb-6">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
                        System Online: v4.2.0
                    </div>
<h1 className="text-white text-5xl xl:text-7xl font-black leading-[1.1] tracking-tighter mb-6">
                        The Future of <span className="text-primary">Neural</span> Workflows.
                    </h1>
<p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
                        Synk.ai is the premier 'Tech-Noir' ecosystem for elite developers and visual creators. Experience the high-fidelity portfolio-first interface designed for the next generation of creative engineering.
                    </p>
{/* Small "Portfolio" Preview Cards */}
<div className="grid grid-cols-3 gap-4 mt-8 opacity-80">
<div className="aspect-square rounded-xl bg-slate-800 border border-slate-700 p-1">
<div className="w-full h-full rounded-lg bg-cover bg-center" data-alt="Retro futuristic computer hardware photography" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuB5mVWJiFm1gnnmGiWiAkoeBbUPSArlxXi6cKdIVIHSXUOnn9NLoudoutyjkr_PZ87GOMDlp0IBm9TLs7tW7V89gajVS5Y-O1tj4_sVTq8XP-AN9PvK1TUnucmv2ziDExs41SuUuWLwgeQe2GZcxxkJt6R2594UWZKAO45k1rcUqaYSHhdKVNOU1-pW1NJEyxOBpFnaxG_I8WxAMHSBQbFNc-STcTmVvKoJfgkYF_Prq-pCHCqhK69XKKB9t0gzXC9f-3DtDjTmug'.replace(/^'|'$/g, "")})` }}></div>
</div>
<div className="aspect-square rounded-xl bg-slate-800 border border-slate-700 p-1">
<div className="w-full h-full rounded-lg bg-cover bg-center" data-alt="Global network data visualization glowing blue" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuCNEwTpy_7JFjCM3YJHS-olcZp7SHF7oa3YQ5WG9EP8r_XSr020wTr73cZH0tqQWpgf8zkujxQlxmbAKooSxndxzaYwprrDgiW6a4-dCGs_4RUkluSoAUkG3aFVlyx3tkBtd-ESj3mgcTuiTBvtdnzERe9x4CgMsg3lR4t4BHazbkqFl74rB4lB-LeuxUJ9jXxTFwy71Nh9W0iFV5Ezi4v2th3UeYP_uhYGM7cCCD40KBVzTwGRHOlF81LFJDZ0gw11_4-TlPjJeA'.replace(/^'|'$/g, "")})` }}></div>
</div>
<div className="aspect-square rounded-xl bg-slate-800 border border-slate-700 p-1">
<div className="w-full h-full rounded-lg bg-cover bg-center" data-alt="Abstract 3D crystalline geometric structure" style={{ backgroundImage: `url(${'https://lh3.googleusercontent.com/aida-public/AB6AXuAbKrPkkOzCWWbYncNAonzkmrrKwVvJfYrKOqKBE_fOfeAPeB4NSXx-RT1OyJJ5-ahn1GPU2sOxrMKXs2R6afxj-b0zx0JrPD9sZuMYWwMobpwBQ_izeELbyp4YjcZK_XuNKuFUkJ8-dLJkNzXWuMdAhMLXoobKkQqjQJl6XTjGPs7JMlaxP_es6_EBZSQjr4BrKsfvCzLPlXt08Txzfq-QqtYuM3Vv-Mr0TxIO09gwQFmdquT6iq2AA2nIrbZ_zt2fheyQg5Gyww'.replace(/^'|'$/g, "")})` }}></div>
</div>
</div>
</div>
</section>
{/* Right Side: Signup Form */}
<section className="flex flex-1 flex-col justify-center items-center px-6 py-24 lg:px-12 bg-background-light dark:bg-background-dark">
<div className="w-full max-w-[440px] flex flex-col gap-8">
<div className="flex flex-col gap-2">
<h2 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">Enterprise Access</h2>
<p className="text-slate-500 dark:text-slate-400 text-base">Initialize your company's synk with the collective ecosystem.</p>
</div>
<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
<div className="grid grid-cols-2 gap-4">
<label className="flex flex-col gap-2">
<span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Company Name</span>
<input className="form-input flex w-full rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-12 px-4 text-base transition-all outline-none" placeholder="Acme Corp" type="text"/>
</label>
<label className="flex flex-col gap-2">
<span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Industry</span>
<input className="form-input flex w-full rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-12 px-4 text-base transition-all outline-none" placeholder="Technology" type="text"/>
</label>
</div>
<label className="flex flex-col gap-2">
<span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Work Email Address</span>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">alternate_email</span>
<input className="form-input flex w-full rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-12 pl-11 pr-4 text-base transition-all outline-none" placeholder="admin@acme.corp" type="email"/>
</div>
</label>
<label className="flex flex-col gap-2">
<span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Password</span>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
<input className="form-input flex w-full rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-12 pl-11 pr-4 text-base transition-all outline-none" placeholder="••••••••••••" type="password"/>
</div>
</label>
<div className="flex flex-col gap-4 mt-2">
<button className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-primary hover:bg-primary/90 text-white text-base font-bold transition-all shadow-lg shadow-primary/25" type="submit">
                                Start Synchronization
                            </button>
<div className="relative flex items-center py-2">
<div className="flex-grow border-t border-slate-300 dark:border-slate-800"></div>
<span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest font-bold">Or connect with</span>
<div className="flex-grow border-t border-slate-300 dark:border-slate-800"></div>
</div>
<div className="grid grid-cols-2 gap-4">
<button type="button" onClick={() => handleOAuth('google')} className="flex items-center justify-center gap-2 rounded-lg h-12 px-4 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
<svg className="w-5 h-5" viewBox="0 0 24 24">
<path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="currentColor"></path>
</svg>
<span className="text-sm font-bold">Google</span>
</button>
<button type="button" onClick={() => handleOAuth('github')} className="flex items-center justify-center gap-2 rounded-lg h-12 px-4 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
<svg className="w-5 h-5" viewBox="0 0 24 24">
<path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"></path>
</svg>
<span className="text-sm font-bold">GitHub</span>
</button>
</div>
</div>
</form>
<p className="text-center text-slate-500 dark:text-slate-500 text-xs px-8">
                        By clicking "Start Synchronization", you agree to our 
                        <Link href="/"className="text-primary hover:underline" >Terms of Service</Link> and 
                        <Link href="/"className="text-primary hover:underline" >Privacy Policy</Link>.
                    </p>
</div>
</section>
</main>
</div>
{/* Footer Decoration (Tech Noir style) */}
<div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>

    </div>
  );
}
