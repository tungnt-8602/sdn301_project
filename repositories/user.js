import User from "../models/User.js";
import bcrypt from 'bcrypt'


const findByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).exec();
        return user;
    } catch (error) {
        throw error;
    }
};

const createNewAccount = async ({
    username,
    email,
    password,
    role,
    status
}) =>{
    try {
        const userExisting = await User.findOne({ email }).exec();
        if (userExisting){
            throw new Error('Email already existed, use different email.');
        }

        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY));
        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
            role,
            status
        });

        await newUser.save();

        return newUser;
    } catch (err){
        throw new Error('Cannot create new account: ' + err.message);
    }
}

const getAllAccount = async () =>{
    
}

const ableAndDisable = async () =>{
    
}

export default {
    findByEmail,
    createNewAccount,
    getAllAccount,
    ableAndDisable
}