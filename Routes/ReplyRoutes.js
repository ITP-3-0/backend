const express = require("express");
const replyRouter = express.Router();
const ReplyController = require("../Controllers/ReplyController");

replyRouter.get("/", ReplyController.getAllReplies);
replyRouter.delete("/:id", ReplyController.deleteReply);
replyRouter.patch("/:id", ReplyController.updateReply);
replyRouter.get("/:id", ReplyController.getReplyById);
replyRouter.post("/", ReplyController.addReply);

module.exports = replyRouter;
