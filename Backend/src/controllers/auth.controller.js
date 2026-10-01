const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = process.env.JWT_SECRET;


// =========================
// REGISTER
// =========================

async function registerUser(req, res) {
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
        // Get data from frontend
        // ------------------------------------------

        const {
            name,
            class: userClass,
            school,
            email,
            password
        } = req.body;


        // ------------------------------------------
        // Validate fields
        // ------------------------------------------

        if (
            !name ||
            !userClass ||
            !school ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // ------------------------------------------
        // Check existing user
        // ------------------------------------------

        const existingUser =
            await userModel.findOne({
                email: email.toLowerCase()
            });

        if (existingUser) {
            return res.status(409).json({
                message: "Account already exists"
            });
        }


        // ------------------------------------------
        // Hash password
        // ------------------------------------------

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // ------------------------------------------
        // Create user
        // ------------------------------------------

        const user =
            await userModel.create({
                name,
                class: userClass,
                school,
                email: email.toLowerCase(),
                password: hashedPassword
            });


        // ------------------------------------------
        // Create JWT
        // ------------------------------------------

        const token =
            jwt.sign(
                {
                    id: user._id
                },
                jwtSecret,
                {
                    expiresIn: "7d"
                }
            );


        // ------------------------------------------
        // Send response
        // ------------------------------------------

        return res.status(201).json({

            message:
                "Registered successfully",

            token: token,

            user: {
                id: user._id,
                name: user.name,
                class: user.class,
                school: user.school,
                email: user.email
            }

        });

    } catch (error) {

        console.error(
            "REGISTER ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Internal server error"
        });
    }
}


// =========================
// LOGIN
// =========================

async function loginUser(req, res) {
    try {

        // ------------------------------------------
        // Check JWT secret
        // ------------------------------------------

        if (!jwtSecret) {
            return res.status(500).json({
                message:
                    "JWT secret is not configured"
            });
        }


        // ------------------------------------------
        // Get login data
        // ------------------------------------------

        const {
            email,
            password
        } = req.body;


        // ------------------------------------------
        // Validate fields
        // ------------------------------------------

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required"
            });
        }


        // ------------------------------------------
        // Find user
        // ------------------------------------------

        const user =
            await userModel.findOne({
                email: email.toLowerCase()
            });


        // ------------------------------------------
        // User not found
        // ------------------------------------------

        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }


        // ------------------------------------------
        // Compare password
        // ------------------------------------------

        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        // ------------------------------------------
        // Wrong password
        // ------------------------------------------

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }


        // ------------------------------------------
        // Create JWT
        // ------------------------------------------

        const token =
            jwt.sign(
                {
                    id: user._id
                },
                jwtSecret,
                {
                    expiresIn: "7d"
                }
            );


        // ------------------------------------------
        // Send response
        // ------------------------------------------

        return res.status(200).json({

            message:
                "Login successful",

            token: token,

            user: {
                id: user._id,
                name: user.name,
                class: user.class,
                school: user.school,
                email: user.email
            }

        });

    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Internal server error"
        });
    }
}


// =========================
// LOGOUT
// =========================

async function logoutUser(req, res) {
    try {

        // ------------------------------------------
        // JWT is stored on the client.
        // The frontend will remove the token.
        // ------------------------------------------

        return res.status(200).json({
            message:
                "Logged out successfully"
        });

    } catch (error) {

        console.error(
            "LOGOUT ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Internal server error"
        });
    }
}


// =========================
// EXPORT
// =========================

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};