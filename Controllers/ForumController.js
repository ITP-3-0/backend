const ForumPost = require("../Models/ForumModel");
const User = require("../Models/UserModel");

// Create a new forum post
const createPost = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const post = new ForumPost({
            title,
            content,
            category,
            tags,
            author: req.user.id
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all forum posts with filtering and pagination
const getPosts = async (req, res) => {
    try {
        const { category, tag, page = 1, limit = 10 } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (tag) filter.tags = tag;

        const posts = await ForumPost.find(filter)
            .populate('author', 'name username')
            .sort({ isSticky: -1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await ForumPost.countDocuments(filter);

        res.status(200).json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single post with comments
const getPost = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.postId)
            .populate('author', 'name username')
            .populate('comments.author', 'name username');

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Increment view count
        post.views += 1;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add comment to post
const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await ForumPost.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.isLocked) {
            return res.status(403).json({ message: "This post is locked" });
        }

        post.comments.push({
            content,
            author: req.user.id
        });

        post.updatedAt = Date.now();
        await post.save();

        // Notify post author of new comment
        const postAuthor = await User.findById(post.author);
        if (postAuthor && postAuthor.id !== req.user.id) {
            postAuthor.notifications.push({
                message: `New comment on your post: ${post.title}`
            });
            await postAuthor.save();
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Toggle like on post
const toggleLike = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.postId);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const likeIndex = post.likes.indexOf(req.user.id);
        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1);
        } else {
            post.likes.push(req.user.id);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin functions
const toggleSticky = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.postId);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.isSticky = !post.isSticky;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const toggleLock = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.postId);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.isLocked = !post.isLocked;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPost,
    addComment,
    toggleLike,
    toggleSticky,
    toggleLock
}; 