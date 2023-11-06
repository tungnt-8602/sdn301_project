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
  Session: {
    type: String,
    required: false,
  },
  Topic: {
    type: String,
    required: false,
  },
  LearningTeachingType: {
    type: String,
    required: false,
  },
  LO: {
    type: Array,
    required: false,
  },
  ITU: {
    type: Array,
    required: false,
  },

  StudentMaterials: {
    type: String,
    required: false,
  },

  SDownload: {
    type: String,
    required: false,
  },
  StudentTasks: {
    type: String,
    required: false,
  },
  URLs: {
    type: String,
    required: false,
  },
});

const AssessmentSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  Category: {
    type: String,
    required: false,
  },
  Type: {
    type: String,
    required: false,
  },
  Part: {
    type: Number,
    required: false,
  },
  Weight: {
    type: Number,
    required: false,
  },
  CompletionCriteria: {
    type: String,
    required: false,
  },
  Duration: {
    type: String,
    required: false,
  },
  CLO: {
    type: String,
    required: false,
  },
  QuestionType: {
    type: String,
    required: false,
  },
  NoQuestion: {
    type: String,
    required: false,
  },
  KnowledgeAndSkill: {
    type: String,
    required: false,
  },
  GradingGuide: {
    type: String,
    required: false,
  },
  Note: {
    type: String,
    required: false,
  },
});

const LO = new Schema({
  id: { type: ObjectId },
  CLO_Name: {
    type: String,
  },
  CLO_Details: {
    type: String,
  },
});

const Material = new Schema({
  id: { type: ObjectId },
  MaterialDescription: {
    type: String,
  },
  Author: {
    type: String,
    required: false,
  },
  Publisher: {
    type: String,
    required: false,
  },
  PublishedDate: {
    type: String,
    required: false,
  },
  Edition: {
    type: String,
    required: false,
  },
  ISBN: {
    type: String,
    required: false,
  },
  IsMainMaterial: {
    type: Boolean,
  },
  IsHardCopy: {
    type: Boolean,
  },
  IsOnline: {
    type: Boolean,
  },
  Note: {
    type: String,
    required: false,
  },
});

const Syllabus = mongoose.model(
  "Syllabus",
  new Schema({
    name: {
      type: String,
      require: true,
      validate: {
        validator: (value) => value.length > 10,
        message: "Length of syllabus name > 10",
      },
    },
    e_name: {
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
      default: true,
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
    LO: {
      type: [LO],
    },
    Material: {
      type: [Material],
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
    status: {
      type: Boolean,
      default: true,
    },
  })
);

export default Syllabus;
