import mongoose, { Document, Schema, Model } from 'mongoose';
interface IProduct extends Document{
    name:string;
    brand:string;
    description:string;
    price:number;
    images:[[string,string]];
    size:number[];//Avilable size in array
    colour:[string];
    stock:number; //Avilable Qualtity
    category:string;//Eg:.. sneakers,Running shoes,etc
    gender:'Men'|'Women'|'Unisex';
    releaseDate:Date;
    rating:number;
    reviews:number;
    isFeatured:boolean;
};
//Define the Schema
const productSchema:Schema<IProduct> =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"product name is required"],
    },
    brand:{
        type:String,
        required:[true,"Brand is Required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    images:{
        required:[true,"Please add images"],
        type:[[String,String]],

    },
    price:{
        type:Number,
        required:[true,"prise is required"],
        min:[0,"Price can't Negative"]
    },
    size:{
        type:[Number],
        required:[true,"size is Required"]
    },
    colour:{
        type:[String],
        required:[true,"Color is required"]
    },
    stock:{
        type:Number,
        required:[true,"Stock must be Required"],
        min:[0,"Stock can't be Negatived"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    gender:{
        type:String,
        enum:['Men','Women','Unisex'],
        required:[true,"Gender is required"]
    },
    releaseDate:{
        type:Date,
        default:Date.now(),
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5,
    },
      reviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  }

})

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export default Product;
