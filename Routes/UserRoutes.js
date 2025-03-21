const express = require("express");
const userRouter = express.Router();

//Insert Controller
const UserController = require("../Controllers/UserController");

userRouter.get("/", UserController.getAllUsers);
userRouter.post("/", UserController.addUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

//export
module.exports = userRouter;
