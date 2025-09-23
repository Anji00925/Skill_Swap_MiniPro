// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

//   if (!token) return res.status(401).json({ message: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    


//     // Use decoded.id instead of decoded.userId
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) return res.status(401).json({ message: "User not found" });

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };

// ##############################################################################################################################################

// middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

//     // ⚠ Use `decoded.id` because your token payload contains { id: "...", iat, exp }
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };


// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

//     // Use decoded.id from the JWT payload
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  console.log("Auth Header Received:", authHeader);   // 👀 Debug

  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    console.log("Decoded Token:", decoded);   // 👀 Debug

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);   // 👀 Debug
    return res.status(401).json({ message: "Token is not valid" });
  }
};
