const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./Routes/UserRoutes.js");
const ticketRouter = require("./Routes/RaisingRoutes.js");

const app = express();

// Middleware
app.use(express.json());
app.use("/users", userRouter);
app.use("/tickets", ticketRouter); 

// MongoDB connection
mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("✅ Connected to MongoDB");

        // Start server after successful DB connection
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); 
    });
