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