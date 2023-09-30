import Syllabus from "../models/Syllabus.js"


const create = async () =>{
    
}

const countSyllabus = async () => {
    return await Syllabus.countDocuments()
}

const getAll = async (limit,page) =>{
    const skip = (page - 1) * limit;
    const syllabuses = await Syllabus.find().skip(skip).limit(limit);
    return syllabuses
}

const getById = async (id) =>{  
    return await Syllabus.findOne({_id:id})
}

const update = async (id,updateData) =>{
    const result = await Syllabus.updateOne({_id:id },{name:updateData.name, code:updateData.code})
    if(result.modifiedCount > 0){
        return await Syllabus.findById(id)
    } else {
        return 'lỗi edit'
    }
}

const remove = async () =>{
    
}

export default {
    create, 
    getAll, getById,
    update, remove,
    countSyllabus
}