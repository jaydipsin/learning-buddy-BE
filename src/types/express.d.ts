import { Request } from "express";

// Define your User type
interface IReqUSer {
  _id: string;
  email: string;
  role: string;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: IReqUSer; // Optional because not all routes need auth
    }
  }
}
