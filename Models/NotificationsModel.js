const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["ticket", "forum", "system", "alert"],
        required: true,
        default: "alert",
    },
    isEmailable: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "low",
    },
    targetUsers: [
        {
            type: String, // Store usernames instead of ObjectId
        },
    ],
    targetRoles: [
        {
            type: String,
            enum: ["client", "agent_l1", "agent_l2", "admin"],
        },
    ],
    read: [
        {
            user: {
                type: String, // Store usernames instead of ObjectId
            },
            readAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from creation
    },
});

module.exports = mongoose.model("Notification", NotificationSchema);
