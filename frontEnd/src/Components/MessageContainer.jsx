import { useState,useEffect,useRef } from 'react'
import Massages from './Massages'
import { BsSend } from "react-icons/bs";
import Nsc from './Nsc';
import useSendMessage from './hooks/useSendMessage';
import { useSelectedUserContext } from './Context/SelectedUserContext';
import useSendImageMessage from './hooks/useSendImageMessage';
import { VscAttach } from "react-icons/vsc";
import { IoCloseOutline } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useReactMediaRecorder } from "react-media-recorder";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AiOutlineDelete } from "react-icons/ai";
import { CiPause1 } from "react-icons/ci";
import { FaRegFileAudio } from "react-icons/fa";

const MessagesContainer = () => {

  const [message,setmessage]=useState("");
  const {loading,sendmessage}=useSendMessage();
  const {selecteduser}=useSelectedUserContext();
  const [image,setimage]=useState(null);
  const {sendimagemessage}=useSendImageMessage();
  const [sending,setsending]=useState(false);
  const fileInputRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [size, setSize] = useState({ width: 300, height: 350 });
  const {startRecording,stopRecording,mediaBlobUrl,clearBlobUrl} = useReactMediaRecorder({ audio: true });
  const [recording,setrecording]=useState(false);
  const [placeholder,setplaceholder]=useState("Send a message...");
  const [pause,setpause]=useState(false)

useEffect(() => {
  function handleResize() {
    if (window.innerWidth < 550) {
      setSize({ width: 250, height: 270 });
    } else {
      setSize({ width: 300, height: 350 });
    }
  }
  window.addEventListener("resize", handleResize);
  handleResize();
  return () => window.removeEventListener("resize", handleResize);
}, []);

const onEmojiClick = (emojiObject, event) => {
  setmessage(message + emojiObject.emoji);
};

const handleChange = (e) => {
  setimage(e.target.files[0]);
};

const handleaudiodelete = () =>{
  setplaceholder("Send a message...");
  stopRecording();
  setrecording(false);
  setpause(false)
  setTimeout(() => {
    clearBlobUrl();
  }, 500);
}

const handlestartrecordingaudio = async () =>{
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setplaceholder("");
    setrecording(true);
    startRecording();
    setpause(true);
  } catch (err) {
    alert("Mic access allow karein, tabhi recording possible hai.");
  }
}

const handlestoprecoding = () => {
  stopRecording();
  setpause(false);
}

const handlesend = async () => {
  setsending(true);
  if(mediaBlobUrl){
    console.log("yes");
    setrecording(false);
    setplaceholder("Send a message...")
    const response = await fetch(mediaBlobUrl);
    const blob = await response.blob();
    await sendimagemessage(selecteduser._id, blob, message,setmessage,setimage);
    clearBlobUrl();
    setsending(false);
    setmessage("");
    setimage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // File input ko manually reset karo
    }
    return;
  }
  if (!message && !image) {
    alert("Can't Send Empty Mesage")
    setsending(false)
    return;
  }
  if (image) {
    await sendimagemessage(selecteduser._id, image, message,setmessage,setimage);
  } 
  else {
    await sendmessage(selecteduser._id, message);
  }
  setmessage("");
  setimage(null);
  clearBlobUrl();
  if (fileInputRef.current) {
    fileInputRef.current.value = ""; // File input ko manually reset karo
  }
  setsending(false)
};

useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.code === 'Enter') {
      handlesend();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [message,image,mediaBlobUrl]);

  return (

    !selecteduser ? <Nsc/> :

    <div className='w-[600px] max-sm:w-screen relative'>      
      <div className=' bg-slate-50 h-14 pl-6 flex  items-center'><span className='text-2xl font-bold'>To: </span> <span className='text-2xl pr-6 font-bold truncate'>{selecteduser.username}</span></div>
      <Massages />
      {image && (
        <div className="absolute left-7 bottom-16 bg-white pl-3 pr-8 py-1 rounded-t shadow text-gray-700 text-sm z-20 max-w-[90%] ">
          <span className="font-medium file-name-span">{image.name}</span>
          <button type="button" onClick={() => setimage(null)} className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200 transition" aria-label="Remove selected file">
            <IoCloseOutline size={16} color="#555" />
          </button>
        </div>
      )}
      <div className=' h-[5rem] flex items-center justify-center  w-full p-6 rounded-b-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 box-border relative'>

        <label className="flex items-center gap-2 absolute left-8 group cursor-pointer" style={{ cursor: sending ? "not-allowed"  : "pointer", display: recording ? "none" : "" } }>
          <VscAttach opacity={0.7}  color='black' size={20}/>
          <input ref={fileInputRef} id="json-upload" type="file" accept="image/*,video/*,application/pdf" onChange={handleChange} disabled={sending} style={{ display: "none" }} />
        </label>

        <label className="flex items-center gap-2 absolute pl-1 left-14 group cursor-pointer" style={{ cursor: sending ? "not-allowed" : "pointer", display: recording ? "none" : ""    }}>
          <button onClick={() => setShowPicker(!showPicker)}><BsEmojiSmile opacity={0.7} color='black' size={20} /></button>
          {showPicker && <EmojiPicker className=' bottom-52 -left-14 max-[550px]:bottom-44  ' previewConfig={{ showPreview: false }} height={size.height} width={size.width} onEmojiClick={onEmojiClick} />}
        </label>

        <input type="text" onChange={(e)=>{setmessage(e.target.value)}} value={message} disabled={sending || recording }  placeholder={placeholder} className="input pt-0 pb-0 pl-16 input-bordered w-full pr-20" />
        <BsSend opacity={0.7} onClick={handlesend} className={`${ !message && !image && (!recording || pause) ?  'hidden'  : sending ? 'absolute right-10 cursor-not-allowed'  : 'absolute right-10 cursor-pointer'}`} />
        <MdOutlineKeyboardVoice opacity={0.7} size={20} onClick={handlestartrecordingaudio} className={`${message || image || recording ? 'hidden' : 'absolute right-10 cursor-pointer' }`} />
        <DotLottieReact src="/Animation.json" loop autoplay className={`${!recording || !pause ? 'hidden' : 'absolute right-14 cursor-pointer' } w-20 opacity-70 `} />
        <FaRegFileAudio className={`${ !recording || pause ? 'hidden' : 'absolute right-14 cursor-pointer' } w-20 opacity-70 `} />
        <AiOutlineDelete opacity={0.7} onClick={handleaudiodelete} size={20} className={`${ !recording ?  'hidden'  : 'absolute right-32 cursor-pointer'}`} />
        <CiPause1 opacity={0.7} size={20} onClick={handlestoprecoding} className={`${ !pause ?  'hidden'  : 'absolute right-10 cursor-pointer'}`} />
      </div>
    </div>
  )
}

export default MessagesContainer

