import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, Badge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useWPDashboard, useWPStudents, useWPStudent, useWPStudentLogs,
  useReviewQueue, useWPLog, useReviewLog } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export default function WPStudentsPage({ onViewStudent }) {
  const { data: rawData } = useOutletContext() || {};
  const { data: studentsData, loading, error } = useWPStudents();
  
  const students = studentsData || (rawData?.students) || [];

  if (loading && !students.length) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (error && !students.length)   return <PageWrap><ErrorMsg message={error} /></PageWrap>;

  return (
    <PageWrap>
      <PageTitle title="My Students" subtitle="Interns assigned to your supervision" />
      {(!students || students.length === 0)
        ? <EmptyState message="No students assigned yet." />
        : (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.navyLight }}>
                  {["Student", "Reg No.", "Department", "Placement Dates", "Status", "Actions"].map(h => (
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
                    <td style={{ padding: "14px 16px", fontSize: 13, color: COLORS.mutedLight }}>{s.department}</td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: COLORS.muted }}>{s.start_date} – {s.end_date}</td>
                    <td style={{ padding: "14px 16px" }}><StatusBadge status={s.placement_status} /></td>
                    <td style={{ padding: "14px 16px" }}>
                      <button onClick={() => onViewStudent && onViewStudent(s.id)} style={{ background: "transparent", border: `1px solid ${COLORS.navyBorder}`, color: COLORS.mutedLight, borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                        View Logs
                      </button>
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