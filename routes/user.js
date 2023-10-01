import express from 'express'
import { body } from 'express-validator'
import { userController } from '../controllers/index.js'
import Authorization from '../middleware/authorization.js'
import { isAuthenticated } from '../middleware/authentication.js'

const userRouter = express.Router()

userRouter.post('/create', isAuthenticated, Authorization.isAdmin,
[ 
  body('username').isLength({ min: 4 }).withMessage('Length of username must be at least 4 characters'),
  body('email').isEmail().withMessage('Incorrect email format'),
  body('password').isLength({ min: 8 }).withMessage('Length of password must be at least 8 characters'),
  body('role').notEmpty().withMessage('Role must be provided'),
  body('status').notEmpty().withMessage('Status must be provided')
], 
userController.createNewAccount);

userRouter.post('/login',
[
  body('email').isEmail().withMessage('Incorrect email format'),
  body('password').isLength({ min: 8 }).withMessage('Length of password must be at least 8 characters')
], 
userController.login);

export default userRouter