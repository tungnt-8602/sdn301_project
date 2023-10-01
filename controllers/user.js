import { validationResult } from "express-validator"
import { userRepository } from "../repositories/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.SECRET_KEY_JWT,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successfully.", token });
    } catch (error) {
        res.status(500).json({
            error: error.toString(),
        });
    }
};

const createNewAccount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        username,
        email,
        password,
        role,
        status
    } = req.body;

    try {
        const newUser = await userRepository.createNewAccount({ username, email, password, role, status });

        if (!newUser) {
            return res.status(500).json({ error: 'Failed to create user.' });
        }
        
        return res.status(201).json({
            message: 'Account created successfully.',
            data: newUser
        });
    } catch (err) {
        return res.status(500).json({ err: err.toString() });
    }
}

const getAllAccount = async (req, res) => {

}

const ableAndDisable = async (req, res, status) => {

}

export default {
    login,
    createNewAccount,
    getAllAccount,
    ableAndDisable
}
