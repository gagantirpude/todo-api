//* Class Create for Error Handler
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

//* Error Function
export const errorMiddleware = (err, req, res, next) => {
  //* Error Message
  err.message = err.message || "Internal Server Error";

  //* Error Status Code
  err.statusCode = err.statusCode || 500;

  //* Response
  return res.status(err.statusCode).json({
    Success: false,
    message: err.message,
  });
};

//* Export
export default ErrorHandler;
