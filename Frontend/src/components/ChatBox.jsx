// import { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./ChatBox.module.css";

// export default function ChatBox({ currentUser, selectedUser, token }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   // Prevent crash if no user selected
//   if (!selectedUser) {
//     return (
//       <div className={styles.chatContainer}>
//         <p>Select a user to start chatting</p>
//       </div>
//     );
//   }

//   // Fetch chat messages
//   useEffect(() => {
//   if (!selectedUser || !token) return;
//   axios.get(`/api/chat/${selectedUser._id}`, {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   .then(res => {
//   const data = Array.isArray(res.data) ? res.data : res.data.messages || [];
//   setMessages(data);
// })

//   .catch(err => console.error("Error fetching messages:", err));
// }, [selectedUser, token]);


//   // Send message
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     try {
//       const res = await axios.post(
//         "/api/chat/send",
//         { receiverId: selectedUser._id, content: input },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessages([...messages, res.data]);
//       setInput("");
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <h4 className={styles.chatHeader}>Chat with {selectedUser.name}</h4>

//       <div className={styles.chatMessages}>
//         {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={`${styles.chatMsg} ${
//               msg.sender === currentUser._id ? styles.sent : styles.received
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//       </div>

//       <div className={styles.chatInput}>
//         <input
//           className={styles.inputField}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button className={styles.sendButton} onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import styles from "./ChatBox.module.css";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export default function ChatBox({ currentUser, selectedUser, token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Prevent crash if no user selected
  if (!selectedUser) {
    return (
      <div className={styles.chatContainer}>
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Connect to socket
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      query: { userId: currentUser._id },
    });

    socketRef.current.on("receiveMessage", (msg) => {
      if (
        msg.sender === selectedUser._id ||
        msg.receiver === selectedUser._id
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socketRef.current.disconnect();
  }, [currentUser, selectedUser]);

  // Fetch chat messages from backend
  useEffect(() => {
    if (!selectedUser || !token) return;
    axios
      .get(`/api/chat/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.messages || [];
        setMessages(data);
      })
      .catch((err) => console.error("Error fetching messages:", err));
  }, [selectedUser, token]);

  // Send message (API + Socket)
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        "/api/chat/send",
        { receiverId: selectedUser._id, content: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newMsg = res.data;
      setMessages([...messages, newMsg]);
      socketRef.current.emit("sendMessage", newMsg);
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h4 className={styles.chatHeader}>Chat with {selectedUser.name}</h4>

      <div className={styles.chatMessages}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`${styles.chatMsg} ${
              msg.sender === currentUser._id
                ? styles.sent
                : styles.received
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatInput}>
        <input
          className={styles.inputField}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
  // With Documents

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import styles from "./ChatBox.module.css";

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// export default function ChatBox({ currentUser, selectedUser, token }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [file, setFile] = useState(null);
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Show placeholder if no user selected
//   if (!selectedUser) {
//     return (
//       <div className={styles.chatContainer}>
//         <p>Select a user to start chatting</p>
//       </div>
//     );
//   }

//   // Auto-scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Connect to socket.io
//   useEffect(() => {
//     socketRef.current = io(SOCKET_URL, { query: { userId: currentUser._id } });

//     socketRef.current.on("receiveMessage", (msg) => {
//       if (
//         msg.sender === selectedUser._id ||
//         msg.receiver === selectedUser._id
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => socketRef.current.disconnect();
//   }, [currentUser, selectedUser]);

//   // Fetch old chat messages
//   useEffect(() => {
//     if (!selectedUser || !token) return;
//     axios
//       .get(`/api/chat/${selectedUser._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.messages || [];
//         setMessages(data);
//       })
//       .catch((err) => console.error("Error fetching messages:", err));
//   }, [selectedUser, token]);

//   // Handle sending a message (text or file)
//   const sendMessage = async () => {
//     if (!input.trim() && !file) return;

//     try {
//       const formData = new FormData();
//       formData.append("receiverId", selectedUser._id);
//       if (input.trim()) formData.append("content", input);
//       if (file) formData.append("file", file);

//       const res = await axios.post("/api/chat/send", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const newMsg = res.data;
//       setMessages((prev) => [...prev, newMsg]);
//       socketRef.current.emit("sendMessage", newMsg);

//       setInput("");
//       setFile(null);
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <h4 className={styles.chatHeader}>Chat with {selectedUser.name}</h4>

//       <div className={styles.chatMessages}>
//         {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={`${styles.chatMsg} ${
//               msg.sender === currentUser._id ? styles.sent : styles.received
//             }`}
//           >
//             {msg.type === "file" ? (
//               <a
//                 href={msg.content}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.fileLink}
//               >
//                 📎 {msg.content.split("/").pop()}
//               </a>
//             ) : (
//               msg.content
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className={styles.chatInput}>
//         <input
//           type="text"
//           className={styles.inputField}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//         />

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className={styles.fileInput}
//         />

//         <button className={styles.sendButton} onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
