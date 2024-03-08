import {verifyJwt}    from '#src/utils/jwtoken'


const exposeMiddleware = {

    protect:async (req,res,next)=>{
        const accessToken  = req.headers['authorization'];
        if (!accessToken) {
            return res.status(401).send('Unauthorized');
        }
        if(accessToken.startsWith('Bearer ')) {
            const cleanAccess = accessToken.slice(7, accessToken.length);
            try {
                const verify = verifyJwt(cleanAccess)
                req.userId = verify.id
                return next()
            } catch (error) {
                console.log(error.message)
                return res.status(401).send('Unauthorized')
            }
        }        
    }
}

export default exposeMiddleware