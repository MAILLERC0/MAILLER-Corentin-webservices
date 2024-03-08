import Roles  from "#src/models/Roles";

const exposeServices = {

    addNewRoles:async (rawData)=>{
        try {
            const newRoles = new Roles(rawData)
            const   addRole = await newRoles.save()
            return  addRole
        } catch (error) {
            throw error
        }
    }
}

export default exposeServices