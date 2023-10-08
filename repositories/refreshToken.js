import RefreshToken from "../models/RefreshToken.js";

const saveRefreshToken = async (token, userId) => {
    try {
        const refreshToken = new RefreshToken({
            token: token,
            userId: userId
        });

        await refreshToken.save();
        return refreshToken;
    } catch (error) {
        throw error;
    }
};

const findByToken = async (rftoken) => {
    try {
        const token = await RefreshToken.findOne({ token: rftoken }).exec();
        if (!token) {
            throw new Error('Refresh token not found');
        }
        return token;
    } catch (error) {
        throw new Error("The refresh token expired, login again!");
    }
};

const deleteRefreshTokensByUserId = async (userId) => {
    try {
        const result = await RefreshToken.deleteMany({ userId: userId });
        return result.deletedCount > 0;
    } catch (error) {
        throw error;
    }
};



export default {
    saveRefreshToken,
    findByToken,
    deleteRefreshTokensByUserId
}

