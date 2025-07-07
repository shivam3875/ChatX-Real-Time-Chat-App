import { TiMessages } from "react-icons/ti";
import { useAuthContext } from './Context/AuthContext';

const Nsc = () => {

    const{authUser}=useAuthContext();

  return (
    <div className='text-6xl w-[600px] h-[520.8px] rounded-b-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex justify-center items-center align-middle'>
       <NoChatSelected name={authUser.fullname} />
    </div>
  )
}

export default Nsc


const NoChatSelected = ({name}) => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {name} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};