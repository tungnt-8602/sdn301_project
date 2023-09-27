import { body, validationResult } from "express-validator"
import {studentRepository } from "../repositories/index.js"

const getAllStudents = async (req, res) => {
    try {
        const students = await studentRepository.getAll(req, res);
        res.status(200).json({
            message: 'Get students successfully.',
            data: students
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const getStudentById = async (req, res) => {
    try {
        const student = await studentRepository.getStudentById(req.params.id);
        res.status(200).json({
            message: 'Get detail student successfully.',
            data: student
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const createNewStudent = async (req, res) => {
    try {
        const studentExist = await studentRepository.getStudentByEmail(req.body.email);
        if(studentExist) res.status(400).json({
            message: 'Student already exist.'
        })
        const newStudent = await studentRepository.addNewStudent(req.body);
        res.status(201).json({
            message: 'Create new student successfully.',
            data: newStudent
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const deleteStudentById = async (req, res) => {
    try {
        const student = await studentRepository.deleteStudentById(req.params.id);
        res.status(201).json({
            massage: 'Delete successfully',
            data: student
        })
    } catch(error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

export default {
    getAllStudents, getStudentById, createNewStudent, deleteStudentById
}