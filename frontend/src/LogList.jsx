function LogList({ logs }) {
  return (
    <div>
      <h2>Submissions</h2>

      {logs.length === 0 ? (
        <p>No logs yet</p>
      ) : (
        logs.map((log, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px"
            }}
          >
            {log.text && <p>{log.text}</p>}

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