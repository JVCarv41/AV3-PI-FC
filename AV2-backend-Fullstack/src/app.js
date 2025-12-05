const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/mongo');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());

// JSON parsing
app.use(express.json({ limit: '1mb' }));

// Middleware to log requests
app.use((req, res, next) => {
    const originalUrl =
      req.apiGateway?.event?.url || req.originalUrl || req.url;
    req.url = originalUrl
    console.log(`\nRequest: ${req.method} ${originalUrl}`);
    next();
});

// Test route
app.get('/api/test', (req, res) => {
    console.log('Test route handler reached');
    res.json({ message: 'Test route is working!' });
});

// Routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/shopping', shoppingRoutes);
module.exports = app;