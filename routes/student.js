import express from 'express'
import { body, validationResult } from 'express-validator'
import { studentController } from '../controllers/index.js'

const studentRouter = express.Router()

studentRouter.get('/', async (req, res) => {
    studentController.getAllStudents(req, res)
})

studentRouter.get('/:id', async (req, res) => {
    studentController.getStudentById(req, res)
})

studentRouter.post('/', async (req, res) => {
    studentController.createNewStudent(req, res)
})

studentRouter.delete('/:id', async (req, res) => {
    studentController.deleteStudentById(req, res)
})

export default studentRouter