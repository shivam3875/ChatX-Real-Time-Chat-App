import React from 'react'

const AllUsersSkeleton = () => {
  return (<>
    <div className="flex max-w-[100%] flex-col gap-4">
        <div className="flex items-center mt-4 gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-4 max-w-64"></div>
            <div className="skeleton h-4 w-28"></div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-4 max-w-64"></div>
            <div className="skeleton h-4 w-28"></div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-4 max-w-64"></div>
            <div className="skeleton h-4 w-28"></div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-4 max-w-64"></div>
            <div className="skeleton h-4 w-28"></div>
            </div>
        </div>
    </div>   
    </>
  )
}

export default AllUsersSkeleton
