'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/header-1';
import { cn } from '@/lib/utils';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const candidatePlans = [
  {
    name: "Free",
    price: "0",
    description: "No credit card required",
    features: [
      "Unlimited service bookings",
      "10 freelance proposals/month",
      "Unlimited job/internship applications",
      "Standard profile visibility"
    ],

    cta: "Get started for free",
    href: "/onboarding/creator",
    isBestValue: false
  },
  {
    name: "Pro",
    price: "99",
    originalPrice: "199",
    discount: "-50%",
    billingInfo: "per month, billed monthly",
    yearlyInfo: "or ₹999/yr (save ₹189)",
    features: [
      "100 freelance proposals/month",
      "Unlimited job/internship applications",
      "2× profile visibility boost",
      "Verified badge"
    ],
    cta: "Get Pro",
    href: "#",
    isBestValue: true
  },
  {
    name: "Elite",
    price: "499",
    originalPrice: "999",
    discount: "-50%",
    billingInfo: "per month, billed monthly",
    yearlyInfo: "or ₹4,999/yr (save ₹989)",
    features: [
      "Unlimited freelance proposals",
      "Unlimited job/internship applications",
      "5x profile visibility boost",
      "Verified badge",
      "Dedicated Support",
      "24/7 Call Support"
    ],
    cta: "Get Elite",
    href: "#",
    isBestValue: false
  }
];

const hiringPlans = [
  {
    name: "Freemium",
    price: "0",
    description: "No credit card required",
    features: [
      "1 Active Job/Intern Post per month",
      "3 Active Freelance Gig Posts",
      "Email Support"
    ],

    cta: "Get started for free",
    href: "/onboarding/partner",
    isBestValue: false
  },
  {
    name: "Growth",
    price: "1,499",
    originalPrice: "2,999",
    discount: "-50%",
    billingInfo: "per month, billed monthly",
    yearlyInfo: "or ₹14,990/yr (save ₹20,998)",
    features: [
      "3 Active Job/Intern Posts per month",
      "10 Active Freelance Gig Posts",
      "200 Candidate Invites/month"
    ],
    cta: "Get Growth",
    href: "#",
    isBestValue: true
  },
  {
    name: "Scale",
    price: "4,999",
    originalPrice: "9,999",
    discount: "-50%",
    billingInfo: "per month, billed monthly",
    yearlyInfo: "or ₹49,990/yr (save ₹9,998)",
    features: [
      "10 Active Job/Intern Posts per month",
      "Unlimited Freelance Gig Posts",
      "Dedicated Account Manager"
    ],
    cta: "Get Scale",
    href: "#",
    isBestValue: false
  },
  {
    name: "Enterprise",
    price: "39,999",
    originalPrice: "79,999",
    discount: "-50%",
    billingInfo: "per month, billed monthly",
    yearlyInfo: "or ₹399,999/yr (save ₹559,989)",
    features: [
      "Unlimited Job/Intern Posts",
      "Advanced AI + Auto-filter Matching",
      "24/7 Call Support"
    ],
    cta: "Get Enterprise",
    href: "#",
    isBestValue: false
  }
];

const candidateFeatures = [
    { name: "Pricing", free: "Free", pro: "₹99/mo", elite: "₹499/mo" },
    { name: "Freelance Proposals/month", free: "10", pro: "100", elite: "Unlimited" },
    { name: "Job/Internship Applications", free: true, pro: true, elite: true },

    { name: "Verified Badge", free: false, pro: true, elite: true },
    { name: "Profile Visibility Boost", free: "1x", pro: "2x", elite: "5x" },
    { name: "Early Job Access", free: false, pro: "24 hrs", elite: "48 hrs" },
    { name: "Recruiter Insights", free: false, pro: false, elite: true },
    { name: "Dedicated Support", free: false, pro: true, elite: true },
    { name: "24/7 Call Support", free: false, pro: false, elite: true },
    { name: "Offline Events & Meetups", free: false, pro: false, elite: true },
];

const hiringFeatures = [
    { name: "Pricing", free: "Free", growth: "₹1,499/mo", scale: "₹4,999/mo", enterprise: "₹39,999/mo" },
    { name: "Active Job / Intern Posts", free: "1 active", growth: "3 / month", scale: "10 / month", enterprise: "Unlimited" },
    { name: "Active Freelance Gig Posts", free: "3 active", growth: "10 active", scale: "Unlimited", enterprise: "Unlimited" },
    { name: "Verified Badge", free: false, growth: true, scale: true, enterprise: true },

    { name: "Priority Support", free: "Email only", growth: true, scale: true, enterprise: true },
    { name: "24/7 Call Support", free: false, growth: false, scale: false, enterprise: true },
    { name: "Dedicated Account Manager", free: false, growth: false, scale: true, enterprise: true },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'candidate' | 'hiring'>('candidate');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = activeTab === 'candidate' ? candidatePlans : hiringPlans;
  const features = activeTab === 'candidate' ? candidateFeatures : hiringFeatures;

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen antialiased">
      <Header />
      
      <main className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">Pricing Plans</h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto font-medium">
            Choose the perfect plan to unlock premium features. Simple pricing, no hidden fees.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface-container-low border border-surface-variant p-1.5 flex gap-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('candidate')}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all",
                activeTab === 'candidate' ? "bg-primary text-white shadow-lg" : "text-stone-500 hover:text-on-surface"
              )}
            >
              <span className="material-symbols-outlined text-sm">person</span>
              Candidate Plans
            </button>
            <button 
              onClick={() => setActiveTab('hiring')}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all",
                activeTab === 'hiring' ? "bg-primary text-white shadow-lg" : "text-stone-500 hover:text-on-surface"
              )}
            >
              <span className="material-symbols-outlined text-sm">business_center</span>
              Hiring Plans
            </button>
          </div>
        </div>

        {/* Billing Switcher */}
        <div className="flex justify-center items-center gap-4 mb-20 text-sm font-black uppercase tracking-widest">
          <span className={cn("transition-colors", billingCycle === 'monthly' ? "text-on-surface" : "text-stone-400")}>Pay Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-surface-container-low border border-surface-variant rounded-full p-1 transition-all flex items-center shadow-inner"
          >
            <div className={cn(
                "w-5 h-5 bg-primary rounded-full transition-transform duration-300 shadow-md",
                billingCycle === 'yearly' ? "translate-x-7" : "translate-x-0"
            )} />
          </button>
          <span className={cn("transition-colors", billingCycle === 'yearly' ? "text-on-surface" : "text-stone-400")}>Pay Yearly</span>
        </div>


        {/* Pricing Cards Grid */}
        <div className={cn(
            "grid gap-8 mb-32",
            activeTab === 'candidate' ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={cn(
                "relative bg-white border border-surface-variant hover:border-primary/20 transition-all duration-300 p-8 flex flex-col group shadow-sm hover:shadow-xl",
                plan.isBestValue ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "",
                "rounded-[40px]"
              )}
            >
              {plan.isBestValue && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white py-1.5 px-6 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Best Value
                </div>
              )}
              
              <div className="mb-8">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 block">{plan.name}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter text-on-surface">₹{plan.price}</span>
                  {plan.discount && <span className="text-primary font-bold text-sm">/ {plan.discount}</span>}
                </div>
                {plan.originalPrice && (
                  <div className="text-stone-400 line-through text-sm font-medium mt-1">₹{plan.originalPrice}/mo</div>
                )}
                {plan.billingInfo && <div className="text-stone-500 text-sm mt-4 font-medium">{plan.billingInfo}</div>}
                {plan.yearlyInfo && <div className="text-primary text-xs mt-2 font-bold uppercase tracking-tight">{plan.yearlyInfo}</div>}
                {plan.description && <div className="text-stone-500 text-sm mt-4 font-medium">{plan.description}</div>}
              </div>

              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-bold text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <HoverBorderGradient
                as={Link}
                href={plan.href}
                containerClassName="w-full rounded-full"
                className="w-full bg-surface-container-highest text-on-surface py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
              >
                {plan.cta}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </HoverBorderGradient>
            </div>
          ))}
        </div>


        {/* Feature Comparison Table */}
        <section className="mt-40">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-20 uppercase">Compare Features</h2>
            <div className="overflow-x-auto border border-surface-variant rounded-[40px] bg-white p-4 shadow-xl">
                <table className="w-full text-left min-w-[800px]">
                    <thead>
                        <tr className="border-b border-surface-variant">
                            <th className="py-10 px-6 text-stone-400 font-bold uppercase text-xs tracking-widest">Features</th>
                            {activeTab === 'candidate' ? (
                                <>
                                    <th className="py-10 px-6 text-center">
                                        <div className="text-lg font-black text-primary">Free</div>
                                        <Link href="/onboarding/creator" className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-on-surface flex items-center justify-center gap-1 mt-2">
                                            Get started free <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </Link>
                                    </th>
                                    <th className="py-10 px-6 text-center">
                                        <div className="text-lg font-black text-primary">Pro</div>
                                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-on-surface flex items-center justify-center gap-1 mt-2">
                                            Get Pro <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </Link>
                                    </th>
                                    <th className="py-10 px-6 text-center">
                                        <div className="text-lg font-black text-primary">Elite</div>
                                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-on-surface flex items-center justify-center gap-1 mt-2">
                                            Get Elite <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </Link>
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th className="py-10 px-6 text-center">
                                        <div className="text-lg font-black text-primary">Freemium</div>
                                        <Link href="/onboarding/partner" className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-on-surface flex items-center justify-center gap-1 mt-2">
                                            Get started free <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </Link>
                                    </th>
                                    <th className="py-10 px-6 text-center">
                                        <div className="text-lg font-black text-primary">Growth</div>
                                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-on-surface flex items-center justify-center gap-1 mt-2">
                                            Get Growth <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </Link>
                                    </th>
                                    <th className="py-10 px-6 text-center">
                                        <div className="text-lg font-black text-primary">Scale</div>
                                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-on-surface flex items-center justify-center gap-1 mt-2">
                                            Get Scale <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </Link>
                                    </th>
                                    <th className="py-10 px-6 text-center">
                                        <div className="text-lg font-black text-primary">Enterprise</div>
                                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-on-surface flex items-center justify-center gap-1 mt-2">
                                            Get Enterprise <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </Link>
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-variant/30">
                        {features.map((feature, idx) => (
                            <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                                <td className="py-6 px-6 text-sm font-bold text-on-surface-variant">{(feature as any).name}</td>
                                {activeTab === 'candidate' ? (
                                    <>
                                        <td className="py-6 px-6 text-center text-sm font-black uppercase text-stone-400 tracking-tight">
                                            {renderFeatureValue((feature as any).free)}
                                        </td>
                                        <td className="py-6 px-6 text-center text-sm font-black uppercase text-on-surface tracking-tight">
                                            {renderFeatureValue((feature as any).pro)}
                                        </td>
                                        <td className="py-6 px-6 text-center text-sm font-black uppercase text-on-surface tracking-tight">
                                            {renderFeatureValue((feature as any).elite)}
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="py-6 px-6 text-center text-sm font-black uppercase text-stone-400 tracking-tight">
                                            {renderFeatureValue((feature as any).free)}
                                        </td>
                                        <td className="py-6 px-6 text-center text-sm font-black uppercase text-on-surface tracking-tight">
                                            {renderFeatureValue((feature as any).growth)}
                                        </td>
                                        <td className="py-6 px-6 text-center text-sm font-black uppercase text-on-surface tracking-tight">
                                            {renderFeatureValue((feature as any).scale)}
                                        </td>
                                        <td className="py-6 px-6 text-center text-sm font-black uppercase text-on-surface tracking-tight">
                                            {renderFeatureValue((feature as any).enterprise)}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-20 px-6 md:px-20 border-t border-surface-variant mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black tracking-tighter text-primary">synk.ai</div>
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">© 2024 SYNK.AI LTD. POWERED BY NEURAL MATCHING.</p>
          <div className="flex gap-8">
            <span className="material-symbols-outlined text-stone-400 hover:text-primary cursor-pointer transition-colors">public</span>
            <span className="material-symbols-outlined text-stone-400 hover:text-primary cursor-pointer transition-colors">terminal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function renderFeatureValue(value: string | boolean | undefined) {
    if (typeof value === 'boolean') {
        return value ? (
            <span className="material-symbols-outlined text-primary text-[20px] leading-none">check_circle</span>
        ) : (
            <span className="material-symbols-outlined text-stone-200 text-[20px] leading-none">cancel</span>
        );
    }
    return value || "-";
}


