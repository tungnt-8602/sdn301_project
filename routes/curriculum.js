import express from 'express'
import { curriculumController } from '../controllers/index.js';

const curriculumRouter = express.Router();

// curriculumRouter.get('/', studentController.getStudents);

curriculumRouter.get('/:id', curriculumController.getCurriculumById);

curriculumRouter.post('/', curriculumController.addCurriculum);

curriculumRouter.delete('/:id', curriculumController.deleteCurriculumById);

curriculumRouter.get('/', curriculumController.searchCurriculums);

// po 
curriculumRouter.post('/addPo/:id', curriculumController.addPo);

curriculumRouter.get('/getAllPo/:id', curriculumController.getAllPo);

curriculumRouter.get('/getPoById/:id/:poId', curriculumController.getPoById);

curriculumRouter.put('/updatePo/:id/:poId', curriculumController.updatePo);

export default curriculumRouter;