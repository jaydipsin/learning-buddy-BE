import dotenv from "dotenv";
import mongoose from "mongoose";
import mongoDb from "mongodb";

dotenv.config();
const mongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  mongoClient
    .connect(process.env.MONGO_DB_SRV_URI)
    .then((client) => {
      _db = client.db("learning-buddy");
      cb();
      console.log("Connected to driver");
    })
    .catch((err) => console.log(err));
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

export { mongoConnect, getDB };
