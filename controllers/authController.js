// authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // SQL Model
const sendEmail = require('../utils/emailHelper');  // Helper to send verification emails

// Register user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({ name, email, password: hashedPassword });

  // Send email verification
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  sendEmail(email, `Please verify your account: ${token}`);

  res.status(201).json({ message: 'User registered. Verify your email.' });
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Check user
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
