import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Configure multer for file upload (store files in memory)
const storage = multer.memoryStorage(); // Storing files in memory (RAM)

// Optional: File filter to check file type (optional but recommended)
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    // Accept file
    cb(null, true);
  } else {
    // Reject file
    cb(null, false);
  }
};

// Optional: Set limits (e.g., max file size: 5MB)
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

// Initialize multer with storage, fileFilter, and limits
const upload = multer({
  storage,
  fileFilter,
  limits,
});

export default upload;
