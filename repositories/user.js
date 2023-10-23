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
    role
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
            status: true
        });

        await newUser.save();

        return newUser;
    } catch (err){
        throw new Error('Cannot create new account: ' + err.message);
    }
}

const getAllAccount = async (page) => {
    const perPage = 5;

    try {
        const totalCount = await User.countDocuments({ role: { $ne: "ADMIN" } });
        const totalPages = Math.ceil(totalCount / perPage);

        const pageNumber = parseInt(page);

        const skip = (pageNumber - 1) * perPage;

        const accounts = await User.find({ role: { $ne: "ADMIN" } })
            .skip(skip)
            .limit(perPage)
            .exec();

        return accounts;
    } catch (error) {
        throw new Error('Cannot get account list: ' + err.message);
    }
}



const ableAndDisable = async (userId) => {
    try {

        const user = await User.findById(userId).exec();
        if (!user) {
            throw new Error('User not found');
        }

        user.status = !user.status;
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
}

const searchUsers = async (query, page, size) => {
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: new RegExp(query, 'i') } },
                { email: { $regex: new RegExp(query, 'i') } },
            ],
        }).skip(size * (page - 1))
        .limit(size)
        .exec();

        return users;
    } catch (error) {
        throw error;
    }
};

const totalUsersSearch = async (query) => {
    const students = await User.countDocuments({
      $or: [
        { username: { $regex: new RegExp(query, 'i') } },
        { email: { $regex: new RegExp(query, 'i') } },
      ],
    });
    return students;
  };

  const updateUsers = () => {

  }

export default {
    findByEmail,
    createNewAccount,
    getAllAccount,
    ableAndDisable,
    searchUsers,
    totalUsersSearch,
    updateUsers
}