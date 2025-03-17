const Notification = require("../Models/NotificationsModel");
//display all notifications
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

//data insertion
const addNotification = async (req, res, next) => {
    const { title, message } = req.body;
    let notification;
    try {
        notification = new Notification({ title, message });
        await notification.save();
    } catch (err) {
        console.log(err);
    }

    //not insert notification
    if (!notification) {
        res.status(404).json({ message: "Unable to add notification" });
    }

    return res.status(200).json(notification);
};

//display data by id
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

//update a notification
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

//delete a notification
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

module.exports = {
    getAllNotifications,
    addNotification,
    getNotificationById,
    updateNotification,
    deleteNotification
};