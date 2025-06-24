const express = require('express');
const cors = require('cors');
const routes = require('./routes/userRoutes');
const connectDB = require('./config/db');

const userHandler = require('./handlers/userHandler');
// Initialize App
const app = express();
const { BASE_SERVER_URL, BASE_PORT } = require('./baseFile');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Routes
app.use('/api', routes);

// Database Connection
connectDB();

// Server Initialization
app.listen(BASE_PORT, () => console.log(`Server running on port ${BASE_SERVER_URL}:${BASE_PORT}`));


