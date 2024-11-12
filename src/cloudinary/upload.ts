import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryconfig';

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // params: {
  //   folder: 'Ecommerce_Shoe', // Folder name in Cloudinary
  //   allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed formats
  // },
});

const upload = multer({ storage });

export default upload;
