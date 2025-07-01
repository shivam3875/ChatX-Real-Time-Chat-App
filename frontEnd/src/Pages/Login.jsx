import React, { useState } from 'react'
import useLogin from '../Components/hooks/useLogin';
import { useAuthContext } from '../Components/Context/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {

    const [credentials,setCredentials]=useState({
        username:"",
        password:"",
    })

    const handlechange=(event)=>{
        const {name,value} = event.target;

        setCredentials((i)=>{
            return ({
                ...i,
                [name]:value,
            })
        })
    }

    const {loading,login}=useLogin();

    const handlesubmit= async (e)=>{
        e.preventDefault();
        await login(credentials);
    }

    const {authUser}=useAuthContext();

  return (

    authUser ? <Navigate to="/" /> :

    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-50'>
                Login
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form onSubmit={handlesubmit}>
                <div>
                    <label className='label p-2' htmlFor="">
                        <span className='text-base label-text text-green-50'>Username</span>
                    </label>
                    <input type="text" placeholder="Enter username" onChange={handlechange} name='username' value={credentials.username} className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label className='label p-2' htmlFor="">
                        <span className='text-base label-text text-green-50'>Password</span>
                    </label>
                    <input type="password" placeholder="Enter password" onChange={handlechange}  name='password' value={credentials.password} className="input input-bordered w-full max-w-xs" />
                </div>
                <a className="text-green-50 hover:underline hover:text-blue-300 mt-2 inline-block" href='/signup'>Don't have an accoun ?</a>
                <div className=''>
                    <button className="btn input input-bordered w-full max-w-xs mt-2 text-blue-600">Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;
