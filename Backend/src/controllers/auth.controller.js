const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = process.env.JWT_SECRET;

// =========================
// REGISTER
// =========================

async function registerUser(req, res) {
    try {
        if (!jwtSecret) {
            return res.status(500).json({
                message: "JWT secret is not configured"
            });
        }

        const {
            name,
            class: userClass,
            school,
            email,
            password
        } = req.body;

        // Check if email already exists
        const alreadyHaveProfile = await userModel.findOne({
            email
        });

        if (alreadyHaveProfile) {
            return res.status(409).json({
                message: "Account already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            name,
            class: userClass,
            school,
            email,
            password: hashedPassword
        });

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            jwtSecret,
            {
                expiresIn: "7d"
            }
        );

        return res.status(201).json({
            message: "Registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                class: user.class,
                school: user.school,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// =========================
// LOGIN
// =========================

async function loginUser(req, res) {
    try {
        if (!jwtSecret) {
            return res.status(500).json({
                message: "JWT secret is not configured"
            });
        }

        const {
            email,
            password
        } = req.body;

        // Find user
        const user = await userModel.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            jwtSecret,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                class: user.class,
                school: user.school,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    registerUser,
    loginUser
};

