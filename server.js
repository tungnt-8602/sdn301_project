import express from "express";
import * as dotenv from "dotenv";
import {
  userRouter,
  curriculumRouter,
  syllabusRouter,
} from "./routes/index.js";
import connectDB from "./database/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3006",
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes:
app.use("/user", userRouter);
app.use("/syllabus", syllabusRouter);
app.use("/curriculums", curriculumRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
