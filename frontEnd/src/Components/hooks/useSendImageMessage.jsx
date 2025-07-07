
import { useState } from 'react';
import toast from "react-hot-toast"
import { useConversationsContext } from '../Context/ConversationContext';

const useSendImageMessage = () => {
  const [loading,setloading] = useState(false);
  const {selectedconvo,setselectedconvo} = useConversationsContext()

  const sendimagemessage= async (receiverid,file,message,setmessage)=>{

    setloading(true);
    try{

      const formData = new FormData();
      formData.append("image", file);
      formData.append("message", message);
      setmessage("");

      const res= await fetch(`http://localhost:5000/api/sendimagemessage/${receiverid}`,{
        method:"POST",
        body: formData,
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

  return {loading,sendimagemessage}
}

export default useSendImageMessage