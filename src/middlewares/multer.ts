import { v2 as cloudinary } from 'cloudinary';
  import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from './cloudinaryconfig';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
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
