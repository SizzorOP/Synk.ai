'use client';

import Link from 'next/link';

const PROJECTS = [
  {
    title: "Neural Architecture Search",
    type: "Mistral Rainbow Engine",
    match: "98%",
    gradient: "mistral-gradient",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    tags: ["Python", "PyTorch", "LLM"],
    author: "0xNeo"
  },
  {
    title: "Infrastructure Automation",
    type: "LLM Cluster Manager",
    match: "92%",
    gradient: "mountain-gradient",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    tags: ["Rust", "Kubernetes", "gRPC"],
    author: "Archon"
  }
];

const ACTIVE_NODES = [
  { name: "Commander X", status: "Computing", avatar: "CX" },
  { name: "0xAlpha", status: "Idle", avatar: "A" },
  { name: "Satoshi_V3", status: "Syncing", avatar: "S" },
  { name: "NeuralLink", status: "Active", avatar: "NL" }
];

export default function DiscoveryHome() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
      {/* Main Feed: 8 Columns */}
      <div className="xl:col-span-8 space-y-12">
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Discovery Protocol</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Proof of Work</h2>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-sm">filter_list</span>
              </button>
              <button className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-sm">grid_view</span>
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {PROJECTS.map((project, i) => (
              <article key={i} className="bg-surface-container-lowest border border-outline-variant group hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-5 h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute top-0 left-0 w-full h-1 ${project.gradient}`}></div>
                  </div>
                  <div className="md:col-span-7 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 text-on-primary ${project.gradient}`}>
                          {project.match} Match
                        </span>
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 bg-surface-container flex items-center justify-center border border-outline-variant">
                             <span className="text-[8px] font-black">{project.author[0]}</span>
                           </div>
                           <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{project.author}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-black tracking-tight uppercase mb-2 leading-none">{project.type}</h3>
                      <p className="text-stone-500 text-sm font-medium mb-6">{project.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-surface-container px-2 py-1 border border-outline-variant/30 text-stone-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <Link href="/chat" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                        Inspect Stack
                        <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Active Nodes: 4 Columns */}
      <div className="xl:col-span-4 space-y-8">
        <section className="bg-surface-container-low p-6 border border-outline-variant/30">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] italic">Active Nodes</h3>
             <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
          </div>
          <div className="space-y-6">
            {ACTIVE_NODES.map((node, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-outline-variant relative">
                    <span className="text-xs font-black">{node.avatar}</span>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-surface-container-low rounded-full ${node.status === 'Active' || node.status === 'Computing' ? 'bg-secondary' : 'bg-stone-400'}`}></div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-tight leading-none mb-1 group-hover:text-primary transition-colors">{node.name}</p>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{node.status}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-stone-300 group-hover:text-on-surface transition-colors">chat_bubble</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 border border-outline-variant text-[10px] font-black uppercase tracking-widest hover:bg-surface-container transition-all">
            View All Nodes
          </button>
        </section>

        {/* Mini Stats Monolith */}
        <section className="bg-on-surface text-surface p-8 architect-grid overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-surface/50 mb-4">Network Intelligence</p>
            <div className="text-4xl font-black tracking-tighter mb-2 italic">1.2 PetaFLOPs</div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-surface/70">Total Compute Contributed</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
        </section>
      </div>
    </div>
  );
}
