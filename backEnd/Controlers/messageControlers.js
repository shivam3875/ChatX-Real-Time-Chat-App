import Conversation from "../Models/conversationModel.js";
import Message from "../Models/messageModel.js";
import { getrecieversocketid } from "../sockets/socket.js";
import { io } from "../sockets/socket.js";
import cloudinary from "../server.js";

export const sendMessage = async (req,res) => {
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let converation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]},
        })

        if(!converation){
            converation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            converation.messages.push(newMessage._id);
        }

        // await newMessage.save(); this will run one after another
        // await converation.save();
        
        await Promise.all([converation.save(), newMessage.save()]) //this will run in parallel

        const rsid=getrecieversocketid(receiverId);
        
        if(rsid){
            io.to(rsid).emit("message",newMessage);
        }


        res.status(201).json(newMessage)

    }
    catch(err){
        console.log("Error in sendMessage controller:",err.message)
        res.status(500).json({errror:"internal server error"});
    }
}

export const sendImageMessage = async (req,res) => {
    try{
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        const message = req.body.message;

        let converation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]},
        })

        if(!converation){
            converation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        // Cloudinary par upload karo
        const result = await cloudinary.uploader.upload(fileStr, {
            resource_type: "image",
            tags: "chatx-image",
        });

        const newMessage = new Message({
            senderId,
            receiverId,
            image:result.secure_url,
            message,
        })

        if(newMessage){
            converation.messages.push(newMessage._id);
        }

        // await newMessage.save(); this will run one after another
        // await converation.save();
        
        await Promise.all([converation.save(), newMessage.save()]) //this will run in parallel

        const rsid=getrecieversocketid(receiverId);
        
        if(rsid){
            io.to(rsid).emit("message",newMessage);
        }


        res.status(201).json(newMessage)

    }
    catch(err){
        console.log("Error in sendimageMessage controller:",err.message || err )
        res.status(500).json({error:"internal server error"});
    }
}

export const getMessage = async (req,res) =>{
    try {
        const {id:usertochatId} = req.params;
        const senderId = req.user._id;

        let converation = await Conversation.findOne({
            participants:{$all:[senderId, usertochatId]},
        }).populate("messages"); //it gives the message

        if(!converation){
            return res.status(200).json([]);
        }

        const messages = converation.messages;

        res.status(200).json(messages)

        
    } catch (error) {
        console.log("Error in getMessage controller:",error.message)
        res.status(500).json({errror:"internal server error"});
    }
}