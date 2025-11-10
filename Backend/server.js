// // server.js
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import skillRoutes from './routes/skillRoutes.js';
// import userRoutes from "./routes/userRoutes.js";
// import connectionRoutes from './routes/connectionRoutes.js';
// import chatRoutes from "./routes/chatRoutes.js";
// dotenv.config();

// const app = express();

// // Connect DB
// connectDB();

// // Middleware
// app.use(express.json());

// // CORS - allow your frontend dev server
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/skills', skillRoutes);
// app.use('/api/connections', connectionRoutes);
// app.use("/api/chat", chatRoutes);

// // health
// app.get('/', (req, res) => res.send('SkillSwap API is running'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////##############################
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import skillRoutes from './routes/skillRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import connectionRoutes from './routes/connectionRoutes.js';
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// Create HTTP server for Socket.io
const server = createServer(app);

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use("/uploads", express.static("uploads"));


// API Routes
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/connections', connectionRoutes);
app.use("/api/chat", chatRoutes);

// Health Check
app.get('/', (req, res) => res.send('SkillSwap API is running successfully 🚀'));

// ✅ Socket.io Events
io.on('connection', (socket) => {
  console.log(`🟢 New client connected: ${socket.id}`);

  // User joins a room (based on userId)
  socket.on('joinChat', (userId) => {
    socket.join(userId);
    console.log(`👤 User ${userId} joined their room`);
  });

  // Listen for sendMessage and deliver in real-time
  socket.on('sendMessage', ({ senderId, receiverId, content }) => {
    if (!senderId || !receiverId || !content) return;

    console.log(`📩 ${senderId} → ${receiverId}: ${content}`);
    io.to(receiverId).emit('receiveMessage', { senderId, content });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

// ✅ Make io accessible across app (optional)
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// ###########################################################################################################

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import path from "path";
// import { fileURLToPath } from "url";
// import connectDB from "./config/db.js";
// import skillRoutes from "./routes/skillRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import connectionRoutes from "./routes/connectionRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";

// dotenv.config();

// const app = express();
// const server = createServer(app);

// // ⚙️ Setup Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // 🌍 MongoDB Connection
// connectDB();

// // 📦 Middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     credentials: true,
//   })
// );

// // ⚙️ Static Upload Folder
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // 📡 API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/skills", skillRoutes);
// app.use("/api/connections", connectionRoutes);
// app.use("/api/chat", chatRoutes);

// // ❤️ Health Check
// app.get("/", (req, res) => res.send("SkillSwap API running successfully 🚀"));

// // 🧠 Socket.io Chat Events
// io.on("connection", (socket) => {
//   console.log(`🟢 Connected: ${socket.id}`);

//   // User joins room by userId
//   socket.on("joinChat", (userId) => {
//     socket.join(userId);
//     console.log(`👤 User ${userId} joined their room`);
//   });

//   // Real-time message event (supports file or text)
//   socket.on("sendMessage", (msg) => {
//     const { sender, receiver, content, type } = msg;
//     if (!sender || !receiver) return;
//     console.log(`💬 New ${type} message from ${sender} → ${receiver}`);

//     // Send to receiver’s room
//     io.to(receiver).emit("receiveMessage", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log(`🔴 Disconnected: ${socket.id}`);
//   });
// });

// // ✅ Share Socket.io instance globally (if needed)
// app.set("io", io);

// // 🚀 Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
