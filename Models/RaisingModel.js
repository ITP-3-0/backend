const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// // Define enums (mirroring the Priority and Status enums from types/enums)
// const PriorityEnum = {
//     LOW: "low",
//     MEDIUM: "medium",
//     HIGH: "high",
// };

// const StatusEnum = {
//     OPEN: "open",
//     IN_PROGRESS: "in_progress",
//     CLOSED: "closed",
// };

// Document Schema (based on DocumentDto)
// const DocumentSchema = new Schema({
//     filename: {
//         type: String,
//         required: true,
//     },
//     path: {
//         type: String,
//         required: true,
//     },
//     size: {
//         type: Number,
//         required: true,
//     },
// });

// Main Raising Schema
const RaisingSchema = new Schema({
    // ticket_id: {
    //     type: String,
    //     unique: true,
    //     default: function () {
    //         return `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    //     },
    // },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        // enum: Object.values(PriorityEnum),
        required: true,
    },
    // status: {
    //     type: String,
    //     // enum: Object.values(StatusEnum),
    //     // default: StatusEnum.OPEN,
    // },
    created_at: {
        type: Date,
        default: Date.now,
    },
    deviceName: {
        type: String,
        required: true,
    },
    distributionDate: {
        type: String,
        required: true,
    },
    warrantyPeriod: {
        type: Number,
        required: true,
    },
    agentName: {
        type: String,
        required: true,
    },
});

// Export the model
module.exports = mongoose.model("RaisingModel", RaisingSchema);
