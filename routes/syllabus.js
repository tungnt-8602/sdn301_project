import express from "express";
import { body, validationResult } from "express-validator";
import { syllabusController } from "../controllers/index.js";

const syllabusRouter = express.Router();
// syllabusRouter.get("/", async (req, res) => {
//   syllabusController.searchSyllabus(req, res);
// });

//Syllabus
syllabusRouter.get("/", async (req, res) => {
  syllabusController.getAllSyllabus(req, res);
}),
  syllabusRouter.put("/:id", async (req, res) => {
    syllabusController.updateSyllabus(req, res);
  });
syllabusRouter.get("/:id", async (req, res) => {
  syllabusController.getSyllabusById(req, res);
});

// syllabusRouter.get('/', async (req, res) => {
//     syllabusController.getAllSyllabus(req, res)
// })

syllabusRouter.delete("/:id", async (req, res) => {
  syllabusController.deleteSyllabus(req, res);
});

syllabusRouter.post("/", async (req, res) => {
  syllabusController.createSyllabus(req, res);
});

//Session
syllabusRouter.post("/addSession/:id", syllabusController.addSession);

syllabusRouter.get("/getAllSession/:id", syllabusController.getAllSession);

syllabusRouter.get(
  "/getSessionById/:id/:sessionId",
  syllabusController.getSessionById
);

syllabusRouter.put(
  "/updateSession/:id/:sessionId",
  syllabusController.updateSession
);

//Assessment
syllabusRouter.post("/addAssessment/:id", syllabusController.addAssessment);
syllabusRouter.get(
  "/getAllAssessment/:id",
  syllabusController.getAllAssessment
);

syllabusRouter.get(
  "/getAssessmentById/:id/:assessmentId",
  syllabusController.getAssessmentById
);

syllabusRouter.put(
  "/updateAssessment/:id/:assessmentId",
  syllabusController.updateAssessment
);

export default syllabusRouter;
