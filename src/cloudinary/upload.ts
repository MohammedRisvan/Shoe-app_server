import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryconfig';
import path from 'path';

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage(

  {cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'Ecomers_Shoe', // Cloudinary folder to store images
      format: file.mimetype.split('/')[1], // Dynamically determine file format (jpg, png, etc.)
      public_id: `${Date.now()}-${file.originalname}`, // Unique public ID
      resource_type: 'image', // Ensure it is treated as an image
    };
  },
  });



const upload = multer({ storage });

export default upload;
