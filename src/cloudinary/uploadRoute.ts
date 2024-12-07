import { Router, Request, Response } from 'express';
import tryCatch from '../middlewares/tryCatch';
import cloudinary from './cloudinaryconfig';
import upload from './upload';

const router = Router();

// Route for file upload
router.post(
  '/upload',
  upload.array('Images',5), // Using multer middleware for file upload;,
  
  tryCatch(async (req: Request, res: Response) => {
    // const file = req.file;
    const files = req.files as Express.Multer.File[];
    if (!files) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // async function uploadImage(imagePath: string): Promise<string> {
      try {
        console.log(files,"Rhis is files");
        let i=[],j=[];
        for(const image of files){
          const result = await cloudinary.uploader.upload(image.path,{folder:"Ecomers_Shoe"});
          console.log(image.path,"this is",result,result.secure_url);
          i.push(image.path);
          j.push(result)
        }
        console.log("This is arra of path",i)
        return res.status(201).json({success:i,j});
      } catch (error) {
        console.log("this is the error",error);
      }
  })
)
router.delete(
"/cldrydel",
    tryCatch(async (req,res): Promise<void> => {
      try {
        const cloudinaryUrl='https://res.cloudinary.com/dded7x0zi/image/upload/v1731525312/Ecomers_Shoe/1731525305275-Getting%20started%20with%20OneDrive.pdf.pdf';
        //Ecomers_Shoe/1731525311160-Screenshot%202023-11-14%20102339.png.png
        const publicId='Ecomers_Shoe/1731918923820-Screenshot 2023-11-14 102339.png';
        if(publicId==null){
          res.status(404).json("NOt Found");
          return; 
        }
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok') {
          console.log('Image deleted successfully:', publicId,result);
        } else {
          console.error('Failed to delete image:', result);
        }
        res.status(201).json({message:'image is deleted successfully',id:publicId,ok:result});
      } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
      }
    })
);

   

export default router;
