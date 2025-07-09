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
        const pdfName = req.body.fileName || "Document";

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
            resource_type: "auto",
            tags: "chatx-image",
        });

        let messageData = {
            senderId,
            receiverId,
            message,
        };

        console.log(result);
        const { resource_type, format, secure_url, bytes, pages } = result;

        if (resource_type === "image" && format!=="pdf") {
            messageData.image = secure_url;
        } else if (resource_type === "image" && format === "pdf") {
            messageData.pdf = {
                url: secure_url,
                size: bytes,
                noOfPages: pages || 0,
                name:pdfName,
            };
        } else if (resource_type === "video" && !result.is_audio ) {
            messageData.video = secure_url;
        } else if (resource_type === "video" && result.is_audio ) {
            messageData.audio = secure_url;
        }

        const newMessage = new Message(messageData);        


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