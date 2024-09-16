const Registration = require('../models/Registration'); // Import the Registration model
const xlsx = require('xlsx'); // Import xlsx
const fs = require('fs'); // Import fs
const { Readable } = require('stream');

// Register a new user
exports.registerUser = async (req, res) => {
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
    console.error('Error saving registration:', error); // Log error for debugging
    res.status(500).send('Error saving registration');
  }
};

// Generate Excel file
// exports.generateExcel = async (req, res) => {
//   const { password } = req.params; 

//   if (password !== process.env.PASSWORD) {
//     return res.status(403).send('Forbidden: Incorrect password');
//   }

//   try {
//     const registrations = await Registration.find({}, {
//       firstname: 1,
//       lastname: 1,
//       studentid: 1,
//       batch: 1,
//       stream: 1,
//       phone: 1,
//       email: 1,
//       _id: 0 
//     });

//     if (!registrations.length) {
//       return res.status(404).send('No registrations found');
//     }

//     const transformedData = registrations.map(({ firstname, lastname, studentid, batch, stream, phone, email }) => ({
//       firstname,
//       lastname,
//       studentid,
//       batch,
//       stream,
//       phone,
//       email,
//     }));

//     const workbook = xlsx.utils.book_new();
//     const worksheet = xlsx.utils.json_to_sheet(transformedData);
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'Registrations');

//     const filePath = 'registrations.xlsx';
//     xlsx.writeFile(workbook, filePath);

//     res.download(filePath, (err) => {
//       if (err) {
//         console.error('Error downloading the file:', err);
//         return res.status(500).send('Error downloading the file.');
//       }

//       // Remove the file after download
//       fs.unlinkSync(filePath); 
//     });
//   } catch (error) {
//     console.error('Error generating the Excel file:', error); // Log error for debugging
//     res.status(500).send('Error generating the Excel file.');
//   }
// };


exports.generateExcel = async (req, res) => {
  const { password } = req.params;

  if (password !== process.env.PASSWORD) {
    return res.status(403).send('Forbidden: Incorrect password');
  }

  try {
    const registrations = await Registration.find({}, {
      firstname: 1,
      lastname: 1,
      studentid: 1,
      batch: 1,
      stream: 1,
      phone: 1,
      email: 1,
      _id: 0 
    });

    if (!registrations.length) {
      return res.status(404).send('No registrations found');
    }

    const transformedData = registrations.map(({ firstname, lastname, studentid, batch, stream, phone, email }) => ({
      firstname,
      lastname,
      studentid,
      batch,
      stream,
      phone,
      email,
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(transformedData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Generate buffer instead of writing to file
    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Set headers for download
    res.setHeader('Content-Disposition', 'attachment; filename=registrations.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    
    // Send the buffer in the response
    res.send(buffer);
  } catch (error) {
    console.error('Error generating the Excel file:', error);
    res.status(500).send('Error generating the Excel file.');
  }
};