import React from 'react'

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
          {/* Left message 1 */}
          <div className="flex items-start">
            <div className=" skeleton w-[200px] rounded-lg h-8">
            </div>
          </div>
          {/* Left message 2 */}
          <div className="flex items-start">
            <div className=" w-[150px] rounded-lg h-8 skeleton">  
            </div>
          </div>
          {/* Right message 1 */}
          <div className="flex items-end justify-end">
            <div className=" w-[200px] rounded-lg h-8 skeleton">  
            </div>
          </div>
          {/* Right message 2 */}
          <div className="flex items-end justify-end">
            <div className=" skeleton w-[150px] rounded-lg h-8">   
            </div>
          </div>
          {/* Left message 3 */}
          <div className="flex items-start">
            <div className=" skeleton rounded-lg h-8 w-[200px]  ">
            </div>
          </div>
          {/* Left message 4 */}
          <div className="flex items-start">
            <div className="skeleton  w-[150px] rounded-lg h-8">  
            </div>
          </div>
          {/* Right message 3 */}
          <div className="flex items-end justify-end">
            <div className=" skeleton w-[200px] rounded-lg h-8">   
            </div>
          </div>
    </div>
  )
}

export default ChatSkeleton
