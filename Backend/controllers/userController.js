import Group from "../models/Group.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        // user.imageUrl = req.body.imageUrl || user.imageUrl;
        user.bio = req.body.bio || user.bio;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            bio: updatedUser.bio,
            token: generateToken(updatedUser._id)
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const fetchMemberDetails = async (req, res) => {
    try {
        const { ids } = req.body;
        const users = await User.find({ _id: { $in: ids } }).select("_id username");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user details" })
    }
}