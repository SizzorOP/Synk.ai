"use client";

import { useState } from "react";
import { Proposal } from "../lib/api";

type Props = {
  jobId: string;
  jobTitle: string;
  customQuestions?: { question: string; required: boolean }[];
  accessToken?: string;
  onApplySuccess: () => void;
  onClose: () => void;
};

export function QuickApplyModal({ jobId, jobTitle, customQuestions = [], accessToken, onApplySuccess, onClose }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:4000/api/v1/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) {
        throw new Error("Failed to quickly apply");
      }
      
      onApplySuccess();
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-950 w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold dark:text-white mb-2">Quick Apply</h2>
        <p className="text-sm text-slate-500 mb-6 font-medium">Applying to: <span className="text-slate-900 dark:text-slate-300 font-bold">{jobTitle}</span></p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {customQuestions.length > 0 ? (
            customQuestions.map((cq, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {cq.question} {cq.required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  required={cq.required}
                  value={answers[cq.question] || ""}
                  onChange={e => setAnswers({ ...answers, [cq.question]: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:border-primary outline-none text-slate-900 dark:text-white"
                  rows={3}
                  placeholder="Your answer..."
                />
              </div>
             ))
          ) : (
             <p className="text-slate-600 dark:text-slate-400 text-sm italic py-4">No custom questions are required. You can click apply immediately.</p>
          )}

          {error && <div className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-bold px-5 py-2 rounded-lg disabled:opacity-50 hover:bg-primary/90 flex items-center gap-2"
            >
              {loading && <span className="material-symbols-outlined animate-spin text-sm">refresh</span>}
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
