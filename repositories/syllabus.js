import Syllabus from "../models/Syllabus.js"


const create = async (syllabus) =>{
    const newSyllabus = new Syllabus(syllabus);
    const result = await newSyllabus.save();
    return result;
}

const getAll = async () =>{
    const syllabuses = await Syllabus.find();
    return syllabuses
}

const getById = async (id) =>{
    const syllabus = await Syllabus.findById(id).exec();
    return syllabus;
}

const getByNameAndCode = async (name, code) =>{
    const syllabus = await Syllabus.findOne({$or: [
        { name: name },
        { code: code },
      ]}).exec();
    return syllabus;
}

const update = async () =>{

}

const remove = async (id) =>{
    const result = await Syllabus.findByIdAndDelete(id).exec();
    return result;
}

export default {
    create, getByNameAndCode,
    getAll, getById,
    update, remove,
}