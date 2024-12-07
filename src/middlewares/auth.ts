// const jwt =require('jsonwebtoken');
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {NextFunction, Request, Response} from "express";

dotenv.config();

interface User {
    email:string;
    sessionId:string;
}


const SECRET_KEY=process.env.JWT_Secret_Key||"123";
const REFRESH_SECRET_KEY=process.env.JWT_Refresh_Secret_Key||"231";

export function generateAccessToken(user:User,req:Request): string {
const payload = {
    email:user.email,
    sessionId:user.sessionId,
    userAgent:req.headers['user-agent'],
    ipAddress:req.ip,
};

return jwt.sign(payload,SECRET_KEY,{expiresIn:'1h'});//Access token valid for 1 hour
}

//Function to generate a refresh token 
export function generateRefreshToken(user:User): string {
const payload={
    email:user.email,
    sessionId:user.sessionId,
};
 return jwt.sign(payload,REFRESH_SECRET_KEY,{expiresIn:'7d'});//REFRESH token valid for seven days
}

export function verifyToken(token:string,isRefreshToken:boolean=false,res:Response):any{
try{
    const secretKey=isRefreshToken?REFRESH_SECRET_KEY:SECRET_KEY;

   const vtoken=jwt.verify(token,secretKey);
    return vtoken;

}catch(error){
    throw new Error('Invalid or expired token');
}
}

  

interface AuthenticatedRequest extends Request{
user?:any;
}



export function AUth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.accessToken;  // Retrieve token from cookies

    if (!token) {  // If token is absent
        res.status(401).json({ message: 'Access Denied: No Token provided' });
        return
    }

    try {
        // Verify and decode the token
        const decode = jwt.verify(token, process.env.SECRET_KEY || 'your_secret_key');  // Make sure to use the correct key

        if (!decode) {
            res.status(401).json({ message: 'Invalid or Expired token' });
            return ;
        }

        req.user = decode;  // Attach the decoded user to the request object
        next(); // Proceed to the next middleware or route function
    } catch(err:any){
        console.error("Error in auth middleware:",err.message || err);
        res .status(401).json({
        message: "Authentication Failed",
        error: err.message || "Unknown error"
    });
        return ;
    }
}
