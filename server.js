const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./Routes/UserRoutes.js");
const notificationRouter = require("./Routes/NotificationRoutes.js");
const ticketRouter = require("./Routes/RaisingRoutes.js");
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
app.use(cors());
// Middleware
app.use(express.json());
app.use("/users", userRouter);
app.use("/tickets", ticketRouter);
app.use("/notifications", notificationRouter);
app.use('/api/schools', schoolRoutes);

app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Server Status</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        text-align: center;
                        padding: 50px;
                    }
                    h1 {
                        color: #4CAF50;
                    }
                    p {
                        font-size: 18px;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                <h1>✅ Server is Running!</h1>
                <p>Everything looks good. 🚀</p>
            </body>
        </html>
    `);
});

app.post("/github-webhook", (req, res) => {
    console.log("Received webhook data:", req.body);

    const branch = req.body.ref;
    if (branch === "refs/heads/master") {
        // Handle the update logic
        console.log("🔄 Change detected on master branch.");

        exec("git pull origin master && npm install && pm2 restart backend-app", (err, stdout, stderr) => {
            if (err) {
                console.error(`❌ Error: ${err.message}`);
                return res.status(500).send("Error updating.");
            }
            console.log(`✅ Git Pull Output: ${stdout}`);
            res.status(200).send("Updated successfully.");
        });
    } else {
        res.status(200).send("Not master branch.");
    }
});

// MongoDB Connection 
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on: http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });
