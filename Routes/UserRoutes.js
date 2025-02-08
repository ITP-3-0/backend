const express = require("express");
const router = express.Router();

//Insert Model
const User = require("../Models/UserModel");
//Insert Controller
const UserController = require("../Controllers/UserController");

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUser);
router.get("/:id", UserController.getUserById);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

//export
module.exports = router;
