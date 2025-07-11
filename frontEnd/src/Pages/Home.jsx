import { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import MessagesContainer from '../Components/MessageContainer'
import { useAuthContext } from '../Components/Context/AuthContext'
import { Navigate } from 'react-router-dom'
import { useSelectedUserContext } from '../Components/Context/SelectedUserContext'
import { IoArrowBackOutline } from "react-icons/io5";



const Home = () => {

  const {authUser} = useAuthContext();
  const {selecteduser,setselecteduser} = useSelectedUserContext();
  
  return (

    !authUser ? <Navigate to="/login" /> :

          <div className='flex justify-center'>
            <div className={`${selecteduser==null ? 'max-lg:inline' : 'max-lg:hidden'  }`} >
              <Sidebar />
            </div>
            <div className={`${selecteduser==null ? 'max-lg:hidden' :'max-lg:inline'  }`}>
              <button onClick={()=>{setselecteduser(null)}} className="btn lg:hidden rounded-b-[0] "><IoArrowBackOutline size={35} /></button>
              <MessagesContainer/>
            </div>
          </div>
        
  )
}

export default Home
