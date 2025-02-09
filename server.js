const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./Routes/UserRoutes.js");

const app = express();

//Middleware
<<<<<<< HEAD
app.use(express.json());
=======
>>>>>>> 877ed9eaf9a23c2a416d4e57033ff26834e36fe1
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
