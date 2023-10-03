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
        if (curriculumExisted) res.status(400).json({
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
    } catch (error) {
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

const addPo = async (req, res) => {
    try {
        const { po_name, po_description, po_status } = req.body;
        const curriculum = await curriculumRepository.getById(req.params.id);

        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        const createdPo = await curriculumRepository.addPo(curriculum, {
            name: po_name,
            description: po_description,
            status: po_status,
        });

        res.status(201).json({
            message: 'Add po successfully.',
            data: createdPo
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

const getAllPo = async (req, res) => {
    try {
        const curriculum = await curriculumRepository.getById(req.params.id);

        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        const list = await curriculumRepository.getAllPo(curriculum);
        res.status(200).json({
            message: 'Get all po successfully.',
            data: list
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

const getPoById = async (req, res) => {
    try {
        const curriculum = await curriculumRepository.getById(req.params.id);

        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        const poId = req.params.poId;

        const Po = await curriculumRepository.getPoById(curriculum, poId);


        res.status(200).json({
            message: 'Get po by ID successfully.',
            data: Po
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

const updatePo = async (req, res) => {
    try {
        const curriculum = await curriculumRepository.getById(req.params.id);

        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        const poId = req.params.poId;
        const updatedPoData = {
            po_name: req.body.po_name,
            po_description: req.body.po_description,
            po_status: req.body.po_status
        };

        const updatedPo = await curriculumRepository.updatePo(curriculum, poId, updatedPoData);

        res.status(200).json({
            message: 'Update po by ID successfully.',
            data: updatedPo
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};


export default {
    getCurriculums,
    getCurriculumById,
    addCurriculum,
    deleteCurriculumById,
    searchCurriculums,
    addPo,
    getAllPo,
    getPoById,
    updatePo,
}