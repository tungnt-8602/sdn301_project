import Curriculum from "../models/Curriculums.js";

const getCurriculums = async () => {
  const curriculums = await Curriculum.find().exec();
  return curriculums;
};

const getById = async (id) => {
  const curriculum = await Curriculum.findById(id).exec();
  return curriculum;
};

const addCurriculum = async (curriculum) => {
  const newCurriculum = new Curriculum(curriculum);
  const result = await newCurriculum.save();
  return result;
};

const getCurriculumByCode = async (curriculum_code) => {
  const curriculum = await Curriculum.findOne({ curriculum_code }).exec();
  return curriculum;
};

const deleteCurriculumById = async (id) => {
  const result = await Curriculum.findByIdAndDelete(id).exec();
  return result;
};

const searchCurriculums = async (searchString, page, size) => {
  const students = await Curriculum.find({
    $or: [
      { curriculum_code: { $regex: new RegExp(searchString, "i") } },
      { name: { $regex: new RegExp(searchString, "i") } },
      { description: { $regex: new RegExp(searchString, "i") } },
      { decision: { $regex: new RegExp(searchString, "i") } },
    ],
  })
    .skip(size * (page - 1))
    .limit(size)
    .exec();
  return students;
};

const totalCurriculums = async (searchString, page, size) => {
  const students = await Curriculum.countDocuments({
    $or: [
      { curriculum_code: { $regex: new RegExp(searchString, "i") } },
      { name: { $regex: new RegExp(searchString, "i") } },
      { description: { $regex: new RegExp(searchString, "i") } },
      { decision: { $regex: new RegExp(searchString, "i") } },
    ],
  });
  return students;
};

const addPo = async (id, poData) => {
  try {
    const curriculum = await Curriculum.findById(id);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const newPo = {
      po_name: poData.name,
      po_description: poData.description,
      po_status: poData.status,
    };

    curriculum.po.push(newPo);
    await curriculum.save();

    return newPo;
  } catch (error) {
    console.error("Error adding Po:", error);
    throw error;
  }
};

const getAllPo = async (id) => {
  try {
    const curriculum = await Curriculum.findById(id);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const allPo = curriculum.po;
    return allPo;
  } catch (error) {
    console.error("Error fetching all Po:", error);
    throw error;
  }
};

const getPoById = async (curriculumId, poId) => {
  try {
    const curriculum = await Curriculum.findById(curriculumId);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const po = curriculum.po.find((item) => (String)(item._id) === poId);
    console.log( poId);
    if (!po) {
      throw new Error("Po not found");
    }

    return po;
  } catch (error) {
    console.error("Error fetching Po by ID:", error);
    throw error;
  }
};

const updatePo = async (curriculumId, poId, updatedPoData) => {
  try {
    const curriculum = await Curriculum.findById(curriculumId);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const po = curriculum.po.find((item) => String(item._id) === poId);

    if (!po) {
      throw new Error("Po not found");
    }

    po.po_name = updatedPoData.po_name;
    po.po_description = updatedPoData.po_description;
    po.po_status = updatedPoData.po_status;

    await curriculum.save();

    return po;
  } catch (error) {
    console.error("Error updating Po:", error);
    throw error;
  }
};


export default {
  getCurriculums,
  getById,
  addCurriculum,
  getCurriculumByCode,
  deleteCurriculumById,
  searchCurriculums,
  totalCurriculums,
  addPo,
  getAllPo,
  getPoById,
  updatePo
};
