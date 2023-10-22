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
syllabusRouter.post("/session/:id", syllabusController.addSession);

syllabusRouter.get("/session/:id", syllabusController.getAllSession);

syllabusRouter.get(
  "/session/:id/:sessionId",
  syllabusController.getSessionById
);

syllabusRouter.put("/session/:id/:sessionId", syllabusController.updateSession);

//Assessment
syllabusRouter.post("/assessment/:id", syllabusController.addAssessment);
syllabusRouter.get("/assessment/:id", syllabusController.getAllAssessment);

syllabusRouter.get(
  "/assessment/:id/:assessmentId",
  syllabusController.getAssessmentById
);

syllabusRouter.put(
  "/assessment/:id/:assessmentId",
  syllabusController.updateAssessment
);

syllabusRouter.delete("/assessment/:id/:assessmentId", async (req, res) => {
  syllabusController.deleteAssessment(req, res);
});

export default syllabusRouter;
