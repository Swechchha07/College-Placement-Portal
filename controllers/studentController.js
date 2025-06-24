const User = require('../models/User');
const path = require('path');



exports.uploadResume = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const resumePath = req.file.filename;

    await User.findByIdAndUpdate(req.user.id, { resume: resumePath });

    res.json({ message: "Resume uploaded successfully", file: resumePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
