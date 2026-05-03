import { useState } from "react";
import {
  Card, PageWrap, PageTitle, GoldBtn, OutlineBtn, Label,
  LoadingSpinner, ErrorMsg, EmptyState, StatusBadge, COLORS, textareaStyle
} from "../../shared/ui";
import { useReviewQueue } from "../../hooks/useData";
import { supervisorAPI } from "../../api/apiService";
import api from "../../api/apiService";

export default function WPReviewQueuePage() {
  const { data: queueRaw, loading, error, refetch } = useReviewQueue();
  const queue = Array.isArray(queueRaw) ? queueRaw.filter(l => l.status === "SUBMITTED") : [];

  const [selected, setSelected] = useState(null);
  const [comment, setComment]   = useState("");
  const [decision, setDecision] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr]   = useState("");

  const handleSubmitReview = async () => {
    if (!decision) return;
    setSubmitting(true);
    setSubmitErr("");
    try {
      // Update log status
      await api.patch(`/api/logs/${selected.id}/`, { status: decision });
      // Post a review comment
      if (comment.trim()) {
        await supervisorAPI.reviewLog(selected.id, { comment, status: decision });
      }
      await refetch();
      setSelected(null);
      setComment("");
      setDecision(null);
    } catch (err) {
      setSubmitErr(err.response?.data?.detail || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageWrap><LoadingSpinner /></PageWrap>;
  if (error)   return <PageWrap><ErrorMsg message={error} /></PageWrap>;

  if (selected) {
    return (
      <PageWrap>
        <button
          onClick={() => setSelected(null)}
          className="text-xs text-slate-400 hover:text-white mb-4 flex items-center gap-1"
        >
          ← Back to Queue
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <PageTitle
            title={`Review: Week ${selected.week_number}`}
            subtitle={`${selected.student_email || selected.student || "Student"} · ${selected.start_date} → ${selected.end_date}`}
          />
          <StatusBadge status={selected.status} />
        </div>

        {submitErr && <div className="mb-4 text-xs text-red-400 border border-red-900/40 bg-red-900/10 rounded-lg px-3 py-2">{submitErr}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, maxWidth: 920 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 16, color: COLORS.gold }}>Student's Log</div>
              {[
                ["Activities Performed", selected.activities_performed],
                ["Lessons Learned",      selected.lessons_learned],
                ["Challenges Faced",     selected.challenges_faced],
              ].map(([label, value]) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <Label>{label}</Label>
                  <div style={{ fontSize: 13, color: value ? COLORS.mutedLight : COLORS.muted, lineHeight: 1.7, marginTop: 6, padding: "10px 14px", background: COLORS.navyLight, borderRadius: 8, fontStyle: value ? "normal" : "italic" }}>
                    {value || "Not provided."}
                  </div>
                </div>
              ))}
            </Card>

            <Card>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 16, color: COLORS.gold }}>Your Review</div>
              <Label>Comment / Feedback</Label>
              <textarea
                rows={4} value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Provide constructive feedback..."
                style={textareaStyle()}
              />
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <OutlineBtn
                  onClick={() => setDecision("REVIEWED")}
                  style={{ flex: 1, border: decision === "REVIEWED" ? `1px solid ${COLORS.gold}` : undefined }}
                >Mark as Reviewed</OutlineBtn>
                <GoldBtn
                  onClick={() => setDecision("APPROVED")}
                  style={{ flex: 1, background: decision === "APPROVED" ? COLORS.success : undefined }}
                >Approve</GoldBtn>
              </div>
              {decision && (
                <div style={{ marginTop: 12 }}>
                  <GoldBtn onClick={handleSubmitReview} disabled={submitting} style={{ width: "100%" }}>
                    {submitting ? "Submitting..." : `Submit as "${decision}"`}
                  </GoldBtn>
                </div>
              )}
            </Card>
          </div>

          <Card>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 14 }}>Log Info</div>
            <div style={{ marginBottom: 10 }}><Label>Student</Label><div style={{ fontSize: 13, color: COLORS.white }}>{selected.student_email || "—"}</div></div>
            <div style={{ marginBottom: 10 }}><Label>Week</Label><div style={{ fontSize: 13, color: COLORS.white }}>Week {selected.week_number}</div></div>
            <div style={{ marginBottom: 10 }}><Label>Period</Label><div style={{ fontSize: 13, color: COLORS.white }}>{selected.start_date} → {selected.end_date}</div></div>
            <div><Label>Status</Label><StatusBadge status={selected.status} /></div>
          </Card>
        </div>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <PageTitle title="Review Queue" subtitle="Submitted logs awaiting your review" />
      {queue.length === 0
        ? <EmptyState message="No logs pending review. You're all caught up!" />
        : (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.navyLight }}>
                  {["Student", "Week", "Period", "Submitted", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: COLORS.muted, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queue.map((item, i) => (
                  <tr key={item.id} style={{ borderTop: `1px solid ${COLORS.navyBorder}`, background: i % 2 === 0 ? "transparent" : "#0E1828" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.white }}>{item.student_email || item.student || "—"}</div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: COLORS.white }}>Week {item.week_number}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: COLORS.mutedLight }}>{item.start_date} → {item.end_date}</td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: COLORS.muted }}>{item.updated_at?.slice(0, 10) || "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <GoldBtn onClick={() => { setSelected(item); setComment(""); setDecision(null); }} style={{ fontSize: 11, padding: "6px 14px" }}>
                        Review
                      </GoldBtn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )
      }
    </PageWrap>
  );
}
