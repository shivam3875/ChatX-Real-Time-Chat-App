import Searchbar from './Searchbar'
import Conversations from './Conversations'
import Logoutbutton from './Logoutbutton'

const Sidebar = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
        <div className='w-full p-6 pb-1 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 max-[400px]:w-screen '>
            <Searchbar/>
            <hr className='mt-10' />
            <Conversations/>
            <Logoutbutton/>
      </div>
    </div>
  )
}

export default Sidebar
