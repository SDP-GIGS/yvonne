import { useState, useEffect } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useAcaDashboard, useAcaStudents, useAcaStudent, useAcaStudentLogs,
  useAcaEvaluations, useEvalCriteria, useSubmitEvaluation } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export function AcaDashboardPage({ onNav }) {
  const { data: stats, loading, error } = useAcaDashboard();

  if (loading) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><ErrorMsg message={error} /></PageWrap>;

  return (
    <PageWrap>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>Welcome back,</div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: COLORS.white, fontWeight: 400 }}>
          {stats?.supervisor_name || "Supervisor"}
        </h1>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Assigned Students"   value={stats?.total_students}         sub="under your supervision"  accent={COLORS.white}   />
        <StatCard label="Pending Evaluation"  value={stats?.pending_evaluations}    sub="not yet evaluated"       accent={COLORS.warning} />
        <StatCard label="Evaluations Done"    value={stats?.completed_evaluations}  sub="fully evaluated"         accent={COLORS.success} />
        <StatCard label="Average Score"       value={stats?.average_score != null ? `${stats.average_score}%` : "—"} sub="across all students" accent={COLORS.gold} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Pending Evaluations */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>Pending Evaluations</div>
            <OutlineBtn onClick={() => onNav("students")} style={{ fontSize: 11, padding: "5px 12px" }}>View All</OutlineBtn>
          </div>
          {(stats?.pending_students || []).length === 0
            ? <EmptyState message="All students evaluated." />
            : (stats.pending_students || []).slice(0, 4).map(s => (
              <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyBorder}` }}>
                <div>
                  <div style={{ fontSize: 13, color: COLORS.white }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>{s.reg_number}</div>
                </div>
                <GoldBtn onClick={() => onNav("evaluate", s.id)} style={{ fontSize: 11, padding: "5px 12px" }}>Evaluate</GoldBtn>
              </div>
            ))
          }
        </Card>

        {/* Score Overview */}
        <Card>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 16 }}>Score Overview</div>
          {(stats?.score_distribution || []).length === 0
            ? <EmptyState message="No evaluation data yet." />
            : (stats.score_distribution || []).map(item => (
              <div key={item.grade} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: COLORS.mutedLight }}>Grade {item.grade} ({item.range})</span>
                  <span style={{ fontSize: 12, color: COLORS.white }}>{item.count} students</span>
                </div>
                <div style={{ height: 5, background: COLORS.navyLight, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${stats.total_students > 0 ? (item.count / stats.total_students) * 100 : 0}%`, background: COLORS.gold, borderRadius: 3 }} />
                </div>
              </div>
            ))
          }
        </Card>
      </div>
    </PageWrap>
  );
}
