const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  branch: String,
  cgpa: Number
});

module.exports = mongoose.model('Student', StudentSchema);