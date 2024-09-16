const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import DB connection
const registrationRoutes = require('./routes/registration'); // Import registration routes

dotenv.config(); // Load environment variables

const app = express();

app.use(cors({
  origin: ["https://vivarta-form-3333.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(bodyParser.json());
// app.options('*', cors());

connectDB(); // Connect to MongoDB

app.use('/', registrationRoutes); // Use registration routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
