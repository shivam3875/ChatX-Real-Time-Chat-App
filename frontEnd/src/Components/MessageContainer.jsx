import React, { useState,useEffect } from 'react'
import Massages from './Massages'
import { BsSend } from "react-icons/bs";
import Nsc from './Nsc';
import useSendMessage from './hooks/useSendMessage';
import { useSelectedUserContext } from './Context/SelectedUserContext';


const MessagesContainer = () => {

  const [message,setmessage]=useState("");
  const {loading,sendmessage}=useSendMessage();
  const {selecteduser}=useSelectedUserContext();


  const handlesend= async ()=>{
    if(!message){
      return
    }
    await sendmessage(selecteduser._id,message);
    setmessage("");
  }


useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.code === 'Enter') {
      handlesend();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [message]);

  return (

    !selecteduser ? <Nsc/> :

    <div className='w-[600px] max-sm:w-screen '>
      <div className=' bg-slate-50 h-14 pl-6 flex  items-center'><span className='text-2xl font-bold'>To: </span> <span className='text-2xl pr-6 font-bold truncate'>{selecteduser.username}</span></div>
      <Massages />
      <div className=' h-[5rem] flex items-center justify-center  w-full p-6 rounded-b-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 box-border relative'>
        <input type="text" onChange={(e)=>{setmessage(e.target.value)}} value={message}  placeholder="send a message..." className="input pt-0 pb-0 input-bordered w-full pr-20" />
        <BsSend onClick={handlesend} className='absolute right-12 cursor-pointer'/>
      </div>
    </div>
  )
}

export default MessagesContainer


