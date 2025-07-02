import React from 'react'
import { useUsersContext } from '../Context/UsersContext'
import toast from 'react-hot-toast';

const useConversations = () => {
  const [loading,setloading]=React.useState(false);
  const {setUsers} = useUsersContext();

  const conversations = async ()=>{
    setloading(true)
    try{
        const res = await fetch("https://chatx-real-time-chat-app-backend.onrender.com/api/getusers",{
            method:"Post",
            headers:{"Content-Type":"application/json"},
        })

        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        localStorage.setItem("users",JSON.stringify(data));
        setUsers(data)
    }
    catch(error){
      toast.error(error.message)
    }
    finally{
        setloading(false);
    }
  }
  return {loading,conversations};
}

export default useConversations
