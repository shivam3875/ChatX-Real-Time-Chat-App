import jwt from "jsonwebtoken"

const gettokenandsetcookie=(userID,res)=>{
    const token = jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"none",
        secure: process.env.NODE_ENV === "production",
        path:"/",
    })
}

export default gettokenandsetcookie;
