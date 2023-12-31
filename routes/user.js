import express from 'express'
import { body } from 'express-validator'
import { userController } from '../controllers/index.js'
import Authorization from '../middleware/authorization.js'
import { isAuthenticated } from '../middleware/authentication.js'

const userRouter = express.Router()

userRouter.post('/', isAuthenticated, Authorization.isAdmin,
[ 
  body('username').isLength({ min: 4 }).withMessage('Length of username must be at least 4 characters'),
  body('email').isEmail().withMessage('Incorrect email format'),
  body('password').isLength({ min: 8 }).withMessage('Length of password must be at least 8 characters'),
  body('role').notEmpty().withMessage('Role must be provided')
], 
userController.createNewAccount);

userRouter.post('/login',
[
  body('email').isEmail().withMessage('Incorrect email format'),
  body('password').isLength({ min: 8 }).withMessage('Length of password must be at least 8 characters')
], 
userController.login);

userRouter.get('/all', isAuthenticated, Authorization.isAdmin, userController.getAllAccount);

userRouter.put('/changeStatus/:id', isAuthenticated, Authorization.isAdmin, userController.ableAndDisable);

userRouter.get('/token', (req, res) => {
  userController.getToken(req, res);
})

userRouter.get('/logout', (req, res) => {
  userController.logout(req, res);
})

userRouter.get('/', isAuthenticated, Authorization.isAdmin, userController.searchUsers);

userRouter.put('/', isAuthenticated, Authorization.isAdmin, userController.updateUsers);

export default userRouter