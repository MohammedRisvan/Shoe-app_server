import { Router, Request, Response } from 'express';
import upload from './upload';
import cloudinary from './cloudinaryconfig';
import tryCatch from '../middlewares/tryCatch';

const router = Router();

// API route to upload image
router.post('/upload',upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), tryCatch(async(req,res) =>{
  const file = req.file;
console.log(file);
  if (!file) {
  console.log(file)
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Upload the image to Cloudinary
   cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
    if (error) {
        // console.log(error)
      return res.status(500).json({ error: error.message });
    }

    // Send the URL of the uploaded image
    return res.status(200).json({ url: result?.secure_url });
  }).end(file.buffer); // The file is stored in memory, so we use the buffer
}));

export default router;
