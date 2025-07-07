import { IoLogOutOutline } from "react-icons/io5";
import useLogout from './hooks/useLogout';


const Logoutbutton = () => {

  const {loading,logout}=useLogout();

  return (
    <div className='mt-2.5 mb-1'>
      <IoLogOutOutline onClick={logout} size={30}/>
    </div>
  )
}

export default Logoutbutton
