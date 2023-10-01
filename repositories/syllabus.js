import Syllabus from "../models/Syllabus.js";

const create = async (syllabus) => {
  const newSyllabus = new Syllabus(syllabus);
  const result = await newSyllabus.save();
  return result;
};

const getAll = async () => {
  const syllabuses = await Syllabus.find();
  return syllabuses;
};

const getById = async (id) => {
  const syllabus = await Syllabus.findById(id).exec();
  return syllabus;
};

const getByNameAndCode = async (name, code) => {
  const syllabus = await Syllabus.findOne({
    $or: [{ name: name }, { code: code }],
  }).exec();
  return syllabus;
};

const searchByKey = async (key, page, size) => {
  const syllabus = await Syllabus.find({
    $or: [
      { code: { $regex: new RegExp(key, "i") } },
      { name: { $regex: new RegExp(key, "i") } },
      { prerequisites: { $regex: new RegExp(key, "i") } },
    ],
  })
    .skip(size * (page - 1))
    .limit(size)
    .exec();
  return syllabus;
};

const totalSearchByKey = async (key, page, size) => {
  const syllabus = await Syllabus.countDocuments({
    $or: [
      { code: { $regex: new RegExp(key, "i") } },
      { name: { $regex: new RegExp(key, "i") } },
      { prerequisites: { $regex: new RegExp(key, "i") } },
    ],
  });
  return syllabus;
};

const update = async () => {};

const remove = async (id) => {
  const result = await Syllabus.findByIdAndDelete(id).exec();
  return result;
};

export default {
  create,
  getByNameAndCode,
  getAll,
  getById,
  update,
  remove,
  searchByKey,
  totalSearchByKey,
};
