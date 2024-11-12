import { Router, Request, Response } from 'express';
import tryCatch from '../middlewares/tryCatch';
import cloudinary from './cloudinaryconfig';
import upload from './upload';

const router = Router();

// Route for file upload
router.post(
  '/upload',
  upload.single('Image'), // Using multer middleware for file upload;,
  
  tryCatch(async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // async function uploadImage(imagePath: string): Promise<string> {
      try {
        const result = await cloudinary.uploader.upload(file.path,{folder:"Ecomers_Shoe"});
        return res.status(201).json({success:result.secure_url});
      } catch (error) {
        console.log("this is the error",error);
      }
  })
)
   

export default router;
