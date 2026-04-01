export class ApiError extends Error {
  public success: boolean;
  public message: string;
  public data: any;
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.success = false;
    this.message = message;
    this.data = null;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
