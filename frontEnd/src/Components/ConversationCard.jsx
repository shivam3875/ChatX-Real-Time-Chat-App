import React, { useEffect } from 'react'
import useGetMessages from './hooks/useGetMessages'
import { useSelectedUserContext } from './Context/SelectedUserContext';
import { useSocketContext } from './Context/SocketCoontext';

const ConversationCard = ({user}) => {

  const {loading,getmessages}=useGetMessages();
  const {selecteduser,setselecteduser}=useSelectedUserContext()

  const {onlineusers}=useSocketContext();
  const isonline=onlineusers.includes(user._id);

  useEffect(()=>{
    getmessages(selecteduser?._id);
  },[selecteduser])

  return (
    <div onClick={()=>setselecteduser(user)} className={`flex items-center gap-3 ${(selecteduser!==null && selecteduser._id==user._id) ? 'bg-blue-400 text-black' : 'hover:bg-slate-300 text-white hover:text-blue-400'}  p-2 rounded-md `}>
        <div className={`avatar ${isonline ? "online" : "ofline"}`}>
            <div className="w-14 rounded-full">
                <img src={user.profilepic} />
            </div>
        </div>
        <span className='text-xl truncate w-64 font-medium'>{user.username}</span>
    </div>
  )
}

export default ConversationCard
