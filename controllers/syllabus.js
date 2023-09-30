import { validationResult } from "express-validator"
import { syllbusRepository } from "../repositories/index.js" 

const createSyllabus = async (req, res) => {
    
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

}

const updateSyllabus = async (req, res) => {

}

const deleteSyllabus = async (req, res) => {

}

export default {
    createSyllabus, getAllSyllabus, getSyllabusById, updateSyllabus, deleteSyllabus
}