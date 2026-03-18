import Link from 'next/link';

export default function JobsFeed() {
  return (
    <main className="pb-32 px-5 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1 mb-8">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none border-l-[6px] border-[#FA520F] pl-4">Hiring Feed V3</h2>
        <p className="text-xs font-bold uppercase tracking-widest text-[#FA520F] mt-2">Protocol Active // 2024</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-[3px] border-slate-900 bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8">
        <button className="flex-1 py-4 bg-[#FA520F] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest border-r-[3px] border-slate-900">All Jobs</button>
        <button className="flex-1 py-4 bg-white text-slate-900 text-[10px] sm:text-xs font-black uppercase tracking-widest border-r-[3px] border-slate-900 hover:bg-slate-100 transition-colors">Remote</button>
        <button className="flex-1 py-4 bg-white text-slate-900 text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">Contract</button>
      </div>

      {/* Job Feed */}
      <div className="space-y-8">
        {[
          { title: "Senior Frontend Engineer", status: "NEW", stacks: ["Next.js", "TypeScript", "Tailwind"], budget: "$140k - $180k", exp: "5+ Years" },
          { title: "Lead Product Designer", status: "HOT", stacks: ["Figma", "Prototyping"], budget: "$160k - $210k", exp: "7+ Years" },
          { title: "Backend Systems Architect", status: "", stacks: ["Go", "Kubernetes", "Rust"], budget: "$190k - $240k", exp: "10+ Years" }
        ].map((job, i) => (
          <article key={i} className="border-[4px] border-slate-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:translate-x-1">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black uppercase leading-tight max-w-[80%]">{job.title}</h3>
              {job.status && <span className="text-[10px] font-black border-[3px] border-slate-900 px-3 py-1.5 bg-[#FFFAEB] uppercase shadow-[3px_3px_0px_0px_#000]">{job.status}</span>}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {job.stacks.map((stack, j) => (
                <span key={j} className={`border-[3px] border-slate-900 px-3 py-1.5 text-[10px] font-black uppercase ${j === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} shadow-[3px_3px_0px_0px_#000]`}>
                  {stack}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 border-t-[3px] border-slate-900 pt-6">
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Budget</p>
                <p className="font-black text-lg mt-1">{job.budget}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Experience</p>
                <p className="font-black text-lg mt-1">{job.exp}</p>
              </div>
            </div>

            <Link href="/chat" className="block w-full py-5 bg-gradient-to-r from-[#FA520F] via-[#FF8A00] to-[#FFC700] border-[3px] border-slate-900 text-white font-black uppercase tracking-widest text-sm text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1.5 active:translate-y-1.5 transition-all">
              Apply Protocol
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
