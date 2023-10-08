import mongoose, { Schema } from "mongoose";

const RefreshToken = mongoose.model("RefreshToken", new Schema({
    "token": {
        type: String,
        required: true,
    },
    "userId": {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    "createdAt": {
        type: Date,
        default: Date.now
    }
}))

export default RefreshToken;
