import { useState } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useWPDashboard, useWPStudents, useWPStudent, useWPStudentLogs,
  useReviewQueue, useWPLog, useReviewLog } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

function StudentDashboard({ data, studentId, onNav }) {
  const me = data.students.find(s => s.id === studentId);
  const myLogs = data.logs.filter(l => l.studentId === studentId);
  const approved  = myLogs.filter(l => l.status === "Approved").length;
  const submitted = myLogs.filter(l => l.status === "Submitted").length;
  const drafts    = myLogs.filter(l => l.status === "Draft").length;
  const myPlacement = data.placements.find(p => p.studentId === studentId);
  const latestReview = [...myLogs].reverse().find(l => l.comment);
  const pending = myLogs.filter(l => l.status === "Draft").slice(0, 3);

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <div>
          <p className="text-slate-500 text-xs mb-1">Good morning,</p>
          <h1 className="font-serif text-2xl text-white">{me?.name}</h1>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Field Attachment</div>
          <div className="text-amber-400 text-xs mt-0.5">Jun – Aug 2026</div>
        </div>
      </div>
      <div className="flex gap-3 mb-5">
        <StatCard label="Weeks Approved"     value={`${approved}/13`} sub="logs approved"       color="text-emerald-400" />
        <StatCard label="Awaiting Review"    value={submitted}         sub="submitted logs"      color="text-blue-400"   />
        <StatCard label="Pending"            value={drafts}            sub="draft / not started" color="text-amber-400"  />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-white">My Placement</span>
            {myPlacement && <Badge s={myPlacement.status} />}
          </div>
          {myPlacement ? (
            <div className="grid grid-cols-2 gap-2">
              {[["Company", myPlacement.company],["Department", myPlacement.dept],["Supervisor", myPlacement.wpSup],["Period","Jun 2 – Aug 29"]].map(([k,v]) => (
                <div key={k}><Lbl>{k}</Lbl><Val>{v}</Val></div>
              ))}
            </div>
          ) : <p className="text-slate-500 text-xs">No placement assigned.</p>}
          <button onClick={() => onNav("placement")} className="mt-3 text-xs text-amber-400 border border-amber-800/40 px-3 py-1.5 rounded-lg hover:bg-amber-900/20 transition-colors">View Details →</button>
        </Card>
        <Card>
          <div className="text-sm font-medium text-white mb-3">Logbook Progress</div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500">Completion</span>
            <span className="text-white">{Math.round((approved/13)*100)}%</span>
          </div>
          <div className="h-1.5 bg-[#0B1120] rounded-full overflow-hidden mb-3">
            <div className="h-full bg-amber-500 rounded-full" style={{width:`${(approved/13)*100}%`}} />
          </div>
          {myLogs.slice(0,3).map(l => (
            <div key={l.id} className="flex justify-between items-center py-2 border-b border-[#1F2E4A] last:border-0">
              <span className="text-xs text-slate-400">Week {l.week} — {l.dateRange}</span>
              <Badge s={l.status} />
            </div>
          ))}
          <button onClick={() => onNav("logbook")} className="mt-2 text-xs text-amber-400 border border-amber-800/40 px-3 py-1.5 rounded-lg hover:bg-amber-900/20 transition-colors">View All Logs →</button>
        </Card>
        <Card>
          <div className="text-sm font-medium text-white mb-3">Latest Review Comment</div>
          {latestReview ? (
            <>
              <p className="text-xs text-slate-400 italic leading-relaxed mb-2">"{latestReview.comment}"</p>
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-500">— {latestReview.reviewedBy}</span>
                <span className="text-[10px] text-slate-500">Week {latestReview.week}</span>
              </div>
            </>
          ) : <p className="text-slate-500 text-xs">No reviews yet.</p>}
        </Card>
        <Card cls="border-amber-900/30">
          <div className="text-sm font-medium text-amber-400 mb-3">⚠ Action Required</div>
          {pending.length === 0 ? <p className="text-slate-500 text-xs">All caught up!</p>
            : pending.map(l => (
            <div key={l.id} className="flex justify-between items-center bg-amber-900/10 rounded-lg px-3 py-2 mb-2">
              <div><div className="text-xs text-white">Week {l.week} logbook</div><div className="text-[10px] text-slate-500">Due: {l.deadline}</div></div>
              <GBtn onClick={() => onNav("logbook")} cls="!py-1 !px-3">Submit</GBtn>
            </div>
          ))}
        </Card>
      </div>
    </PW>
  );
}
