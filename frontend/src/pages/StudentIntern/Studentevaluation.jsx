import { useState } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useWPDashboard, useWPStudents, useWPStudent, useWPStudentLogs,
  useReviewQueue, useWPLog, useReviewLog } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

function StudentEvaluation({ data, studentId }) {
  const ev = data.evaluations.find(e => e.studentId === studentId);
  if (!ev) return <PW><PT title="Evaluation & Scores" /><p className="text-slate-500 text-sm">No evaluation submitted yet.</p></PW>;
  const scored = ev.criteria.filter(c => c.score !== null);
  const total  = scored.reduce((s,c) => s+c.score, 0);
  const poss   = scored.reduce((s,c) => s+c.weight, 0);
  const pct    = poss > 0 ? Math.round((total/poss)*100) : 0;
  const grade  = pct>=80?"A":pct>=70?"B":pct>=60?"C":"F";
  const gc     = pct>=80?"text-emerald-400":pct>=70?"text-blue-400":"text-amber-400";

  return (
    <PW>
      <PT title="Evaluation & Scores" sub="Academic evaluation by your assigned supervisor" />
      <div className="grid grid-cols-3 gap-4 max-w-3xl">
        <div className="flex flex-col gap-4">
          <Card cls="text-center !py-7">
            <Lbl>Current Score</Lbl>
            <div className={`font-serif text-5xl ${gc} leading-tight my-2`}>{total}</div>
            <div className="text-xs text-slate-500 mb-3">/ {poss} points scored</div>
            <div className="inline-flex items-center gap-2 bg-[#0B1120] rounded-lg px-3 py-1.5">
              <span className={`font-serif text-2xl ${gc}`}>{grade}</span>
              <span className="text-[10px] text-slate-500">{pct>=80?"Distinction":pct>=70?"Credit":"Pass"}</span>
            </div>
          </Card>
          <Card>
            <Lbl>Academic Supervisor</Lbl>
            <Val>{ev.acaSup}</Val>
            <div className="mt-2"><Lbl>Status</Lbl>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${scored.length===ev.criteria.length?"bg-emerald-400":"bg-amber-400"}`} />
                <span className={`text-xs ${scored.length===ev.criteria.length?"text-emerald-400":"text-amber-400"}`}>{scored.length===ev.criteria.length?"Complete":`Partial (${scored.length}/${ev.criteria.length})`}</span>
              </div>
            </div>
          </Card>
        </div>
        <Card cls="col-span-2">
          <div className="text-sm font-medium text-amber-400 mb-4">Score Breakdown</div>
          {ev.criteria.map((c,i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-end mb-1.5">
                <div><div className="text-xs font-medium text-white">{c.name}</div><div className="text-[10px] text-slate-500">Weight: {c.weight}%</div></div>
                {c.score!==null ? <div className="text-right"><div className="font-serif text-lg text-white">{c.score}<span className="text-xs text-slate-500">/{c.weight}</span></div><div className="text-[10px] text-emerald-400">{Math.round((c.score/c.weight)*100)}%</div></div> : <div className="text-xs text-slate-500 italic">Pending</div>}
              </div>
              <div className="h-1 bg-[#0B1120] rounded-full overflow-hidden">
                {c.score!==null && <div className="h-full bg-amber-500 rounded-full" style={{width:`${(c.score/c.weight)*100}%`}} />}
              </div>
            </div>
          ))}
          {ev.comment && (
            <div className="mt-4 bg-[#0B1120] rounded-lg p-3 border-l-2 border-amber-500">
              <Lbl>Supervisor Comment</Lbl>
              <p className="text-xs text-slate-400 italic">"{ev.comment}"</p>
            </div>
          )}
        </Card>
      </div>
    </PW>
  );
}
