import tryCatch from "../middlewares/tryCatch";
import ProductSchema from "../models/Product";
import Users from "../models/Users";
import cloudinary from "../cloudinary/cloudinaryconfig";
import {Request} from "express";



//Admin Login Sesstion
export const AdminLogin=tryCatch(async(req,res,next)=>{
    console.log("this is Admin Login page");
    res.send("ADMIN LOGIN PAGE");
});

//User Controler

//Get Users
export const  UsersController=tryCatch(async(req,res)=>{
  
  const {Userid}=req.params;//userId
  
const controlUser=await Users.findById(Userid);
  if(!controlUser){
    res.status(404).json({message:false,
      data:"User not Found"
    });
    
    return res.status(201).json(controlUser);
  };

  //Toggle the block Status
  
  controlUser.block = !controlUser.block;
  await controlUser.save();


const allUsers=await Users.find();
if(allUsers){
  return res.status(201).json({
    message:"success",
    data:allUsers
  });
}
});
  //Get all Users
  export  const Getalluser=tryCatch(async(req,res)=>{
    const allUsers=await Users.find();
    
    return res.status(201).json({
      message:"success",
      data:allUsers
    })
      })
    

//This is Product Get Function
export const ViewProduct=tryCatch(async(req,res)=>{
 const {id}=req.params;
 if(id){
  const oneProduct=await ProductSchema.findById(id);
  if(oneProduct){
    return res.status(201).json({
      message:"Success",
      data:oneProduct
    })
  }
 }
 const Aproduct=await ProductSchema.find();
if(Aproduct)
 return res.status(201).json({
  message:"success",
  data:Aproduct
});

});

//this is Product Adding sesstion

interface  ProductRequest {
  ProductName:string,
  BrandName:string,
  Description:string,
  Price:number,
  Size:number[],
  Colour:string[],
  Stock:number,
  Category:string,
  Gender:string,
}


export const InsertProduct=tryCatch(async(req:Request<{},{},ProductRequest>,res,next)=>{
  console.log(req.body) 
  const  {
    ProductName,
    BrandName,
    Description,
    Price,
    Size,
    Colour,
    Stock,
    Category,
    Gender,
}=req.body;
console.log(req.files);
const  files = req.files as Express.Multer.File[];
// let images=[];
// if(!files||files.length==0){
//     return res.status(402).json("Files not Found")
// }

const images: [string,string][] = files.map((file) => [file.path,file.filename]);
console.log("images are",images);
  const newProduct=new ProductSchema({
    name:ProductName,
    brand:BrandName,
    description:Description,
    // images,
    price:Price,
    size:Size,
    colour:Colour,
    stock:Stock,
    category:Category,
    gender:Gender,
  });
console.log(newProduct);
// const PResult = newProduct.save();
  return res.status(200).json(newProduct);
});

//This is Product updating Sesstion
export const UpdateProduct=tryCatch(async(req,res,next)=>{

  const {id}=req.params;  //Product ID
  const updates=req.body //Quantity to adjust Stock

const  files = req.files as Express.Multer.File[];
if(files && files.length !== 0){
const images: string[] = files.map((file) => file.path);

  const updatedProduct = await ProductSchema.findByIdAndUpdate(
    id,
    {...updates,images},
    { new: true, runValidators: true }
  );
  
  return res.status(200).json({success:true,updatedProduct});
}



const updatedProduct = await ProductSchema.findByIdAndUpdate(
  id,
  updates,
  { new: true, runValidators: true }
);
  return res.status(200).json({success:true,updatedProduct});

});


// This is Product Deleting Sesstion
export const DeleteProduct=tryCatch(async(req,res,next)=>{
    const {ProductId}=req.params;//Extra Product ID fromURL parameters
    
    
    //Find and Delete
    const deleteProduct=await ProductSchema.findByIdAndDelete(ProductId);

    if(!deleteProduct){
      return res.status(404).json({message:"Product Not Found"});
    }
    const public_ids=deleteProduct.images.map((data)=>data[1])
const checkdel=await cloudinary.api.delete_resources(public_ids);
    //Return success
    return res.status(201).json({
      message:"Deleted successfully",
      data:deleteProduct//optionally return the delete product detailes
    });
});
