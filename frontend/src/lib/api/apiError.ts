export default class ApiError extends Error {
  constructor(message?: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
