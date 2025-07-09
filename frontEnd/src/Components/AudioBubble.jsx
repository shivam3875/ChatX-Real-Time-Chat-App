import { useAuthContext } from './Context/AuthContext'
import { useSelectedUserContext } from './Context/SelectedUserContext';
import { extractTime } from '../Utils/extractTime';

const AudioBubble = ({message}) => {

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
                <div className="chat-bubble p-2 rounded-lg">    
                    <div class="flex flex-col w-full max-w-[320px] leading-1.5 border-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <audio className=' max-[460px]:w-44 ' controls src={message.audio}></audio>
                        </div>
                    </div>    
                </div>                
            </div>
        </div>
  )
}

export default AudioBubble