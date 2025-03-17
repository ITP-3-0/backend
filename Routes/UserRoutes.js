const express = require("express");
const userRouter = express.Router();

//Insert Model
const User = require("../Models/UserModel");
//Insert Controller
const UserController = require("../Controllers/UserController");

userRouter.get("/", UserController.getAllUsers);
userRouter.post("/", UserController.addUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

//export
module.exports = userRouter;
