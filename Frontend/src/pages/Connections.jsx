


// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import {
//   getConnections,
//   getPendingForMe,
//   acceptRequest,
//   rejectRequest,
//   sendConnectionRequest
// } from "../api/connections";
// import "./Connections.css";

// export default function Connections() {
//   const { user, token } = useAuth();
// console.log("DEBUG Auth in Connections.jsx:", user, token);

//   const [connections, setConnections] = useState([]);
//   const [pending, setPending] = useState([]);
//   const [recipientId, setRecipientId] = useState("");

//   // Load connections and pending requests
//   useEffect(() => {
//     if (!user || !token) return;

//     const fetchData = async () => {
//       const conn = await getConnections(user._id, token);
//       const pend = await getPendingForMe(user._id, token);
//       setConnections(conn);
//       setPending(pend);
//     };

//     fetchData();
//   }, [user, token]);

//   // Handle sending a connection request
//   const handleSendRequest = async () => {
//   if (!recipientId) return;
//   if (!token) {
//     console.error("No token found in AuthContext");
//     alert("You must sign in to send requests");
//     return;
//   }
//   try {
//     await sendConnectionRequest(recipientId, token);
//     setRecipientId("");
//     alert("Connection request sent!");
//   } catch (err) {
//     console.error("Error sending request:", err.response?.data || err.message);
//     alert("Failed to send request");
//   }
// };


//   const handleAccept = async (id) => {
//     await acceptRequest(id, token);
//     setConnections(await getConnections(user._id, token));
//     setPending(await getPendingForMe(user._id, token));
//   };

//   const handleReject = async (id) => {
//     await rejectRequest(id, token);
//     setPending(await getPendingForMe(user._id, token));
//   };

//   return (
//     <div className="connections-page">
//       <h2>Your Connections</h2>

//       <div className="send-request">
//         <input
//           type="text"
//           placeholder="Enter User ID to connect"
//           value={recipientId}
//           onChange={(e) => setRecipientId(e.target.value)}
//         />
//         <button onClick={handleSendRequest}>Send Request</button>
//       </div>

//       <h3>Pending Requests</h3>
//       {pending.length === 0 ? (
//         <p>No pending requests</p>
//       ) : (
//         <ul>
//           {pending.map((p) => (
//   <li key={p._id}>
//     {p.requester.name} wants to connect
//     <button onClick={() => handleAccept(p._id)}>Accept</button>
//     <button onClick={() => handleReject(p._id)}>Reject</button>
//   </li>
// ))}

//         </ul>
//       )}

//       <h3>Accepted Connections</h3>
//       {connections.length === 0 ? (
//         <p>No connections yet</p>
//       ) : (
//         <ul>
//           {connections.map((c) => {
//             const other = c.requester._id === user._id ? c.recipient : c.requester;
//             return <li key={c._id}>{other.name}</li>;
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getConnections,
  getPendingForMe,
  acceptRequest,
  rejectRequest,
  sendConnectionRequest
} from "../api/connections";
import ChatBox from "../components/ChatBox";
import "./Connections.css";

export default function Connections() {
  const { user, token } = useAuth();
  const [connections, setConnections] = useState([]);
  const [pending, setPending] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Load connections and pending requests
  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      try {
        const conn = await getConnections(user._id, token);
        const pend = await getPendingForMe(user._id, token);
        setConnections(conn || []);
        setPending(pend || []);
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };
    fetchData();
  }, [user, token]);

  // Send a connection request
  const handleSendRequest = async () => {
    if (!recipientId) return;
    if (!token) {
      alert("You must sign in to send requests");
      return;
    }
    try {
      await sendConnectionRequest(recipientId, token);
      setRecipientId("");
      alert("Connection request sent!");
    } catch (err) {
      console.error("Error sending request:", err.response?.data || err.message);
      alert("Failed to send request");
    }
  };

  // Accept/reject requests
  const handleAccept = async (id) => {
    await acceptRequest(id, token);
    setConnections(await getConnections(user._id, token));
    setPending(await getPendingForMe(user._id, token));
  };

  const handleReject = async (id) => {
    await rejectRequest(id, token);
    setPending(await getPendingForMe(user._id, token));
  };

  // Safely get the “other” user for chat
  const getOtherUser = (connection) => {
    if (!connection) return null;
    return connection.requester._id === user._id ? connection.recipient : connection.requester;
  };

  return (
    <div className="connections-page">
      <h2>Your Connections</h2>

      <div className="send-request">
        <input
          type="text"
          placeholder="Enter User ID to connect"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        />
        <button onClick={handleSendRequest}>Send Request</button>
      </div>

      <h3>Pending Requests</h3>
      {pending.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {pending.map((p) => (
            <li key={p._id}>
              {p.requester?.name || "Unknown"} wants to connect
              <button className="accept" onClick={() => handleAccept(p._id)}>Accept</button>
              <button className="decline" onClick={() => handleReject(p._id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Accepted Connections</h3>
      {connections.length === 0 ? (
        <p>No connections yet</p>
      ) : (
        <ul>
          {connections.map((c) => {
            const other = getOtherUser(c);
            return (
              <li key={c._id}>
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    if (other?._id && other?.name) setSelectedUser(other);
                  }}
                >
                  {other?.name || "Unnamed User"}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* ChatBox */}
      {selectedUser ? (
        <div style={{ marginTop: "30px" }}>
          <ChatBox currentUser={user} selectedUser={selectedUser} token={token} />
        </div>
      ) : null}
    </div>
  );
}
