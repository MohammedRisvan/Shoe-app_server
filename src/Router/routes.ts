

import {NextFunction, Request, Response, Router} from "express";
import {CreateUser, GetallProduct, GetMenProduct, GetWomenProduct, Login} from "../controls/userform";
import {AUth} from "../middlewares/auth";
// import tryCatch from "../middlewares/tryCatch";


const router=Router();
interface Auth extends Request{
    user?:any
}
router.post('/register',CreateUser);
// (req:Auth,res:Response,next:NextFunction)=>{if(req.cookies.accessToken){next()}else{return;}},
router.delete('/123',AUth,(req,res)=>{res.status(200).json("success token setting")})
router.post('/signin',Login);
router.get('/getallp',GetallProduct);
router.get('/getMenp',GetMenProduct);
router.get('/getWomenp',GetWomenProduct)

export default router;
