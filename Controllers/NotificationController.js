const Notification = require("../Models/NotificationModel");
const User = require("../Models/UserModel");

// Create notification
const createNotification = async (req, res) => {
    try {
        const {
            title,
            message,
            type,
            priority,
            targetUsers,
            targetRoles,
            expiresAt
        } = req.body;

        const notification = new Notification({
            title,
            message,
            type,
            priority,
            targetUsers,
            targetRoles,
            expiresAt
        });

        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get notifications for current user
const getUserNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 10, type, read } = req.query;
        const userId = req.user.id;
        const userRole = req.user.role;

        // Build filter query
        const filter = {
            $or: [
                { targetUsers: userId },
                { targetRoles: userRole }
            ]
        };

        if (type) filter.type = type;
        if (read === 'true') {
            filter['read.user'] = userId;
        } else if (read === 'false') {
            filter['read.user'] = { $ne: userId };
        }

        // Get notifications
        const notifications = await Notification.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Notification.countDocuments(filter);

        res.status(200).json({
            notifications,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark notification as read
const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userId = req.user.id;

        const notification = await Notification.findById(notificationId);
        
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        // Check if already read
        const alreadyRead = notification.read.some(r => r.user.toString() === userId);
        
        if (!alreadyRead) {
            notification.read.push({
                user: userId,
                readAt: new Date()
            });
            await notification.save();
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        const notifications = await Notification.find({
            $or: [
                { targetUsers: userId },
                { targetRoles: userRole }
            ],
            'read.user': { $ne: userId }
        });

        const updatePromises = notifications.map(notification => {
            notification.read.push({
                user: userId,
                readAt: new Date()
            });
            return notification.save();
        });

        await Promise.all(updatePromises);

        res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete notification (admin only)
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        
        const notification = await Notification.findByIdAndDelete(notificationId);
        
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get notification statistics (admin only)
const getNotificationStats = async (req, res) => {
    try {
        const stats = await Notification.aggregate([
            {
                $group: {
                    _id: '$type',
                    total: { $sum: 1 },
                    unread: {
                        $sum: {
                            $cond: [{ $eq: [{ $size: "$read" }, 0] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNotification,
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationStats
}; 