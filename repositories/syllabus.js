import Syllabus from "../models/Syllabus.js";
import { ObjectId } from "mongodb";
const create = async (syllabus) => {
  const newSyllabus = new Syllabus(syllabus);
  const result = await newSyllabus.save();
  return result;
};

const getSyllabusByCode = async (code) => {
  const syllabus = await Syllabus.findOne({ code }).exec();
  return syllabus;
};

const countSyllabus = async () => {
  return await Syllabus.countDocuments();
};

const getAll = async (size, page, searchString) => {
  const skip = (page - 1) * size;
  const syllabuses = await Syllabus.find({
    $or: [
      { name: { $regex: searchString } },
      { code: { $regex: searchString } },
    ],
  })
    .skip(skip)
    .limit(size);

  const count = await Syllabus.find({
    $or: [
      { name: { $regex: searchString } },
      { code: { $regex: searchString } },
    ],
  }).countDocuments();
  return {
    data: syllabuses,
    count: count,
  };
};

const getAllTrue = async (size, page, searchString) => {
  console.log("search string: ", searchString);
  const skip = (page - 1) * size;
  const syllabuses = await Syllabus.find({
    status: true,
    $or: [
      // { name: { $regex: searchString } },
      { code: { $regex: searchString } },
    ],
  })
    .skip(skip)
    .limit(size);

  const count = await Syllabus.find({
    $or: [
      // { name: { $regex: searchString } },
      { code: { $regex: searchString } },
    ],
  }).countDocuments();
  return {
    data: syllabuses,
    count: count,
  };
};

const update = async (id, updateData) => {
  const result = await Syllabus.updateOne(
    { _id: id },
    {
      name: updateData.name,
      code: updateData.code,
      time_allocation: updateData.time_allocation,
      prerequisites: updateData.prerequisites,
      student_tasks: updateData.student_tasks,
      tools: updateData.tools,
      scoring_scale: updateData.scoring_scale,
      is_approved: updateData.is_approved,
      decision: updateData.decision,
      note: updateData.note,
      min_avg_mark_to_pass: updateData.min_avg_mark_to_pass,
      LO: updateData.LO,
      Question: updateData.Question,
      Session: updateData.Session,
      Material: updateData.Material,
    }
  );
  if (result.matchedCount > 0) {
    return await Syllabus.findById(id);
  } else {
    return "lỗi edit";
  }
};

const getById = async (id) => {
  const syllabus = await Syllabus.findById(id).exec();

  return syllabus;
};

const getByNameAndCode = async (name, code) => {
  const syllabus = await Syllabus.findOne({
    $or: [{ syllabus_name: name }, { code: code }],
  }).exec();
  return syllabus;
};

const searchByKey = async (key, page, size) => {
  const syllabus = await Syllabus.find({
    $or: [
      { code: { $regex: new RegExp(key, "i") } },
      { syllabus_name: { $regex: new RegExp(key, "i") } },
      { prerequisites: { $regex: new RegExp(key, "i") } },
    ],
  })
    .skip(size * (page - 1))
    .limit(size)
    .exec();
  return syllabus;
};
const totalSearchByKey = async (key) => {
  const syllabus = await Syllabus.countDocuments({
    $or: [
      { code: { $regex: new RegExp(key, "i") } },
      { syllabus_name: { $regex: new RegExp(key, "i") } },
      { prerequisites: { $regex: new RegExp(key, "i") } },
    ],
  });
  return syllabus;
};

const remove = async (id) => {
  const result = await Syllabus.findByIdAndDelete(id).exec();
  return result;
};

const addSession = async (id, sessionData) => {
  try {
    const syllabus = await Syllabus.findById(id);
    // console.log("Syllabus: ", syllabus);
    if (!syllabus) {
      throw new Error("Syllabus not found");
    }
    // console.log("Sesion data:", sessionData);
    const newSession = {
      Session_Session: sessionData.Session,
      Session_topic: sessionData.Topic,
      Session_LearningType: sessionData.LearningType,
      Session_Lo: sessionData.Lo,
      Session_ITU: sessionData.Itu,
      Session_StudentMaterials: sessionData.StudentMaterials,
      Session_SDownload: sessionData.SDownload,
      Session_StudentTask: sessionData.StudentTask,
      Session_URLs: sessionData.URLs,
    };
    // console.log("New Sesion:", newSession);
    syllabus.Session.push(newSession);

    await syllabus.save();
    // console.log("aaaaaaaaaaaaaaa: ", newSession);
    return newSession;
  } catch (error) {
    console.error("Error adding Session:", error);
    throw error;
  }
};

const getAllSession = async (id) => {
  try {
    // const ádsadsa = await id.Session.find(
    //   (item) => String(item.Session_topic) === ""
    // );

    // console.log("syllabuses", ádsadsa);
    const syllabus = await Syllabus.findById(id);

    if (!Syllabus) {
      throw new Error("Syllasbus not found");
    }

    const allSession = syllabus.Session;
    return allSession;
  } catch (error) {
    console.error("Error fetching all Session:", error);
    throw error;
  }
};

const getSessionById = async (syllabusId, sessionId) => {
  try {
    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      throw new Error("syllabus not found");
    }

    const session = syllabus.Session.find(
      (item) => String(item._id) === sessionId
    );
    if (!session) {
      throw new Error("Session not found");
    }

    return session;
  } catch (error) {
    console.error("Error fetching Session by ID:", error);
    throw error;
  }
};

const updateSession = async (syllabus, sessionId, updatedSessionData) => {
  try {
    const sessionToUpdate = syllabus.Session.find(
      (item) => String(item._id) === sessionId
    );

    // console.log("Session find", sessionToUpdate);

    if (!sessionToUpdate) {
      throw new Error("Session not found");
    }

    sessionToUpdate.Session_Session = updatedSessionData.Session_Session;
    sessionToUpdate.Session_topic = updatedSessionData.Session_topic;
    sessionToUpdate.Session_LearningType =
      updatedSessionData.Session_LearningType;
    sessionToUpdate.Session_Lo = updatedSessionData.Session_Lo;
    sessionToUpdate.Session_ITU = updatedSessionData.Session_ITU;
    sessionToUpdate.Session_StudentMaterials =
      updatedSessionData.Session_StudentMaterials;
    sessionToUpdate.Session_SDownload = updatedSessionData.Session_SDownload;
    sessionToUpdate.Session_StudentTask =
      updatedSessionData.Session_StudentTask;
    sessionToUpdate.Session_URLs = updatedSessionData.Session_URLs;
    // console.log("Session update before save", sessionToUpdate);
    await syllabus.save();
    // console.log("Session update after save", sessionToUpdate);
    return sessionToUpdate;
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};
//Assessment
const getAllAssessment = async (id) => {
  try {
    const syllabus = await Syllabus.findById(id);
    // console.log("Syllabus: ", syllabus);
    if (!Syllabus) {
      throw new Error("Syllasbus not found");
    }

    const allAssessment = syllabus.Assessment;
    return allAssessment;
  } catch (error) {
    console.error("Error fetching all Session:", error);
    throw error;
  }
};

const getAssessmentById = async (syllabusId, assessmentId) => {
  try {
    const syllabus = await Syllabus.findById(syllabusId);
    "Session ID Repo", assessmentId;
    if (!syllabus) {
      throw new Error("syllabus not found");
    }

    const assessment = syllabus.Assessment.find(
      (item) => String(item._id) === assessmentId
    );

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    return assessment;
  } catch (error) {
    console.error("Error fetching Session by ID:", error);
    throw error;
  }
};

const updateAssessment = async (
  syllabus,
  assessmentId,
  updatedAssessmentData
) => {
  try {
    // console.log("Assessment updated:", updatedAssessmentData);
    const assessmentToUpdate = syllabus.Assessment.find(
      (item) => String(item._id) === assessmentId
    );

    // console.log("Session find", sessionToUpdate);

    if (!assessmentToUpdate) {
      throw new Error("Assessment not found");
    }

    assessmentToUpdate.Assessment_Category =
      updatedAssessmentData.Assessment_Category;
    assessmentToUpdate.Assessment_Type = updatedAssessmentData.Assessment_Type;
    assessmentToUpdate.Assessment_Part = updatedAssessmentData.Assessment_Part;
    assessmentToUpdate.Assessment_Weight =
      updatedAssessmentData.Assessment_Weight;
    assessmentToUpdate.Assessment_CompletionCriteria =
      updatedAssessmentData.Assessment_CompletionCriteria;
    assessmentToUpdate.Assessment_Duration =
      updatedAssessmentData.Assessment_Duration;
    assessmentToUpdate.Assessment_CLO = updatedAssessmentData.Assessment_CLO;
    assessmentToUpdate.Assessment_QuestionType =
      updatedAssessmentData.Assessment_QuestionType;
    assessmentToUpdate.Assessment_NoQuestion =
      updatedAssessmentData.Assessment_NoQuestion;
    assessmentToUpdate.Assessment_KnowledgeAndSkill =
      updatedAssessmentData.Assessment_KnowledgeAndSkill;
    assessmentToUpdate.Assessment_GradingGuide =
      updatedAssessmentData.Assessment_GradingGuide;
    assessmentToUpdate.Assessment_Note = updatedAssessmentData.Assessment_Note;
    // console.log("Session update before save", sessionToUpdate);
    await syllabus.save();
    // console.log("Session update after save", sessionToUpdate);
    return assessmentToUpdate;
  } catch (error) {
    console.error("Error updating assessment:", error);
    throw error;
  }
};

const addAssessment = async (id, assessmentData) => {
  try {
    const syllabus = await Syllabus.findById(id);
    // console.log("Syllabus: ", syllabus);
    if (!syllabus) {
      throw new Error("Syllabus not found");
    }

    const newAssessment = {
      Assessment_Category: assessmentData.Category,
      Assessment_Type: assessmentData.Type,
      Assessment_Part: assessmentData.Part,
      Assessment_Weight: assessmentData.Weight,
      Assessment_CompletionCriteria: assessmentData.CompletionCriteria,
      Assessment_Duration: assessmentData.Duration,
      Assessment_CLO: assessmentData.Clo,
      Assessment_QuestionType: assessmentData.QuestionType,
      Assessment_NoQuestion: assessmentData.NoQuestion,
      Assessment_KnowledgeAndSkill: assessmentData.KnowledgeAndSkill,
      Assessment_GradingGuide: assessmentData.GradingGuide,
      Assessment_Note: assessmentData.Note,
    };

    syllabus.Assessment.push(newAssessment);

    await syllabus.save();
    // console.log("aaaaaaaaaaaaaaa: ", newSession);
    return newAssessment;
  } catch (error) {
    console.error("Error adding Assessment:", error);
    throw error;
  }
};

const deleteAssessment = async (syllabus, id) => {
  const assessmentIndex = syllabus.Assessment.findIndex(
    (item) => String(item._id) === id
  );
  if (assessmentIndex === -1) {
    throw new Error("Assessment not found");
  }
  const deletedlo = syllabus.Assessment.splice(id, 1);
  await syllabus.save();
  return deletedlo;
};

export default {
  getSyllabusByCode,
  countSyllabus,
  create,
  getByNameAndCode,
  getAllTrue,
  getAll,
  getById,
  update,
  remove,
  searchByKey,
  totalSearchByKey,
  countSyllabus,
  getAllSession,
  getSessionById,
  addSession,
  updateSession,
  getAllAssessment,
  getAssessmentById,
  updateAssessment,
  addAssessment,
  deleteAssessment,
};
