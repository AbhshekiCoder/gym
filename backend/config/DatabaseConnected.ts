
import dotenv from 'dotenv';
import mongoose from "mongoose";


dotenv.config()





const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL as string);
        console.log("connected to database")
    }catch(err ){
        console.log(err);
    }
}
export default connectDB;