import mongoose, {ObjectId, Schema} from "mongoose"

const Syllabus = mongoose.model('Syllabus' , new Schema({
    id: {type: ObjectId},
    name:{
        type: String,
        require: true,
        validate: {
            validator: (value) => value.length > 10,
            message: 'Length of syllabus name > 10'
        }
    },
    code:{
        type: String,
        require: true,
        validate: {
            validator: (value) => value.length > 3,
            message: 'Length of syllabus code > 3'
        }
    },
    time_allocation:{
        type: String,
        require: true
    },
    prerequisites:{
        type: String,
        require: false
    },
    student_tasks:{
        type: String,
        require: true
    },
    tools:{
        type: String,
        require: true
    },
    scoring_scale:{
        type: Number,
        require: true,
        validate: {
            validator: (value) => value >= 0 && value <= 10,
            message: 'Scale in range of 0 to 10'
        }
    },
    is_approved:{
        type: Boolean,
        require: true
    },
    decision_id:{
        type: Number,
        require: true
    },
    note:{
        type: String,
        require: false
    },
    min_avg_mark_to_pass:{
        type: Number,
        require: true,
        validate: {
            validator: (value) => value >= 0 && value <= 10,
            message: 'Min average mark to pass in range of 0 to 10'
        }
    },
    approved_date:{
        type: String,
        require: true
    },
    LO:{
        type: [Object],
        require: true
    },
    Material:{
        type: [Object],
        require: true
    },
    Session:{
        type: [Object],
        require: true
    },
    Assessment:{
        type: [Object],
        require: true
    },
    Question:{
        type: [Object],
        require: true
    }
}))

export default Syllabus
