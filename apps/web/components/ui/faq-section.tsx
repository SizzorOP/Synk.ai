"use client";

import React from 'react';
import Link from 'next/link';

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: "What is Synk.ai?",
      answer: "Synk.ai is a curated talent marketplace that utilizes neural performance metrics to match elite engineering talent with frontier technology companies. We guarantee payment security and work quality for both parties."
    },
    {
      question: "How does payment work?",
      answer: "We use a milestone-based escrow system. Funds are released only when predefined project deliverables are met and approved, ensuring financial safety for partners and creators."
    },
    {
      question: "Will I get a refund?",
      answer: "If a milestone is not met according to the agreed-upon technical specifications, our dispute resolution team will review the neural vetting logs to authorize a full or partial refund."
    },
    {
      question: "Is Synk.ai free or do I have to buy a subscription?",
      answer: "Joining the talent network is free for creators. Partners can choose between a per-match fee or a enterprise-grade subscription for high-volume hiring."
    },
    {
      question: "What if a candidate delays my project?",
      answer: "Our system tracks technical velocity in real-time. If a delay occurs, our automated re-matching engine can provide immediate backup candidates from the vetted pool."
    },
    {
      question: "Can I hire talent from outside my country?",
      answer: "Yes. Synk.ai handles cross-border compliance, taxation, and international payments, allowing you to hire the best talent globally without administrative overhead."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-20 bg-[#030303]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left Column */}
        <div className="relative z-10">
          <h2 className="text-6xl font-black text-white leading-none tracking-tighter mb-8 max-w-md uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-400 text-lg mb-8 font-medium">Can't find the answer here?</p>
          <Link href="/contact" className="text-primary font-black uppercase tracking-widest text-sm border-b-2 border-primary pb-2 hover:opacity-80 transition-opacity">
            Contact Support
          </Link>
        </div>

        {/* Right Column (Accordion) */}
        <div className="flex flex-col relative z-10">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/5 py-8 last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left group"
              >
                <span className={`text-xl font-bold transition-colors ${openIndex === index ? 'text-primary' : 'text-stone-200 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-stone-600'}`}>
                  expand_more
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-stone-400 leading-relaxed max-w-xl font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
