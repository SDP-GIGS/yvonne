import { useState } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn, DangerBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useWPDashboard, useWPStudents, useWPStudent, useWPStudentLogs,
  useReviewQueue, useWPLog, useReviewLog } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export function WPLogReviewPage({ logId, onBack, onDone }) {
  const { data: log, loading, error } = useWPLog(logId);
  const { mutate: reviewLog, loading: reviewing, error: reviewErr } = useReviewLog();

  const [comment, setComment] = useState("");
  const [decision, setDecision] = useState(null); // "Reviewed" | "Approved"

  if (loading) return <PageWrap><BackBtn onClick={onBack} /><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><BackBtn onClick={onBack} /><ErrorMsg message={error} /></PageWrap>;
  if (!log)    return null;

  const handleSubmit = async () => {
    if (!decision) return;
    const result = await reviewLog(logId, { comment, status: decision });
    if (result) onDone?.();
  };

  return (
    <PageWrap>
      <BackBtn onClick={onBack} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <PageTitle title={`Review: Week ${log.week_number}`} subtitle={`${log.student_name} · ${log.date_range}`} />
        <StatusBadge status={log.status} />
      </div>

      {reviewErr && <ErrorMsg message={reviewErr} />}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, maxWidth: 920 }}>

        {/* Log Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 16, color: COLORS.gold }}>Student's Log</div>
            {[
              { label: "Activities Performed", value: log.activities },
              { label: "Skills Learned",       value: log.skills     },
              { label: "Challenges Faced",     value: log.challenges },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <Label>{label}</Label>
                <div style={{ fontSize: 13, color: value ? COLORS.mutedLight : COLORS.muted, lineHeight: 1.7, marginTop: 6, padding: "10px 14px", background: COLORS.navyLight, borderRadius: 8, fontStyle: value ? "normal" : "italic" }}>
                  {value || "Not provided."}
                </div>
              </div>
            ))}
          </Card>

          {/* Review Form */}
          <Card>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 16, color: COLORS.gold }}>Your Review</div>
            <Label>Comment / Feedback</Label>
            <textarea
              rows={4} value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Provide constructive feedback on the student's weekly log..."
              style={textareaStyle()}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <OutlineBtn
                onClick={() => setDecision("Reviewed")}
                style={{ flex: 1, border: decision === "Reviewed" ? `1px solid ${COLORS.gold}` : undefined, background: decision === "Reviewed" ? "#1A2A15" : undefined }}
              >Mark as Reviewed</OutlineBtn>
              <GoldBtn
                onClick={() => setDecision("Approved")}
                style={{ flex: 1, background: decision === "Approved" ? COLORS.success : undefined, color: decision === "Approved" ? COLORS.navy : undefined }}
              >Approve</GoldBtn>
            </div>
            {decision && (
              <div style={{ marginTop: 12 }}>
                <GoldBtn onClick={handleSubmit} disabled={reviewing} style={{ width: "100%" }}>
                  {reviewing ? "Submitting..." : `Submit as "${decision}"`}
                </GoldBtn>
              </div>
            )}
          </Card>
        </div>

        {/* Info Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 14 }}>Log Info</div>
            <div style={{ marginBottom: 12 }}><Label>Student</Label><Value>{log.student_name}</Value></div>
            <div style={{ marginBottom: 12 }}><Label>Reg. Number</Label><Value>{log.student_reg}</Value></div>
            <div style={{ marginBottom: 12 }}><Label>Week</Label><Value>Week {log.week_number}</Value></div>
            <div style={{ marginBottom: 12 }}><Label>Submitted On</Label><Value>{log.submitted_on}</Value></div>
            <div><Label>Deadline</Label><Value style={{ color: COLORS.warning }}>{log.submission_deadline}</Value></div>
          </Card>

          {/* Status Timeline */}
          <Card>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 16 }}>Status Flow</div>
            {["Draft", "Submitted", "Reviewed", "Approved"].map((s, i) => {
              const idx = ["Draft", "Submitted", "Reviewed", "Approved"].indexOf(log.status);
              return (
                <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", flexShrink: 0, marginTop: 2, background: i <= idx ? COLORS.gold : COLORS.navyLight, border: `2px solid ${i <= idx ? COLORS.gold : COLORS.navyBorder}` }} />
                    {i < 3 && <div style={{ width: 2, height: 22, background: i < idx ? COLORS.gold : COLORS.navyBorder, opacity: 0.4 }} />}
                  </div>
                  <div style={{ paddingBottom: i < 3 ? 10 : 0 }}>
                    <div style={{ fontSize: 12, color: i <= idx ? COLORS.white : COLORS.muted }}>{s}</div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </PageWrap>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STUDENT LOG HISTORY
// ══════════════════════════════════════════════════════════════════════════════
export function WPStudentLogsPage({ studentId, onBack, onOpenReview }) {
  const { data: student } = useWPStudent(studentId);
  const { data: logs, loading, error } = useWPStudentLogs(studentId);
  const [filter, setFilter] = useState("All");

  if (loading) return <PageWrap><BackBtn onClick={onBack} /><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><BackBtn onClick={onBack} /><ErrorMsg message={error} /></PageWrap>;

  const allLogs     = logs || [];
  const statuses    = ["All", "Draft", "Submitted", "Reviewed", "Approved"];
  const filtered    = filter === "All" ? allLogs : allLogs.filter(l => l.status === filter);

  return (
    <PageWrap>
      <BackBtn onClick={onBack} />
      <PageTitle
        title={`${student?.name || "Student"}'s Logs`}
        subtitle={`${student?.reg_number || ""} · ${student?.department || ""}`}
      />

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ background: filter === s ? COLORS.gold : "transparent", color: filter === s ? COLORS.navy : COLORS.muted, border: `1px solid ${filter === s ? COLORS.gold : COLORS.navyBorder}`, borderRadius: 20, padding: "4px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: filter === s ? 600 : 400 }}>{s}</button>
        ))}
      </div>

      {filtered.length === 0
        ? <EmptyState message="No logs found for this filter." />
        : (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.navyLight }}>
                  {["Week", "Date Range", "Status", "Submitted On", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: COLORS.muted, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log, i) => (
                  <tr key={log.id} style={{ borderTop: `1px solid ${COLORS.navyBorder}`, background: i % 2 === 0 ? "transparent" : "#0E1828" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, color: COLORS.white }}>Week {log.week_number}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: COLORS.mutedLight }}>{log.date_range}</td>
                    <td style={{ padding: "14px 16px" }}><StatusBadge status={log.status} /></td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: COLORS.muted }}>{log.submitted_on || "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      {log.status === "Submitted" && (
                        <GoldBtn onClick={() => onOpenReview(log.id)} style={{ fontSize: 11, padding: "5px 12px" }}>Review</GoldBtn>
                      )}
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
