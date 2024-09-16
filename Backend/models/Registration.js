const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  studentid: String,
  batch: String,
  stream: String,
  phone: String,
  email: String,
});

module.exports = mongoose.model('Registration', registrationSchema);
