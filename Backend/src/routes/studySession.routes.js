const express = require("express");

const studySessionController =
    require("../controllers/studySession.controller");

const authMiddleware =
    require("../middleware/auth.middleware");

const router = express.Router();


// ==========================================
// CREATE STUDY SESSION
// ==========================================

router.post(
    "/",
    authMiddleware,
    studySessionController.createStudySession
);


// ==========================================
// GET TODAY'S STUDY SESSIONS
// ==========================================

router.get(
    "/today",
    authMiddleware,
    studySessionController.getTodayStudySessions
);


module.exports = router;