import React, { useEffect, useRef } from 'react'
import Message from './Message'
import { useConversationsContext } from './Context/ConversationContext'
import { useSelectedUserContext } from './Context/SelectedUserContext'
import useGetMessages from './hooks/useGetMessages'
import { useSocketContext } from './Context/SocketCoontext'
import useListenMessages from './hooks/useListenMessages'

const Massages = () => {

  const {selectedconvo} = useConversationsContext()
  const {socket} =useSocketContext();
  const {selecteduser} = useSelectedUserContext()
  const lastmessageref=useRef();
  const {loading,getmessages}=useGetMessages();

  useListenMessages();

  

  useEffect(()=>{
    setTimeout(()=>{
      lastmessageref.current?.scrollIntoView({behavior:"smooth"})
    },100)
  },[selectedconvo])


  return (
    <div className='h-96 overflow-y-auto w-full p-6  shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      
      { selectedconvo===null ? <></> :
      selectedconvo.map((message)=>{
        return <div key={message._id} ref={lastmessageref} ><Message message={message} /></div>
      })}
      
    </div>
  )
}

export default Massages
