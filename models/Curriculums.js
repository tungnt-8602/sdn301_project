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
            validator: (value) => value.length <= 300,
            message: 'Po description cannot be longer than 300 characters.'
        }
    },
    po_status: {
        type: Boolean,
        default: false,
    }
});

const PloSchema = new Schema({
    id: { type: ObjectId },
    plo_name: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length <= 10,
            message: 'PLO cannot be longer than 10 characters.'
        }
    },
    plo_description: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length <= 300,
            message: 'PLO description cannot be longer than 300 characters.'
        }
    },
    plo_status: {
        type: Boolean,
        default: false,
    }
});

const Curriculum = mongoose.model("Curriculum", new Schema({
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
    combo_id: { type: [String] },
    po: {
        type: [PoSchema] // This is an array of PoSchema
    },
    plo: {
        type: [PloSchema] // This is an array of PloSchema
    },
}));

export default Curriculum;