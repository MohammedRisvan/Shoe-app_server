// import multer,{FileFilterCallback} from 'multer';
// import path from 'path';
// import { Request, RequestHandler } from 'express';



// //configure storage options with Multer
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/');
//     },
//     filename:(req,file,cb)=>{
//         cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// // configure Multer for file Upload,with file type and size validation
// const upload=multer({
//     storage,
//     limits:{fileSize:10000000},//10MB file size limit
//     fileFilter:(req:Request)
// })
import { StorageEngine } from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import {Request} from 'express';

//cloudinary  cloudinary with your credentials

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



// Define interface for the params function
interface CloudinaryParams{
    folder:(req:Request,file:Express.Multer.File)=>string;
    format:(req:Request,file:Express.Multer.File)=>Promise<string>|string;
    public_id:(req:Request,file:Express.Multer.File)=>string;
}

//Interface for Cloudinary Storage
interface CloudinaryStorageConfig {
    cloudinary:typeof cloudinary.v2; //Refers to  the Cloudinary v2 object
    params:CloudinaryParams; //Type of params define above
}


const storage:StorageEngine = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: (req:Request, file:Express.Multer.File):string => {
        const isImage = file.mimetype.startsWith('image');
        return isImage ? 'uploads/images' : 'uploads/videos'},

        format: async (req:Request, file:Express.Multer.File):Promise<string> => {
            const fileFormat = file.mimetype.startsWith('image') ? 'jpg' : 'mp4'; // Adjust format based on file type
            return fileFormat;
        },
        public_id: (req:Request, file:Express.Multer.File):string =>{
            return  `${file.fieldname}-${Date.now()}`;
            },
    },
} as CloudinaryStorageConfig );
const upload=multer({storage});

export default upload;