function LogList({ logs }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Your Submissions</h3>

      {logs.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        logs.map((log, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px auto",
              width: "300px"
            }}
          >
            <p>{log.text}</p>

            {log.file && (
              <p>
                📎 File: {log.file.name}
              </p>
            )}

            <small>{log.date}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default LogList;