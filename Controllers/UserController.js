const User = require("../Models/UserModel");

// Display all users
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

// Data insertion
const addUser = async (req, res, next) => {
    const { _id, username, censusNo, email, role } = req.body;
    let user;
    try {
        user = new User({ _id, username, censusNo, email, role });
        await user.save();
        console.log("User added successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding user", error: err.message });
    }

    // If user is not created
    if (!user) {
        return res.status(404).json({ message: "Unable to add user" });
    }

    return res.status(200).json(user);
};

//display data by id
const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        console.log(err);
    }

    // If no user is found, return a 404 status code
    if (!user) {
        res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(user);
};

// Update a user
const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { username, censusNo, role } = req.body;
    let user;
    try {
        user = await User.findByIdAndUpdate(userId, { username, censusNo, role }, { new: true, runValidators: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating user", error: err.message });
    }

    // If no user is found
    if (!user) {
        return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(user);
};

//delete a user
const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(userId);
    } catch (err) {
        console.log(err);
    }

    // If no user is found, return a 404 status code
    if (!user) {
        res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
};
