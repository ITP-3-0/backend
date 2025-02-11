const express = require("express");
const router = express.Router();
const NotificationController = require("../Controllers/NotificationController");
const { authenticate, authorize } = require("../middleware/auth");

// User routes
router.get("/", authenticate, NotificationController.getUserNotifications);
router.post("/:notificationId/read", authenticate, NotificationController.markAsRead);
router.post("/read-all", authenticate, NotificationController.markAllAsRead);

// Admin routes
router.post("/", 
    authenticate, 
    authorize(['admin']), 
    NotificationController.createNotification
);
router.delete("/:notificationId", 
    authenticate, 
    authorize(['admin']), 
    NotificationController.deleteNotification
);
router.get("/stats", 
    authenticate, 
    authorize(['admin']), 
    NotificationController.getNotificationStats
);

module.exports = router; 