import User from "../Models/userModel.js";
import jwt from "jsonwebtoken"

const protectRoute=async(req,res,next)=>{
    try {
        // console.log("hellllllllo :",req.headers.cookie.replace("jwt=",""))
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader) {
            return res.status(401).json({ error: "unauthorized - No Token Provided" });
        }
        const token = cookieHeader.replace("jwt=", "");

        if(!token){
            return res.status(401).json({error:"unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"unauthorized - invalid Token"})
        }

        const user = await User.findById(decoded.userID).select("-password")

        if(!user){
            return res.status(401).json({error:"user not found"})
        }

        req.user=user

        next();
         
        
    } catch (error) {
        console.log("Error in protectRoute middleware:",error.message)
        res.status(500).json({Error:"internal server error"});
    }
}

export default protectRoute;