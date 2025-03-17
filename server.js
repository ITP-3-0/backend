const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./Routes/UserRoutes.js");

const app = express();

// Middleware
app.use(express.json());

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

app.use("/users", router);

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
    });
