
export default function AdminAccessInfo() {
  return (
    <section
      id="admin-access"
      style={{
        background: "linear-gradient(135deg, #0b1120 0%, #111827 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "64px 40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#f59e0b", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
            System Access
          </p>
          <h2 style={{ color: "#ffffff", fontSize: "1.8rem", fontWeight: 700, margin: "0 0 10px" }}>
            How to access each portal
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", maxWidth: 560, margin: "0 auto" }}>
            Each role in InSync-ILES has its own dedicated portal. Here's how to get in.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 40 }}>
          {[
            {
              role: "Student",
              accent: "#3b82f6",
              steps: ["Sign up with role 'Student'", "Log in with your email & password", "You're redirected to /student automatically"],
            },
            {
              role: "Admin",
              accent: "#f59e0b",
              steps: ["An admin account is created via the Django terminal using createsuperuser", "Log in at /login with that email & password", "You're redirected to /admin automatically"],
              highlight: true,
            },
            {
              role: "Workplace Supervisor",
              accent: "#10b981",
              steps: ["Sign up with role 'Workplace Supervisor'", "Wait for admin approval (account starts inactive)", "Once approved, log in to access /workplace"],
            },
            {
              role: "Academic Supervisor",
              accent: "#8b5cf6",
              steps: ["Sign up with role 'Academic Supervisor'", "Wait for admin approval (account starts inactive)", "Once approved, log in to access /academic"],
            },
          ].map(({ role, accent, steps, highlight }) => (
            <div
              key={role}
              style={{
                background: highlight ? `${accent}10` : "rgba(255,255,255,0.03)",
                border: `1px solid ${highlight ? accent + "40" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 16,
                padding: "24px 20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem" }}>{role}</span>
                {highlight && (
                  <span style={{ marginLeft: "auto", fontSize: "0.65rem", color: accent, border: `1px solid ${accent}50`, borderRadius: 999, padding: "2px 8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Terminal
                  </span>
                )}
              </div>
              <ol style={{ margin: 0, padding: "0 0 0 16px" }}>
                {steps.map((s, i) => (
                  <li key={i} style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 4 }}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
