

import {Router} from "express";
import {createUser,loginUser}from "../controls/userform";

const router=Router();

router.post('/Signup',createUser);
router.post('/Signin',loginUser);





// //sample data
// let items=[{id:1,name:"sample Item"}];

// //Get methode
// router.get('/items',(req,res)=>{
//     res.json(items);
// });

// //Post Methode
// router.post('/items',(req,res)=>{
//     const newItem={id:items.length+1,...req.body};
//     items.push(newItem);
//     res.status(201).json(newItem);
// });

// //Put methode
// router.put('/items/:id',(req,res)=>{
//     const id=parseInt(req.params.id);
//     const itemIndex=items.findIndex(item=>item.id==id);
//     if(itemIndex !== -1){
//         items[itemIndex]={id,...req.body};
//         res.json(items[itemIndex]);
//     }else{
//         res.status(404).json({message:"item not found"});
//     }
// })

// //Delete methode

// router.delete('/items/:id',(req,res)=>{
//     const id=parseInt(req.params.id);
//     items=items.filter(item=>item.id !==id);
//     res.status(204).send();
// })
export default router;
