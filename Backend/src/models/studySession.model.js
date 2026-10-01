const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        mode: {
            type: String,
            enum: [
                "pomodoro",
                "focus",
                "deepFocus"
            ],
            required: true
        },

        durationSeconds: {
            type: Number,
            required: true,
            min: 1
        },

        completedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "StudySession",
    studySessionSchema
);