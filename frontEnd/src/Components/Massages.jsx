import  { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { useConversationsContext } from './Context/ConversationContext'
import useListenMessages from './hooks/useListenMessages'
import ImageBubble from './ImageBubble'
import PDFBubble from './PDFBubble'
import ChatSkeleton from './ChatSkeleton'
import VideoBubble from './VideoBubbe'
import AudioBubble from './AudioBubble'

const Massages = () => {

  const {selectedconvo} = useConversationsContext()
  const lastmessageref=useRef();

  useListenMessages();

  useEffect(() => {
  if (!selectedconvo || selectedconvo.length === 0) return;

  const timer = setTimeout(() => {
    lastmessageref.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, 0);

  return () => clearTimeout(timer);
  }, [selectedconvo]);

  return (
    <div className='h-96 overflow-y-auto w-full p-6  shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  '>
      

      {  selectedconvo===null ? <>
        <ChatSkeleton/>
      </> :

      selectedconvo.map((message, idx) => (
        <div key={message._id} ref={idx === selectedconvo.length - 1 ? lastmessageref : null} >

          {((!message.image || message.image === "") && (!message.pdf || message.pdf.url==="") && (!message.video || message.video==="") && (!message.audio || message.audio===""))
            ? <Message message={message} />
            : ((!message.pdf || message.pdf.url==="") && (!message.video || message.video==="") && (!message.audio || message.audio===""))
            ? <ImageBubble message={message} />
            : ((!message.pdf || message.pdf.url==="") && (!message.audio || message.audio===""))
            ? <VideoBubble message={message} />
            : (!message.pdf || message.pdf.url==="")
            ? <AudioBubble message={message} />
            : <PDFBubble message={message} />
          }

        </div>
      ))}      
    </div>
  )
}

export default Massages
