const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const jwtSecret = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    try {
        if (!jwtSecret) {
            return res.status(500).json({
                message: "JWT secret is not configured"
            });
        }

        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        // Check Bearer token
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Authentication token missing"
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            jwtSecret
        );

        // Find user
        const user = await userModel.findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists"
            });
        }

        // Attach user to request
        req.user = user;

        // Continue to controller
        next();

    } catch (error) {
        console.error(error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = authMiddleware;

