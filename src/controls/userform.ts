// userController.ts
import { Request, Response, NextFunction } from "express";
import UserSchema from "../models/Users";  // Assuming you're using Mongoose or similar
import tryCatch from "../middlewares/tryCatch";
import bcrypt from 'bcrypt';

export const CreateUser = tryCatch(async (req, res) => {
  const { username, email, password ,dateofbirth} = req.body;

  const checkEmail=await UserSchema.findOne({account:email});
  const hashedPassword=await bcrypt.hash(password,10);
  // console.log("datas",username,email,password,hashedPassword)
 if(checkEmail){
  res.status(300).json({message:"Email already existed"}); return}

  if(!username||!email||!password
    ||!dateofbirth
  ){
    res.status(300).json({message:"emai or password or name is required"})
    return
  }
  const newuser=new UserSchema({
    username,account:email,
    dateofbirth,
    password:hashedPassword
  })
  await newuser.save();
  res.status(200).json({message:"Registration complited"});
});

export const GetallProduct=tryCatch(async(req,res,next)=>{
console.log("Hellow this is all product get api");

res.send({message:"Allproduct page"});
});

export const GetMenProduct=tryCatch(async(req,res,next)=>{
  console.log("This is Men product api");
  res.send({Message:"Men product page"})
});
export const GetWomenProduct=tryCatch(async(req,res,next)=>{
  console.log("this is women prodct page");
  res.send({message:"women Product page"});
});