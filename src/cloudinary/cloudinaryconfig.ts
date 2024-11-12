import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// uploadImage()===
// async function uploadImage(imagePath: string): Promise<string> {
//   try {
//     const result = await cloudinary.uploader.upload(imagePath,{folder:"Ecomers_Shoe"});
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
(async function(){
})();
console.log(" this is process env",process.env.CLOUDINARY_CLOUD_NAME)
export default cloudinary;