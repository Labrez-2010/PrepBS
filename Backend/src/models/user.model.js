const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    school: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;