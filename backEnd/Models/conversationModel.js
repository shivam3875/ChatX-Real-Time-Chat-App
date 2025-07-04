import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        }
    ],
   
},{timestamps:true});


const conversation = mongoose.model("conversation",conversationSchema);

export default conversation;