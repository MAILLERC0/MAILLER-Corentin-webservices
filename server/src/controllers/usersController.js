import usersService from '#src/services/usersService'

const exposeController = {

    allUsers:async (req,res)=>{
        const allUsers = await usersService.findAllUsers()
        return res.json(allUsers)
    },
    oneUser:async (req,res)=>{
        try {
            const user = await usersService.findOneUserById()
            return res.json(user)
        } catch (error){
            return res.sendStatus(400)
        }
    },
    createUser:async (req,res)=>{
        const {body}  = req
        try {
                const registeredUser = await usersService.createUser(body)     
                return res.json(registeredUser)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    },
    updateUser:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
                const toUpdate = await usersService.updateUser({id,body})     
                return res.json(toUpdate)
            } catch (error) {
               return res.sendStatus(400)
        }
        
    },
    patchUser:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
                const toUpdate = await usersService.patchRolesUser({id,body})     
                return res.json(toUpdate)
            } catch (error) {
               return res.sendStatus(400)
        }
        
    },
    // patchUserSkillsAdd:async (req,res)=>{
    //     const {body}  = req
    //     const {id}    = req.params
    //     try {
    //             const toUpdate = await usersService.patchAddSkillsUser({id,body})     
    //             return res.json(toUpdate)
    //         } catch (error) {
    //            return res.sendStatus(400)
    //     }
        
    // },
    // patchUserSkillsRemove:async (req,res)=>{
    //     const {body}  = req
    //     const {id}    = req.params
    //     try {
    //             const toUpdate = await usersService.patchRemoveSkillsUser({id,body})     
    //             return res.json(toUpdate)
    //         } catch (error) {
    //            return res.sendStatus(400)
    //     }
        
    // },
    deleteUser:async (req,res)=>{
        const {id}    = req.params
        try {
                const result = await usersService.deleteUser({id})
                if (result.deletedCount < 1){
                    return res.sendStatus(400)
                }
                return res.json({"msg" : "user deleted successfully !"})
            } catch (error) {
               return res.sendStatus(400)
        }
        
    },

}

export default exposeController