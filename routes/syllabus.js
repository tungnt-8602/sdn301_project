import express from "express";
import { body, validationResult } from "express-validator";
import { syllabusController } from "../controllers/index.js";

const syllabusRouter = express.Router();
// syllabusRouter.get("/", async (req, res) => {
//   syllabusController.searchSyllabus(req, res);
// });
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

export default syllabusRouter;
