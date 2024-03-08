import Project from "#src/models/Projects";
import queryBuilder from "#src/utils/mongoQueryBuilder";

const exposeServices = {

    findOneProject: async ({id:_id})=>{
        try {
            const   project = await Project.findOne({_id})
            return  project
        } catch (error) {
            throw new Error(error)
        }
    },
    findAllProjects: async (query)=>{
        const {
            filter,
            projection,
            options
        } = queryBuilder.getFindOptions({query})
        
        try {
            const   allprojects = await Project.find(filter,projection,options)
            return  allprojects
        } catch (error) {
            throw new Error(error)
        }
    },
    countProjects: async (query)=>{

        const {
            filter
        } = queryBuilder.getFindOptions({query})
        
        try {
            const   howManyProject = await Project.countDocuments(filter)
            return  howManyProject
        } catch (error) {
            throw new Error(error)
        }
    },
    createProjects: async (rawData)=>{

        try {
            const   projectToSave  = new Project(rawData)
            const   newProject    = projectToSave.save()   
            return  newProject
        } catch (error) {
            throw new Error(error)
        }
    },
    updateProject: async ({id,body})=>{

        try {
            const   updatedProject  = await Project.findOneAndUpdate(
                {_id:id},
                body,
                {new:true}
            ) 
            return  updatedProject
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteProject: async ({id})=>{
        try {
            const   result  = await Project.deleteOne({_id:id}) 
            return  result
        } catch (error) {
            throw new Error(error)
        }
    },

}



export default exposeServices