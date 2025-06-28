import mongoose from "mongoose";
import Color from "color";

const connectDB = async() => {
await mongoose.connect(process.env.MOnGO_URI).then(()=>{
    console.log('Database Connected Successful!!');

}).catch((error)=>{
    console.log(error);
})
}
export default connectDB;