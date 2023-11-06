import express from "express";
import { body, validationResult } from "express-validator";
import { syllabusController } from "../controllers/index.js";
import Authorization from "../middleware/authorization.js";
import { isAuthenticated } from "../middleware/authentication.js";

const syllabusRouter = express.Router();

//Syllabus
syllabusRouter.get("/view", async (req, res) => {
  syllabusController.getSyllabusTrue(req, res);
}),
  syllabusRouter.get("/", isAuthenticated, async (req, res) => {
    syllabusController.getAllSyllabus(req, res);
  }),
  syllabusRouter.put(
    "/:id",
    isAuthenticated,
    Authorization.isMaterialDesigner,
    async (req, res) => {
      syllabusController.updateSyllabus(req, res);
    }
  );
syllabusRouter.get(
  "/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  async (req, res) => {
    syllabusController.getSyllabusById(req, res);
  }
);

// syllabusRouter.get('/', async (req, res) => {
//     syllabusController.getAllSyllabus(req, res)
// })

syllabusRouter.delete(
  "/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  async (req, res) => {
    syllabusController.deleteSyllabus(req, res);
  }
);

syllabusRouter.post(
  "/",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  async (req, res) => {
    syllabusController.createSyllabus(req, res);
  }
);

syllabusRouter.put(
  "/changeStatus/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  async (req, res) => {
    syllabusController.setStatusSyllabusById(req, res);
  }
);

//LO
syllabusRouter.post(
  "/lo/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.addLO
);

syllabusRouter.get(
  "/lo/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.getAllLO
);

syllabusRouter.get(
  "/lo/:id/:loId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.getLOById
);

syllabusRouter.put(
  "/lo/:id/:loId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.updateLO
);

syllabusRouter.delete(
  "/lo/:id/:loId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.deleteLOById
);

//Material
syllabusRouter.post(
  "/material/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.addMaterial
);

syllabusRouter.get(
  "/material/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.getAllMaterial
);

syllabusRouter.get(
  "/material/:id/:materialId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.getMaterialById
);

syllabusRouter.put(
  "/material/:id/:materialId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.updateMaterial
);

syllabusRouter.delete(
  "/material/:id/:materialId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.deleteMaterialById
);

//Session
syllabusRouter.post(
  "/session/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.addSession
);

syllabusRouter.get(
  "/session/:id",
  isAuthenticated,
  syllabusController.getAllSession
);

syllabusRouter.get(
  "/session/:id/:sessionId",
  isAuthenticated,
  syllabusController.getSessionById
);

syllabusRouter.put(
  "/session/:id/:sessionId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.updateSession
);

//Assessment
syllabusRouter.post(
  "/assessment/:id",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.addAssessment
);
syllabusRouter.get(
  "/assessment/:id",
  isAuthenticated,
  syllabusController.getAllAssessment
);

syllabusRouter.get(
  "/assessment/:id/:assessmentId",
  isAuthenticated,
  syllabusController.getAssessmentById
);

syllabusRouter.put(
  "/assessment/:id/:assessmentId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  syllabusController.updateAssessment
);

syllabusRouter.delete(
  "/assessment/:id/:assessmentId",
  isAuthenticated,
  Authorization.isMaterialDesigner,
  async (req, res) => {
    syllabusController.deleteAssessment(req, res);
  }
);

export default syllabusRouter;
