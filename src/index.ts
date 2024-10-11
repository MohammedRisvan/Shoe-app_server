import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './Router/routes';
import cookieParser from "cookie-parser"; 
import connectDB from "./utils/database";


import cors from 'cors';
//load environment variables from .env file
dotenv.config();
const app=express();
// app.use(express.json());
const port =process.env.PORT||3000;

//Databse Function
connectDB();


//Enable Cors
// app.use(cors(
//     // {origin:'http://localhost:3000'}
// ))


//Middle ware to parse JSON
app.use(express.json());
// app.use(bodyParser.json());

// cookie-parser Middleware
app.use(cookieParser())


//Use routes from routes.ts

app.use('/api',routes)
app.get('/hello',(req,res)=>{console.log("hellow");res.send("ok thanks")}) 
 
//Start the server
console.log(process.env.email,process.env.password)
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
});