
import { useState } from 'react';
import toast from "react-hot-toast"
import { useConversationsContext } from '../Context/ConversationContext';
import sendvoice from '../../assets/send_sound.wav'

const useSendImageMessage = () => {
  const [loading,setloading] = useState(false);
  const {selectedconvo,setselectedconvo} = useConversationsContext()
  const sound= new Audio(sendvoice);

  const sendimagemessage= async (receiverid,file,message,setmessage,setimage)=>{

    setloading(true);
    try{

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("message", message);
      setmessage("Sending please wait...");
      setimage(null)

      const res= await fetch(`https://chatx-real-time-chat-app-backend.onrender.com/api/sendimagemessage/${receiverid}`,{
      // const res= await fetch(`http://localhost:5000/api/sendimagemessage/${receiverid}`,{
        method:"POST",
        body: formData,
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

  return {loading,sendimagemessage}
}

export default useSendImageMessage