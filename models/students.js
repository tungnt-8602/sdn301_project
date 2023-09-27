
import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const Student = mongoose.model("Student",
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: 'Username must be at least 3 charaters.'
            }
        },
        email: {
            type: String,
            validate: {
                validator: (value) => isEmail,
                message: 'Email is incorrect format.'
            }
        },
        language: {
            type: [String] // This is an array
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', "Female"],
                message: '{VALUE} is not suppoted'
            },
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
            validate:{
                validator:(phoneNumber)=>phoneNumber.length > 5 && phoneNumber.length<=50,
                message: 'Phone number must be at least 5 characters, max: 50'
            }
        },
        address: {
            type: String,
            required: false
        }
    })
)

export default Student