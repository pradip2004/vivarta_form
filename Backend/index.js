const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs');
const XLSX = require('xlsx');

const app = express();

// Middleware
app.use(cors(
  {
    origin: ["https://vivarta-form-3333.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://pradipsadhukhan16:Pradip%402004@cluster0.5r5m0ij.mongodb.net/registration')
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


const writeToExcel = (data) => {
  const filePath = './registrations.xlsx';

  // Check if the Excel file exists
  let workbook;
  let sheet;

  if (fs.existsSync(filePath)) {
    // If the file exists, read it
    workbook = XLSX.readFile(filePath);
    sheet = workbook.Sheets['Registrations'] || XLSX.utils.aoa_to_sheet([[]]);
  } else {
    // If the file doesn't exist, create a new workbook
    workbook = XLSX.utils.book_new();
    sheet = XLSX.utils.aoa_to_sheet([['First Name', 'Last Name', 'Student ID', 'Batch', 'Stream', 'Phone', 'Email']]);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Registrations');
  }

  // Append new registration data to the sheet
  const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  sheetData.push(data);
  const updatedSheet = XLSX.utils.aoa_to_sheet(sheetData);

  // Replace the existing sheet with the updated one
  workbook.Sheets['Registrations'] = updatedSheet;

  // Write to the Excel file
  XLSX.writeFile(workbook, filePath);
};

// API endpoint to handle form submission
app.get('/', (req, res)=>{
  res.send('Hello World!')
})
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

    writeToExcel([firstname, lastname, studentid, batch, stream, phone, email]);

    res.status(201).send('Registration successful');
  } catch (error) {
    res.status(500).send('Error saving registration');
  }
});

app.get('/download', (req, res) => {
  const filePath = './registrations.xlsx';
  res.download(filePath, 'registrations.xlsx', (err) => {
    if (err) {
      res.status(500).send('Error downloading the file');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
