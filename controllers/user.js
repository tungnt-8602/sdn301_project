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
            return res.status(401).json({ message: "Your account is disabled." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.SECRET_KEY_JWT,
            { expiresIn: "30s" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.SECRET_REFRESH_KEY_JWT,
            { expiresIn: "7d" }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login successfully.",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString(),
        });
    }
};

const getToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY_JWT);
        const { userId, email, role } = decodedRefreshToken;

        const newAccessToken = jwt.sign(
            { userId, email, role },
            process.env.SECRET_KEY_JWT,
            { expiresIn: "30s" }
        );

        const newRefreshToken = jwt.sign(
            { userId, email, role },
            process.env.SECRET_REFRESH_KEY_JWT,
            { expiresIn: "7d" }
        );

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.status(200).json({
            message: "Token refreshed successfully.",
            token: newAccessToken,
        });
    } catch (error) {
        console.error("Error refreshing token:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired. Please re-login." });
        } else {
            return res.status(401).json({ message: "Invalid refresh token." });
        }
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
        role
    } = req.body;

    try {
        const newUser = await userRepository.createNewAccount({ username, email, password, role });

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
    const { id } = req.params;
    try {
        const updatedUser = await userRepository.ableAndDisable(id);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'Update status successfully.',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken', { httpOnly: true, maxAge: 0, path: '/', domain: 'localhost' });
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const searchUsers = async (req, res) => {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5; 

    try {
        const users = await userRepository.searchUsers(query, page, size);
        const total = await userRepository.totalUsersSearch(query);
        if(users.length > 0){
            res.status(200).json({message: "Search users successfully", searchString: query, page: page, size: size, total: totalnpm, data: users });
        } else{
            res.status(200).json({message: "Not found user from email or username provided" });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const updateUsers = async (req, res) => {

}

export default {
    login,
    createNewAccount,
    getAllAccount,
    ableAndDisable,
    getToken,
    logout,
    searchUsers,
    updateUsers
}
