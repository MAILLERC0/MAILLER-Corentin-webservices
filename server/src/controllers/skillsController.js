import skillsService from '#src/services/skillsService'

const exposeController = {
    allSkills:async (req,res)=>{
        try {
            const allSkills = await skillsService.findAllSkills()
            return res.json(allSkills)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    createSkill:async (req,res)=>{
        const {body}  = req
        try {
            const newSkill = await skillsService.createSkill(body)     
            return res.json(newSkill)
        } catch (error) {
            return res.sendStatus(400)
        }
        
    },
    updateSkill:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
            const toUpdate = await skillsService.updateSkill({id,body})     
            return res.json(toUpdate)
        } catch (error) {
            return res.sendStatus(400)
        }
        
    },
    deleteSkill:async (req,res)=>{
        const {id}    = req.params
        try {
            const result = await skillsService.deleteSkill({id})
            if (result.deletedCount < 1){
                return res.sendStatus(400)
            }
            return res.json({"msg" : "skill deleted successfully !"})
        } catch (error) {
            return res.sendStatus(400)
        }
        
    },

}

export default exposeController