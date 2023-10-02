import { curriculumRepository } from "../repositories/index.js";

const getCurriculums = async (req, res) => {
    try {
        const list = await curriculumRepository.getCurriculums();
        res.status(200).json({
            message: 'Get curriculums successfully.',
            data: list
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const getCurriculumById = async (req, res) => {
    try {
        const curriculum = await curriculumRepository.getById(req.params.id);
        res.status(200).json({
            message: 'Get curriculum by id successfully.',
            data: curriculum
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const addCurriculum = async (req, res) => {
    try {
        const curriculumExisted = await curriculumRepository.getCurriculumByCode(req.body.curriculum_code);
        if(curriculumExisted) res.status(400).json({
            message: "Curriculum's email is already existed."
        })
        const curriculum = await curriculumRepository.addCurriculum(req.body);
        res.status(201).json({
            message: 'Add curriculum successfully.',
            data: curriculum
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const deleteCurriculumById = async (req, res) => {
    try {
        const curriculum = await curriculumRepository.deleteCurriculumById(req.params.id);
        res.status(201).json({
            message: 'Delete successfully',
            data: curriculum
        })
    } catch(error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const searchCurriculums = async (req, res) => {
    try {
        const searchString = req.query.searchString || ""; // Lấy chuỗi tìm kiếm từ query params hoặc trả về chuỗi trống nếu không có
        const page = parseInt(req.query.page) || 1; // Lấy trang từ query params hoặc mặc định là trang 1
        const size = parseInt(req.query.size) || 10; // Lấy kích thước trang từ query params hoặc mặc định là 10

        const curriculums = await curriculumRepository.searchCurriculums(searchString, page, size);
        const total = await curriculumRepository.totalCurriculums(searchString, page, size);

        res.status(200).json({
            message: 'Search curriculums successfully.',
            searchString: searchString,
            page: page,
            size: size,
            total: total,
            data: curriculums
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

export default  {
    getCurriculums,
    getCurriculumById,
    addCurriculum,
    deleteCurriculumById,
    searchCurriculums
}