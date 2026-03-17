import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="relative min-h-screen flex flex-col">
{/* Minimal Navigation */}
<header className="flex items-center justify-between px-8 py-6 md:px-16 border-b border-border-subtle bg-pure-dark/80 backdrop-blur-xl sticky top-0 z-50">
<div className="flex items-center gap-3">
<div className="size-6 bg-primary rounded-sm flex items-center justify-center">
<svg className="text-white size-4" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
</svg>
</div>
<h2 className="text-lg font-extrabold tracking-tight uppercase text-white/90">Synk</h2>
</div>
<div className="flex items-center gap-6">
<div className="h-8 w-8 rounded-full border border-border-subtle overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
<img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH4bsteSlS7DI_RjeCa3KizPsE1btPzXz9wQS-Fllfh83PJZ65KTKhxn6rSzjY3vZduhkwBF-2s_-euHWahN-noOGZ0JE4I7zBuhBAJs43iWVlU2DSYokM0bqP3IM1967hLFH_N24DCwmVydTGK19hxXguv2atdwNfZwvHj36oc3oDiOcLWPQLT5r2x4hibzuki6Ftz18djH6sdvJLhBAiw0BNVp8afa2IxTe7wjpG-0kW5pb4HMkqon_skHBXdPmXlEY5a4bcKQ" />
</div>
</div>
</header>
{/* Main Content */}
<main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
<div className="max-w-4xl w-full">
<div className="text-center mb-20">
<h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tighter">Choose your role.</h1>
<p className="text-slate-500 text-lg font-medium max-w-lg mx-auto">Select your path to enter the high-precision talent network.</p>
</div>
<div className="grid md:grid-cols-2 gap-6">
{/* Hiring Mode Selection */}
<div className="selection-card p-10 flex flex-col items-center text-center group cursor-pointer">
<div className="mb-10 w-32 h-32 flex items-center justify-center abstract-icon-bg relative">
<svg className="w-16 h-16 text-primary/80 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-10.5v10.5" strokeLinecap="round" strokeLinejoin="round"></path>
<path d="M12 21.75V12m0 0l9-5.25M12 12l-9-5.25" opacity="0.3" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<div className="absolute inset-0 border border-primary/5 scale-125 rounded-full animate-pulse"></div>
</div>
<h3 className="text-2xl font-bold text-white mb-3">Enterprise Hiring</h3>
<p className="text-slate-500 mb-10 text-sm leading-relaxed max-w-[240px]">Access top-tier talent through our proprietary AI validation engine.</p>
<div className="w-full mt-auto">
<Link href="/signup-hiring" className="w-full bg-primary btn-glow text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
<span className="tracking-wide">ENTER HIRING MODE</span>
<span className="material-symbols-outlined text-xl"><br /></span>
</Link>
</div>
</div>
{/* Talent Mode Selection */}
<div className="selection-card p-10 flex flex-col items-center text-center group cursor-pointer">
<div className="mb-10 w-32 h-32 flex items-center justify-center abstract-icon-bg relative">
<svg className="w-16 h-16 text-primary/80 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<div className="absolute inset-0 border border-primary/5 scale-125 rounded-full animate-pulse" ></div>
</div>
<h3 className="text-2xl font-bold text-white mb-3">Professional Talent</h3>
<p className="text-slate-500 mb-10 text-sm leading-relaxed max-w-[240px]">Showcase your expertise to the world's most innovative technology firms.</p>
<div className="w-full mt-auto">
<Link href="/signup-freelancer" className="w-full bg-primary btn-glow text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
<span className="tracking-wide">ENTER TALENT MODE</span>
<span className="material-symbols-outlined text-xl"><br /></span>
</Link>
</div>
</div>
</div>
<div className="mt-16 text-center">
<p className="text-slate-600 text-sm">
                        Already registered? 
                        <Link href="/login"className="text-primary hover:text-primary/80 transition-colors font-semibold ml-1 underline underline-offset-4 decoration-primary/30" >
                            Sign in to your account
                        </Link>
</p>
</div>
</div>
</main>
{/* Minimal Footer */}
<footer className="py-10 border-t border-border-subtle bg-pure-dark">
<div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
<div className="text-slate-700 text-[10px] tracking-[0.2em] uppercase font-bold">
                    © 2024 Synk.ai Systems
                </div>
<div className="flex gap-8">
<Link href="/"className="text-slate-700 hover:text-slate-400 transition-colors text-[10px] tracking-[0.2em] uppercase font-bold" >Privacy</Link>
<Link href="/"className="text-slate-700 hover:text-slate-400 transition-colors text-[10px] tracking-[0.2em] uppercase font-bold" >Legal</Link>
<Link href="/"className="text-slate-700 hover:text-slate-400 transition-colors text-[10px] tracking-[0.2em] uppercase font-bold" >Network Status</Link>
</div>
</div>
</footer>
</div>

    </div>
  );
}
