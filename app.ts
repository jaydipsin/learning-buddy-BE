import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Note: If your tsconfig uses "moduleResolution": "nodenext",
// keeping the .js extension here is actually correct and required by Node!
import { mongoConnect } from "./src/utils/db.js";
import indexRoute from "./src/routes/index.routes.js";
import authRoute from "./src/routes/auth.route.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Global Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Routes ---
app.use("/auth", authRoute);
app.use("/api", indexRoute);

// --- Global Error Handler ---
// TypeScript requires us to explicitly type these 4 parameters
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// --- Database Connection & Server Start ---
mongoConnect(() => {
  // FIXED: app.listen does not take (req, res) as arguments.
  // It takes no arguments (or an error in older node versions).
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}!`);
  });
});
