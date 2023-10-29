import mongoose, {ObjectId, Schema} from "mongoose"
import isEmail from "validator/lib/isEmail.js"

const User = mongoose.model("User", new Schema({
    "id": {type: ObjectId},
    // Model validation
    "username":{
        type: String,
        require: true,
        validate: {
            validator: (value) => value.length > 3,
            message: 'Length of username must be at least 4 characters'
        }
    },
    "email":{
        type: String,
        require: true,
        validate: {
            validator: (value) => isEmail,
            message: 'Incorrect email format'
        }
    },
    "password":{
        type: String,
        require: true,
        validate: {
            validator: (value) => value.length >= 8,
            message: 'Length of password must be at least 8 characters'
        }
    },
    "role":{
        type: String,
        require: true,
        message: 'Role must be provided'
    },
    "status":{
        type: Boolean,
        require: false,
    }
}))

export default User
