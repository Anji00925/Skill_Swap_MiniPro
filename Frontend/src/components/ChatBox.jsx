import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ChatBox.module.css";

export default function ChatBox({ currentUser, selectedUser, token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Prevent crash if no user selected
  if (!selectedUser) {
    return (
      <div className={styles.chatContainer}>
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  // Fetch chat messages
  useEffect(() => {
  if (!selectedUser || !token) return;
  axios.get(`/api/chat/${selectedUser._id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
  const data = Array.isArray(res.data) ? res.data : res.data.messages || [];
  setMessages(data);
})

  .catch(err => console.error("Error fetching messages:", err));
}, [selectedUser, token]);


  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        "/api/chat/send",
        { receiverId: selectedUser._id, content: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, res.data]);
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
              msg.sender === currentUser._id ? styles.sent : styles.received
            }`}
          >
            {msg.content}
          </div>
        ))}
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
