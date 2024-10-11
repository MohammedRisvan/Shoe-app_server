import mongoose from 'mongoose';

const connectDB=async():Promise<void>=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/shoes');
        console.log("Mongodb is connected");
    }catch(err){
        console.error("Error connectinig to MongoDB:",err);
        process.exit(1);
    }
}
export default connectDB;