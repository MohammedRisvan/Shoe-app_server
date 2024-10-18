import { Router } from "express";
import {AdminLogin, DeleteProduct, InsertProduct, UpdateProduct} from "../controls/Adminform";

const adminRouter=Router();

adminRouter.post('/login',AdminLogin);
adminRouter.post('/addproduct',InsertProduct);
adminRouter.put('/updateproduct',UpdateProduct);
adminRouter.delete('/deleteproduct',DeleteProduct);

export default adminRouter;