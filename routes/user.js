import express from 'express'
import { body, validationResult } from 'express-validator'
import { userController } from '../controllers/index.js'

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  userController.login(req, res);
})

export default userRouter