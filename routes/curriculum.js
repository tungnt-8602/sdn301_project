import express from 'express'
import { curriculumController } from '../controllers/index.js';

const curriculumRouter = express.Router();

// curriculumRouter.get('/', studentController.getStudents);

curriculumRouter.get('/:id', curriculumController.getCurriculumById);

curriculumRouter.post('/', curriculumController.addCurriculum);

curriculumRouter.delete('/:id', curriculumController.deleteCurriculumById);

curriculumRouter.get('/', curriculumController.searchCurriculums);

export default curriculumRouter;