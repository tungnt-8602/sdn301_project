import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async ({email, password}) =>{
    const userExisting = await User.findOne({email}).exec()
    if(userExisting){
        const isMatch = await bcrypt.compare(password, userExisting.password)
        if(isMatch==true){
            // Tạo Access Token bằng JWT
            const accessToken = jwt.sign(
                {
                    data: userExisting
                },
                process.env.SECRET_KEY_JWT,
                {
                    expiresIn: "2 days"
                }
            )
            
            return {
                ...userExisting.toObject(),
                password: "Not show",
                token : accessToken
            }
        }else{
            throw new Error("Wrong email and password")
        }
    }else{
        throw new Error('User not exist.')
    }
}

const register = async ({
    name,
    email, 
    password,
    phoneNumber,
    address
}) =>{
    debugger
    const userExisting = await User.findOne({email}).exec()
    if(userExisting!=null){
        throw new Error("User existing.")
    }

    // Mã hóa mật khẩu
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY))

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        phoneNumber,
        address
    })

    // Clone a new user
    return {
        ...newUser._doc,
        password: 'Not show'
    }
}

export default {
    login,
    register
}