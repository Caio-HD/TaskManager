const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/errors');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    throw new AppError(errorMessages, 400);
  }
  next();
};

const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

const validateTask = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ max: 255 })
    .withMessage('Task title must be less than 255 characters'),
  body('description')
    .optional()
    .trim(),
  handleValidationErrors
];

const validateTaskUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Task title cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Task title must be less than 255 characters'),
  body('description')
    .optional()
    .trim(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateTask,
  validateTaskUpdate
};

