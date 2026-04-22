import { useState } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useWPDashboard, useWPStudents, useWPStudent, useWPStudentLogs,
  useReviewQueue, useWPLog, useReviewLog } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";


export function WPDashboardPage({ onNav }) {
  const { data: stats, loading, error } = useWPDashboard();

  if (loading) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><ErrorMsg message={error} /></PageWrap>;

  const pending = stats?.review_queue || [];

  return (
    <PageWrap>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>Welcome back,</div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: COLORS.white, fontWeight: 400 }}>
            {stats?.supervisor_name || "Supervisor"}
          </h1>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Assigned Students" value={stats?.total_students}    sub="under your supervision" accent={COLORS.white}   />
        <StatCard label="Pending Review"    value={stats?.pending_reviews}   sub="logs awaiting review"   accent={COLORS.warning} />
        <StatCard label="Approved This Week" value={stats?.approved_this_week} sub="logs approved"        accent={COLORS.success} />
        <StatCard label="Total Reviewed"    value={stats?.total_reviewed}    sub="all time"               accent={COLORS.info}    />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Pending Review Queue */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>Pending Reviews</div>
            <OutlineBtn onClick={() => onNav("queue")} style={{ fontSize: 11, padding: "5px 12px" }}>View All</OutlineBtn>
          </div>
          {pending.length === 0
            ? <EmptyState message="No logs pending review." />
            : pending.slice(0, 4).map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyBorder}` }}>
                <div>
                  <div style={{ fontSize: 13, color: COLORS.white }}>{item.student_name}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Week {item.week_number} · Submitted {item.submitted_on}</div>
                </div>
                <GoldBtn onClick={() => onNav("review", item.id)} style={{ fontSize: 11, padding: "5px 12px" }}>Review</GoldBtn>
              </div>
            ))
          }
        </Card>

        {/* My Students */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>My Students</div>
            <OutlineBtn onClick={() => onNav("students")} style={{ fontSize: 11, padding: "5px 12px" }}>View All</OutlineBtn>
          </div>
          {(stats?.students || []).slice(0, 4).map(s => (
            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.navyBorder}` }}>
              <div>
                <div style={{ fontSize: 13, color: COLORS.white }}>{s.name}</div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{s.reg_number} · {s.department}</div>
              </div>
              <StatusBadge status={s.placement_status} />
            </div>
          ))}
        </Card>

      </div>
    </PageWrap>
  );
}
