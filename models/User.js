const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  branch: String,
  phone: String,
  cgpa: String,
  resume: String,
  profilePic: String,
  achievements: [String],
  jobs: [
    {
      company: String,
      role: String,
      status: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
