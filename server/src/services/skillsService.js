import Skill from "#src/models/Skills";

const exposeServices = {

    findOneSkill: async ({id:_id})=>{
        try {
            const   skill = await Skill.findOne({_id})
            return  skill
        } catch (error) {
            throw new Error(error)
        }
    },
    findAllSkills: async ()=>{
        try {
            const   allskills = await Skill.find()
            return  allskills
        } catch (error) {
            throw new Error(error)
        }
    },
    createSkill: async (rawData)=>{

        try {
            const   skillToSave  = new Skill(rawData)
            const   newSkill    = skillToSave.save()   
            return  newSkill
        } catch (error) {
            throw new Error(error)
        }
    },

    updateSkill: async ({id,body})=>{
        try {
            const   updatedSkill  = await Skill.findOneAndUpdate(
                {_id:id},
                body,
                {new:true}
            ) 
            return  updatedSkill
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteSkill: async ({id})=>{
        try {
            const   result  = await Skill.deleteOne({_id:id}) 
            return  result
        } catch (error) {
            throw new Error(error)
        }
    },
}



export default exposeServices