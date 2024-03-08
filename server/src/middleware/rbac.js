import UsersService from '#src/services/usersService' 


const exposeMiddleware = {

  roleAdminChecker:async (req,res,next)=>{
    const {userId} = req
    try {
      const thisUser = await UsersService.findOneUserByIdWithRoles({id:userId})
      if (!thisUser || (thisUser && thisUser.roles.length < 1)){
        return res.sendStatus(403)
      }
      const isAdmin = thisUser.roles.some(role => role.name === 'admin');
      
      if(isAdmin){
        return next()
      }
      return res.sendStatus(403)

    } catch (error){
      return res.sendStatus(403)
    }
  // },
  // authorizationChecker:async (req,res,next)=>{ //TODO: WIP - manque de temps pour gérer les authorisation correctement
  //     const {userId,method,baseUrl} = req
  //     try {
  //       const thisUser = await UsersService.findOneUserByIdWithAuthorizations({id:userId})
  //       if (!thisUser || (thisUser && thisUser.roles.length < 1)){
  //         return res.sendStatus(403)
  //       }
  //       const {authorizations} = thisUser.roles[0]
        
  //       const ressourcePath = baseUrl.split('/')[3]
        
  //       const findRessource = authorizations.find(({ressource})=>ressource==ressourcePath)
  //       const isAllowed = findRessource.permissions.includes(method)
        
  //       console.log(`controle de ${ressourcePath} en ${method}`,findRessource)
  //       if(isAllowed){
  //         return next()
  //       }
  //       return res.sendStatus(403)

  //     } catch (error){
  //       return res.sendStatus(403)
  //     }
  }
}

export default exposeMiddleware