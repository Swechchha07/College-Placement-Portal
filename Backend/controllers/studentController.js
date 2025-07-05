const User = require('../models/User');
const path = require('path');



exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const resumePath = req.file.filename;

    await User.findByIdAndUpdate(req.user.id, {
      resume: resumePath,
      resumeUpdatedAt: Date.now(),
    });

    res.json({ message: "Resume uploaded", filename: resumePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE /api/student/delete-resume
exports.deleteResume = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { resume: null, resumeUpdatedAt: null });
    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
