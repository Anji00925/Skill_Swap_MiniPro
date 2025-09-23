// controllers/skillController.js
import Skill from '../models/Skill.js';

export const addSkill = async (req, res) => {
  try {
    const { title, description, category, isPublic = true } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const skill = await Skill.create({
      title,
      description,
      category,
      isPublic,
      user: req.user._id
    });

    res.status(201).json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllPublicSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ isPublic: true }).populate('user', 'username').sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    if (skill.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    const { title, description, category, isPublic } = req.body;
    skill.title = title ?? skill.title;
    skill.description = description ?? skill.description;
    skill.category = category ?? skill.category;
    if (typeof isPublic === 'boolean') skill.isPublic = isPublic;

    await skill.save();
    res.json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    if (skill.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });

    await skill.remove();
    res.json({ message: 'Skill removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
