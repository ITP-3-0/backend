const express = require("express");
const router = express.Router();

// Insert Controller
const NotificationController = require("../Controllers/NotificationController");

router.get("/", NotificationController.getAllNotifications);
router.post("/", NotificationController.addNotification);
router.get("/:id", NotificationController.getNotificationById); // Route to get a notification by ID
router.put("/:id", NotificationController.updateNotification); // Route to update a notification
router.delete("/:id", NotificationController.deleteNotification);
router.get("/user/notifications", NotificationController.getNotificationsForUser); // Route to get notifications for a specific user
router.put("/read/:id", NotificationController.markNotificationAsRead); // Route to mark a notification as read

// Export
module.exports = router;
