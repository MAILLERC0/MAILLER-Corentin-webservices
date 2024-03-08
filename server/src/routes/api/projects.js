import express from 'express';
import projectsController from '#src/controllers/projectsController'
import authGard from '#src/middleware/authGard'
import RBAC from '#src/middleware/rbac'
const router = express.Router();

router.get('/',projectsController.allProjects);
router.get('/:id',projectsController.oneProject);
router.post('/',[authGard.protect,RBAC.authorizationChecker],projectsController.createProject);
router.put('/:id',[authGard.protect,RBAC.authorizationChecker],projectsController.updateProject);
router.patch('/:id',[authGard.protect,RBAC.authorizationChecker],projectsController.patchProject);
router.patch('/:id',[authGard.protect,RBAC.authorizationChecker],projectsController.deleteProject);

export default router;