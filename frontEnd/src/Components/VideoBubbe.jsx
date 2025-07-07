import React from 'react'
import { useAuthContext } from './Context/AuthContext'
import { useSelectedUserContext } from './Context/SelectedUserContext';
import { extractTime } from '../Utils/extractTime';

const VideoBubble = ({message}) => {

    const {authUser}=useAuthContext();
    const {selecteduser}=useSelectedUserContext();

    const handleDownload = async () => {
        try {
            const response = await fetch(message?.image, { mode: "cors" });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            // Optional: extract filename from URL or set a default
            link.download = message?.image.split('/').pop() || 'image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the object URL
            window.URL.revokeObjectURL(url);
        } catch (err) {
            // Optionally show error to user
            alert("Image download failed");
        }
    };

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

                <div className="chat-bubble">
                    <div class="flex flex-col w-full max-w-[326px] leading-1.5 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div class="group relative my-2.5">
                            <div
                                class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                <button data-tooltip-target="download-image"
                                    onClick={handleDownload}
                                    class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                                    <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 16 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                    </svg>
                                </button>
                            </div>
                            <img src={message?.image}  class="rounded-lg" />
                            {message.message}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
  )
}

export default VideoBubble