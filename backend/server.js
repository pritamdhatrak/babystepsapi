const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://babystepsapi-f2gg.vercel.app',
    'https://babystepsapi-lil.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Add welcome route
app.get("/", (req, res) => {
  res.send("🎉 Welcome to the BabySteps API - Backend is Live!");
});

// Import routes
const authRoutes = require('./routes/auth');
const milestoneRoutes = require('./routes/milestones');
const tipRoutes = require('./routes/tips');

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/tips', tipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
