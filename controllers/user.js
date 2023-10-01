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
        } else if (user.status === false) {
            return res.status(401).json({ message: "Your account is disable." });
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
    try {
        const page = req.query.page || 1;

        const accounts = await userRepository.getAllAccount(page);
        res.status(200).json({ accounts });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const ableAndDisable = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {id} = req.params;
    try {
        const updatedUser = await userRepository.ableAndDisable(id);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'Update status successfully.',
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({ error: error.toString() });
    }
}

export default {
    login,
    createNewAccount,
    getAllAccount,
    ableAndDisable
}
