"use client";

import { useState } from "react";

export function ProjectAnalyzer({ portfolioSlug }: { portfolioSlug: string }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string; improvements: string[] } | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3001/api/v1/portfolios/${portfolioSlug}/analyze`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="mt-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            AI Project Analysis 
          </h3>
          <p className="text-sm text-slate-500">Get instant feedback on your portfolio's architecture and quality.</p>
        </div>
        <button 
          onClick={handleAnalyze} 
          disabled={analyzing}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
        >
          {analyzing ? <span className="material-symbols-outlined text-sm animate-spin">refresh</span> : <span className="material-symbols-outlined text-sm">science</span>}
          {analyzing ? "Analyzing..." : "Analyze My Project"}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm font-bold mt-4">{error}</div>}

      {result && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-black text-primary">{result.score}/100</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">AI Quality Score</div>
          </div>
          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">{result.feedback}</p>
          
          {result.improvements && result.improvements.length > 0 && (
             <div className="mt-4">
               <h4 className="font-bold text-sm mb-2 dark:text-white uppercase tracking-wider">Suggested Improvements</h4>
               <ul className="list-disc pl-5 space-y-1">
                 {result.improvements.map((imp, idx) => (
                   <li key={idx} className="text-slate-600 dark:text-slate-400 text-sm">{imp}</li>
                 ))}
               </ul>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
