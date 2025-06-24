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
    'https://babystepsapi-f2gg-je09n9loa-pritams-projects-8d629749.vercel.app',  // Your exact frontend URL
    'https://babystepsapi-f2gg.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']  // Add this line
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
