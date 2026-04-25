import { useState, useEffect } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useAcaDashboard, useAcaStudents, useAcaStudent, useAcaStudentLogs,
  useAcaEvaluations, useEvalCriteria, useSubmitEvaluation } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export default function AcaStudentsPage({ onViewStudent, onEvaluate }) {
  const { data: students, loading, error } = useAcaStudents();

  if (loading) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><ErrorMsg message={error} /></PageWrap>;

  return (
    <PageWrap>
      <PageTitle title="My Students" subtitle="Students assigned for academic supervision" />
      {(!students || students.length === 0)
        ? <EmptyState message="No students assigned yet." />
        : (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.navyLight }}>
                  {["Student", "Reg No.", "Company", "Evaluation", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: COLORS.muted, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} style={{ borderTop: `1px solid ${COLORS.navyBorder}`, background: i % 2 === 0 ? "transparent" : "#0E1828" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.white }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted }}>{s.email}</div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: COLORS.mutedLight }}>{s.reg_number}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: COLORS.mutedLight }}>{s.company_name}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <StatusBadge status={s.evaluation_status || "Pending"} />
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => onViewStudent && onViewStudent(s.id)} style={{ background: "transparent", border: `1px solid ${COLORS.navyBorder}`, color: COLORS.mutedLight, borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>View</button>
                        {s.evaluation_status !== "Complete" && (
                          <GoldBtn onClick={() => onEvaluate && onEvaluate(s.id)} style={{ fontSize: 11, padding: "5px 12px" }}>Evaluate</GoldBtn>
                        )}
                      </div>
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
