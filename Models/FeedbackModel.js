const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    feedbackText: {
        type: String,
        required: true,
        minlength: 5,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
