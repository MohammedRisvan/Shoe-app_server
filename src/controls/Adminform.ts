import tryCatch from "../middlewares/tryCatch";



//Admin Login Sesstion
export const AdminLogin=tryCatch(async(req,res,next)=>{
    console.log("this is Admin Login page");
    res.send("ADMIN LOGIN PAGE");
});

//this is Product Adding sesstion
export const InsertProduct=tryCatch(async(req,res,next)=>{
    console.log("this is AddProduct api");

    res.send("this is AddProduct sessiton");
});

//This is Product updating Sesstion
export const UpdateProduct=tryCatch(async(req,res,next)=>{
    console.log("This is product update product sesstion");
    res.send("thsi is product Update sesstion");
});


// This is Product Deleting Sesstion
export const DeleteProduct=tryCatch(async(req,res,next)=>{
    console.log("This is product delete page");
    res.send("this is product dropping sesstion");
});
