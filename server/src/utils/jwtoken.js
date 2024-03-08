import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

const secretKey     = process.env.SECRET_KEY;

const signJwt = ({payload,expiresIn})=>{
    return jwt.sign(payload, secretKey, { expiresIn });
}
    
const verifyJwt = (payload)=>{
    return jwt.verify(payload, secretKey);
}

export {
    signJwt,
    verifyJwt
}