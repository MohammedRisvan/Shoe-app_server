import  {Request,Response,NextFunction} from 'express';

export const globalErrorHandler=(
    err:any,
    req:Request,
    res:Response,
    next:NextFunction
) => {
    console.error('Error:',err.message|| err);
    //Handle MongodDB duplicate key error (11000)
    if(err.code === 11000){
        return res.status(400).json({
            message:'Duplicate key error',
            field:Object.keys(err.keyValue)[0], //Get the duplicate field name
        });
    }
    res.status(err.status||500).json({
message:err.message || 'Internal server error',
error:err,
    });
}
