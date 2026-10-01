const onboardingModel = require("../models/onboarding.model");


// ==========================================
// CREATE / UPDATE ONBOARDING
// ==========================================

async function createOnboarding(req, res) {
    try {

        // ------------------------------------------
        // Get logged-in user's ID
        // ------------------------------------------

        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({
                message: "User authentication required"
            });
        }


        // ------------------------------------------
        // Get data from frontend
        // ------------------------------------------

        const {
            examCategory,
            exam,
            examDate,
            selectedSubject,
            preparationLevel,
            dailyStudyHour
        } = req.body;


        // ------------------------------------------
        // Validation
        // ------------------------------------------

        if (!examCategory) {
            return res.status(400).json({
                message: "Exam category is required"
            });
        }

        if (!exam) {
            return res.status(400).json({
                message: "Exam name is required"
            });
        }

        if (!examDate) {
            return res.status(400).json({
                message: "Exam date is required"
            });
        }

        if (
            !Array.isArray(selectedSubject) ||
            selectedSubject.length === 0
        ) {
            return res.status(400).json({
                message: "At least one subject is required"
            });
        }

        if (!preparationLevel) {
            return res.status(400).json({
                message: "Preparation level is required"
            });
        }

        if (
            dailyStudyHour === undefined ||
            dailyStudyHour === null
        ) {
            return res.status(400).json({
                message: "Daily study hours are required"
            });
        }


        // ------------------------------------------
        // Create or update onboarding
        // ------------------------------------------

        const onboarding =
            await onboardingModel.findOneAndUpdate(

                // Find onboarding belonging to
                // the logged-in user
                {
                    user: userId
                },

                // Data to save
                {
                    user: userId,
                    examCategory,
                    exam,
                    examDate,
                    selectedSubject,
                    preparationLevel,
                    dailyStudyHour
                },

                // Options
                {
                    new: true,
                    upsert: true,
                    runValidators: true
                }
            );


        // ------------------------------------------
        // Response
        // ------------------------------------------

        return res.status(200).json({
            message: "Onboarding saved successfully",
            onboarding
        });

    } catch (error) {

        console.error(
            "CREATE / UPDATE ONBOARDING ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



// ==========================================
// GET MY ONBOARDING
// ==========================================

async function getMyOnboarding(req, res) {
    try {

        // ------------------------------------------
        // Get logged-in user's ID
        // ------------------------------------------

        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({
                message: "User authentication required"
            });
        }


        // ------------------------------------------
        // Find user's onboarding
        // ------------------------------------------

        const onboarding =
            await onboardingModel.findOne({
                user: userId
            });


        // ------------------------------------------
        // Onboarding doesn't exist
        // ------------------------------------------

        if (!onboarding) {
            return res.status(404).json({
                message: "Onboarding not completed"
            });
        }


        // ------------------------------------------
        // Return onboarding
        // ------------------------------------------

        return res.status(200).json({
            message: "Onboarding found",
            onboarding
        });

    } catch (error) {

        console.error(
            "GET ONBOARDING ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    createOnboarding,
    getMyOnboarding
};