import React from 'react'
import { useUsersContext } from '../Context/UsersContext'
import toast from 'react-hot-toast';

const useConversations = () => {
  const [loading,setloading]=React.useState(false);
  const {setUsers} = useUsersContext();

  const conversations = async (searchString = "")=>{
    setloading(true)
    try{
        const res = await fetch("https://chatx-real-time-chat-app-backend.onrender.com/api/getusers",{
        // const res = await fetch("http://localhost:5000/api/getusers",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({searchString}),
            credentials: "include",
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
