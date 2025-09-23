// // controllers/connectionController.js

// import Connection from "../models/connection.js";

// // Send connection request
// export const sendConnectionRequest = async (req, res) => {
//   try {
//     const { from, to } = req.body;
//     const connection = new Connection({ from, to, status: "pending" });
//     await connection.save();
//     res.status(201).json(connection);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Accept connection request
// export const acceptConnectionRequest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const connection = await Connection.findByIdAndUpdate(
//       id,
//       { status: "accepted" },
//       { new: true }
//     );
//     if (!connection) return res.status(404).json({ message: "Connection not found" });
//     res.json(connection);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Reject connection request
// export const rejectConnectionRequest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const connection = await Connection.findByIdAndUpdate(
//       id,
//       { status: "rejected" },
//       { new: true }
//     );
//     if (!connection) return res.status(404).json({ message: "Connection not found" });
//     res.json(connection);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get accepted connections for a user
// export const getAcceptedConnections = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const connections = await Connection.find({
//       $or: [{ from: userId }, { to: userId }],
//       status: "accepted",
//     }).populate("from to", "name email");
//     res.json(connections);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// controllers/connectionController.js
import Connection from "../models/Connection.js";
import User from "../models/User.js";

// Send connection request
export const sendConnectionRequest = async (req, res) => {
  try {
    const from = req.user._id;
    const { to, skill } = req.body;
    console.log("📩 Creating connection:", { from, to, skill });

    // Prevent sending request to self
    if (from.toString() === to) {
      return res.status(400).json({ message: "Cannot connect to yourself" });
    }

    // Prevent duplicate requests
    const existing = await Connection.findOne({
      $or: [
        { requester: from, recipient: to, skill },
        { requester: to, recipient: from, skill },
      ],
    });
    if (existing) {
      return res.status(400).json({ message: "Connection already exists" });
    }

    const connection = new Connection({ requester: from, recipient: to, skill });
    await connection.save();
    res.status(201).json(connection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Accept request
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await Connection.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    ).populate("requester recipient", "name email");

    if (!connection) return res.status(404).json({ message: "Connection not found" });
    res.json(connection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject request
export const rejectConnectionRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await Connection.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!connection) return res.status(404).json({ message: "Connection not found" });
    res.json(connection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get accepted connections for a user
export const getAcceptedConnections = async (req, res) => {
  try {
    const { userId } = req.params;
    const connections = await Connection.find({
      $or: [{ requester: userId }, { recipient: userId }],
      status: "accepted",
    }).populate("requester recipient", "name email");
    res.json(connections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get pending requests received by the user
export const getPendingConnections = async (req, res) => {
  try {
    const { userId } = req.params;
    const pending = await Connection.find({
      recipient: userId,
      status: "pending",
    }).populate("requester recipient", "name email");
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get pending requests sent by the user
export const getSentConnections = async (req, res) => {
  try {
    const { userId } = req.params;
    const sent = await Connection.find({
      requester: userId,
      status: "pending",
    }).populate("recipient", "name email");
    res.json(sent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
