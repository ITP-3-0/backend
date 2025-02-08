const User = require("../Models/UserModel");

const getAllUsers = async (req, res, next) => {
    let Users;
    try {
        Users = await User.find();
    } catch (err) {
        console.log(err);
    }

    // If no users are found, return a 404 status code
    if (!Users) {
        res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(Users);
};

exports.getAllUsers = getAllUsers;
