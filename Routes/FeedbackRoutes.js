const express = require("express");
const feedbackRouter = express.Router();
const FeedbackController = require("../Controllers/FeedbackController");

feedbackRouter.get("/", FeedbackController.getAllFeedback);
feedbackRouter.post("/", FeedbackController.addFeedback);
feedbackRouter.get("/:id", FeedbackController.getFeedbackById);
feedbackRouter.put("/:id", FeedbackController.updateFeedback);
feedbackRouter.delete("/:id", FeedbackController.deleteFeedback);

module.exports = feedbackRouter;
