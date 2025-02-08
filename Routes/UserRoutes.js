const express = require("express");
const router = express.Router();

//Insert Model
const User = require("../Models/UserModel");
//Insert Controller
const UserController = require("../Controllers/UserController");

router.get("/", UserController.getAllUsers);

//export
module.exports = router;
