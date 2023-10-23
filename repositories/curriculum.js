import Curriculum from "../models/Curriculums.js";

const getCurriculums = async () => {
  const curriculums = await Curriculum.find().exec();
  return curriculums;
};

const getById = async (id) => {
  const curriculum = await Curriculum.findById(id).exec();
  return curriculum;
};

const addCurriculum = async (curriculum) => {
  const newCurriculum = new Curriculum(curriculum);
  const result = await newCurriculum.save();
  return result;
};

const getCurriculumByCode = async (curriculum_code) => {
  const curriculum = await Curriculum.findOne({ curriculum_code }).exec();
  return curriculum;
};

const getAllCurriculumByStatus = async (size, page, searchString) => {
  const skip = (page - 1) * size;
  const syllabuses = await Curriculum.find({
    status: true,
    $or: [
      { name: { $regex: searchString } },
      { code: { $regex: searchString } },
    ],
  })
    .skip(skip)
    .limit(size);

  const count = await Curriculum.find({
    $or: [
      { name: { $regex: searchString } },
      { code: { $regex: searchString } },
    ],
  }).countDocuments();
  return {
    data: syllabuses,
    count: count,
  };
};

const getCurriculumByStatus = async () => {
  try {
    // Sử dụng Mongoose để tìm các đối tượng có status = true
    const curriculums = await Curriculum.find(String({ status: true })).exec();
    return curriculums;
  } catch (error) {
    throw error; // Xử lý lỗi nếu có
  }
};
const deleteCurriculumById = async (id) => {
  const result = await Curriculum.findByIdAndDelete(id).exec();
  return result;
};

const searchCurriculums = async (searchString, page, size) => {
  const students = await Curriculum.find({
    $or: [
      { curriculum_code: { $regex: new RegExp(searchString, "i") } },
      { name: { $regex: new RegExp(searchString, "i") } },
      { description: { $regex: new RegExp(searchString, "i") } },
      { decision: { $regex: new RegExp(searchString, "i") } },
    ],
  })
    .skip(size * (page - 1))
    .limit(size)
    .exec();
  return students;
};

const totalCurriculums = async (searchString, page, size) => {
  const students = await Curriculum.countDocuments({
    $or: [
      { curriculum_code: { $regex: new RegExp(searchString, "i") } },
      { name: { $regex: new RegExp(searchString, "i") } },
      { description: { $regex: new RegExp(searchString, "i") } },
      { decision: { $regex: new RegExp(searchString, "i") } },
    ],
  });
  return students;
};

const ableAndDisable = async (curriculumId) => {
  try {

      const curriculum = await Curriculum.findById(curriculumId).exec();
      if (!curriculum) {
          throw new Error('Curriculum not found');
      }

      curriculum.status = !curriculum.status;
      await curriculum.save();

      return curriculum;
  } catch (error) {
      throw error;
  }
}

const addPo = async (id, poData) => {
  try {
    const curriculum = await Curriculum.findById(id);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const newPo = {
      po_name: poData.poname,
      po_description: poData.podescription,
      po_status: poData.postatus,
    };

    curriculum.po.push(newPo);
    await curriculum.save();

    return newPo;
  } catch (error) {
    console.error("Error adding Po:", error);
    throw error;
  }
};


const updateCurriculum = async (curriculumId, updatedData) => {
  try {
    // Kiểm tra curriculum có tồn tại không
    const checkCurriculum = await Curriculum.findOne({
      _id: curriculumId
    });

    if (checkCurriculum === null) {
      throw new Error('Không tìm thấy Curriculum');
    }

    // Kiểm tra xem `curriculum_code` không vượt quá 50 ký tự
    if (updatedData.curriculum_code.length > 50) {
      throw new Error('Curriculum code không được dài hơn 50 ký tự');
    }

    const updatedCurriculum = await Curriculum.findByIdAndUpdate(curriculumId, updatedData, { new: true });

        return updatedCurriculum;

   
  } catch (error) {
    console.error("Lỗi cập nhật Curriculum:", error);
    throw error;
  }
};





const getAllPo = async (id) => {
  try {
    const curriculum = await Curriculum.findById(id);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const allPo = curriculum.po;
    return allPo;
  } catch (error) {
    console.error("Error fetching all Po:", error);
    throw error;
  }
};

const getPoById = async (curriculumId, poId) => {
  try {
    const curriculum = await Curriculum.findById(curriculumId);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const po = curriculum.po.find((item) => String(item._id) === poId);
    if (!po) {
      throw new Error("Po not found");
    }

    return po;
  } catch (error) {
    console.error("Error fetching Po by ID:", error);
    throw error;
  }
};

const deletePoById = async (curriculumId, poId) => {
  try {
    const curriculum = await Curriculum.findById(curriculumId);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const poIndex = curriculum.po.findIndex((item) => String(item._id) === poId);
    if (poIndex === -1) {
      throw new Error("Po not found");
    }
    

    const deletedPo = curriculum.po.splice(poIndex, 1);
    
    // Lưu curriculum sau khi xóa po (tuỳ thuộc vào cách lưu dữ liệu của bạn)
    await curriculum.save();

    return deletedPo;
  } catch (error) {
    console.error("Error deleting Po by ID:", error);
    throw error;
  }
};


const setStatusPoById = async (curriculumId, poId, status) => {
  try {
    const curriculum = await Curriculum.findById(curriculumId);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const po = curriculum.po.find((item) => String(item._id) === poId);

    if (!po) {
      throw new Error("Po not found");
    }

    // Đặt trạng thái của "po" dựa trên giá trị được gửi trong tham số status
    po.po_status = status;

    // Lưu curriculum sau khi cập nhật
    await curriculum.save();

    return po;
  } catch (error) {
    console.error("Error setting Po status:", error);
    throw error;
  }
};









// const updatePo = async (curriculumId, poId, updatedPoData) => {
//   try {
//     const curriculum = await Curriculum.findById(curriculumId);

//     if (!curriculum) {
//       throw new Error("Curriculum not found");
//     }

//     const po = curriculum.po.find((item) => String(item._id) === poId);

//     if (!po) {
//       throw new Error("Po not found");
//     }

//     po.po_name = updatedPoData.po_name;
//     po.po_description = updatedPoData.po_description;
//     po.po_status = updatedPoData.po_status;

//     await curriculum.save();

//     return po;
//   } catch (error) {
//     console.error("Error updating Po:", error);
//     throw error;
//   }
// };


const updatePo = async (curriculum, poId, updatedPoData) => {
  try {
    const poToUpdate = curriculum.po.find((item) => String(item._id) === poId);

    if (!poToUpdate) {
      throw new Error("Po not found");
    }

    // Kiểm tra giá trị của po_status (nếu được cập nhật)
    if (updatedPoData.po_status !== undefined) {
      if (typeof updatedPoData.po_status !== 'boolean') {
        throw new Error("Invalid po_status value. It must be a boolean.");
      }
      poToUpdate.po_status = updatedPoData.po_status;
    }

    poToUpdate.po_name = updatedPoData.po_name;
    poToUpdate.po_description = updatedPoData.po_description;

    await curriculum.save();

    return poToUpdate;
  } catch (error) {
    console.error("Error updating Po:", error);
    throw error;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////
const addPlo = async (id, ploData) => {
  try {
    const curriculum = await Curriculum.findById(id);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const newPlo = {
      plo_name: ploData.ploname,
      plo_description: ploData.plodescription,
      plo_status: ploData.plostatus,
    };

    curriculum.plo.push(newPlo);
    await curriculum.save();

    return ploData;
  } catch (error) {
    console.error("Error adding Po:", error);
    throw error;
  }
};

const getAllPlo = async (id) => {
  try {
    const curriculum = await Curriculum.findById(id);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const allPlo = curriculum.plo;
    return allPlo;
  } catch (error) {
    console.error("Error fetching all Po:", error);
    throw error;
  }
};

const getPloById = async (curriculumId, ploId) => {
  try {
    const curriculum = await Curriculum.findById(curriculumId);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const plo = curriculum.plo.find((item) => String(item._id) === ploId);
    if (!plo) {
      throw new Error("Plo not found");
    }

    return plo;
  } catch (error) {
    console.error("Error fetching Plo by ID:", error);
    throw error;
  }
};

const deletePloById = async (curriculumId, ploId) => {
  try {
    const curriculum = await Curriculum.findById(curriculumId);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const ploIndex = curriculum.plo.findIndex((item) => String(item._id) === ploId);
    if (ploIndex === -1) {
      throw new Error("Po not found");
    }
    

    const deletedPlo = curriculum.plo.splice(ploIndex, 1);
    
    // Lưu curriculum sau khi xóa po (tuỳ thuộc vào cách lưu dữ liệu của bạn)
    await curriculum.save();

    return deletedPlo;
  } catch (error) {
    console.error("Error deleting Plo by ID:", error);
    throw error;
  }
};

const setStatusPloById = async (curriculumId, ploId, status) => {
  try {
    const curriculum = await Curriculum.findById(curriculumId);

    if (!curriculum) {
      throw new Error("Curriculum not found");
    }

    const plo = curriculum.plo.find((item) => String(item._id) === ploId);

    if (!plo) {
      throw new Error("Plo not found");
    }

    // Đặt trạng thái của "plo" dựa trên giá trị được gửi trong tham số status
    plo.plo_status = status;

    // Lưu curriculum sau khi cập nhật
    await curriculum.save();

    return plo;
  } catch (error) {
    console.error("Error setting Plo status:", error);
    throw error;
  }
};

//  getPloById ('65180b99637c98dcef23b671', '65180b99637c98dcef23b674')






// const updatePo = async (curriculumId, poId, updatedPoData) => {
//   try {
//     const curriculum = await Curriculum.findById(curriculumId);

//     if (!curriculum) {
//       throw new Error("Curriculum not found");
//     }

//     const po = curriculum.po.find((item) => String(item._id) === poId);

//     if (!po) {
//       throw new Error("Po not found");
//     }

//     po.po_name = updatedPoData.po_name;
//     po.po_description = updatedPoData.po_description;
//     po.po_status = updatedPoData.po_status;

//     await curriculum.save();

//     return po;
//   } catch (error) {
//     console.error("Error updating Po:", error);
//     throw error;
//   }
// };


const updatePlo = async (curriculum, ploId, updatedPloData) => {
  try {
    const ploToUpdate = curriculum.plo.find((item) => String(item._id) === ploId);

    if (!ploToUpdate) {
      throw new Error("Po not found");
    }

    // Kiểm tra giá trị của po_status (nếu được cập nhật)
    if (updatedPloData.plo_status !== undefined) {
      if (typeof updatedPloData.plo_status !== 'boolean') {
        throw new Error("Invalid po_status value. It must be a boolean.");
      }
      ploToUpdate.plo_status = updatedPloData.plo_status;
    }

    ploToUpdate.plo_name = updatedPloData.plo_name;
    ploToUpdate.plo_description = updatedPloData.plo_description;

    await curriculum.save();

    return ploToUpdate;
  } catch (error) {
    console.error("Error updating Po:", error);
    throw error;
  }
};


export default {
  
  getCurriculums,
  getById,
  addCurriculum,
  getCurriculumByCode,
  deleteCurriculumById,
  searchCurriculums,
  totalCurriculums,
  addPo,
  getAllPo,
  getPoById,
  updatePo,
  addPlo,
  getAllPlo,
  getPloById,
  updatePlo,
  updateCurriculum,
  ableAndDisable,
  deletePoById,
  deletePloById,
  setStatusPoById,
  setStatusPloById,
  getCurriculumByStatus,
  getAllCurriculumByStatus,
};
