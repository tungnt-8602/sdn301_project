import express from 'express'
import { body, validationResult } from 'express-validator'
import { syllabusController } from '../controllers/index.js'

const syllabusRouter = express.Router()

syllabusRouter.get('/', async (req, res) => {
    syllabusController.getAllSyllabus(req, res)
})

export default syllabusRouter