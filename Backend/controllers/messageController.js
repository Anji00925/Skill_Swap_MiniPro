import Message from "../models/Message.js";
import Connection from "../models/Connection.js";

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { recipientId, text } = req.body;
    const senderId = req.user._id;

    // ✅ Ensure they are connected
    const connection = await Connection.findOne({
      $or: [
        { requester: senderId, recipient: recipientId, status: "accepted" },
        { requester: recipientId, recipient: senderId, status: "accepted" }
      ]
    });

    if (!connection) {
      return res.status(403).json({ message: "You are not connected with this user" });
    }

    const message = new Message({ sender: senderId, recipient: recipientId, text });
    await message.save();

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get chat history between two users
export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params; // other user
    const currentUser = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: currentUser, recipient: userId },
        { sender: userId, recipient: currentUser }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
