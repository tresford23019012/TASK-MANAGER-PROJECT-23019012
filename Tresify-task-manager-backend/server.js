const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5175',
    'https://task-manager-project-23019012-ruo4.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: '✅ Tresify API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/register, /api/auth/login',
      tasks: '/api/tasks',
    },
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: '⚠️ Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '❌ Something went wrong on the server' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Tresify server running on http://localhost:${PORT}`);
});