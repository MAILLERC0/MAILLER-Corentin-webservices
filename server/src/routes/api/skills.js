import express from 'express';
import skillsController from '#src/controllers/skillsController'
import authGard from '#src/middleware/authGard'
import RBAC from '#src/middleware/rbac'
const router = express.Router();


router.get('/',skillsController.allSkills);
router.post('/',[authGard.protect,RBAC.roleAdminChecker],skillsController.createSkill);
router.put('/:id',[authGard.protect,RBAC.roleAdminChecker],skillsController.updateSkill);
router.delete('/:id',[authGard.protect,RBAC.roleAdminChecker],skillsController.deleteSkill);

export default router;