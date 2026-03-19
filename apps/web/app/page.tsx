import React from 'react';
import Link from 'next/link';
import Spline from '@splinetool/react-spline/next';
import { Header } from '@/components/ui/header-1';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Marquee } from '@/components/ui/marquee';
import { FAQSection } from '@/components/ui/faq-section';

export const metadata = {
  title: "synk.ai | Frontier Talent",
  description: "The next-generation autonomous AI software development marketplace.",
};

export default function LandingPage() {
  const startups = [
    "Neysa AI", "Fractal Analytics", "Haptik AI", "Qure.ai", "Yellow.ai",
    "Krutrim", "Sarvam AI", "GreyOrange", "Pixis", "Uniphore",
    "HiddenLayer", "Airia", "Aurascape", "Vanta", "Wiz",
    "Cribl", "dbt Labs", "Starburst", "Fivetran", "Monte Carlo"
  ];

  const popularServices = [
    {
      title: "Brand Design",
      color: "bg-[#121212] border-white/[0.03]",
      image: "https://images.unsplash.com/photo-1626785773579-c1928cad062f?q=80&w=400&auto=format&fit=crop",
      textColor: "text-white/90"
    },
    {
      title: "3D Design",
      color: "bg-[#161616] border-white/[0.03]",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
      textColor: "text-white/90"
    },
    {
      title: "Frontend Web Development",
      color: "bg-[#111111] border-white/[0.03]",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
      textColor: "text-white/90"
    },
    {
      title: "Video Editing",
      color: "bg-[#1a1a1a] border-white/[0.03]",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cc4cb4c?q=80&w=400&auto=format&fit=crop",
      textColor: "text-white/90"
    },
    {
      title: "Social Media Management",
      color: "bg-[#141414] border-white/[0.03]",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop",
      textColor: "text-white/90"
    },
    {
      title: "Backend Development",
      color: "bg-[#0d0d0d] border-white/[0.03]",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop",
      textColor: "text-white/90"
    }
  ];


  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen">
      <Header />

      <main className="pt-16">
        {/* New Geometric Hero Section */}
        <section className="relative">
          <HeroGeometric 
            badge="v3.0 Release"
            title1="Frontier Talent."
            title2="In your hands."
          >
            <div className="flex flex-col md:flex-row gap-6 mt-12 justify-center">
              <Link href="#roles">
                <HoverBorderGradient
                  as="div"
                  containerClassName="rounded-full"
                  className="bg-[#b22206] text-white px-12 py-5 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 group shadow-2xl transition-all"
                >
                  Get Started
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </HoverBorderGradient>
              </Link>
              <Link href="/community">
                <HoverBorderGradient
                  as="div"
                  containerClassName="rounded-full"
                  className="bg-zinc-900 text-white px-12 py-5 text-sm font-black uppercase tracking-widest text-center"
                >
                  View Ecosystem
                </HoverBorderGradient>
              </Link>
            </div>

          </HeroGeometric>
        </section>

        {/* Startup Marquee Ribbon */}
        <div className="bg-[#030303] border-y border-white/5 py-10 overflow-hidden">
          <Marquee duration={40} pauseOnHover={true} className="flex items-center">
            {startups.map((name) => (
              <span 
                key={name}
                className="mx-12 text-stone-600 font-black uppercase tracking-[0.25em] text-[10px] hover:text-primary transition-colors duration-300 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>

        {/* Global 3D Interactive Background Wrapper */}
        <div className="relative overflow-hidden bg-[#030303]">
          {/* Spline Background */}
          <div className="absolute inset-0 z-0">
            <Spline
              className="w-full h-full scale-110 opacity-70"
              scene="/scene.splinecode" 
            />
          </div>

          <div className="relative z-10">
            {/* Popular Services Marquee Section */}
            <section className="pt-32 pb-16 overflow-hidden">
              <div className="px-6 md:px-20 mb-12">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Popular Services</h2>
              </div>
              
              <Marquee duration={50} pauseOnHover={true} className="flex gap-6 pb-8 pt-4">
                {popularServices.map((service, index) => (
                  <div 
                    key={index}
                    className={`relative w-[320px] h-[380px] rounded-[2.5rem] border border-white/5 overflow-hidden mx-3 flex flex-col justify-between ${service.color} group hover:scale-[1.02] transition-transform duration-300 shadow-2xl cursor-pointer shrink-0`}
                  >

                    <div className="p-6">
                      <h3 className={`font-black text-3xl leading-tight tracking-tight ${service.textColor}`}>{service.title}</h3>
                    </div>
                    <div className="relative h-[220px] w-full mt-auto px-4 pb-0 flex items-end">
                      <div className="w-full h-full rounded-t-xl overflow-hidden shadow-2xl translate-y-6 group-hover:translate-y-2 transition-transform duration-500 ease-out">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover object-center" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Marquee>
            </section>

            {/* Role Selection Section */}
            <section id="roles" className="py-24 px-6 md:px-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 relative z-10 shadow-2xl backdrop-blur-md">
                {/* Card A: Creator */}
                <div className="p-12 md:p-20 bg-black/40 border-r border-white/10 flex flex-col justify-between hover:bg-black/60 transition-all duration-300 group">
                  <div>
                    <span className="text-primary font-black text-4xl mb-6 block drop-shadow-lg">01</span>
                    <h2 className="text-4xl font-black tracking-tighter mb-4 text-white uppercase leading-none">I want to build</h2>
                    <p className="text-stone-400 font-medium text-lg leading-relaxed mb-12 max-w-sm">
                      Connect your GitHub repositories, showcase your technical velocity, and get matched with frontier labs.
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-4 mb-12">
                      <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-stone-300">
                        <span className="material-symbols-outlined text-primary">terminal</span>
                        GitHub Integration
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-stone-300">
                        <span className="material-symbols-outlined text-primary">deployed_code</span>
                        Proof of Work
                      </li>
                    </ul>
                    <Link href="/onboarding/creator" className="w-full block">
                      <HoverBorderGradient
                          as="div"
                          containerClassName="w-full rounded-full"
                          className="w-full bg-on-surface text-surface py-5 font-black uppercase tracking-widest flex items-center justify-center gap-3"
                      >
                        Enter as Creator
                      </HoverBorderGradient>
                    </Link>

                  </div>
                </div>

                {/* Card B: Partner */}
                <div className="p-12 md:p-20 bg-[#0a0a0a]/40 flex flex-col justify-between hover:bg-black/60 transition-all duration-300">
                  <div>
                    <span className="text-secondary font-black text-4xl mb-6 block drop-shadow-lg">02</span>
                    <h2 className="text-4xl font-black tracking-tighter mb-4 text-white uppercase leading-none">I want to hire</h2>
                    <p className="text-stone-400 font-medium text-lg leading-relaxed mb-12 max-w-sm">
                      Rapid matching for high-stakes projects. Access a curated pool of developers vetted by neural performance.
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-4 mb-12">
                      <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-stone-300">
                        <span className="material-symbols-outlined text-secondary">bolt</span>
                        Rapid Matching
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-stone-300">
                        <span className="material-symbols-outlined text-secondary">verified</span>
                        Neural Vetting
                      </li>
                    </ul>
                    <Link href="/onboarding/partner" className="w-full block">
                      <HoverBorderGradient
                          as="div"
                          containerClassName="w-full rounded-full"
                          className="w-full bg-[#b22206] text-white py-5 font-black uppercase tracking-widest flex items-center justify-center gap-3"
                      >
                        Enter as Partner
                      </HoverBorderGradient>
                    </Link>

                  </div>
                </div>
              </div>
            </section>

            {/* Precision Vetting Rate Section */}
            <section className="py-32 px-6 md:px-20 flex justify-center">
              <div className="max-w-3xl w-full relative z-10 text-center">
                <div className="border-t-4 border-primary pt-8 inline-block">
                  <div className="text-[10rem] font-black leading-none tracking-tighter text-white animate-pulse-slow">98<span className="text-primary">%</span></div>
                  <p className="text-2xl font-bold uppercase tracking-[0.3em] text-white mt-6">Precision Vetting Rate</p>
                  <p className="text-stone-400 mt-6 leading-relaxed mx-auto max-w-md font-medium">Our neural engine analyzes semantic code patterns to ensure every match is technically sound before you even meet.</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-high py-20 px-6 md:px-20 border-t border-outline-variant architect-grid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black tracking-tighter text-[#b22206] mb-8">synk.ai</div>
            <p className="text-on-surface-variant max-w-sm font-medium">The architectural foundation for high-performance engineering teams. Built for the frontier.</p>
          </div>
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest mb-6">Network</h4>
            <ul className="space-y-4 text-sm font-bold text-stone-600">
              <li><Link className="hover:text-primary transition-colors" href="/community">Talent Pool</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/community/jobs">Partner Directory</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">API Access</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-stone-600">
              <li><Link className="hover:text-primary transition-colors" href="#">Privacy</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Terms</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Ethics</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-outline-variant flex justify-between items-center relative z-10">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">© 2024 SYNK.AI LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-stone-400 hover:text-primary cursor-pointer">public</span>
            <span className="material-symbols-outlined text-stone-400 hover:text-primary cursor-pointer">terminal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
