const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registration',)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define a schema
const registrationSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  studentid: String,
  batch: String,
  stream: String,
  phone: String,
  email: String,
});

// Create a model
const Registration = mongoose.model('Registration', registrationSchema);

// API endpoint to handle form submission
app.post('/register', async (req, res) => {
  const { firstname, lastname, studentid, batch, stream, phone, email } = req.body;

  const newRegistration = new Registration({
    firstname,
    lastname,
    studentid,
    batch,
    stream,
    phone,
    email,
  });

  try {
    await newRegistration.save();
    res.status(201).send('Registration successful');
  } catch (error) {
    res.status(500).send('Error saving registration');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
