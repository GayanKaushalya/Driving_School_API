const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// --- Import Security Packages ---
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();
connectDB();
require('./jobs/reminderJob'); 

const app = express();

// --- Apply Security Guards ---

// 1. Put on the security helmet
app.use(helmet());

// 2. Allow frontends (like React) to talk to our API safely
app.use(cors());

// 3. Read the JSON data
app.use(express.json()); 

// 4. Rate Limiting: Limit each IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 3, // Kept it at 3 so you can test it easily!
    message: "Too many requests from this IP, please try again after 15 minutes."
});
app.use('/api', limiter);

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// --- Start the Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🛡️  Secure Server is running on http://localhost:${PORT}`);
});