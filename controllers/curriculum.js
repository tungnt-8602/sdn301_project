import { curriculumRepository } from "../repositories/index.js";
import validator from 'validator'
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


const updateCurriculum = async (req, res) => {
    try {
      const curriculumExisted = await curriculumRepository.getById(req.params.id);
  
      const data = req.body
      if (!curriculumExisted) {
        return res.status(404).json({
          message: "Curriculum not found."
        });
      }
  
      const curriculum = await curriculumRepository.updateCurriculum(curriculumExisted, data);
      res.status(201).json({
        message: 'Updated curriculum successfully.',
        data: curriculum
      });
    } catch (error) {
      res.status(500).json({
        message: error.toString()
      });
    }
  }

//////////////////////////////////////////////////////[---PO---]///////////////////////////////////////////////////////////////////

const addPo = async (req, res) => {
    try {
        // lấy res
        const { po_name, po_description, po_status } = req.body;
        const curriculum = await curriculumRepository.getById(req.params.id);
        // Kiểm tra có đúng curriculum
        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        // check mặc định po_status là false
        const defaultPoStatus = po_status || false;

        // Kiểm tra chiều dài của po_name
        if (!validator.isLength(po_name, { min: 3, max: 100 })) {
            return res.status(400).json({ message: "Po name must be between 3 and 10 characters." });
        }

        // Kiểm tra xem po_name có bắt đầu bằng "PO" không
        if (!po_name.startsWith("PO")) {
            return res.status(400).json({ message: `${po_name} name must start with 'PO'.`} );
        }

        // Kiểm tra xem Po_name tồn tại ko nè
        const checkPoName = curriculum.po.find((item) => String(item.po_name) === po_name)
        if (checkPoName) {
            return res.status(400).json({ message: "Po name exsit." });
        }
        console.log(checkPoName);

        // ok chốt deal
        const createdPo = await curriculumRepository.addPo(curriculum, {
            poname: po_name,
            podescription: po_description,
            postatus: defaultPoStatus,
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

// const addPo = async (req, res) => {
//     try {
//         const { po_name, po_description, po_status } = req.body;
//         const curriculum = await curriculumRepository.getById(req.params.id);

//         if (!curriculum) {
//             return res.status(404).json({ message: "Curriculum not found." });
//         }

//         const defaultPoStatus = po_status || false;

//         const createdPo = await curriculumRepository.addPo(curriculum, {
//             name: po_name,
//             description: po_description,
//             status: defaultPoStatus,
//         });

//         res.status(201).json({
//             message: 'Add po successfully.',
//             data: createdPo
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.toString()
//         });
//     }
// };

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
        // Kiểm tra có đúng curriculum
        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        const poId = req.params.poId;
        if (!poId) {
            return res.status(404).json({ message: "Po Id not found." });
        }
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
        const poId = req.params.poId;

        const updatedPoData = {
            po_name: req.body.po_name,
            po_description: req.body.po_description,
            po_status: req.body.po_status
        };

        // Kiểm tra tồn tại của curriculum
        if (!curriculum) {
            return res.status(404).json({
                status: 'ERR',
                message: "Curriculum not found."
            });
        }

        // Kiểm tra tồn tại của poId
        if (!poId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The poId is required'
            });
        }

        // Kiểm tra chiều dài của po_name 
        if (!validator.isLength(updatedPoData.po_name, { min: 3, max: 100 })) {
            return res.status(400).json({
                status: 'ERR',
                message: "Po name must be between 3 and 100 characters."
            });
        }
      
        // Kiểm tra xem Po_name đã tồn tại và có cùng ID không
        const existingPo = curriculum.po.find((item) => item.po_name === updatedPoData.po_name && String(item._id) !== poId);
        if (existingPo) {
            return res.status(400).json({ message: `${updatedPoData.po_name} already exists with a different ID` });
        }

        // Kiểm tra giá trị của po_status (nếu được gửi trong yêu cầu)
        if (updatedPoData.po_status !== undefined) {
            if (typeof updatedPoData.po_status !== 'boolean') {
                return res.status(400).json({
                    status: 'ERR',
                    message: "Invalid po_status value. It must be a boolean."
                });
            }
        }

        // ok chốt đơn
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

//////////////////////////////////////////////////////[---PLO---]///////////////////////////////////////////////////////////////////
const addPlo = async (req, res) => {
    try {
        // lấy res
        const { plo_name, plo_description, plo_status } = req.body;
        const curriculum = await curriculumRepository.getById(req.params.id);
        // Kiểm tra có đúng curriculum
        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        // check mặc định po_status là false
        const defaultPoStatus = plo_status || false;

        // Kiểm tra chiều dài của po_name
        if (!validator.isLength(plo_name, { min: 3, max: 100 })) {
            return res.status(400).json({ message: "Plo name must be between 3 and 10 characters." });
        }

        // Kiểm tra xem po_name có bắt đầu bằng "PO" không
        if (!plo_name.startsWith("PLO")) {
            return res.status(400).json({ message: `${plo_name} name must start with 'PLO'.` });
        }

        // Kiểm tra xem Po_name tồn tại ko nè
        const checkPloName = curriculum.plo.find((item) => String(item.plo_name) === plo_name)
        if (checkPloName) {
            return res.status(400).json({ message: "Plo name exsit." });
        }
        console.log(checkPloName);

        // ok chốt deal
        const createdPlo = await curriculumRepository.addPlo(curriculum, {
            ploname: plo_name,
            plodescription: plo_description,
            plostatus: defaultPoStatus,
        });

        res.status(201).json({
            message: 'Add plo successfully.',
            data: createdPlo
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

// const addPo = async (req, res) => {
//     try {
//         const { po_name, po_description, po_status } = req.body;
//         const curriculum = await curriculumRepository.getById(req.params.id);

//         if (!curriculum) {
//             return res.status(404).json({ message: "Curriculum not found." });
//         }

//         const defaultPoStatus = po_status || false;

//         const createdPo = await curriculumRepository.addPo(curriculum, {
//             name: po_name,
//             description: po_description,
//             status: defaultPoStatus,
//         });

//         res.status(201).json({
//             message: 'Add po successfully.',
//             data: createdPo
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.toString()
//         });
//     }
// };

const getAllPlo = async (req, res) => {
    try {
        const curriculum = await curriculumRepository.getById(req.params.id);

        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        const list = await curriculumRepository.getAllPlo(curriculum);
        res.status(200).json({
            message: 'Get all plo successfully.',
            data: list
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

const getPloById = async (req, res) => {
    try {
        const curriculum = await curriculumRepository.getById(req.params.id);
        // Kiểm tra có đúng curriculum
        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found." });
        }

        const ploId = req.params.ploId;
        if (!ploId) {
            return res.status(404).json({ message: "Plo Id not found." });
        }
        const Plo = await curriculumRepository.getPloById(curriculum, ploId);


        res.status(200).json({
            message: 'Get plo by ID successfully.',
            data: Plo
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};

const updatePlo = async (req, res) => {
    try {
        const curriculum = await curriculumRepository.getById(req.params.id);
        const ploId = req.params.ploId;

        const updatedPloData = {
            plo_name: req.body.plo_name,
            plo_description: req.body.plo_description,
            plo_status: req.body.plo_status
        };

        // Kiểm tra tồn tại của curriculum
        if (!curriculum) {
            return res.status(404).json({
                status: 'ERR',
                message: "Curriculum not found."
            });
        }

        // Kiểm tra tồn tại của poId
        if (!ploId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The ploId is required'
            });
        }

        // Kiểm tra chiều dài của po_name 
        if (!validator.isLength(updatedPloData.plo_name, { min: 3, max: 100 })) {
            return res.status(400).json({
                status: 'ERR',
                message: "Plo name must be between 3 and 100 characters."
            });
        }
      
        // Kiểm tra xem Plo_name đã tồn tại và có cùng ID không
        const existingPlo = curriculum.plo.find((item) => item.plo_name === updatedPloData.plo_name && String(item._id) !== ploId);
        if (existingPlo) {
            return res.status(400).json({ message: `${updatedPloData.plo_name} already exists with a different ID` });
        }

        // Kiểm tra giá trị của plo_status (nếu được gửi trong yêu cầu)
        if (updatedPloData.plo_status !== undefined) {
            if (typeof updatedPloData.plo_status !== 'boolean') {
                return res.status(400).json({
                    status: 'ERR',
                    message: "Invalid plo_status value. It must be a boolean."
                });
            }
        }

        // ok chốt đơn
        const updatedPlo = await curriculumRepository.updatePlo(curriculum, ploId, updatedPloData);

        res.status(200).json({
            message: 'Update plo by ID successfully.',
            data: updatedPlo
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
    addPlo,
    getAllPlo,
    getPloById,
    updatePlo,
    updateCurriculum,
}