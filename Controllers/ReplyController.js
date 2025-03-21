const Reply = require("../Models/ReplyModel");
const mongoose = require("mongoose");

// Get All Replies
const getAllReplies = async (req, res, next) => {
    try {
        const replies = await Reply.find();

        if (!replies || replies.length === 0) {
            return res.status(404).json({
                message: "No replies found",
            });
        }

        return res.status(200).json({ replies });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error retrieving replies",
            error: err.message,
        });
    }
};

// Delete Reply
const deleteReply = async (req, res, next) => {
    const id = req.params.id;

    try {
        const reply = await Reply.findByIdAndDelete(id);

        if (!reply) {
            return res.status(404).json({ message: "Reply not found" });
        }

        return res.status(200).json({
            message: "Reply deleted successfully",
            reply,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error deleting reply",
            error: err.message,
        });
    }
};

// Update Reply
const updateReply = async (req, res, next) => {
    const id = req.params.id;
    const { relatedTickets, description, creator } = req.body;

    try {
        const reply = await Reply.findByIdAndUpdate(id, { relatedTickets, description, creator }, { new: true, runValidators: true });

        if (!reply) {
            return res.status(404).json({ message: "Reply not found" });
        }

        return res.status(200).json({
            message: "Reply updated successfully",
            reply,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error updating reply",
            error: err.message,
        });
    }
};

// Get Reply By ID
const getReplyById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const reply = await Reply.findById(id);

        if (!reply) {
            return res.status(404).json({ message: "Reply not found" });
        }

        return res.status(200).json({ reply });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error retrieving reply",
            error: err.message,
        });
    }
};

// Add Reply
const addReply = async (req, res) => {
    try {
        const { relatedTickets, description, creator } = req.body;
        const newReply = new Reply({ relatedTickets, description, creator });
        await newReply.save();
        res.status(201).json(newReply);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Exports
exports.getAllReplies = getAllReplies;
exports.deleteReply = deleteReply;
exports.updateReply = updateReply;
exports.getReplyById = getReplyById;
exports.addReply = addReply;
