// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import skillRoutes from './routes/skillRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import connectionRoutes from './routes/connectionRoutes.js';
import chatRoutes from "./routes/chatRoutes.js";
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// CORS - allow your frontend dev server
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/connections', connectionRoutes);
app.use("/api/chat", chatRoutes);

// health
app.get('/', (req, res) => res.send('SkillSwap API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
