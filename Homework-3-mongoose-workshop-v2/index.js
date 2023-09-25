import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { globalRouter } from "./const/router.const.js";
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());

app.use("/api", globalRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  return res.status(statusCode).send(message);
});
app.listen(process.env.PORT, async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
