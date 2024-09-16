const express = require('express');
const router = express.Router();
const { registerUser, generateExcel } = require('../controllers/registrationController');

// Define routes
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/register', registerUser); // Registration endpoint
router.get('/generate-excel/:password', generateExcel); // Excel generation endpoint

module.exports = router;
