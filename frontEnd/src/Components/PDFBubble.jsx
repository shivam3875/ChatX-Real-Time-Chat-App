import { useAuthContext } from './Context/AuthContext'
import { useSelectedUserContext } from './Context/SelectedUserContext';
import { extractTime } from '../Utils/extractTime';
import { formatFileSize } from '../Utils/formatFileSize';

const PDFBubble = ({message}) => {

    const {authUser}=useAuthContext();
    const {selecteduser}=useSelectedUserContext();

    const handleDownload = async () => {
        try {
            // Use the PDF URL from message.pdf.url
            const response = await fetch(message?.pdf?.url, { mode: "cors" });
            if (!response.ok) throw new Error("Download failed");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Prefer the original file name if available, else fallback
            const fileName =
            message?.pdf?.name ||
            message?.pdf?.url?.split("/").pop() ||
            "document.pdf";

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert("PDF download failed");
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
                <div className="chat-bubble p-2 rounded-lg">
                    <div class="flex flex-col w-full max-w-[326px] leading-1.5 border-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div class="flex items-start bg-gray-50 dark:bg-gray-600 rounded-md p-2">
                            <div class="me-2">
                            <span class="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                                <svg fill="none" aria-hidden="true" class="w-5 h-5 shrink-0" viewBox="0 0 20 21">
                                    <g clip-path="url(#clip0_3173_1381)">
                                        <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"/>
                                        <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"/>
                                        <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z"/>
                                        <path fill="#F15642" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"/>
                                        <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"/>
                                        <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3173_1381">
                                        <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                {message.pdf.name}
                            </span>
                            <span class="flex text-xs font-normal max-[375px]:hidden text-gray-500 dark:text-gray-400 gap-2">
                                {message.pdf.noOfPages} Pages
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                    <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                                </svg>
                                {formatFileSize(message.pdf.size)}
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                    <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                                </svg>
                                PDF
                            </span>
                            </div>
                            <div class="inline-flex self-center items-center">
                            <button onClick={handleDownload} class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                                <svg class="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                </svg>
                            </button>
                            </div>
                        </div>
                        {message.message}
                    </div> 
                </div>                
            </div>
        </div>
  )
}

export default PDFBubble
