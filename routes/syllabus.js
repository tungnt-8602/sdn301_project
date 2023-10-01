import express from 'express'
import { body, validationResult } from 'express-validator'
import { syllabusController } from '../controllers/index.js'

const syllabusRouter = express.Router()

export default syllabusRouter