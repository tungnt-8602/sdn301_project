import mongoose, { Schema, ObjectId } from "mongoose";

const PoSchema = new Schema({
    id: { type: ObjectId },
    po_name: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length <= 10,
            message: 'Po cannot be longer than 10 characters.'
        }
    },
    po_description: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length <= 30,
            message: 'Po description cannot be longer than 30 characters.'
        }
    },
    po_status: {
        type: Boolean,
        default: false,
    }
});

const Curriculum = mongoose.model("Curriculum",
    new Schema({
        id: { type: ObjectId },
        curriculum_code: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length <= 50,
                message: 'Curriculum code cannot be longer than 50 characters.'
            }
        },
        name: {
            type: String,
            required: true
        },
        english_name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        decision: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true,
            required: true
        },
        subject_id: {
            type: [String] // This is an array
        },
        combo_id: {
            type: [String] // This is an array
        },
        po: {
            type: [PoSchema] // This is an array
        },
        plo: {
            type: [Object] // This is an array
        },

    })
)

export default Curriculum;
