import Syllabus from "../models/Syllabus.js";

const create = async (syllabus) => {
  const newSyllabus = new Syllabus(syllabus);
  const result = await newSyllabus.save();
  return result;
};

const countSyllabus = async () => {
    return await Syllabus.countDocuments()
}

const getAll = async (limit,page) =>{
    const skip = (page - 1) * limit;
    const syllabuses = await Syllabus.find().skip(skip).limit(limit);
    return syllabuses
}

const update = async (id, updateData) => {
  const result = await Syllabus.updateOne({ _id: id },
    {
      name: updateData.name,
      code: updateData.code,
      time_allocation: updateData.time_allocation,
      prerequisites: updateData.prerequisites,
      student_tasks: updateData.student_tasks,
      tools: updateData.tools,
      scoring_scale: updateData.scoring_scale,
      is_approved: updateData.is_approved,
      decision_id: updateData.decision_id,
      note: updateData.note,
      min_avg_mark_to_pass: updateData.min_avg_mark_to_pass,
    }
  )
  if (result.matchedCount > 0) {
    return await Syllabus.findById(id)
  } else {
    return 'lỗi edit'
  }
}

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
