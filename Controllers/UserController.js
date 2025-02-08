const User = require("../Models/UserModel");
//display all users
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

//data insertion
const addUser = async (req, res, next) => {
    const { name, username, password, role } = req.body;
    let user;
    try {
        user = new User({ name, username, password, role });
        await user.save();
    } catch (err) {
        console.log(err);
    }

    //not insert user
    if (!user) {
        res.status(404).json({ message: "Unable to add user" });
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

//update a user
const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, username, password, role } = req.body;
    let user;
    try {
        user = await User.findByIdAndUpdate(userId, { name, username, password, role });
        user = await user.save();
    } catch (err) {
        console.log(err);
    }

    // If no user is found, return a 404 status code
    if (!user) {
        res.status(404).json({ message: "No user found" });
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

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
