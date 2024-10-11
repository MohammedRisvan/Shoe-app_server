import mongoose,{Document,Schema} from "mongoose";

export interface productD extends Document{
    qntity:number,
    pName:string,
    pDescription:string,
    Img:[string],
    Price:number,
}
const Products:Schema=new Schema<productD>({
    qntity:{required:true,trim:true},
    pName:{required:true, unique:true},
    Img:[{required:true,unique:true},],
    Price:{required:true,trim:true}
})

export default mongoose.model<productD>('productData',Products);
