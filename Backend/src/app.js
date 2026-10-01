const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.route");
const onboardingRoutes = require("./routes/onboarding.route");
const studySessionRoutes = require("./routes/studySession.routes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true
        })
);

app.use(express.json());

app.use(cookieParser());

// ==========================================
// ROUTES
// ==========================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/onboarding",
    onboardingRoutes
);

app.use(
    "/api/study-sessions",
    studySessionRoutes
);

module.exports = app;