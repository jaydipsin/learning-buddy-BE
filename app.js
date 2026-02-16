import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnect, getDB } from "./src/utils/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth routes
mongoConnect(() => {
  app.listen(4000, (req, res) => {
    console.log("Server is running!");
  });
});
