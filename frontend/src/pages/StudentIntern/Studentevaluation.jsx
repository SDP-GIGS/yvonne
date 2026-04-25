import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, Badge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle, PW, PT } from "../../shared/ui";
import { authAPI } from "../../api/apiService";

export default function StudentEvaluation() {
  const { data: rawData, studentId } = useOutletContext();
  const data = rawData || { evaluations: [], students: [] };
  const ev = (data.evaluations || []).find(e => e.studentId === studentId);
  if (!ev) return <PW><PT title="Evaluation & Scores" /><p className="text-slate-500 text-sm">No evaluation submitted yet.</p></PW>;
  const scored = ev.criteria.filter(c => c.score !== null);
  const total  = scored.reduce((s,c) => s+c.score, 0);
  return (
    <PW>
      <PT title="Evaluation & Scores" sub="Performance review by supervisors" />
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Final Score" value={`${total}/100`} sub="cumulative weight" color="text-amber-400" />
        <StatCard label="Grade"       value="A"           sub="academic standing" color="text-white"     />
        <StatCard label="Status"      value="Completed"   sub="final assessment" color="text-emerald-400" />
        <StatCard label="Review Date" value="Aug 30, 2026" sub="published on"    color="text-slate-500"  />
      </div>
      <Card>
        <div className="text-sm font-medium text-white mb-4">Detailed Performance Breakdown</div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#1F2E4A] text-left">
              <th className="py-3 text-[10px] text-slate-500 uppercase tracking-widest">Criterion</th>
              <th className="py-3 text-[10px] text-slate-500 uppercase tracking-widest text-center">Weight</th>
              <th className="py-3 text-[10px] text-slate-500 uppercase tracking-widest text-center">Score</th>
              <th className="py-3 text-[10px] text-slate-500 uppercase tracking-widest">Supervisor Feedback</th>
            </tr>
          </thead>
          <tbody>
            {ev.criteria.map(c => (
              <tr key={c.name} className="border-b border-[#1F2E4A]/50 last:border-0">
                <td className="py-4 text-xs font-medium text-white">{c.name}</td>
                <td className="py-4 text-xs text-slate-500 text-center">{c.weight}%</td>
                <td className="py-4 text-xs font-bold text-amber-400 text-center">{c.score || "—"}</td>
                <td className="py-4 text-xs text-slate-400 italic">"{c.comment || "Great performance in this area."}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PW>
  );
}
