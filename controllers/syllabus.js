import { validationResult } from "express-validator"
import { syllbusRepository } from "../repositories/index.js" 

const createSyllabus = async (req, res) => {
    try {
        const syllabusExist = await syllbusRepository.getByNameAndCode(req.body.name, req.body.code);
        if(syllabusExist){
            res.status(400).json({
                message: 'Syllabus already exist.'
            })
        }else{
            const newSyllabus = await syllbusRepository.create(req.body);
            res.status(201).json({
                message: 'Create new yllabus successfully.',
                data: newSyllabus
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const getAllSyllabus = async (req, res) => {
    try {
        const syllabuses = await syllbusRepository.getAll();
        res.status(200).json({
            message: 'Get syllabuses successfully.',
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
    try {
        const syllabus = await syllbusRepository.getById(req.params.id);
        res.status(200).json({
            message: 'Get detail syllabus successfully.',
            data: syllabus
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}


const updateSyllabus = async (req, res) => {

}

const deleteSyllabus = async (req, res) => {
    try {
        const syllabus = await syllbusRepository.remove(req.params.id);
        res.status(201).json({
            massage: 'Delete successfully',
            data: syllabus
        })
    } catch(error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

export default {
    createSyllabus, getAllSyllabus, getSyllabusById, updateSyllabus, deleteSyllabus
}