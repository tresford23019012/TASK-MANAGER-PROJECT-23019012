const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const router = express.Router();

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: '⚠️ All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: '⚠️ Password must be at least 6 characters' });
  }

  // Check if email already exists
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: '❌ Server error' });
    if (user) return res.status(400).json({ error: '⚠️ Email already registered' });

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user
    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      function (err) {
        if (err) return res.status(500).json({ error: '❌ Could not create user' });

        // Create token
        const token = jwt.sign(
          { id: this.lastID, name, email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );

        res.status(201).json({
          message: '✅ Registration successful',
          token,
          user: { id: this.lastID, name, email },
        });
      }
    );
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: '⚠️ Email and password are required' });
  }

  // Find user
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: '❌ Server error' });
    if (!user) return res.status(400).json({ error: '⚠️ Invalid email or password' });

    // Check password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ error: '⚠️ Invalid email or password' });

    // Create token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: '✅ Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

module.exports = router;