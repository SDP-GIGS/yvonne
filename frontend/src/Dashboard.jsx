import LogForm from "./LogForm";

function Dashboard({ goHome }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        onClick={goHome}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Back to Home
      </button>

      <h1>Intern Dashboard</h1>

      <LogForm />
    </div>
  );
}

export default Dashboard;