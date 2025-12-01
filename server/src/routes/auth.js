const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { AppError } = require('../utils/errors');

const router = express.Router();

router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    const user = await User.create(email, password);

    const token = jwt.sign(
      { userId: user.id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await User.verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
      { userId: user.id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

