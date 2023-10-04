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

export default {
  getCurriculums,
  getById,
  addCurriculum,
  getCurriculumByCode,
  deleteCurriculumById,
  searchCurriculums,
  totalCurriculums,
};
