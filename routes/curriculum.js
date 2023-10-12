import express from 'express'
import { curriculumController } from '../controllers/index.js';

const curriculumRouter = express.Router();

// curriculumRouter.get('/', studentController.getStudents);

curriculumRouter.get('/:id', curriculumController.getCurriculumById);

curriculumRouter.post('/', curriculumController.addCurriculum);

curriculumRouter.delete('/:id', curriculumController.deleteCurriculumById);

curriculumRouter.get('/', curriculumController.searchCurriculums);

// po 
curriculumRouter.post('/po/:id', curriculumController.addPo);

curriculumRouter.get('/po/:id', curriculumController.getAllPo);

curriculumRouter.get('/po/:id/:poId', curriculumController.getPoById);

curriculumRouter.put('/po/:id/:poId', curriculumController.updatePo);

// plo 
curriculumRouter.post('/plo/:id', curriculumController.addPlo);

curriculumRouter.get('/plo/:id', curriculumController.getAllPlo);

curriculumRouter.get('/plo/:id/:ploId', curriculumController.getPloById);

curriculumRouter.put('/plo/:id/:ploId', curriculumController.updatePlo);

export default curriculumRouter;