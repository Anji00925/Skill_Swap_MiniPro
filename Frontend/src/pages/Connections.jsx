// // src/pages/Connections.jsx
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaUser } from 'react-icons/fa';

// const dummyConnections = [
//   { name: 'John Doe', skill: 'Guitar', status: 'Connected' },
//   { name: 'Jane Smith', skill: 'React', status: 'Pending' },
//   { name: 'Alice Ray', skill: 'UX Design', status: 'Connected' },
// ];

// export default function Connections() {
//   const navigate = useNavigate();

//   return (
//     <div className="p-4">
//       <button className="btn btn-outline-primary mb-3" onClick={() => navigate('/')}>
//         <FaArrowLeft className="me-2" /> Back to Dashboard
//       </button>
//       <h2 className="mb-4">Your Connections</h2>
//       <div className="row">
//         {dummyConnections.map((conn, index) => (
//           <div className="col-md-4 mb-4" key={index}>
//             <div className="card shadow rounded-4 p-3 border-0">
//               <div className="d-flex align-items-center mb-2">
//                 <FaUser size={28} className="me-3 text-primary" />
//                 <div>
//                   <h5 className="mb-0">{conn.name}</h5>
//                   <small className="text-muted">{conn.skill}</small>
//                 </div>
//               </div>
//               <span
//                 className={`badge rounded-pill px-3 py-2 ${
//                   conn.status === 'Connected' ? 'bg-success' : 'bg-warning text-dark'
//                 }`}
//               >
//                 {conn.status}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// src/pages/Connections.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaUser } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";
// import { getConnections } from "../api/connections";
// import './Connections.css'; 

// export default function Connections() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     if (!user) return;
//     const load = async () => {
//       try {
//         const data = await getConnections(user._id);
//         // Each item has requester and recipient populated
//         const mapped = data.map((c) => {
//           const other =
//             String(c.requester?._id) === String(user._id)
//               ? c.recipient
//               : c.requester;
//           return {
//             id: c._id,
//             name: other?.name || "Unknown",
//             status: c.status,
//           };
//         });
//         setItems(mapped);
//       } catch (e) {
//         console.error("Load connections failed:", e);
//       }
//     };
//     load();
//   }, [user]);

//   return (
//     <div className="p-4">
//       <button className="btn btn-outline-primary mb-3" onClick={() => navigate("/")}>
//         <FaArrowLeft className="me-2" /> Back to Dashboard
//       </button>
//       <h2 className="mb-4">Your Connections</h2>
//       <div className="row">
//         {items.length === 0 ? (
//           <p>No connections yet.</p>
//         ) : (
//           items.map((conn) => (
//             <div className="col-md-4 mb-4" key={conn.id}>
//               <div className="card shadow rounded-4 p-3 border-0">
//                 <div className="d-flex align-items-center mb-2">
//                   <FaUser size={28} className="me-3 text-primary" />
//                   <div>
//                     <h5 className="mb-0">{conn.name}</h5>
//                     <small className="text-muted">Connection</small>
//                   </div>
//                 </div>
//                 <span
//                   className={`badge rounded-pill px-3 py-2 ${
//                     conn.status === "accepted" ? "bg-success" : "bg-warning text-dark"
//                   }`}
//                 >
//                   {conn.status === "accepted" ? "Connected" : conn.status}
//                 </span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
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
import "./Connections.css";

export default function Connections() {
  const { user, token } = useAuth();
console.log("DEBUG Auth in Connections.jsx:", user, token);

  const [connections, setConnections] = useState([]);
  const [pending, setPending] = useState([]);
  const [recipientId, setRecipientId] = useState("");

  // Load connections and pending requests
  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      const conn = await getConnections(user._id, token);
      const pend = await getPendingForMe(user._id, token);
      setConnections(conn);
      setPending(pend);
    };

    fetchData();
  }, [user, token]);

  // Handle sending a connection request
  const handleSendRequest = async () => {
  if (!recipientId) return;
  if (!token) {
    console.error("No token found in AuthContext");
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


  const handleAccept = async (id) => {
    await acceptRequest(id, token);
    setConnections(await getConnections(user._id, token));
    setPending(await getPendingForMe(user._id, token));
  };

  const handleReject = async (id) => {
    await rejectRequest(id, token);
    setPending(await getPendingForMe(user._id, token));
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
    {p.requester.name} wants to connect
    <button onClick={() => handleAccept(p._id)}>Accept</button>
    <button onClick={() => handleReject(p._id)}>Reject</button>
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
            const other = c.requester._id === user._id ? c.recipient : c.requester;
            return <li key={c._id}>{other.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
