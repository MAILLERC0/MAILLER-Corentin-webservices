import express from 'express';
import usersController from '#src/controllers/usersController'
import authGard from '#src/middleware/authGard'
import RBAC from '#src/middleware/rbac'
const router = express.Router();


router.get('/',[authGard.protect],usersController.allUsers);
router.get('/:id',[authGard.protect],usersController.oneUser);
router.post('/',usersController.createUser);
router.put('/:id',[authGard.protect,RBAC.roleAdminChecker],usersController.updateUser);
router.patch('/:id',[authGard.protect,RBAC.roleAdminChecker],usersController.patchUser);
router.delete('/:id',[authGard.protect,RBAC.roleAdminChecker],usersController.deleteUser);

export default router;