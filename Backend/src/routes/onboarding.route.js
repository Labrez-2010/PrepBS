const express = require("express");

const {
    createOnboarding,
    getMyOnboarding
} = require("../controllers/onboarding.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();


// ==========================================
// ONBOARDING ROUTES
// ==========================================

// Create onboarding
router.post(
    "/",
    authMiddleware,
    createOnboarding
);


// Get logged-in user's onboarding
router.get(
    "/me",
    authMiddleware,
    getMyOnboarding
);


module.exports = router;