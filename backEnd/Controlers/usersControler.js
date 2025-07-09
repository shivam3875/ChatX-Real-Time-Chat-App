import User from "../Models/userModel.js";

export const getUsers = async (req,res) => {
    try {
        const currentUserId = req.user._id;
        const {searchString}=req.body;
 
        const users = await User.find({_id: { $ne: currentUserId },username: { $regex: `^${searchString}`, $options: "i" } }).select("-password"); // "i" for case-insensitive

        res.status(200).json(users);

    } catch (error) {
        console.log("error in getUsers controler",error.message);
        res.status(500).json({Error:"internal server error"});
    }
}