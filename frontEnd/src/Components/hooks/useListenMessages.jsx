// import { useEffect, useState } from 'react'
// import { useConversationsContext } from '../Context/ConversationContext';
// import { useSocketContext } from '../Context/SocketCoontext';

// const useListenMessages = () => {

//     const {socket}=useSocketContext();
//     const {selectedconvo,setselectedconvo}=useConversationsContext();

//     console.log("rumming2....")

//     useEffect(()=>{
//         socket?.on("message",(message)=>{
//             console.log("rumming....")
//             setselectedconvo([...selectedconvo,message]);
//         })

//         return ()=> socket?.off("message");
//     },[socket,selectedconvo,setselectedconvo])

// }

// export default useListenMessages;


import { useEffect } from 'react';
import { useConversationsContext } from '../Context/ConversationContext';
import { useSocketContext } from '../Context/SocketCoontext';
import { useSelectedUserContext } from '../Context/SelectedUserContext';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setselectedconvo } = useConversationsContext();
    const {selecteduser}=useSelectedUserContext();

    useEffect(() => {
        const handleMessage = (message) => {
            console.log("Received message...");
            if(selecteduser!==null && message.senderId==selecteduser._id){
                setselectedconvo(prev => [...prev, message]);
            }
        };

        socket?.on("message", handleMessage);

        return () => {
            socket?.off("message", handleMessage);
        };
    }, [socket, setselectedconvo]);
};

export default useListenMessages;