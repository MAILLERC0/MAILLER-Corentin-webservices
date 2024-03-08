import User  from "#src/models/Users";
import bcrypt from "bcryptjs"

const exposeServices = {

    findOneUserByEmail:async ({email})=>{
        try {
            const   findUser = await User.findOne({email})
            return  findUser
        } catch (error) {
            throw error
        }

    },
    findOneUserById:async ({id})=>{
        try {
            const   findUser = await User.findOne({_id:id})
            return  findUser
        } catch (error) {
            throw error
        }
    },
    findOneUserByIdWithRoles:async ({id})=>{
        const q     ={_id:id}
        const filter={roles:1}
        const embed ={
            populate:{ path: 'roles', select: 'authorizations' }
        }
        try {
            const   findUser = await User.findOne(q,filter,embed)
             return findUser
        } catch (error) {
            throw error
        }
    },
    findUserByRefreshToken:async ({refreshToken})=>{
        try {
            const   findUser = await User.findOne({refreshToken})
            return  findUser
        } catch (error) {
            throw error
        }
    },
    findAllUsers: async ()=>{
        try {
            const   allUsers = await User.find()
            return  allUsers
        } catch (error) {
            throw error
        }
    },
    createUser: async (rawData)=>{
        const {password} = rawData
        const salt = bcrypt.genSaltSync(4);
        const hash = bcrypt.hashSync(password, salt);
        
        const newUserData = {
            ...rawData,
            password:hash
        }

        try {
            const   toSave  = new User(newUserData)
            const   newUser = toSave.save()   
            return  newUser
        } catch (error) {
            throw error
        }
    },
    updateUser: async ({userId,body})=>{
        const { roles, ...updatedBody } = body;
        const query = {
            _id:userId
        }

        try {
            const   toUpdate = await User.findOneAndUpdate(query,updatedBody,{new:true})
            return  toUpdate
        } catch (error) {
            throw error
        }
    },
    updateUserToken: async ({userId,refreshToken})=>{
               
        const query = {
            _id:userId
        }
        const updateQ = {
            $set:{
                refreshToken
            }
        }
        try {
            const   toUpdate = await User.findOneAndUpdate(query,updateQ,{new:true})
            return  toUpdate
        } catch (error) {
            throw error
        }
    },        
    patchRolesUser: async ({userId,body})=>{ 

        const {roles} = body

        const query = {
            _id:userId
        }
        const updateQ = {
            $set:{
                roles
            },
            ...rest
        }
        try {
            const   topatch = await User.findOneAndUpdate(query,updateQ,{new:true})
            return  topatch
        } catch (error) {
            throw new Error(error)
        }
    },
    patchAddSkillsUser: async ({id,body})=>{
        const {skills} = body

        const updateQ = {
            $addToSet:{
                skills:{
                    $each:skills
                }
            },
        }
        try {
            const   patchCrea  = await Creation.findOneAndUpdate(
                {_id:id},
                updateQ,
                {new:true}
            ) 
            return  patchCrea
        } catch (error) {
            throw new Error(error)
        }
    },
    patchRemoveSkillsUser: async ({id,body})=>{
        const {skills} = body

        const updateQ = {
            $pull:{
                skills:{
                    $each:skills
                }
            },
        }
        try {
            const   patchCrea  = await Creation.findOneAndUpdate(
                {_id:id},
                updateQ,
                {new:true}
            ) 
            return  patchCrea
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteUser: async ({id})=>{
        try {
            const   result  = await User.deleteOne({_id:id}) 
            return  result
        } catch (error) {
            throw new Error(error)
        }
    },
}



export default exposeServices