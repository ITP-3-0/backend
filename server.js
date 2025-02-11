const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./Routes/UserRoutes.js");
const forumRoutes = require("./Routes/ForumRoutes");
const notificationRoutes = require("./Routes/NotificationRoutes");
const agentAssignmentRoutes = require("./Routes/AgentAssignmentRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use("/users", router);
app.use("/api/forum", forumRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/agent-assignments", agentAssignmentRoutes);

// MongoDB connection
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .then(() => {
        app.listen(process.env.PORT);
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
    .catch((err) => {
        console.log(err);
    });
