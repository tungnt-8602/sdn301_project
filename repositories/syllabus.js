import Syllabus from "../models/Syllabus.js";
import { ObjectId } from "mongodb";

//Syllabus
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

const setStatusSyllabusById = async (id) => {
  try {

      const syllabus = await Syllabus.findById(id).exec();
      if (!syllabus) {
          throw new Error('Syllabus not found');
      }

      syllabus.status = !syllabus.status;
      await syllabus.save();

      return syllabus;
  } catch (error) {
      throw error;
  }
}

//LO
const addLO = async (id, LOData) => {
  try {
    const syllabus = await Syllabus.findById(id).exec();
    if (!syllabus) {
      throw new Error("Syllabus not found");
    }

    const newLO = {
      CLO_Name: LOData.CLO_Name,
      CLO_Details: LOData.CLO_Details
    };

    syllabus.LO.push(newLO);

    await syllabus.save();
    return newLO;
  } catch (error) {
    throw error;
  }
};

const getAllLO = async (id) => {
  try {
    const syllabus = await Syllabus.findById(id);
    if (!Syllabus) {
      throw new Error("Syllasbus not found");
    }

    const allLO = syllabus.LO;
    return allLO;
  } catch (error) {
    console.error("Error fetching all LO:", error);
    throw error;
  }
};

const getLOById = async (syllabusId, LOId) => {
  try {
    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      throw new Error("syllabus not found");
    }

    const lo = syllabus.LO.find(
      (item) => String(item._id) === LOId
    );
    console.log(lo);
    if (!lo) {
      throw new Error("LO not found");
    }
    return lo;
  } catch (error) {
    console.error("Error fetching LO by ID:", error);
    throw error;
  }
};

const updateLO = async (syllabus, LOId, updatedLOData) => {
  try {
    const newLO = syllabus.LO.find(
      (item) => String(item._id) === LOId
    );
    if (!newLO) {
      throw new Error("Session not found");
    }
    newLO.CLO_Name = updatedLOData.CLO_Name
    newLO.CLO_Details = updatedLOData.CLO_Details
    // console.log("Session update before save", sessionToUpdate);
    await syllabus.save();
    // console.log("Session update after save", sessionToUpdate);
    return newLO;
  } catch (error) {
    console.error("Error updating LO:", error);
    throw error;
  }
};

const deleteLOById = async (syllabusId, LOId) => {
  try {
    const syllabus = await Syllabus.findById(syllabusId).exec();
    if (!syllabus) {
      throw new Error("Syllabus not found");
    }

    const loIndex = syllabus.LO.findIndex((item) => String(item._id) === LOId);
    if (loIndex === -1) {
      throw new Error("Po not found");
    }
    const deletedlo = syllabus.LO.splice(loIndex, 1);
    
    // Lưu syllabus sau khi xóa lo (tuỳ thuộc vào cách lưu dữ liệu của bạn)
    await syllabus.save();
    return deletedlo;
  } catch (error) {
    console.error("Error deleting lo by ID:", error);
    throw error;
  }
};

//Material
const addMaterial = async (id, MaterialData) => {
  try {
    const syllabus = await Syllabus.findById(id);
    if (!syllabus) {
      throw new Error("Syllabus not found");
    }

    const newMaterial = {
      MaterialDescription: MaterialData.MaterialDescription,
      Author: MaterialData.Author,
      Publisher: MaterialData.Publisher,
      PublishedDate: MaterialData.PublishedDate,
      Edition: MaterialData.Edition,
      ISBN: MaterialData.ISBN,
      IsMainMaterial: MaterialData.IsMainMaterial,
      IsHardCopy: MaterialData.IsHardCopy,
      IsOnline: MaterialData.IsOnline,
      Note: MaterialData.Note,
    };

    syllabus.Material.push(newMaterial);

    await syllabus.save();
    return newMaterial;
  } catch (error) {
    console.error("Error adding Material:", error);
    throw error;
  }
};

const getAllMaterial = async (id) => {
  try {
    const syllabus = await Syllabus.findById(id);
    if (!Syllabus) {
      throw new Error("Syllasbus not found");
    }

    const allMaterial = syllabus.Material;
    return allMaterial;
  } catch (error) {
    console.error("Error fetching all Material:", error);
    throw error;
  }
};

const getMaterialById = async (syllabusId, MaterialId) => {
  try {
    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      throw new Error("syllabus not found");
    }

    const material = syllabus.Material.find(
      (item) => String(item._id) === MaterialId
    );
    console.log(material);
    if (!material) {
      throw new Error("Material not found");
    }
    return material;
  } catch (error) {
    console.error("Error fetching Material by ID:", error);
    throw error;
  }
};

const updateMaterial = async (syllabus, MaterialId, updatedMaterialData) => {
  try {
    const newMaterial = syllabus.Material.find(
      (item) => String(item._id) === MaterialId
    );
    if (!newMaterial) {
      throw new Error("Session not found");
    }
    newMaterial.MaterialDescription = updatedMaterialData.MaterialDescription;
    newMaterial.Author = updatedMaterialData.Author;
    newMaterial.Publisher = updatedMaterialData.Publisher;
    newMaterial.PublishedDate = updatedMaterialData.PublishedDate;
    newMaterial.Edition = updatedMaterialData.Edition;
    newMaterial.ISBN = updatedMaterialData.ISBN;
    newMaterial.IsMainMaterial = updatedMaterialData.IsMainMaterial;
    newMaterial.IsHardCopy = updatedMaterialData.IsHardCopy;
    newMaterial.IsOnline = updatedMaterialData.IsOnline;
    newMaterial.Note = updatedMaterialData.Note;
    await syllabus.save();
    return newMaterial;
  } catch (error) {
    console.error("Error updating newMaterial:", error);
    throw error;
  }
};

const deleteMaterialById = async (syllabusId, materialId) => {
  try {
    const syllabus = await Syllabus.findById(syllabusId).exec();
    if (!syllabus) {
      throw new Error("Syllabus not found");
    }

    const materialIndex = syllabus.Material.findIndex((item) => String(item._id) === materialId);
    if (materialIndex === -1) {
      throw new Error("Material not found");
    }
    const deletedMaterial = syllabus.Material.splice(materialIndex, 1);
    
    // Lưu syllabus sau khi xóa lo (tuỳ thuộc vào cách lưu dữ liệu của bạn)
    await syllabus.save();
    return deletedMaterial;
  } catch (error) {
    console.error("Error deleting Material by ID:", error);
    throw error;
  }
};

//Session
const addSession = async (id, sessionData) => {
  try {
    const syllabus = await Syllabus.findById(id);
    // console.log("Syllabus: ", syllabus);
    if (!syllabus) {
      throw new Error("Syllabus not found");
    }
    // console.log("Sesion data:", sessionData);
    const newSession = {
      Session: sessionData.Session,
      Topic: sessionData.Topic,
      LearningTeachingType: sessionData.LearningType,
      LO: sessionData.Lo,
      ITU: sessionData.Itu,
      StudentMaterials: sessionData.StudentMaterials,
      SDownload: sessionData.SDownload,
      StudentTasks: sessionData.StudentTask,
      URLs: sessionData.URLs,
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

    sessionToUpdate.Session = updatedSessionData.Session_Session;
    sessionToUpdate.Topic = updatedSessionData.Session_topic;
    sessionToUpdate.LearningTeachingType =
      updatedSessionData.Session_LearningType;
    sessionToUpdate.LO = updatedSessionData.Session_LO;
    sessionToUpdate.ITU = updatedSessionData.Session_ITU;
    sessionToUpdate.StudentMaterials =
      updatedSessionData.Session_StudentMaterials;
    sessionToUpdate.SDownload = updatedSessionData.Session_SDownload;
    sessionToUpdate.StudentTasks = updatedSessionData.Session_StudentTask;
    sessionToUpdate.URLs = updatedSessionData.Session_URLs;
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

    assessmentToUpdate.Category = updatedAssessmentData.Assessment_Category;
    assessmentToUpdate.Type = updatedAssessmentData.Assessment_Type;
    assessmentToUpdate.Part = updatedAssessmentData.Assessment_Part;
    assessmentToUpdate.Weight = updatedAssessmentData.Assessment_Weight;
    assessmentToUpdate.CompletionCriteria =
      updatedAssessmentData.Assessment_CompletionCriteria;
    assessmentToUpdate.Duration = updatedAssessmentData.Assessment_Duration;
    assessmentToUpdate.CLO = updatedAssessmentData.Assessment_CLO;
    assessmentToUpdate.QuestionType =
      updatedAssessmentData.Assessment_QuestionType;
    assessmentToUpdate.NoQuestion = updatedAssessmentData.Assessment_NoQuestion;
    assessmentToUpdate.KnowledgeAndSkill =
      updatedAssessmentData.Assessment_KnowledgeAndSkill;
    assessmentToUpdate.GradingGuide =
      updatedAssessmentData.Assessment_GradingGuide;
    assessmentToUpdate.Note = updatedAssessmentData.Assessment_Note;
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
      Category: assessmentData.Category,
      Type: assessmentData.Type,
      Part: assessmentData.Part,
      Weight: assessmentData.Weight,
      CompletionCriteria: assessmentData.CompletionCriteria,
      Duration: assessmentData.Duration,
      CLO: assessmentData.Clo,
      QuestionType: assessmentData.QuestionType,
      NoQuestion: assessmentData.NoQuestion,
      KnowledgeAndSkill: assessmentData.KnowledgeAndSkill,
      GradingGuide: assessmentData.GradingGuide,
      Note: assessmentData.Note,
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
  setStatusSyllabusById,

  getAllSession,
  getSessionById,
  addSession,
  updateSession,

  getAllAssessment,
  getAssessmentById,
  updateAssessment,
  addAssessment,
  deleteAssessment,

  addLO,
  getAllLO,
  getLOById,
  updateLO,
  deleteLOById,

  addMaterial,
  getAllMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterialById
};
