import { validationResult } from "express-validator";
import { syllbusRepository } from "../repositories/index.js";

const createSyllabus = async (req, res) => {
  try {
    const syllabusExist = await syllbusRepository.getByNameAndCode(
      req.body.name,
      req.body.code
    );
    if (syllabusExist) {
      res.status(400).json({
        message: "Syllabus already exist.",
      });
    } else {
      const newSyllabus = await syllbusRepository.create(req.body);
      res.status(201).json({
        message: "Create new yllabus successfully.",
        data: newSyllabus,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

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

const updateSyllabus = async (req, res) => {
  try {
    const updateData = req.body;
    const id = req.params.id;
    const checkSyllabus = await syllbusRepository.getById(id)
    if (!checkSyllabus) {
      res.status(401).json('Syllabus Not Found')
    }
    const result = await syllbusRepository.update(id, updateData);
    res.status(200).json(result)
  } catch (error) {
    res.json(error);
  }
};

const getSyllabusById = async (req, res) => {
  try {
    const syllabus = await syllbusRepository.getById(req.params.id);
    res.status(200).json({
      message: "Get detail syllabus successfully.",
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const searchSyllabus = async (req, res) => {
  try {
    const key = req.query.searchString || "";
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;

    const syllabus = await syllbusRepository.searchByKey(key, page, size);
    const total = await syllbusRepository.totalSearchByKey(key, page, size);

    res.status(200).json({
      message: "Search syllabus successfully.",
      searchString: key,
      page: page,
      size: size,
      total: total,
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};


const deleteSyllabus = async (req, res) => {
  try {
    const syllabusExist = await syllbusRepository.getById(req.body.id);
    if (!syllabusExist) {
      res.status(400).json({
        message: "Syllabus unavailable.",
      });
    } else {
      const syllabus = await syllbusRepository.remove(req.params.id);
      res.status(201).json({
        massage: "Delete successfully",
        data: syllabus,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

export default {
  createSyllabus,
  getAllSyllabus,
  getSyllabusById,
  updateSyllabus,
  deleteSyllabus,
  searchSyllabus,
};
