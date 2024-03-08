import express from 'express';
import authGard from '#src/middleware/authGard'
import roleServices from '#src/services/rolesService'
const router = express.Router();

router.post('/',authGard.protect,async(req,res)=>{
    const {body} = req
    const addNewRole = await roleServices.addNewRoles(body)
    res.json(addNewRole)
});


export default router;