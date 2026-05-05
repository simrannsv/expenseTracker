import jwt from "jsonwebtoken"
const {verify}=jwt;
import { config } from "dotenv";
config();

export const verifytoken=()=>{
    return(req,res,next)=>{
    
    try{
        //token verification logic
    const token=req.cookies?.token
    // if req from unauthorized user
    if(!token){
        return res.status(401).json({message:"plz login"})
    }
    
        // if token is existed
    const decodedtoken=verify(token, process.env.SECRET_KEY);
    console.log(decodedtoken)
    req.user=decodedtoken
    //call next
    next();
    }catch(err){
        res.status(401).json({message:"session expired..plz login again"})
    }
}
}