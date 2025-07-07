import React, { useState,useEffect,useRef } from 'react'
import Massages from './Massages'
import { BsSend } from "react-icons/bs";
import Nsc from './Nsc';
import useSendMessage from './hooks/useSendMessage';
import { useSelectedUserContext } from './Context/SelectedUserContext';
import useSendImageMessage from './hooks/useSendImageMessage';
import { VscAttach } from "react-icons/vsc";
import { IoCloseOutline } from "react-icons/io5";

const MessagesContainer = () => {

  const [message,setmessage]=useState("");
  const {loading,sendmessage}=useSendMessage();
  const {selecteduser}=useSelectedUserContext();
  const [image,setimage]=useState(null);
  const {sendimagemessage}=useSendImageMessage();
  const [sending,setsending]=useState(false);
  const fileInputRef = useRef(null);

const handleChange = (e) => {
  setimage(e.target.files[0]);
};

const handlesend = async () => {
  setsending(true);
  if (!message && !image) return;
  if (image) {
    await sendimagemessage(selecteduser._id, image, message,setmessage,setimage);
  } else {
    await sendmessage(selecteduser._id, message);
  }
  setmessage("");
  setimage(null);
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
}, [message,image]);

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

        <label className="flex items-center gap-2 absolute left-8 group cursor-pointer" style={{ cursor: sending ? "not-allowed" : "pointer" }}>
          <VscAttach  color='black' size={20}/>
          <input ref={fileInputRef} id="json-upload" type="file" accept="image/*,application/pdf" onChange={handleChange} disabled={sending} style={{ display: "none" }} />
        </label>

        <input type="text" onChange={(e)=>{setmessage(e.target.value)}} value={message} disabled={sending}  placeholder="send a message..." className="input pt-0 pb-0 pl-10 input-bordered w-full pr-20" />
        <BsSend onClick={handlesend} className={`${ sending ? 'absolute right-12 cursor-not-allowed'  : 'absolute right-12 cursor-pointer'}`} />
      </div>
    </div>
  )
}

export default MessagesContainer


