import mongoose, { Schema, ObjectId } from "mongoose";
// Session_Session: sessionData.Session,
//       Session_topic: sessionData.Topic,
//       Session_LearningType: sessionData.LearningType,
//       Session_Lo: sessionData.Lo,
//       Session_ITU: sessionData.Itu,
//       Session_StudentMaterials: sessionData.StudentMaterials,
//       Session_SDownload: sessionData.SDownload,
//       Session_StudentTask: sessionData.StudentTask,
//       Session_URLs: sessionData.URLs,
const SessionSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  Session_Session: {
    type: String,
    required: false,
  },
  Session_topic: {
    type: String,
    required: false,
  },
  Session_LearningType: {
    type: String,
    required: false,
  },
  Session_Lo: {
    type: Array,
    required: false,
  },
  Session_ITU: {
    type: Array,
    required: false,
  },
  Session_StudentMaterials: {
    type: String,
    required: false,
  },
  Session_SDownload: {
    type: String,
    required: false,
  },
  Session_StudentTask: {
    type: String,
    required: false,
  },
  Session_URLs: {
    type: String,
    required: false,
  },
});

const AssessmentSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  Assessment_Category: {
    type: String,
    required: false,
  },
  Assessment_Type: {
    type: String,
    required: false,
  },
  Assessment_Part: {
    type: Number,
    required: false,
  },
  Assessment_Weight: {
    type: Number,
    required: false,
  },
  Assessment_CompletionCriteria: {
    type: String,
    required: false,
  },
  Assessment_Duration: {
    type: String,
    required: false,
  },
  Assessment_CLO: {
    type: String,
    required: false,
  },
  Assessment_QuestionType: {
    type: String,
    required: false,
  },
  Assessment_NoQuestion: {
    type: String,
    required: false,
  },
  Assessment_KnowledgeAndSkill: {
    type: String,
    required: false,
  },
  Assessment_GradingGuide: {
    type: String,
    required: false,
  },
  Assessment_Note: {
    type: String,
    required: false,
  },
});
import mongoose, { ObjectId, Schema } from "mongoose";

const LO = new Schema({
    CLO_Name: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length <= 10,
            message: 'Clo Name cannot be longer than 10 characters.'
        }
    },
    CLO_Details: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length <= 30,
            message: 'Clo details cannot be longer than 30 characters.'
        }
    }
});

const Material = new Schema({
    MaterialDescription: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: false
    },
    Publisher: {
        type: String,
        required: false
    },
    PublishedDate: {
        type: String,
        required: false
    },
    Edition: {
        type: String,
        required: false
    },
    ISBN: {
        type: String,
        required: false
    },
    IsMainMaterial: {
        type: Boolean,
        required: true
    },
    IsHardCopy: {
        type: Boolean,
        required: true
    },
    IsOnline: {
        type: Boolean,
        required: true
    },
    Note: {
        type: String,
        required: false
    }
});

const Syllabus = mongoose.model(
  "Syllabus",
  new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    syllabus_name: {
      type: String,
      require: true,
      validate: {
        validator: (value) => value.length > 10,
        message: "Length of syllabus name > 10",
      },
    },
    syllabus_Ename: {
      type: String,
      require: false,
    },
    code: {
      type: String,
      require: true,
      // validate: {
      //   validator: (value) => value.length > 3,
      //   message: "Length of syllabus code > 3",
      // },
    },
    time_allocation: {
      type: String,
      require: true,
    },
    prerequisites: {
      type: String,
      require: false,
    },
    student_tasks: {
      type: String,
      require: true,
    },
    tools: {
      type: String,
      require: true,
    },
    scoring_scale: {
      type: Number,
      require: true,
      validate: {
        validator: (value) => value >= 0 && value <= 10,
        message: "Scale in range of 0 to 10",
      },
    },
    is_approved: {
      type: Boolean,
      require: true,
    },
    decision: {
      type: String,
      require: true,
    },
    note: {
      type: String,
      require: false,
    },
    min_avg_mark_to_pass: {
      type: Number,
      require: true,
      validate: {
        validator: (value) => value >= 0 && value <= 10,
        message: "Min average mark to pass in range of 0 to 10",
      },
    },
    approved_date: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    no_credit: {
      type: Number,
      require: true,
      validate: {
        validator: (value) => value >= 0 && value <= 10,
        message: "Number of credit in range of 0 to 10",
      },
    },
    degree_level: {
      type: String,
      require: true,
    },

    LO:{
      type: [LO]
    },
    Material: {
      type: [Material]
    },
    Session: {
      type: [SessionSchema],
    },
    Assessment: {
      type: [AssessmentSchema],
    },
    Question: {
      type: [Object],
    },
  })
);

export default Syllabus;
