const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  qualification: String,
  role: { type: String, enum: ['student', 'admin', 'company'], default: 'student' },
  resume: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
