import { Request, Response, NextFunction } from 'express';

// Error handler middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500; // Use the error's status or default to 500 (Internal Server Error)
  const message = err.message || 'Internal Server Error';
// console.log(err,"this is error Handeler");
  res.status(statusCode).json({
    success: false,
    message:err,
  });
};

export default errorHandler;
