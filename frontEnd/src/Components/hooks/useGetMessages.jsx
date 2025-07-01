import { useState } from 'react'
import { useConversationsContext } from '../Context/ConversationContext';
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading,setloading] = useState(false);
    const {setselectedconvo}=useConversationsContext();


    const getmessages= async (selectedid)=>{

    if(selectedid==null)  return;

    setloading(true);
    try{
        const res= await fetch(`/api/getmessage/${selectedid}`)

        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        localStorage.setItem("selected-convo",JSON.stringify(data));
        setselectedconvo(data);
        
    } catch(error){
        toast.error("this is my error"+error.message)
    }
    finally{
        setloading(false);
    }
  }

  return {loading,getmessages};
}

export default useGetMessages