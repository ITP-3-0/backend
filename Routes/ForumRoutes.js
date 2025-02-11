const express = require("express");
const router = express.Router();
const ForumController = require("../Controllers/ForumController");
const { authenticate, authorize } = require("../middleware/auth");

// Public routes
router.get("/", ForumController.getPosts);
router.get("/:postId", ForumController.getPost);

// Authenticated routes
router.post("/", authenticate, ForumController.createPost);
router.post("/:postId/comments", authenticate, ForumController.addComment);
router.post("/:postId/like", authenticate, ForumController.toggleLike);

// Admin only routes
router.post("/:postId/sticky", 
    authenticate, 
    authorize(['admin']), 
    ForumController.toggleSticky
);
router.post("/:postId/lock", 
    authenticate, 
    authorize(['admin']), 
    ForumController.toggleLock
);

module.exports = router; 