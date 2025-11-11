// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// // import axios from "axios";
// import api from "../api/axiosConfig";

// import ChatBox from "../components/ChatBox";

// export default function ChatPage() {
//   const { id } = useParams(); // id is other user's _id
//   const { token, user } = useAuth();
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     if (!id || !token) return;
//     const fetchUser = async () => {
//       try {
//         const res = await api.get(`/api/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
//         setSelectedUser(res.data);
//       } catch (err) {
//         console.error("Error fetching user for chat:", err);
//       }
//     };
//     fetchUser();
//   }, [id, token]);

//   if (!selectedUser) return <div style={{ padding: 20 }}>Loading chat...</div>;

//   return (
//     <div style={{ maxWidth: 900, margin: "20px auto" }}>
//       <ChatBox currentUser={user} selectedUser={selectedUser} token={token} />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import ChatBox from "../components/ChatBox";
import { getConnections } from "../api/connections";
import "./ChatPage.css";

export default function ChatPage() {
  const { user, token } = useAuth();
  const [connections, setConnections] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!user || !token) return;
    const fetchConnections = async () => {
      try {
        const data = await getConnections(user._id, token);
        setConnections(data || []);
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };
    fetchConnections();
  }, [user, token]);

  const getOtherUser = (connection) => {
    if (!connection) return null;
    return connection.requester._id === user._id
      ? connection.recipient
      : connection.requester;
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>💬 Messages</h3>
        </div>

        {connections.length === 0 ? (
          <p className="no-conn">No connections yet</p>
        ) : (
          <ul className="user-list">
            {connections.map((c) => {
              const other = getOtherUser(c);
              return (
                <li
                  key={c._id}
                  className={`user-item ${
                    selectedUser?._id === other._id ? "active" : ""
                  }`}
                  onClick={() => setSelectedUser(other)}
                >
                  <div className="user-avatar">
                    {other.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <span className="user-name">{other.name}</span>
                    {/* <span className="user-status">Online</span> */}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Chat Section */}
      <div className="chat-main">
        {selectedUser ? (
          <ChatBox
            currentUser={user}
            selectedUser={selectedUser}
            token={token}
          />
        ) : (
          <div className="empty-chat">
            <h2>Welcome to SkillSwap Chat 💬</h2>
            <p>Select a connection to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
