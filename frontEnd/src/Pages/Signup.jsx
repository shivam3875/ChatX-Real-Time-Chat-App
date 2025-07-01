import React from 'react'
import GenderCheckBox from '../Components/GenderCheckBox'
import { IoHandLeft } from 'react-icons/io5';
import useSignup from '../Components/hooks/useSignup';
import { AuthContext, useAuthContext } from '../Components/Context/AuthContext';
import { Navigate, NavLink } from 'react-router-dom';

const Signup = () => {
    const[inputs,setinputs]=React.useState({
        fullname:"",
        username:"",
        password:"",
        gender:"",
        confirmPassword:"",
    });

    const handlechange=(event)=>{
        const{name,value}=event.target;
        console.log(value);
        setinputs((i)=>{
            return(
                {...i,
                [name]:value,}
            )
        })
    }

    const {loading,signup} = useSignup();

    const handlesubmit= async (e)=>{
        e.preventDefault();
        await signup(inputs);
    }

    const handlegenderhange=(gen)=>{
        setinputs((i)=>{
            return(
                {...i,
                gender:gen,}
            )
        })
    }

    const {authUser}=useAuthContext()
    
  return (

    authUser ? <Navigate to="/" /> :

    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-50'>
                Sign up
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form onSubmit={handlesubmit}>
                <div>
                    <label className='label p-2' htmlFor="">
                        <span className='text-base label-text text-green-50'>Fullname</span>
                    </label>
                    <input type="text" onChange={handlechange} name='fullname' value={inputs.fullname} placeholder="Enter fullname" className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label className='label p-2' htmlFor="">
                        <span className='text-base label-text text-green-50'>Username</span>
                    </label>
                    <input type="text" onChange={handlechange} name='username' value={inputs.username} placeholder="Enter username" className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label className='label p-2' htmlFor="">
                        <span className='text-base label-text text-green-50'>Password</span>
                    </label>
                    <input type="password" onChange={handlechange} name='password' value={inputs.password} placeholder="Enter password" className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label className='label p-2' htmlFor="">
                        <span className='text-base label-text text-green-50'>Confirm Password</span>
                    </label>
                    <input type="text" onChange={handlechange} name='confirmPassword' value={inputs.confirmPassword} placeholder="confirm password" className="input input-bordered w-full max-w-xs" />
                </div>
                <GenderCheckBox oncheckboxchange={handlegenderhange} seletedgender={inputs.gender}/>
                <a className="text-green-50 hover:underline hover:text-blue-300 mt-2 inline-block" href='/login'>Already have an accoun ?</a>
                <div className=''>
                    <button className="btn input input-bordered w-full max-w-xs mt-2 text-blue-600">Sign up</button>
                </div>
            </form>
        </div>
    </div>    
  )
}

export default Signup
