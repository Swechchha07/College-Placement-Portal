const express = require('express');
const multer = require('multer');
const authenticate = require('../middleware/authMiddleware');
const { uploadResume, getProfile,getResume } = require('../controllers/studentController');
const User = require("../models/User");
const mongoose = require("mongoose");



const router = express.Router();



const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/profile', authenticate, getProfile);
router.post('/upload-resume', authenticate, upload.single('resume'), uploadResume);
router.get("/get-resume", authenticate,getResume)

// Update profile
router.put("/profile", authenticate, async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add achievement
router.post("/achievements", authenticate, async (req, res) => {
  const { text } = req.body;
  const user = await User.findById(req.user.id);
  user.achievements.push(text);
  await user.save();
  res.json(user.achievements);
});

// Delete achievement
router.delete("/achievements/:index", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.achievements.splice(req.params.index, 1);
  await user.save();
  res.json(user.achievements);
});

// Add job
router.post("/jobs", authenticate, async (req, res) => {
  const { company, role, status } = req.body;
  const user = await User.findById(req.user.id);
  user.jobs.push({ company, role, status });
  await user.save();
  res.json(user.jobs);
});

// Delete job
router.delete("/jobs/:index", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.jobs.splice(req.params.index, 1);
  await user.save();
  res.json(user.jobs);
});


module.exports = router;
