import { Request, Response } from "express"
import bcrypt from "bcrypt";
import users from "../mode/Users";
import { SendMail } from "../utils/onetimeverification";
//Definfe a UserInterfase
interface User{
    Username:string,
    Email:string;
    Password:string; //Add password fieald
    DateofBirth:String;
}

const generateOtp=():string=>{
  return Math.floor(100000+Math.random()*900000).toString()
}

export const createUser=async(req:Request,res:Response) =>{
const {Username,Email,Password,DateofBirth}:User=req.body;

console.log("name,email,password,DateofBirth"); 
// res.status(200).json({a:req.body.name});
// validate the input
if(!Username||!Email|| !Password|| !DateofBirth ){
    res.status(400).json({message:"Name email and password are required"});
    return;
}
try{
    const salt=bcrypt.genSalt(10);
    console.log(salt)
    const hashedPassword=await bcrypt.hash(Password,10);//10 is salt rounds
    //Create new User with hashed password
    const  newUser= new users({
        Username,
        Email,
        DateofBirth,
        Password:hashedPassword,//Store the hashed password
    });
    //Store the user
    await newUser.save();
    res.status(201).json(newUser);
}catch(err){
    res.status(500).json({message:"Error createing User",err});
}

}


//POST methode to login a user (for exmple purpose)

// 
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {

if(email){
  
  const otp=generateOtp();
  const otpExpiry=Date.now()+10*60*1000;

  await SendMail(email,otp);
  return;
}

      // Find the user by email
      const userinfo = await users.findOne({ email }); // Await the result of findOne
  
      if (!userinfo) {
        res.status(400).json({ message: 'Invalid Email or password' });
        return;
      }
  
      // Compare the password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, userinfo.password);
  
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid email or Password' });
        return;
      }
  
      // Send success response
      res.status(200).json({ message: "Login successful" });
  
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: 'Error occurred during login', error});
    }
  };