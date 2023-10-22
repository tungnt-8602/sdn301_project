import { syllabusRepository } from "../repositories/index.js";
import { syllabusController } from "./index.js";

const createSyllabus = async (req, res) => {
  try {
    const syllabusExisted = await syllabusRepository.getSyllabusByCode(
      req.body.code
    );
    if (syllabusExisted)
      res.status(400).json({
        message: "Syllabus's code is already existed.",
      });
    const syllabus = await syllabusRepository.create(req.body);
    res.status(201).json({
      message: "Add syllabus successfully.",
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

// const createSyllabus = async (req, res) => {
//   try {
//     const syllabusExist = await syllabusRepository.getByNameAndCode(
//       req.body.syllabus_name,
//       req.body.code
//     );
//     console.log(req.body.syllabus_name);
//     if (syllabusExist) {
//       res.status(400).json({
//         message: "Syllabus already exist.",
//       });
//     } else {
//       const newSyllabus = await syllabusRepository.create(req.body);
//       res.status(201).json({
//         message: "Create new syllabus successfully.",
//         data: newSyllabus,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.toString(),
//     });
//   }
// };

// const searchSyllabus = async (req, res) => {
//   try {
//     const key = req.query.searchString || "";
//     const page = parseInt(req.query.page) || 1;
//     const size = parseInt(req.query.size) || 5;
//     const syllabus = await syllbusRepository.searchByKey(key, page, size);
//     const totalSearch = await syllbusRepository.totalSearchByKey(key);
//     const total = Mau.ceil(totalSearch/size)

//     res.status(200).json({
//       message: "Search syllabus successfully.",
//       searchString: key,
//       page: page,
//       size: size,
//       total: total,
//       data: syllabus,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.toString(),
//     });
//   }
// };

const getSyllabusTrue = async (req, res) => {
  try {
    const size = req.query.size || 5;
    const page = req.query.page || 1;
    const searchString = req.query.searchString || "";
    console.log("search string: ", searchString);
    const syllabuses = await syllabusRepository.getAllTrue(
      size,
      page,
      searchString
    );
    const totalPages = Math.ceil(syllabuses.count / size);
    res.status(200).json({
      message: "Get syllabuses successfully.",
      searchString,
      size,
      page,
      total: totalPages,
      data: syllabuses.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const getAllSyllabus = async (req, res) => {
  try {
    const size = req.query.size || 5;
    const page = req.query.page || 1;
    const searchString = req.query.searchString || "";
    const syllabuses = await syllabusRepository.getAll(
      size,
      page,
      searchString
    );
    const totalPages = Math.ceil(syllabuses.count / size);
    res.status(200).json({
      message: "Get syllabuses successfully.",
      searchString,
      size,
      page,
      total: totalPages,
      data: syllabuses.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const updateSyllabus = async (req, res) => {
  try {
    const updateData = req.body;
    const id = req.params.id;
    const checkSyllabus = await syllabusRepository.getById(id);
    if (!checkSyllabus) {
      res.status(401).json("Syllabus Not Found");
    }
    const result = await syllabusRepository.update(id, updateData);
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};

const getSyllabusById = async (req, res) => {
  try {
    const syllabus = await syllabusRepository.getById(req.params.id);
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

const deleteSyllabus = async (req, res) => {
  try {
    const syllabusExist = await syllabusRepository.getById(req.body.id);
    if (!syllabusExist) {
      res.status(400).json({
        message: "Syllabus unavailable.",
      });
    } else {
      const syllabus = await syllabusRepository.remove(req.params.id);
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

const addSession = async (req, res) => {
  try {
    // lấy res
    const {
      Session,
      Topic,
      Learning_Teaching_Type,
      Lo,
      ITU,
      Student_Materials,
      S_Download,
      Student_Tasks,
      URLs,
    } = req.body;

    const syllabus = await syllabusRepository.getById(req.params.id);
    const syllabusId = req.params.id;
    // Kiểm tra có đúng syllabus
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found." });
    }
    // // Kiểm tra chiều dài của Session_topic
    // if (!validator.isLength(Session_topic, { min: 3, max: 200 })) {
    //   return res
    //     .status(400)
    //     .json({ message: "Sesion topic must be between 3 and 10 characters." });
    // }

    const createdSession = await syllabusRepository.addSession(syllabusId, {
      Session: Session,
      Topic: Topic,
      LearningType: Learning_Teaching_Type,
      Lo: Lo,
      Itu: ITU,
      StudentMaterials: Student_Materials,
      SDownload: S_Download,
      StudentTask: Student_Tasks,
      URLs: URLs,
    });

    res.status(201).json({
      message: "Add session successfully.",
      data: createdSession,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const getAllSession = async (req, res) => {
  try {
    const syllabus = await syllabusRepository.getById(req.params.id);

    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found." });
    }

    const list = await syllabusRepository.getAllSession(syllabus);
    res.status(200).json({
      message: "Get all session successfully.",
      data: list,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const getSessionById = async (req, res) => {
  try {
    const syllabus = await syllabusRepository.getById(req.params.id);

    // Kiểm tra có đúng syllabus
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found." });
    }

    const SessionId = req.params.sessionId;
    if (!SessionId) {
      return res.status(404).json({ message: "Session Id not found." });
    }
    const Session = await syllabusRepository.getSessionById(
      syllabus,
      SessionId
    );

    res.status(200).json({
      message: "Get session by ID successfully.",
      data: Session,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const updateSession = async (req, res) => {
  try {
    const syllabus = await syllabusRepository.getById(req.params.id);
    const sessionId = req.params.sessionId;
    const updatedSessionData = {
      Session_Session: req.body.Session,
      Session_topic: req.body.Topic,
      Session_LearningType: req.body.Learning_Teaching_Type,
      Session_Lo: req.body.LO,
      Session_ITU: req.body.ITU,
      Session_StudentMaterials: req.body.Student_Materials,
      Session_SDownload: req.body.S_Download,
      Session_StudentTask: req.body.Student_Tasks,
      Session_URLs: req.body.URLs,
    };

    // Kiểm tra tồn tại của curriculum
    if (!syllabus) {
      return res.status(404).json({
        status: "ERR",
        message: "Syllabus not found.",
      });
    }

    // Kiểm tra tồn tại của poId
    if (!sessionId) {
      return res.status(404).json({
        status: "ERR",
        message: "The sessionId is required",
      });
    }

    // Kiểm tra xem Po_name đã tồn tại và có cùng ID không

    const updatedSession = await syllabusRepository.updateSession(
      syllabus,
      sessionId,
      updatedSessionData
    );

    res.status(200).json({
      message: "Update session by ID successfully.",
      data: updatedSession,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
//Assessment
const getAllAssessment = async (req, res) => {
  try {
    const syllabus = await syllabusRepository.getById(req.params.id);
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found." });
    }

    const list = await syllabusRepository.getAllAssessment(syllabus);
    res.status(200).json({
      message: "Get all assessment successfully.",
      data: list,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const getAssessmentById = async (req, res) => {
  try {
    const syllabus = await syllabusRepository.getById(req.params.id);

    // Kiểm tra có đúng syllabus
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found." });
    }

    const AssessmentId = req.params.assessmentId;
    if (!AssessmentId) {
      return res.status(404).json({ message: "Session Id not found." });
    }
    const Assessment = await syllabusRepository.getAssessmentById(
      syllabus,
      AssessmentId
    );

    res.status(200).json({
      message: "Get assessment by ID successfully.",
      data: Assessment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const updateAssessment = async (req, res) => {
  try {
    const syllabus = await syllabusRepository.getById(req.params.id);
    const assessmentId = req.params.assessmentId;
    // console.log("Assessment to update in controller:", req.body);
    const updatedAssessmentData = {
      Assessment_Category: req.body.Assessment_Category,
      Assessment_Type: req.body.Assessment_Type,
      Assessment_Part: req.body.Assessment_Part,
      Assessment_Weight: req.body.Assessment_Weight,
      Assessment_CompletionCriteria: req.body.Assessment_CompletionCriteria,
      Assessment_Duration: req.body.Assessment_Duration,
      Assessment_Clo: req.body.Assessment_CLO,
      Assessment_QuestionType: req.body.Assessment_QuestionType,
      Assessment_NoQuestion: req.body.Assessment_NoQuestion,
      Assessment_KnowledgeAndSkill: req.body.Assessment_KnowledgeAndSkill,
      Assessment_GradingGuide: req.body.Assessment_GradingGuide,
      Assessment_Note: req.body.Assessment_Note,
    };

    if (!syllabus) {
      return res.status(404).json({
        status: "ERR",
        message: "Syllabus not found.",
      });
    }

    if (!assessmentId) {
      return res.status(404).json({
        status: "ERR",
        message: "The assessmentId is required",
      });
    }

    const updatedAssessment = await syllabusRepository.updateAssessment(
      syllabus,
      assessmentId,
      updatedAssessmentData
    );

    res.status(200).json({
      message: "Update assessment by ID successfully.",
      data: updatedAssessment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const addAssessment = async (req, res) => {
  try {
    // lấy res
    const {
      Assessment_Category,
      Assessment_Type,
      Assessment_Part,
      Assessment_Weight,
      Assessment_CompletionCriteria,
      Assessment_Duration,
      Assessment_CLO,
      Assessment_QuestionType,
      Assessment_NoQuestion,
      Assessment_KnowledgeAndSkill,
      Assessment_GradingGuide,
      Assessment_Note,
    } = req.body;
    const syllabus = await syllabusRepository.getById(req.params.id);
    const syllabusId = req.params.id;
    // Kiểm tra có đúng syllabus
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found." });
    }

    const createdAssessment = await syllabusRepository.addAssessment(
      syllabusId,
      {
        Category: Assessment_Category,
        Type: Assessment_Type,
        Part: Assessment_Part,
        Weight: Assessment_Weight,
        CompletionCriteria: Assessment_CompletionCriteria,
        Duration: Assessment_Duration,
        CLO: Assessment_CLO,
        QuestionType: Assessment_QuestionType,
        NoQuestion: Assessment_NoQuestion,
        KnowledgeAndSkill: Assessment_KnowledgeAndSkill,
        GradingGuide: Assessment_GradingGuide,
        Note: Assessment_Note,
      }
    );

    res.status(201).json({
      message: "Add assessment successfully.",
      data: createdAssessment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const deleteAssessment = async (req, res) => {
  try {
    const syllabusExist = await syllabusRepository.getById(req.params.id);
    if (!syllabusExist) {
      res.status(400).json({
        message: "Syllabus unavailable.",
      });
    } else {
      const assessment = await syllabusRepository.deleteAssessment(
        syllabusExist,
        req.params.assessmentId
      );
      res.status(201).json({
        massage: "Delete successfully",
        // data: syllabus,
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
  getSyllabusTrue,
  getSyllabusById,
  updateSyllabus,
  deleteSyllabus,
  getAllSession,
  getSessionById,
  addSession,
  updateSession,
  getAllAssessment,
  getAssessmentById,
  updateAssessment,
  addAssessment,
  deleteAssessment,
};
