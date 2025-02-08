const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./Routes/UserRoutes.js");

const app = express();

//Middleware
app.use(express.json());
app.use("/users", router);

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
