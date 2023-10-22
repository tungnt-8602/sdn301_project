import express from 'express'
import { curriculumController } from '../controllers/index.js';
import Authorization from '../middleware/authorization.js'
import { isAuthenticated } from '../middleware/authentication.js'
const curriculumRouter = express.Router();

// curriculumRouter.get('/', studentController.getStudents);

curriculumRouter.get('/:id', curriculumController.getCurriculumById);

curriculumRouter.get('/', curriculumController.getCurriculumsStatus);

curriculumRouter.post('/', curriculumController.addCurriculum);

curriculumRouter.delete('/:id', curriculumController.deleteCurriculumById);

curriculumRouter.get('/', curriculumController.searchCurriculums);

curriculumRouter.put('/:id', curriculumController.updateCurriculum);

curriculumRouter.put('/changeStatus/:id', curriculumController.ableAndDisable);

// po 
curriculumRouter.post('/po/:id', curriculumController.addPo);

curriculumRouter.get('/po/:id', curriculumController.getAllPo);

curriculumRouter.get('/po/:id/:poId', curriculumController.getPoById);

curriculumRouter.delete('/po/:id/:poId', curriculumController.deletePoById);

curriculumRouter.put('/po/:id/:poId', curriculumController.updatePo);

curriculumRouter.put('/pos/:id/:poId/', curriculumController.setStatusPoById);

// plo 
curriculumRouter.post('/plo/:id', curriculumController.addPlo);

curriculumRouter.get('/plo/:id', curriculumController.getAllPlo);

curriculumRouter.get('/plo/:id/:ploId', curriculumController.getPloById);

curriculumRouter.delete('/plo/:id/:ploId', curriculumController.deletePloById);

curriculumRouter.put('/plo/:id/:ploId', curriculumController.updatePlo);

curriculumRouter.put('/plos/:id/:ploId/', curriculumController.setStatusPloById);

export default curriculumRouter;