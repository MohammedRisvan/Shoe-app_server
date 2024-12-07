import mongoose ,{Document,Schema} from 'mongoose';

//Define an interface for the user document
export interface UsersI extends Document {
    username:string;
    email:String;
    dateofbirth:Date;
    phone:number;
    password:string;
    block:boolean;
    createAt:Date;
}

//Define the User Schema
const UserSchema: Schema<UsersI> =new Schema({
    username:{
        type:String,
        required:true,
        // trim:true
    },
    email:{
        type: String,
        required: true, // Ensure email is always provided
         unique: true, // Enforce uniqueness
    },
    dateofbirth:{
        type:Date,
        required:true,
    },
    phone:{type:Number,maxlength:10,
        minlength:10},
    password:{
        type:String,
        required:true,
    },
    block:{
        type:Boolean,
        default:false
    },
    createAt:{
        type:Date,
        default:Date.now,
    }

})

export default mongoose.model<UsersI>('UsersI',UserSchema);