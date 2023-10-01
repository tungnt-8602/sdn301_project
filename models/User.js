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
            message: 'Length of username must larger than 3'
        }
    },
    "email":{
        type: String,
        require: true,
        validate: {
            validator: (value) => isEmail,
            message: 'Incorrect format'
        }
    },
    "password":{
        type: String,
        require: true,
        validate: {
            validator: (value) => value.length >= 8,
            message: 'Length of password must equal or larger than 8'
        }
    },
    "role":{
        type: String,
        require: true
    },
    "status":{
        type: String,
        require: false
    }
}))

export default User
