const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgentAssignmentSchema = new Schema({
    clientPattern: {
        type: String,
        required: true,
        unique: true,
        // Example: "001-099" or "1XX" or specific usernames like "001,002,003"
    },
    l1Agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    l2Agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AgentAssignment", AgentAssignmentSchema); 