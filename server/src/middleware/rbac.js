import UsersService from '#src/services/usersService' 


const exposeMiddleware = {

    authorizationChecker:async (req,res,next)=>{
        const {userId,method,baseUrl} = req
        try {
          const thisUser = await UsersService.findOneUserByIdWithRoles({id:userId})
          if (!thisUser || (thisUser && thisUser.roles.length < 1)){
            console.log("here");
            return res.sendStatus(403)
          }
          const {authorizations} = thisUser.roles[0]
          
          const ressourcePath = baseUrl.split('/')[3]
         
          const findRessource = authorizations.find(({ressource})=>ressource==ressourcePath)
          const isAllowed = findRessource.permissions.includes(method)
          
          console.log(`controle de ${ressourcePath} en ${method}`,findRessource)
          if(isAllowed){
            return next()
          }
          return res.sendStatus(403)

        } catch (error){
          return res.sendStatus(403)
        }
    }
}

export default exposeMiddleware