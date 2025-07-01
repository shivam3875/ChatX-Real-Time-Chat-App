
import React from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';

const useSignup = () => {
    const [loading,setloading]=React.useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({fullname,password,confirmPassword,username,gender}) =>{
        const success=handleInputErrors({fullname,password,confirmPassword,username,gender});
        if(!success) return;
        setloading(true);
        try{
            const res = await fetch("/api/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({fullname,password,confirmPassword,username,gender})
            })

            const data = await res.json();
            console.log(data);
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

    return {loading,signup};
};

export default useSignup

function handleInputErrors({fullname,password,confirmPassword,username,gender}){
    if(!fullname || !password || !confirmPassword || !username || !gender){
        toast.error("please fill the all feilds")
        return false;
    }

    if(password!==confirmPassword){
        toast.error("passwords do not match")
        return false;
    }

    if(password.length<6){
        toast.error("password must be atleast 6 characters")
        return false;
    }

    return true;
}
