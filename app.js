import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnect, getDB } from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

app.use("/auth", authRoute);

// Auth routes
mongoConnect(() => {
  app.listen(process.env.PORT || 5000, (req, res) => {
    console.log("Server is running!", process.env.PORT || 5000);
  });
});
