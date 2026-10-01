const studySessionModel = require("../models/studySession.model");


// ==========================================
// CREATE STUDY SESSION
// ==========================================

async function createStudySession(req, res) {

    try {

        // User ID comes from authentication middleware
        const userId = req.user.id;


        const {
            mode,
            durationSeconds
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!mode || !durationSeconds) {

            return res.status(400).json({
                message:
                    "Mode and duration are required."
            });
        }


        // ==========================================
        // CREATE SESSION
        // ==========================================

        const studySession =
            await studySessionModel.create({

                user: userId,

                mode: mode,

                durationSeconds:
                    Number(durationSeconds),

                completedAt: new Date()
            });


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(201).json({

            message:
                "Study session saved successfully.",

            studySession
        });

    } catch (error) {

        console.error(
            "CREATE STUDY SESSION ERROR:",
            error
        );

        return res.status(500).json({

            message:
                "Unable to save study session."
        });
    }
}


// ==========================================
// GET TODAY'S STUDY SESSIONS
// ==========================================

async function getTodayStudySessions(req, res) {
    try {
        res.set("Cache-Control", "no-store");

        const userId = req.user.id;
        // ==========================================
        // TODAY'S DATE RANGE
        // ==========================================

        const startOfDay = new Date();

        startOfDay.setHours(
            0,
            0,
            0,
            0
        );


        const endOfDay = new Date();

        endOfDay.setHours(
            23,
            59,
            59,
            999
        );


        // ==========================================
        // FIND USER'S SESSIONS FOR TODAY
        // ==========================================

        const sessions =
            await studySessionModel.find({

                user: userId,

                completedAt: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }

            }).sort({
                completedAt: -1
            });


        // ==========================================
        // CALCULATE TOTAL STUDY TIME
        // ==========================================

        const totalStudySeconds =
            sessions.reduce(
                (total, session) => {

                    return total +
                        session.durationSeconds;

                },
                0
            );


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(200).json({

            totalStudySeconds,

            sessionCount:
                sessions.length,

            sessions

        });

    } catch (error) {

        console.error(
            "GET TODAY STUDY SESSIONS ERROR:",
            error
        );

        return res.status(500).json({

            message:
                "Unable to load today's study sessions."

        });
    }
}


module.exports = {
    createStudySession,
    getTodayStudySessions
};