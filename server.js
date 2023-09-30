import express from "express"
import * as dotenv from 'dotenv'
import { userRouter, syllabusRouter } from './routes/index.js'
import connectDB from "./database/database.js"

dotenv.config()
const app = express()
app.use(express.json()) // Config cho express lam viec voi du lieu theo dinh dang json

// Routes:
app.use('/users', userRouter)
app.use('/syllabus', syllabusRouter) 

const port = process.env.PORT || 8080

app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on port ${port}`);
})