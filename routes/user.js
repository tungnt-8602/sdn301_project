import express from 'express'
import { body, validationResult } from 'express-validator'
import { userController } from '../controllers/index.js'

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
    res.send("Get all users")
})

userRouter.get('/:id', async (req, res) => {
    res.send("Get users by user Id")
})

userRouter.post('/register', 
    body("email").isEmail().withMessage('Email invalid format.'),
    body("password").isLength({min:8}).withMessage('Password length greater than 8'),
    userController.register
)

userRouter.post('/login',
    body("email").isEmail().withMessage('Email invalid format.'),
    body("password").isLength({min:5}).withMessage('Password length greater than 5'),
    userController.login
    )


userRouter.put('/edit', async (req, res) => {
    res.send("Edit an User")
})

export default userRouter