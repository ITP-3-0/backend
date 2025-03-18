const Notification = require("../Models/NotificationsModel");

// display all notifications
const getAllNotifications = async (req, res, next) => {
    let Notifications;
    try {
        Notifications = await Notification.find();
    } catch (err) {
        console.log(err);
    }

    // If no notifications are found, return a 404 status code
    if (!Notifications) {
        res.status(404).json({ message: "No notifications found" });
    }

    return res.status(200).json(Notifications);
};

// data insertion
const addNotification = async (req, res, next) => {
    const { title, message } = req.body;
    let notification;
    try {
        notification = new Notification({ title, message });
        await notification.save();
    } catch (err) {
        console.log(err);
    }

    // not insert notification
    if (!notification) {
        res.status(404).json({ message: "Unable to add notification" });
    }

    return res.status(200).json(notification);
};

// display data by id
const getNotificationById = async (req, res, next) => {
    const notificationId = req.params.id;
    let notification;
    try {
        notification = await Notification.findById(notificationId);
    } catch (err) {
        console.log(err);
    }

    // If no notification is found, return a 404 status code
    if (!notification) {
        res.status(404).json({ message: "No notification found" });
    }

    return res.status(200).json(notification);
};

// update a notification
const updateNotification = async (req, res, next) => {
    const notificationId = req.params.id;
    const { title, description } = req.body;
    let notification;
    try {
        notification = await Notification.findById(notificationId);
        notification.title = title;
        notification.description = description;
        await notification.save();
    } catch (err) {
        console.log(err);
    }

    // If no notification is found, return a 404 status code
    if (!notification) {
        res.status(404).json({ message: "No notification found" });
    }

    return res.status(200).json(notification);
};

// delete a notification
const deleteNotification = async (req, res, next) => {
    const notificationId = req.params.id;
    let notification;
    try {
        notification = await Notification.findByIdAndDelete(notificationId);
    } catch (err) {
        console.log(err);
    }

    // If no notification is found, return a 404 status code
    if (!notification) {
        res.status(404).json({ message: "No notification found" });
    }

    return res.status(200).json(notification);
};

// get notifications for a specific user
const getNotificationsForUser = async (req, res, next) => {
    const userId = req.session.userId; // Get user ID from session
    const userRole = req.session.userRole; // Get user role from session
    let notifications;
    try {
        notifications = await Notification.find({
            $or: [
                { targetUsers: userId },
                { targetUsers: { $exists: true, $eq: [] } },
                { targetRoles: userRole },
                { targetRoles: { $exists: true, $eq: [] } },
            ],
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error retrieving notifications", error: err.message });
    }

    // If no notifications are found, return a 404 status code
    if (!notifications || notifications.length === 0) {
        return res.status(404).json({ message: "No notifications found" });
    }

    return res.status(200).json(notifications);
};

// mark a notification as read
const markNotificationAsRead = async (req, res, next) => {
    const notificationId = req.params.id;
    const userId = req.session.userId;
    let notification;
    try {
        notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        // Check if the user has already marked the notification as read
        const alreadyRead = notification.read.some((readEntry) => readEntry.user.toString() === userId);
        if (!alreadyRead) {
            notification.read.push({ user: userId, readAt: new Date() });
            await notification.save();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error marking notification as read", error: err.message });
    }

    return res.status(200).json(notification);
};



module.exports = {
    getAllNotifications,
    addNotification,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getNotificationsForUser,
    markNotificationAsRead,
};
