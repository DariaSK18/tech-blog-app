export default class AppError extends Error {
  constructor(message, satusCode) {
    super(message);
    this.statusCode = this.statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
