const Feedback = require("../Models/FeedbackModel");

// Get all feedback
const getAllFeedback = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find();
        if (!feedbacks || feedbacks.length === 0) {
            return res.status(404).json({ message: "No feedback found" });
        }
        return res.status(200).json(feedbacks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving feedback", error: err.message });
    }
};

// Add new feedback
const addFeedback = async (req, res, next) => {
    const { userId, feedbackText, rating } = req.body;
    try {
        const feedback = new Feedback({ userId, feedbackText, rating });
        const savedFeedback = await feedback.save();
        return res.status(201).json({ message: "Feedback added successfully", feedback: savedFeedback });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error adding feedback", error: err.message });
    }
};

// Get feedback by ID
const getFeedbackById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        return res.status(200).json(feedback);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving feedback", error: err.message });
    }
};

// Update feedback
const updateFeedback = async (req, res, next) => {
    const id = req.params.id;
    const { feedbackText, rating } = req.body;
    try {
        const feedback = await Feedback.findByIdAndUpdate(
            id,
            { feedbackText, rating },
            { new: true, runValidators: true }
        );
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        return res.status(200).json({ message: "Feedback updated successfully", feedback });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating feedback", error: err.message });
    }
};

// Delete feedback
const deleteFeedback = async (req, res, next) => {
    const id = req.params.id;
    try {
        const feedback = await Feedback.findByIdAndDelete(id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        return res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting feedback", error: err.message });
    }
};

module.exports = {
    getAllFeedback,
    addFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};
