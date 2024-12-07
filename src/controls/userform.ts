// userController.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserSchema from "../models/Users";  // Assuming you're using Mongoose or similar
import tryCatch from "../middlewares/tryCatch";
import bcrypt from 'bcrypt';
import {generateAccessToken, generateRefreshToken, verifyToken} from "../middlewares/auth";


const mockUser={
email:'user@example.com',
sessionId:'abc@123',
}



export const CreateUser = tryCatch(async (req, res) => {
  const { username, email, password ,dateofbirth} = req.body;

  const checkEmail=await UserSchema.findOne({email});
  const hashedPassword=await bcrypt.hash(password,10);
 if(checkEmail){
  res.status(300).json({message:"Email already existed"}); return}

  if(!username||!email||!password
    ||!dateofbirth
  ){
    return res.status(300).json({message:"emai or password or name is required"})
  }
  const newuser=new UserSchema({
    username,email,
    dateofbirth,
    password:hashedPassword
  });



  await newuser.save();
  res.status(200).json({message:"Registration complited"});
});

//REGISTRATION PAGES
export const UserRegister=tryCatch(async(req,res)=>{
  const {username, email, password ,dateofbirth,OTP}=req.body;
});


// Users Login page
export const Login=tryCatch(async(req,res,next)=>{
  
  const accessToken=generateAccessToken(mockUser,req);
  const refreshtoken=generateRefreshToken(mockUser);

  res.cookie("Accesstoken",accessToken,{
    httpOnly:true,
    maxAge:60*60*1000, //Expiring this code after 1 hour 
  });
  res.cookie("Refreshtoken",refreshtoken,{httpOnly:true,maxAge:59*60*1000});
let token=req.cookies.Accesstoken;
  // console.log(accessToken,"Refresh",refreshtoken);
  const vtoken=verifyToken(token,false,res);
  console.log(vtoken);
  if(vtoken){
  console.log("this is true",vtoken);

}
  return res.status(200).json({
    message:'Loginsuccess full',
    token,vtoken
  });
});

//GET Collection of products
export const GetallProduct=tryCatch(async(req,res,next)=>{
console.log("Hellow this is all product get api");

res.send({message:"Allproduct page"});
});


//GET Mens Shoes
export const GetMenProduct=tryCatch(async(req,res,next)=>{
  console.log("This is Men product api");
  res.send({Message:"Men product page"})
});

//GET Women Shoes
export const GetWomenProduct=tryCatch(async(req,res,next)=>{
  console.log("this is women prodct page");
  res.send({message:"women Product page"});
});
