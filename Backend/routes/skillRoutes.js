
// import express from "express";
// import Skill from "../models/Skill.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Create new skill
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { name, skill, description, tags, location } = req.body;

//     if (!skill || !description) {
//       return res
//         .status(400)
//         .json({ message: "Skill and description are required" });
//     }

//     const newSkill = new Skill({
//       name: name || "",
//       skill,
//       description,
//       tags,
//       location,
//       user: req.user._id, // ✅ take user from token
//     });

//     await newSkill.save();
//     res.status(201).json(newSkill);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get all skills
// router.get("/", async (req, res) => {
//   try {
//     const skills = await Skill.find().populate("user", "name email");
//     res.json(skills);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


import express from "express";
import Skill from "../models/Skill.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create new skill
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, skill, description, tags, location } = req.body;

    if (!skill || !description) {
      return res.status(400).json({ message: "Skill and description are required" });
    }

    const newSkill = new Skill({
      name: name || "",
      skill,
      description,
      tags,
      location,
      user: req.user._id, // taken from JWT middleware
    });

    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().populate("user", "name email");
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
