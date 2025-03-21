const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    relatedTickets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Reply", ReplySchema);
