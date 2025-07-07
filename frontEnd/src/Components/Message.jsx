import React from 'react'
import { useAuthContext } from './Context/AuthContext'
import { useSelectedUserContext } from './Context/SelectedUserContext';
import { extractTime } from '../Utils/extractTime';

const Message = ({message})=> {

    const {authUser}=useAuthContext();
    const {selecteduser}=useSelectedUserContext();

  return (
    <div>
        <div className={`chat ${(message.senderId===authUser._id) ? 'chat-end' : 'chat-start'} `}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="_img"
                    src={`${(message.senderId===authUser._id) ? authUser.profilepic : selecteduser.profilepic }`} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs text-white opacity-50">{extractTime(message.createdAt)}</time>
            </div>
            <div className="chat-bubble file-name-span">{message.message}</div>
        </div>
    </div>
  )
}

export default Message
