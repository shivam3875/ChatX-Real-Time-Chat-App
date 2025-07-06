import { Server } from "socket.io";
import http from "http";
import express from "express";


const app =express();

const server =http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["https://chatx-real-time-chat-app-frontend.onrender.com","http://localhost:5173"],
        credentials: true,
    },
})


const userSocketMap={};

export const getrecieversocketid=(rid)=>{
    return userSocketMap[rid];
}


io.on("connection",(socket)=>{
    console.log("user connected",socket.id);
    const userID=socket.handshake.query.userID;
    if(userID!="undefined") userSocketMap[userID]=socket.id;

    io.emit("getonlineuser",Object.keys(userSocketMap))


    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
        delete userSocketMap[userID];
        io.emit("getonlineuser",Object.keys(userSocketMap))
    })
})


export {app,io,server};
