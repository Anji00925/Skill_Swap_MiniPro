import express from "express";
import Message from "../models/Message.js";
import Connection from "../models/Connection.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📩 Send a message
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, content } = req.body;

    if (!receiverId || !content)
      return res.status(400).json({ message: "Receiver and content required" });

    // ✅ Ensure both users are connected
    const connection = await Connection.findOne({
      $or: [
        { requester: senderId, recipient: receiverId, status: "accepted" },
        { requester: receiverId, recipient: senderId, status: "accepted" },
      ],
    });

    if (!connection)
      return res.status(403).json({ message: "You are not connected." });

    // 💾 Save message
    const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ message: "Server error while sending message" });
  }
});

// 💬 Get all messages between current user and another
router.get("/:otherUserId", authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { otherUserId } = req.params;

    // ✅ Check connection
    const connection = await Connection.findOne({
      $or: [
        { requester: currentUserId, recipient: otherUserId, status: "accepted" },
        { requester: otherUserId, recipient: currentUserId, status: "accepted" },
      ],
    });

    if (!connection)
      return res.status(403).json({ message: "You are not connected." });

    // 📜 Fetch messages
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ message: "Server error while fetching messages" });
  }
});

export default router;
