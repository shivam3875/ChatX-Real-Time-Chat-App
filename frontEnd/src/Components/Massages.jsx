import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { useConversationsContext } from './Context/ConversationContext'
import { useSelectedUserContext } from './Context/SelectedUserContext'
import useGetMessages from './hooks/useGetMessages'
import { useSocketContext } from './Context/SocketCoontext'
import useListenMessages from './hooks/useListenMessages'
import ImageBubble from './ImageBubble'
import PDFBubble from './PDFBubble'
import ChatSkeleton from './ChatSkeleton'

const Massages = () => {

  const {selectedconvo} = useConversationsContext()
  const {socket} =useSocketContext();
  const {selecteduser} = useSelectedUserContext()
  const lastmessageref=useRef();
  const {loading,getmessages}=useGetMessages();
  const [notfirst,setnotfirst]=useState(false);

  useListenMessages();

  useEffect(() => {
  if (!selectedconvo || selectedconvo.length === 0) return;
  const lastMsg = selectedconvo[selectedconvo.length - 1];
  const isImage = lastMsg.image || lastMsg.image !== "";

  const delay = isImage && notfirst ? 1000 : 100; // 1s for image, 100ms for text

  const timer = setTimeout(() => {
    lastmessageref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    setnotfirst(true);
  }, delay);

  return () => clearTimeout(timer);
  }, [selectedconvo]);

  return (
    <div className='h-96 overflow-y-auto w-full p-6  shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  '>
      

      {  selectedconvo===null ? <>
        <ChatSkeleton/>
      </> :
      selectedconvo.map((message, idx) => (
        <div
          key={message._id}
          ref={idx === selectedconvo.length - 1 ? lastmessageref : null}
        >
          {(!message.image || message.image === "")
            ? <Message message={message} />
            // : <ImageBubble message={message} />
            : <PDFBubble message={message} />
          }
        </div>
      ))}      
    </div>
  )
}

export default Massages
