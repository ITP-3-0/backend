const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: { type: String, required: true },
    username: {
        type: String,
        required: true,
    },
    censusNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("UserModel", UserSchema);
