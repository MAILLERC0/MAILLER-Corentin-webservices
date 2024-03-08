import Project from "#src/models/Projects";
import queryBuilder from "#src/utils/mongoQueryBuilder";
// import deleteCacheIfExist from "#src/utils/redisManage" //TODO: for cache

const exposeServices = {

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
    findOneProject: async ({id:_id})=>{
        try {
            const   project = await Project.findOne({_id})
            return  project
        } catch (error) {
            throw new Error(error)
        }
    },
    findLatestProject: async ()=>{
        try {
            // const cachedValues = await client.get('latest_projects');//TODO: for cache
            // if(!cachedValues) {
            const projects = await Project.find().sort({ createdAt: -1 }).limit(3);
                // await client.set('latest_projects', JSON.stringify(projects)); //TODO: for cache
            return projects;
            // } else { //TODO: for cache
            //     return cachedValues;
            // }
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
            const   projectToSave  = new Project(rawData);
            const   newProject    = projectToSave.save();
            // deleteCacheIfExist('latest_projects');  //TODO: for cache
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
    patchProject: async ({id,body})=>{
        const {team} = body

        const updateQ = {
            $addToSet:{
                team:{
                    $each:team
                }
            },
        }
        try {
            const   updatedProject  = await Project.findOneAndUpdate(
                {_id:id},
                updateQ,
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
            // deleteCacheIfExist('latest_projects'); //TODO: for cache
            return  result
        } catch (error) {
            throw new Error(error)
        }
    },

}



export default exposeServices