// // routes/auth.js
// import express from 'express';
// import { register, login, getMe } from '../controllers/authController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/me', protect, getMe);

// export default router;

// routes/users.js
// routes/userRoutes.js
import express from 'express';
import User from '../models/User.js'; // make sure this exists
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// @desc Register new user
// @route POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Login user
// @route POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d'
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
