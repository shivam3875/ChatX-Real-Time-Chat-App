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

app.set('trust proxy', 1);

app.use(cors({
    origin:"https://chatx-real-time-chat-app-frontend.onrender.com",
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
