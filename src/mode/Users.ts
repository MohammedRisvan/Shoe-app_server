import mongoose ,{Document,Schema} from 'mongoose';

//Define an interface for the user document
export interface UsersI extends Document {
    Username:string;
    Email:string;
    DateofBirth:Date;
    Password:string;
    createAt:Date;
}

//Define the User Schema
const UserSchema: Schema<UsersI> =new Schema({
    Username:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    DateofBirth:{
        type:Date,
        required:true,
        validate:{
            validator:function(value:Date){
                const age=Math.floor((Date.now() -value.getTime())/(1000*60*60*24*365.25));
            
            return age>=18&&age<=121;
            }
        },
    },
    Password:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now,
    }

})

export default mongoose.model<UsersI>('UsersI',UserSchema);