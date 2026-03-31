import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoConnect = (cb) => {
  mongoose
    .connect(process.env.MONGO_DB_SRV_URI)
    .then(() => {
      cb();
      console.log("Connected to MongoDB via Mongoose");
    })
    .catch((err) => console.log(err));
};

export { mongoConnect };
