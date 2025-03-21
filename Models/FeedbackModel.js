const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId for relational mapping
        ref: "UserModel", // Reference the UserModel
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
