import Link from 'next/link';

export const metadata = {
  title: "synk.ai - Frontier Talent. In your hands.",
  description: "The next-generation autonomous AI software development marketplace.",
};

export default function LandingPage() {
  return (
    <div className="bg-[#FFFAEB] font-display text-[#1F1F1F] antialiased min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b border-[#1F1F1F]/10 sticky top-0 bg-[#FFFAEB]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#F04E30] text-3xl">hub</span>
          <span className="text-xl font-black tracking-tighter">synk.ai</span>
        </div>
        <Link href="/login" className="text-sm font-bold tracking-tight px-4 py-2 border border-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-[#FFFAEB] transition-all">
          Log in
        </Link>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-500 via-red-500 to-rose-700 opacity-90"></div>
          <div className="relative z-10 px-6 py-24 md:py-32 flex flex-col items-center text-center gap-8">
            <h1 className="text-white text-5xl md:text-7xl font-black leading-none tracking-tight uppercase">
              Frontier Talent.<br/>In your hands.
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl font-medium">
              Revolutionizing how creators and partners connect through AI. 
              The world's first architectural marketplace for elite proof-of-work.
            </p>
            <Link href="/role-selection" className="bg-gradient-to-r from-[#F04E30] via-[#F97316] to-[#EAB308] text-white px-10 py-5 font-bold tracking-widest uppercase text-sm border-2 border-white/20 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              Get Started →
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFFAEB] to-transparent"></div>
        </section>

        {/* Role Selection Section */}
        <section className="px-6 py-20 bg-[radial-gradient(#1F1F1F15_1px,transparent_1px)] bg-[length:24px_24px]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center uppercase tracking-tighter">Choose Your Path</h2>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Card 1: Creator */}
              <div className="bg-white border-2 border-[#1F1F1F] p-8 flex flex-col gap-6 shadow-[12px_12px_0px_0px_rgba(31,31,31,1)] group hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(31,31,31,1)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F04E30]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#F04E30] text-4xl">code_blocks</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase">I want to build</h3>
                </div>
                <p className="text-[#1F1F1F]/70 text-lg leading-snug">
                  For Creators: Seamlessly integrate your GitHub workflow and showcase your frontier engineering skills to the world. Get verified by AI.
                </p>
                <div className="mt-auto">
                  <Link href="/onboarding/creator" className="block w-full py-4 bg-[#1F1F1F] text-white font-bold text-sm uppercase tracking-wider text-center group-hover:bg-[#F04E30] transition-colors">
                    Join as Creator
                  </Link>
                </div>
              </div>

              {/* Card 2: Partner */}
              <div className="bg-white border-2 border-[#1F1F1F] p-8 flex flex-col gap-6 shadow-[12px_12px_0px_0px_rgba(31,31,31,1)] group hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(31,31,31,1)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F04E30]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#F04E30] text-4xl">speed</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase">I want to hire</h3>
                </div>
                <p className="text-[#1F1F1F]/70 text-lg leading-snug">
                  For Partners: Rapid matching with elite talent. Access a curated pool of developers vetted by frontier AI standards in under 2 minutes.
                </p>
                <div className="mt-auto">
                  <Link href="/onboarding/partner" className="block w-full py-4 border-2 border-[#1F1F1F] text-[#1F1F1F] font-bold text-sm uppercase tracking-wider text-center group-hover:bg-[#1F1F1F] group-hover:text-white transition-all">
                    Join as Partner
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Sign Up / Modal Intro Section */}
        <section className="px-6 py-24 bg-[#1F1F1F] text-[#FFFAEB]">
          <div className="max-w-xl mx-auto flex flex-col gap-10 text-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Join the Network</h2>
              <p className="text-[#FFFAEB]/60 text-lg">Start your journey with synk.ai today. Authenticate to sync your frontier DNA.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-center gap-4 w-full py-5 border-2 border-[#FFFAEB] bg-transparent font-bold uppercase text-sm tracking-widest hover:bg-[#FFFAEB] hover:text-[#1F1F1F] transition-all">
                <span className="material-symbols-outlined">brand_family</span>
                Continue with Google
              </button>
              <button className="flex items-center justify-center gap-4 w-full py-5 border-2 border-[#FFFAEB] bg-transparent font-bold uppercase text-sm tracking-widest hover:bg-[#FFFAEB] hover:text-[#1F1F1F] transition-all">
                <span className="material-symbols-outlined">terminal</span>
                Continue with GitHub
              </button>
            </div>
            
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">
              By signing up, you agree to our <span className="underline cursor-pointer">Terms of Service</span>.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F1F1F]/10 bg-[#FFFAEB] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F04E30] text-2xl">hub</span>
            <span className="text-lg font-black tracking-tighter uppercase">synk.ai</span>
          </div>
          
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-[#1F1F1F]/60">
            <Link href="/" className="hover:text-[#F04E30] transition-colors">Home</Link>
            <Link href="/community" className="hover:text-[#F04E30] transition-colors">Explore</Link>
            <Link href="/portfolio" className="hover:text-[#F04E30] transition-colors">Profile</Link>
            <Link href="/terms" className="hover:text-[#F04E30] transition-colors">Legal</Link>
          </div>
          
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 text-center md:text-right">
            © 2024 SYNK.AI GLOBAL FRONTIER — SHARP UNTIL THE END.
          </p>
        </div>
      </footer>
    </div>
  );
}
