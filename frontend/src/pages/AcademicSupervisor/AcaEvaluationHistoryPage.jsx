import { useState, useEffect } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useAcaDashboard, useAcaStudents, useAcaStudent, useAcaStudentLogs,
  useAcaEvaluations, useEvalCriteria, useSubmitEvaluation } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export function AcaEvaluationHistoryPage({ onViewDetail }) {
  const { data: evaluations, loading, error } = useAcaEvaluations();

  if (loading) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><ErrorMsg message={error} /></PageWrap>;

  return (
    <PageWrap>
      <PageTitle title="Evaluation History" subtitle="All submitted evaluations" />
      {(!evaluations || evaluations.length === 0)
        ? <EmptyState message="No evaluations submitted yet." />
        : (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.navyLight }}>
                  {["Student", "Reg No.", "Score", "Grade", "Submitted On", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: COLORS.muted, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evaluations.map((ev, i) => (
                  <tr key={ev.id} style={{ borderTop: `1px solid ${COLORS.navyBorder}`, background: i % 2 === 0 ? "transparent" : "#0E1828" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, color: COLORS.white }}>{ev.student_name}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: COLORS.mutedLight }}>{ev.student_reg}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: COLORS.white }}>{ev.total_score}/100</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: ev.grade === "A" ? COLORS.success : ev.grade === "B" ? COLORS.info : COLORS.warning }}>
                        {ev.grade}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: COLORS.muted }}>{ev.submitted_on}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <button onClick={() => onViewDetail(ev.id)} style={{ background: "transparent", border: `1px solid ${COLORS.navyBorder}`, color: COLORS.mutedLight, borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
    </PageWrap>
  );
}
