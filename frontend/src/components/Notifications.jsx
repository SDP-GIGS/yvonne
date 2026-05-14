import { useState, useEffect } from "react";

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the backend
  useEffect(() => {
    fetch("http://localhost:8000/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    await fetch(`http://localhost:8000/api/notifications/${notificationId}`, {
      method: "PUT",
    });

    setNotifications(
      notifications.map((note) =>
        note.notificationId === notificationId ? { ...note, read: true } : note
      )
    );
  };

  return (
    <div className="relative">

      {/* Notification Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200"
      >
        🔔

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg">

          <div className="p-3 font-semibold border-b">
            Notifications
          </div>

          <div className="max-h-80 overflow-y-auto">

            {notifications.length === 0 && (
              <div className="p-4 text-gray-500 text-center">
                No notifications
              </div>
            )}

            {notifications.map((note) => (
              <div
                key={note.notificationId}
                onClick={() => markAsRead(note.notificationId)}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  !note.read ? "bg-blue-50" : ""
                }`}
              >
                <p className="text-sm">{note.message}</p>
                <span className="text-xs text-gray-500">
                  {note.time}
                </span>
              </div>
            ))}

          </div>

          <div className="p-2 text-center text-blue-600 hover:bg-gray-100 cursor-pointer">
            View All
          </div>

        </div>
      )}
    </div>
  );
}