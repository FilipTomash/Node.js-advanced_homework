import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { globalRouter } from "./const/router.const.js";
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());
app.use("/api", globalRouter);

app.listen(process.env.PORT, async () => {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    console.log(`Listening on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
