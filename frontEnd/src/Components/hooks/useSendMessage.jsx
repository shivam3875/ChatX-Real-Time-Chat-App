
import { useState } from 'react';
import toast from "react-hot-toast"
import { useConversationsContext } from '../Context/ConversationContext';

const useSendMessage = () => {
  const [loading,setloading] = useState(false);
  const {selectedconvo,setselectedconvo} = useConversationsContext()

  const sendmessage= async (receiverid,message)=>{

    setloading(true);
    try{
      const res= await fetch(`/api/sendmessage/${receiverid}`,{
        method:"Post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({message})
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
