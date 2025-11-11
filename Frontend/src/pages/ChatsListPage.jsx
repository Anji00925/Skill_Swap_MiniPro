import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getConnections } from "../api/connections";
import { useNavigate } from "react-router-dom";

export default function ChatsListPage() {
  const { user, token } = useAuth();
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) return;
    (async () => {
      try {
        // getConnections should return accepted connections (populated)
        const data = await getConnections(user._id, token);
        setConnections(data);
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    })();
  }, [user, token]);

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h3>Your Chats</h3>
      {connections.length === 0 ? (
        <p>No connections yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {connections.map((c) => {
            const other = c.requester._id === user._id ? c.recipient : c.requester;
            return (
              <li key={c._id} style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ cursor: "pointer" }} onClick={() => navigate(`/chat/${other._id}`)}>
                      {other.name}
                    </strong>
                    <div style={{ color: "#666", fontSize: 13 }}>
                      {/* Optional: last message preview if available */}
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/chat/${other._id}`)}>
                    Open
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
