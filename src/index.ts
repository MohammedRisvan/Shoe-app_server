import express from "express";
import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
import routes from './Router/routes';
import cookieParser from "cookie-parser"; 
import connectDB from "./utils/database";
import cors from 'cors';


// import tryCatch from "./middlewares/errorHandeler";
import errorHandler from "./middlewares/errorHandeler";
import adminRouter from "./Router/adminRouter";
import uploadRoute from './cloudinary/uploadRoute'
// import {globalErrorHandler} from "./middlewares/globelErrorHandeler";
// import {asyncHandeler} from "./middlewares/errorHandeler";
//load environment variables from .env file
dotenv.config();
const app=express();
// app.use(express.json());
const port =process.env.PORT||3000;

//Databse Function
connectDB();

//Cloudinary upload
// app.use(express.fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
//   }));
  

//Enable Cors
app.use(cors(
    {origin:'http://localhost:5173'}
))


//Middle ware to parse JSON
app.use(express.json());
//  app.use(bodyParser.json());

// cookie-parser Middleware
app.use(cookieParser())

//Admin User from AdminRouter

app.use('/admin',adminRouter)

//User routes from routes.ts

app.use('/api',routes)
//Middle ware 
app.use(errorHandler); 
//Image uploads
app.use('/api', uploadRoute);
//Start the server
console.log(process.env.email,process.env.password)
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
});