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

{/* BEGIN: Main Layout */}
<main className="flex min-h-screen">
{/* BEGIN: Left Visual Side */}
<section className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
{/* Background Abstract Elements */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e293b_0%,#0a0d14_100%)]"></div>
{/* Decorative Neural Mesh Overlay (Simplified SVG) */}
<svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
<defs>
<linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" ></stop>
<stop offset="100%" ></stop>
</linearGradient>
</defs>
<path d="M0 20 Q 25 10 50 20 T 100 20" fill="transparent" stroke="url(#grad1)" strokeWidth="0.1"></path>
<path d="M0 40 Q 25 30 50 40 T 100 40" fill="transparent" stroke="url(#grad1)" strokeWidth="0.1"></path>
<path d="M0 60 Q 25 50 50 60 T 100 60" fill="transparent" stroke="url(#grad1)" strokeWidth="0.1"></path>
</svg>
{/* Logo Branding */}
<div className="relative z-10 flex items-center space-x-2">
<img alt="Synk.ai Logo" className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4YLMXwsuL_XJCRCEolP1-_7e_slBRwcmZxyGCsX84ElYX3u6AG5tIJrm1FfafjazCVPiIZaFBNbcSc-No75Ro3ZaKuhh1eWrXGpjsDcOC7-hwectg3DLX6zuIRfZg75cMMs5eGoFOy5C1DeiXkCx_us8YAqdodDQURNgTkYvtMyW24sMuWB-Kocjex9SCtIKivDieEEBtgzjdRXtJv72IS6rYHYfJVWOQSx2-pPu6xsxTS8KQ1bgwWdm2XOQmzaHJAYd8jqJk3A"/>
<span className="text-xl font-bold tracking-tight text-white">Synk.ai</span>
</div>
{/* Main Heading Content */}
<div className="relative z-10 max-w-xl">
<div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
<span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
<span className="text-[10px] font-bold tracking-widest uppercase text-blue-400">System Online: V4.2.0</span>
</div>
<h1 className="text-7xl font-extrabold leading-[1.1] mb-6">
<span className="block text-white">The Future of</span>
<span className="block text-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">Neural</span>
<span className="block text-white">Workflows.</span>
</h1>
<p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
          Synk.ai is the premier 'Tech-Noir' ecosystem for elite developers and visual creators. Experience the high-fidelity portfolio-first interface designed for the next generation of creative engineering.
        </p>
{/* Feature Cards / Thumbnails */}
<div className="flex space-x-4">
<div className="w-32 h-32 rounded-xl glass-morphism p-1 overflow-hidden group transition-all duration-500 hover:border-blue-500/50">
<img alt="System Hardware" className="w-full h-full object-cover rounded-lg opacity-60 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaWcGfKfUNK1Ys6Fh3ECoJ2JFEgDJT8YQvUMUqfEkUg0RYx4uFlO5SwXHBmdFxf-JMFAtgkOoV8YcX-SkDqdK7nuiQECUeF1g8t9P2J8LdyO_4jLglg_wvgC6tjFFwI5soxxR46-xiAK69zOF4g0j_kIm5mHprhPA19JyNEczLDd6AwhJ5xgAd0PLyOkZOylJwUvSIqtC3NgHr5nJVXokbt8Od7F89UmM_lcFGvBcFu1yzSaSm7HcYiqBjoxbp2yWuMaZgkgChrA"/>
</div>
<div className="w-32 h-32 rounded-xl glass-morphism p-1 overflow-hidden group transition-all duration-500 border-blue-500/30">
<img alt="Global Network" className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjJkxmuD0FGo3l3kMOllUIs5E0SXsVTnLrB67kH1BNveb3VlQa2Xda3ILuFwm4iP3yVLuxKYL4YiHH85Bfeo9mY2eaLAqA1MQFvUbWxP1zeFnOMaAgRfVbVGdMC9Uy50NyeBPvbqAPYPZaKxwqAyBjlYoNNbXCMlFBGTplTU7BFLZ-WjLacpOBxkw2zLi9T3nzeYsvpBISrGJSdbA1RzKaWniEJiSxosIU4pPHGPNuFCAbe4fmZMwdUfbk-Ym9ADxtDb-v5fskfQ"/>
</div>
<div className="w-32 h-32 rounded-xl glass-morphism p-1 overflow-hidden group transition-all duration-500 hover:border-blue-500/50">
<img alt="Neural Prism" className="w-full h-full object-cover rounded-lg opacity-60 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeYrqDjp41z51tDyJ0Uw96rvPPJQ0lxJ1oTaDr2woQ93BjgcdRFHJuHf-RMxPiBB_lh9F5Rvyc0VjihmPL2L0B5Rjq6smlsbc_MRfYjA0IEMigjk_KRNivsrJ3TJeUIcRuw1vPkG6YcAlS6ZIseTkyS8Nd3or-Q-3Ffy8_SHcF6-e0LTM-DlW2HtQg23cRQbik3LletKZQON9fM7Fx8OKgnW5DeI2WIFqkNIDaXlWS9k-l7V7wJWtIO8TAmfqEuAQPoCAj0ugwZA"/>
</div>
</div>
</div>
{/* Footer Branding */}
<div className="relative z-10 text-xs text-gray-500 font-medium">
        © 2024 SYNK.AI TECHNOLOGIES INC. ALL RIGHTS RESERVED.
      </div>
</section>
{/* END: Left Visual Side */}
{/* BEGIN: Right Login Side */}
<section className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 bg-[#0d1117]">
{/* Top Utility Nav */}
<div className="absolute top-8 right-8 flex items-center space-x-4">
<span className="text-sm text-gray-500">Don't have an account?</span>
<Link href="/signup"className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-sm font-medium transition-colors" >Sign Up</Link>
</div>
<div className="w-full max-w-md" data-purpose="login-form-container">
<header className="mb-10 text-center lg:text-left">
<h2 className="text-4xl font-bold text-white mb-2">Sign In</h2>
<p className="text-gray-400">Re-establish your synk with the ecosystem.</p>
</header>
{/* BEGIN: Form */}
<form className="space-y-6" onSubmit={handleSubmit}>
{/* Email Field */}
<div className="space-y-2">
<label className="block text-sm font-medium text-gray-300" htmlFor="email">Email Address</label>
<div className="relative group">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
</div>
<input className="block w-full pl-10 pr-3 py-3 glass-morphism text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all rounded-lg" id="email" name="email" placeholder="neural_link@synk.ai" required type="email"/>
</div>
</div>
{/* Password Field */}
<div className="space-y-2">
<div className="flex items-center justify-between">
<label className="block text-sm font-medium text-gray-300" htmlFor="password">Password</label>
<Link href="/"className="text-xs text-blue-400 hover:text-blue-300 transition-colors" >Forgot Password?</Link>
</div>
<div className="relative group">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
</div>
<input className="block w-full pl-10 pr-3 py-3 glass-morphism text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all rounded-lg" id="password" name="password" placeholder="••••••••••••" required type="password"/>
</div>
</div>
{/* Sign In Button */}
<button className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0" type="submit">
            Sign In to Terminal
          </button>
</form>
{/* END: Form */}
{/* BEGIN: SSO Providers */}
<div className="mt-8">
<div className="relative mb-6">
<div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
<div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0d1117] px-4 text-gray-500 font-medium tracking-widest">Or connect with</span></div>
</div>
<div className="grid grid-cols-2 gap-4">
<button type="button" onClick={() => handleOAuth('google')} className="flex items-center justify-center px-4 py-2.5 glass-morphism rounded-lg hover:bg-white/5 transition-colors group">
<svg className="h-5 w-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="currentColor"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
</svg>
<span className="text-sm font-medium">Google</span>
</button>
<button type="button" onClick={() => handleOAuth('github')} className="flex items-center justify-center px-4 py-2.5 glass-morphism rounded-lg hover:bg-white/5 transition-colors group">
<svg className="h-5 w-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"></path>
</svg>
<span className="text-sm font-medium">GitHub</span>
</button>
</div>
</div>
{/* END: SSO Providers */}
<footer className="mt-12 text-center">
<p className="text-[10px] text-gray-500 leading-relaxed max-w-[280px] mx-auto">
            By accessing the terminal, you agree to our <Link href="/"className="text-blue-500/80 hover:text-blue-400" >Terms of Service</Link> and <Link href="/"className="text-blue-500/80 hover:text-blue-400" >Privacy Policy</Link>.
          </p>
</footer>
</div>
</section>
{/* END: Right Login Side */}
</main>
{/* END: Main Layout */}

    </div>
  );
}
