const express = require("express");
const router = express.Router();

//Insert Controller
const NotificationController = require("../Controllers/NotificationController");

router.get("/", NotificationController.getAllNotifications);
router.post("/", NotificationController.addNotification);
router.delete("/:id", NotificationController.deleteNotification);

//export
module.exports = router;
