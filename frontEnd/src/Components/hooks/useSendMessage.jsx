
import { useState } from 'react';
import toast from "react-hot-toast"
import { useConversationsContext } from '../Context/ConversationContext';

const useSendMessage = () => {
  const [loading,setloading] = useState(false);
  const {selectedconvo,setselectedconvo} = useConversationsContext()

  const sendmessage= async (receiverid,message)=>{

    setloading(true);
    try{
      const res= await fetch(`https://chatx-real-time-chat-app-backend.onrender.com/api/sendmessage/${receiverid}`,{
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
