import Student from '../models/students.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getAll = async (req, res) =>{
    const students = await Student.find().exec();
    return students;
}

const getStudentById = async (id) =>{
    const student = await Student.findById(id).exec();
    return student;
}

const addNewStudent = async (student) => {
    const newStudent = new Student(student);
    const result = await newStudent.save();
    return result;
}

const getStudentByEmail = async (email) => {
    const student = await Student.findOne({email}).exec();
    return student;
}

const deleteStudentById = async (id) => {
    const result = await Student.findByIdAndDelete(id).exec();
    return result;
}

export default {
    addNewStudent, getStudentByEmail,deleteStudentById,
    getAll, getStudentById
}