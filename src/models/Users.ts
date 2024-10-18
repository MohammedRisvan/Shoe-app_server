import mongoose ,{Document,Schema} from 'mongoose';

//Define an interface for the user document
export interface UsersI extends Document {
    username:string;
    account:string;
    dateofbirth:Date;
    password:string;
    createAt:Date;
}

//Define the User Schema
const UserSchema: Schema<UsersI> =new Schema({
    username:{
        type:String,
        required:true,
        // trim:true
    },
    account:{
        type: String,
        required: true, // Ensure email is always provided
         unique: true, // Enforce uniqueness
    },
    dateofbirth:{
        type:Date,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now,
    }

})

export default mongoose.model<UsersI>('UsersI',UserSchema);