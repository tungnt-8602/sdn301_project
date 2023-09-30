import Syllabus from "../models/Syllabus.js"


const create = async () =>{
    
}

const getAll = async () =>{
    const syllabuses = await Syllabus.find();
    return syllabuses
}

const getById = async () =>{
    
}

const update = async () =>{
    
}

const remove = async () =>{
    
}

export default {
    create, 
    getAll, getById,
    update, remove,
}