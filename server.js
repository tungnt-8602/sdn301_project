import express from "express"
import * as dotenv from 'dotenv'
import { userRouter, syllabusRouter } from './routes/index.js'
import connectDB from "./database/database.js"
// import passport from 'passport';
import cors from 'cors';


dotenv.config()
const app = express()
app.use(express.json()) // Config cho express lam viec voi du lieu theo dinh dang json
// app.use(passport.initialize());
app.use(cors());

// Routes:
app.use('/user', userRouter)
app.use('/syllabus', syllabusRouter) 

const port = process.env.PORT || 8080

app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on port ${port}`);
})