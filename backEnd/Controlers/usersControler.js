import User from "../Models/userModel.js";

export const getUsers = async (req,res) => {
    try {
        const currentUserId = req.user._id;
 
        const users = await User.find({_id:{$ne:currentUserId}}).select("-password");

        res.status(200).json(users);

    } catch (error) {
        console.log("error in getUsers controler",error.message);
        res.status(500).json({Error:"internal server error"});
    }
}