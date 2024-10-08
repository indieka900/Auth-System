import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import { UserRouter } from "./routes/user.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());
app.use('/auth', UserRouter);

mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
