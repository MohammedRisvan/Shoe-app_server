import { Router } from "express";
import {
     AdminLogin,
     DeleteProduct,
     Getalluser,
     InsertProduct,
     UpdateProduct, 
     UsersController, 
     ViewProduct
    } from "../controls/Adminform";
import upload from "../middlewares/multer";
// import upload from "../cloudinary/upload";

const adminRouter=Router();

//User sesstion in admin
adminRouter.get("/users/:Userid",UsersController);
adminRouter.get("/users",Getalluser);
//Product sessstion in admin
adminRouter.get('/product/:id',ViewProduct);
adminRouter.get('/product',ViewProduct)
adminRouter.post('/login',AdminLogin);
adminRouter.post('/addproduct',upload.array("Image",5),InsertProduct);
adminRouter.put('/updateproduct/:id',upload.array("Image",5),UpdateProduct);
adminRouter.delete('/deleteproduct/:ProductId',DeleteProduct);

export default adminRouter;