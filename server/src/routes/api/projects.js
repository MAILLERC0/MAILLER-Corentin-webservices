import express from 'express';
import projectsController from '#src/controllers/projectsController'
import authGard from '#src/middleware/authGard'
import RBAC from '#src/middleware/rbac'
const router = express.Router();

router.get('/',projectsController.allProjects);
router.get('/latest-projects',projectsController.LatestProject);
router.get('/:id',projectsController.oneProject);
router.post('/',[authGard.protect,RBAC.roleAdminChecker],projectsController.createProject);
router.put('/:id',[authGard.protect,RBAC.roleAdminChecker],projectsController.updateProject);
router.patch('/:id',[authGard.protect,RBAC.roleAdminChecker],projectsController.patchProject);
router.delete('/:id',[authGard.protect,RBAC.roleAdminChecker],projectsController.deleteProject);

export default router;