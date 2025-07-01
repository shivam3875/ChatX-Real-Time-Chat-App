import User from "../Models/userModel.js";
import bcrypt from "bcryptjs"
import gettokenandsetcookie from "../Utils/JWToken.js";


export const Register = async (req,res) =>{
    try{
        const {fullname,username,password,confirmPassword,gender} = req.body;

        if(password!==confirmPassword){
            return res.status(400).json({error:"passwords don't match"});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"username already exist"}); 
        }

        const boyimage=`https://avatar.iran.liara.run/public/boy?username=${username}t`
        const girlimage=`https://avatar.iran.liara.run/public/girl?username=${username}t`

        const salt =await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            username,
            password:hashpassword,
            gender,
            profilepic:gender==="male"? boyimage:girlimage,
        })

        if(newUser){
            gettokenandsetcookie(newUser._id,res);
            await newUser.save();
        }

        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilepic:newUser.profilepic,
        });
        
    }
    catch(err){
        console.log("error in register controler",err.message);
        res.status(500).json({error:"internal server error"});
    }
    
}

export const Login = async (req,res) =>{
    try{
        const {username,password} = req.body;

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({error:"username not exist"}); 
        }

        const isPasswordCorrect =await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({error:"password is incorrect"}); 
        }

        gettokenandsetcookie(user._id,res);
        
        res.status(201).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic,            
        });
        
    }
    catch(err){
        console.log("error in login controler",err.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const Logout = (req,res) =>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"})
    }
    catch(err){
        console.log("error in login controler",err.message);
        res.status(500).json({error:"internal server error"});
    }
}
