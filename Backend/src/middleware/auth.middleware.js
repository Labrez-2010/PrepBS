const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const jwtSecret = process.env.JWT_SECRET;


// ==========================================
// AUTH MIDDLEWARE
// ==========================================

async function authMiddleware(req, res, next) {

    try {

        // ------------------------------------------
        // Check JWT secret
        // ------------------------------------------

        if (!jwtSecret) {
            return res.status(500).json({
                message: "JWT secret is not configured"
            });
        }


        // ------------------------------------------
        // Get JWT from Authorization header
        // ------------------------------------------

        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];


        // ------------------------------------------
        // Check token
        // ------------------------------------------

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }


        // ------------------------------------------
        // Verify JWT
        // ------------------------------------------

        const decoded = jwt.verify(
            token,
            jwtSecret
        );


        // ------------------------------------------
        // Find user
        // ------------------------------------------

        const user = await userModel
            .findById(decoded.id)
            .select("-password");


        // ------------------------------------------
        // User doesn't exist
        // ------------------------------------------

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists"
            });
        }


        // ------------------------------------------
        // Attach user to request
        // ------------------------------------------

        req.user = user;


        // ------------------------------------------
        // Continue to route
        // ------------------------------------------

        next();

    } catch (error) {

        console.error(
            "AUTH MIDDLEWARE ERROR:",
            error
        );


        // ------------------------------------------
        // Invalid JWT
        // ------------------------------------------

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token"
            });
        }


        // ------------------------------------------
        // Expired JWT
        // ------------------------------------------

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired"
            });
        }


        // ------------------------------------------
        // Other errors
        // ------------------------------------------

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = authMiddleware;