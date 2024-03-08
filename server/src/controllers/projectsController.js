import projectsService from '#src/services/projectsService'

const exposeController = {
    allProjects:async (req,res)=>{
        const {query} = req
        try {
            const allProjects = await projectsService.findAllProjects(query)
            const xCountCreas  = await projectsService.countProjects(query)
            res.set('X-count',xCountCreas)
            return res.json(allProjects)
        } catch (error){
            return res.sendStatus(400)
        }
    },
    oneProject:async (req,res)=>{
        const {params:{id}} = req
        try {
            const oneProject = await projectsService.findOneProject({id})
            if(!oneProject) return res.sendStatus(404)
            return res.json(oneProject)
        } catch (error){
            return res.sendStatus(400)
        }
    },
    LatestProject:async (req,res)=>{
        try {
            const latestProjects = await projectsService.findLatestProject()
            return res.json(latestProjects)
        } catch (error){
            return res.sendStatus(400)
        }
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
    }
}

export default exposeController