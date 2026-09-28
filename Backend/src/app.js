const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.route");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;