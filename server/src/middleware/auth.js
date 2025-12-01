const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const { AppError } = require('../utils/errors');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401);
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        throw new AppError('User not found', 401);
      }

      req.user = { id: user.id, email: user.email };
      next();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Invalid or expired token', 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };

