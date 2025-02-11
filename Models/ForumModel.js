const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ForumPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['general', 'technical', 'feature-request', 'bug-report', 'announcement']
    },
    tags: [{
        type: String
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    comments: [CommentSchema],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    views: {
        type: Number,
        default: 0
    },
    isSticky: {
        type: Boolean,
        default: false
    },
    isLocked: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model("ForumPost", ForumPostSchema); 