import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        default:"",
    },
    image:{
        type:String,
        default:"",
    },
    video:{
        type:String,
        default:"",
    },
    audio:{
        type:String,
        default:"",
    },
    pdf: {
        url: { type: String, default: "" },
        size: { type: Number, default: 0 },
        noOfPages: { type: Number, default: 0 },
        name:{type: String, default:""},
    }

},{timestamps:true});


const Message = mongoose.model("Message",messageSchema);

export default Message;