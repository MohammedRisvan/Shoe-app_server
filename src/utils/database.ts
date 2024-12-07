import mongoose from 'mongoose';

const connectDB=async():Promise<void>=>{
    try{
        let url=process.env.mongoURL
        await mongoose.connect(`${url}`);
        console.log("Mongodb is connected");
    }catch(err){
        console.error("Error connectinig to MongoDB:",err);
        process.exit(1);
    }
}
export default connectDB;