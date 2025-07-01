import mongoose from "mongoose";

export const connectToDB = async () =>{
    try{
       await mongoose.connect(process.env.MONGO_DB_URL);
       console.log("connected to mongop db")
    }

    catch(err){
        console.log("error in connecting to db");
    }
}