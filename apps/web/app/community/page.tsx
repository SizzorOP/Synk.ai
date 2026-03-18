import Link from 'next/link';

export default function DiscoveryHome() {
  return (
    <main className="pb-32">
      {/* Main Feed Title */}
      <section className="px-5 pt-8 pb-4">
        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none border-l-8 border-[#FA520F] pl-4">Proof-of-Work</h2>
        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-slate-600">Verified AI Contributions / 2024</p>
      </section>

      {/* Category Tabs */}
      <div className="flex gap-3 p-4 px-5 overflow-x-auto no-scrollbar pb-6">
        <div className="flex h-12 shrink-0 items-center justify-center border-[3px] border-slate-900 bg-[#FA520F] px-6 shadow-[3px_3px_0px_0px_#000]">
          <p className="text-white text-xs font-black uppercase tracking-wider">All Projects</p>
        </div>
        {['AI/ML', 'Infras', 'Frontend', 'Data Eng', 'Bots'].map((tab) => (
          <div key={tab} className="flex h-12 shrink-0 items-center justify-center border-[3px] border-slate-900 bg-white px-6 shadow-[3px_3px_0px_0px_#000] hover:bg-slate-100 hover:-translate-y-0.5 transition-all cursor-pointer">
            <p className="text-slate-900 text-xs font-black uppercase tracking-wider">{tab}</p>
          </div>
        ))}
      </div>

      {/* Project Feed */}
      <div className="px-5 space-y-8">
        {[
          { title: "Neural Architecture Search", type: "Mistral Rainbow Engine", match: "98%", gradient: "from-[#FA520F] via-[#FFD700] to-[#00C2FF]", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80" },
          { title: "Infrastructure Automation", type: "LLM Cluster Manager", match: "92%", gradient: "from-[#FA520F] to-[#FFD700]", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" }
        ].map((card, i) => (
          <article key={i} className="border-[4px] border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-full aspect-video bg-slate-200 border-b-[4px] border-slate-900 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: `url('${card.image}')` }}></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <span className={`bg-gradient-to-r ${card.gradient} text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]`}>{card.match} AI Match Score</span>
                <span className="text-[10px] font-black border-2 border-slate-900 px-3 py-1.5 uppercase bg-slate-100 shadow-[2px_2px_0px_0px_#000]">GitHub</span>
              </div>
              <h3 className="text-3xl font-black leading-none uppercase tracking-tighter mb-2">{card.type}</h3>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{card.title}</p>
              
              <div className="mt-6 flex items-center justify-between border-t-[3px] border-slate-900 pt-5">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 bg-[#FA520F] border-2 border-slate-900 z-10 shadow-[2px_2px_0px_0px_#000]"></div>
                  <div className="w-10 h-10 bg-[#00C2FF] border-2 border-slate-900 z-0 shadow-[2px_2px_0px_0px_#000]"></div>
                </div>
                <Link href="/chat" className="border-[3px] border-slate-900 bg-slate-900 text-white px-5 py-3 text-xs font-black uppercase hover:bg-[#FA520F] hover:text-slate-900 hover:border-slate-900 transition-colors shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 block text-center">
                  Inspect Stack
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
