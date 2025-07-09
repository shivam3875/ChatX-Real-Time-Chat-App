
import React from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';

const useLogin = () => {
    const [loading,setloading]=React.useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async ({password,username}) =>{
        const success=handleInputErrors({password,username});
        if(!success) return;
        setloading(true);
        try{
            const res = await fetch("https://chatx-real-time-chat-app-backend.onrender.com/api/login",{
            // const res = await fetch("http://localhost:5000/api/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({password,username}),
                credentials:"include",
            })

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);

        } catch(error){
            toast.error(error.message)
        }
        finally{
            setloading(false);
        }
    }

    return {loading,login};
};

export default useLogin

function handleInputErrors({password,username}){
    if(!password || !username){
        toast.error("please fill the all feilds")
        return false;
    }

    return true;
}
