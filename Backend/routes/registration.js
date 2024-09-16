const express = require('express');
const router = express.Router();
const { registerUser, generateExcel } = require('../controllers/registrationController');

// Define routes
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Registration endpoint
router.post('/register', registerUser);

// Excel generation endpoint
router.get('/generate-excel/:password', generateExcel);

module.exports = router;
