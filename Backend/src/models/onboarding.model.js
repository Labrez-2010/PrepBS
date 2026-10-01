const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema(
    {
        // User who owns this onboarding
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        // Exam information
        examCategory: {
            type: String,
            required: true,
            trim: true
        },

        exam: {
            type: String,
            required: true,
            trim: true
        },

        examDate: {
            type: Date,
            required: true
        },

        selectedSubject: {
            type: [String],
            required: true,
            trim: true
        },

        // Preparation information
        preparationLevel: {
            type: String,
            required: true,
            trim: true
        },

        dailyStudyHour: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Onboarding",
    onboardingSchema
);