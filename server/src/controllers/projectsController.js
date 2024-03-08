import projectsService from '#src/services/projectsService'

const exposeController = {
    allProjects:async (req,res)=>{
        const {query} = req
        const allProjects = await projectsService.findAllProjects(query)
        const xCountCreas  = await projectsService.countProjects(query)
        res.set('X-count',xCountCreas)
        return res.json(allProjects)
    },
    oneProject:async (req,res)=>{
        const {params:{id}} = req
        const oneCrea = await projectsService.findOneProject({id})
        if(!oneCrea) return res.sendStatus(404)
        return res.json(oneCrea)
    },
    createProject:async (req,res)=>{
        const {body}  = req
        try {
                const newCrea = await projectsService.createProjects(body)     
                return res.status(201).json(newCrea)
            } catch (error) {
               return res.sendStatus(400)
        }
    },
    updateProject:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
                const toUpdate = await projectsService.updateProject({id,body})     
                return res.json(toUpdate)
            } catch (error) {
               return res.sendStatus(400)
        }
        
    },
    patchProject:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
               
                const toPatch = await projectsService.patchProject({id,body})     
                return res.json(toPatch)
            } catch (error) {
               return res.sendStatus(400)
        }
        
    },
    deleteProject:async (req,res)=>{
        const {id}    = req.params
        try {
                const result = await projectsService.deleteProject({id})
                if (result.deletedCount < 1){
                    return res.sendStatus(400)
                }
                return res.json({"msg" : "project deleted successfully !"})
            } catch (error) {
               return res.sendStatus(400)
        }
        
    },

}

export default exposeController