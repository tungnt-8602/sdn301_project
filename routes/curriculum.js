import express from 'express'
import { curriculumController } from '../controllers/index.js';
import Authorization from '../middleware/authorization.js'
import { isAuthenticated } from '../middleware/authentication.js'
const curriculumRouter = express.Router();

curriculumRouter.get('/view', curriculumController.getCurriculumsStatus);
// curriculumRouter.get('/', studentController.getStudents);

curriculumRouter.get('/:id', curriculumController.getCurriculumById);

curriculumRouter.get('/', curriculumController.searchCurriculums);

curriculumRouter.post('/', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.addCurriculum);

curriculumRouter.delete('/:id', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.deleteCurriculumById);

curriculumRouter.get('/', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.searchCurriculums);

curriculumRouter.put('/:id', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.updateCurriculum);

curriculumRouter.put('/changeStatus/:id', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.ableAndDisable);

// po 
curriculumRouter.post('/po/:id', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.addPo);

curriculumRouter.get('/po/:id', curriculumController.getAllPo);

curriculumRouter.get('/po/:id/:poId', curriculumController.getPoById);

curriculumRouter.delete('/po/:id/:poId', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.deletePoById);

curriculumRouter.put('/po/:id/:poId', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.updatePo);

curriculumRouter.put('/pos/:id/:poId/', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.setStatusPoById);

// plo 
curriculumRouter.post('/plo/:id', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.addPlo);

curriculumRouter.get('/plo/:id', curriculumController.getAllPlo);

curriculumRouter.get('/plo/:id/:ploId', curriculumController.getPloById);

curriculumRouter.delete('/plo/:id/:ploId', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.deletePloById);

curriculumRouter.put('/plo/:id/:ploId', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.updatePlo);

curriculumRouter.put('/plos/:id/:ploId/', isAuthenticated, Authorization.isMaterialDesigner, curriculumController.setStatusPloById);

export default curriculumRouter;