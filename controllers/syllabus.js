import { validationResult } from "express-validator"
import { syllbusRepository } from "../repositories/index.js" 

const createSyllabus = async (req, res) => {
    
}

const getAllSyllabus = async (req, res) => {
    try {
        const limit = req.params.limit || 2;
        const page = req.params.page || 1;
        const syllabuses = await syllbusRepository.getAll(limit,page);
        const totalSyllabus = await syllbusRepository.countSyllabus()
        const totalPages = Math.ceil(totalSyllabus / limit);
        res.status(200).json({
            message: 'Get syllabuses successfully.',
            totalPages,
            data: syllabuses
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const getSyllabusById = async (req, res) => {
    const id = req.params.id
    const syllabus = await syllbusRepository.getById(id);
    if(syllabus) {
        res.status(200).json(syllabus)
    } else {
        res.status(401).json('Syllabus Not Found')
    }
}

const updateSyllabus = async (req, res) => {
    const updateData = req.body;
    const id = req.params.id;
    const checkSyllabus = await syllbusRepository.getById(id)
    if(!checkSyllabus){
        res.status(401).json('Syllabus Not Found')
    }
    const result = await syllbusRepository.update(id,updateData);
    res.status(200).json(result)
}

const deleteSyllabus = async (req, res) => {

}

export default {
    createSyllabus, getAllSyllabus, getSyllabusById, updateSyllabus, deleteSyllabus
}