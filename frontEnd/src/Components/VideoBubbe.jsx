import { useAuthContext } from './Context/AuthContext'
import { useSelectedUserContext } from './Context/SelectedUserContext';
import { extractTime } from '../Utils/extractTime';
import { IoPlayCircleOutline } from "react-icons/io5";

const VideoBubble = ({message}) => {

    const {authUser}=useAuthContext();
    const {selecteduser}=useSelectedUserContext();

    const handleDownload = () => {
        window.open(message.video, "_blank");
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

                <div className="chat-bubble p-2 rounded-lg ">
                    <div class="flex flex-col w-full max-w-[326px] leading-1.5 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div class="group relative">
                            <div
                                class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                <button data-tooltip-target="download-image"
                                    onClick={handleDownload}
                                    class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:outline-none dark:text-white focus:ring-gray-50">
                                    <IoPlayCircleOutline color='white' size={40} />
                                </button>
                            </div>
                            <video src={message.video} className="rounded-lg pointer-events-none " >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        {message.message}
                    </div>
                </div>    
            </div>
        </div>
  )
}

export default VideoBubble


