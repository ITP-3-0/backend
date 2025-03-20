const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Main Raising Schema
const RaisingSchema = new Schema({
    ticket_id: { type: String, unique: true, default: () => new mongoose.Types.ObjectId().toString() }, // Auto-generate unique ID
    title: { type: String, required: true },
    description: { type: String, required: true },
    deviceName: String,
    distributionDate: String,
    warrantyPeriod: String,
    agentName: String,
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    creator: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model("RaisingModel", RaisingSchema);
