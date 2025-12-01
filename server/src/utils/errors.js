class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error('Unexpected error:', err);
  res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred'
  });
};

module.exports = {
  AppError,
  handleError
};

