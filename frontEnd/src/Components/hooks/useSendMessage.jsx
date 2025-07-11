
import { useState } from 'react';
import toast from "react-hot-toast"
import { useConversationsContext } from '../Context/ConversationContext';
import sendvoice from '../../assets/send_sound.wav'

const useSendMessage = () => {
  const [loading,setloading] = useState(false);
  const {selectedconvo,setselectedconvo} = useConversationsContext()
  const sound=new Audio(sendvoice);

  const sendmessage= async (receiverid,message)=>{

    setloading(true);
    try{
      const res= await fetch(`https://chatx-real-time-chat-app-backend.onrender.com/api/sendmessage/${receiverid}`,{
      // const res= await fetch(`http://localhost:5000/api/sendmessage/${receiverid}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({message}),
        credentials: "include",
      })

      const data = await res.json();

      if(data.error){
          throw new Error(data.error);
      }

      setselectedconvo([...selectedconvo,data])
      sound.play();

    } 
    catch(error){
        toast.error(error.message)
    }
    finally{
        setloading(false);
    }
  }

  return {loading,sendmessage}
}

export default useSendMessage
