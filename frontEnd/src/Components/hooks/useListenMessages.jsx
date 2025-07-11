import { useEffect } from 'react';
import { useConversationsContext } from '../Context/ConversationContext';
import { useSocketContext } from '../Context/SocketCoontext';
import { useSelectedUserContext } from '../Context/SelectedUserContext';
import recvoice from '../../assets/rec_sound.mp3'

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setselectedconvo } = useConversationsContext();
    const {selecteduser}=useSelectedUserContext();
    const sound=new Audio(recvoice);

    useEffect(() => {
        const handleMessage = (message) => {
            console.log("Received message...");
            if(selecteduser!==null && message.senderId==selecteduser._id){
                setselectedconvo(prev => [...prev, message]);
                sound.play();
            }
        };

        socket?.on("message", handleMessage);

        return () => {
            socket?.off("message", handleMessage);
        };
    }, [socket, selecteduser]);
};

export default useListenMessages;
