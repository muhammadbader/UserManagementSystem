class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates that this error is expected and handled
    Error.captureStackTrace(this, this.constructor);
  } 
    toJSON() {
        return {
        message: this.message,
        statusCode: this.statusCode,
        isOperational: this.isOperational,
        };
    }
}

export default AppError;
