import jwt from "jsonwebtoken"

const gettokenandsetcookie=(userID,res)=>{
    const token = jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        // sameSite:"none",
        sameSite:"lax",
        secure: process.env.NODE_ENV === "production",
        path:"/",
    })
    console.log("cookie set");
}

export default gettokenandsetcookie;
