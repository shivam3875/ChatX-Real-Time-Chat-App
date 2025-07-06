import express from "express";
import dotenv from "dotenv";
import Routes from "./Routes/routes.js"
import { connectToDB } from "./DB/connectToDB.js";
import MessageRoutes from "./Routes/messageRoutes.js"
import cookieParser from "cookie-parser";
import UserRoutes from "./Routes/userRouts.js"
import cors from 'cors'


dotenv.config();
const Port = process.env.PORT || 5001;

import {app,server} from "./sockets/socket.js"

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

app.set('trust proxy', 1);

app.use(cors({
    origin:["https://chatx-real-time-chat-app-frontend.onrender.com","http://localhost:5173"],
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser())

app.use(Routes);
app.use(MessageRoutes);
app.use(UserRoutes);


server.listen(Port,()=>{
    connectToDB();
    console.log(`server Running at port ${Port}`);
})
