import React, { useEffect, useState } from "react";

const STUDY_SESSION_API_URL =
    "http://localhost:3000/api/study-sessions";


const STUDY_MODES = {

    pomodoro: {
        name: "POMODORO",
        studyMinutes: 25, 
        breakMinutes: 5
    },

    focus: {
        name: "FOCUS",
        studyMinutes: 50,
        breakMinutes: 10
    },

    deepFocus: {
        name: "DEEP FOCUS",
        studyMinutes: 90,
        breakMinutes: 15
    }

};


function StudyClock({
    dailyTargetHours,
    todayStudySeconds,
    onStudySessionComplete
}) {

    const [selectedMode, setSelectedMode] =
        useState("pomodoro");

    const [phase, setPhase] =
        useState("study");

    const [secondsRemaining, setSecondsRemaining] =
        useState(
            STUDY_MODES.pomodoro.studyMinutes * 60
        );

    const [isRunning, setIsRunning] =
        useState(false);

    const [completedSessions, setCompletedSessions] =
        useState(0);


    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (seconds) => {

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;

    };


    // ==========================================
    // SAVE COMPLETED SESSION
    // ==========================================

    const saveStudySession = async (
        studySeconds
    ) => {

        const token =
            localStorage.getItem("prepbs_token");

        if (!token) {

            console.error(
                "No authentication token found."
            );

            return;

        }


        try {

            const response = await fetch(
                STUDY_SESSION_API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        mode: selectedMode,

                        durationSeconds:
                            studySeconds
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to save study session."
                );

            }


            console.log(
                "STUDY SESSION SAVED:",
                data
            );


        } catch (error) {

            console.error(
                "SAVE STUDY SESSION ERROR:",
                error
            );

        }

    };


    // ==========================================
    // START / PAUSE
    // ==========================================

    const handleStartPause = () => {

        setIsRunning(
            previous =>
                !previous
        );

    };


    // ==========================================
    // RESET
    // ==========================================

    const handleReset = () => {

        setIsRunning(false);

        setPhase("study");

        setCompletedSessions(0);

        setSecondsRemaining(
            STUDY_MODES[selectedMode]
                .studyMinutes * 60
        );

    };


    // ==========================================
    // CHANGE MODE
    // ==========================================

    const handleModeChange = (event) => {

        const newMode =
            event.target.value;


        setSelectedMode(newMode);

        setIsRunning(false);

        setPhase("study");

        setCompletedSessions(0);

        setSecondsRemaining(
            STUDY_MODES[newMode]
                .studyMinutes * 60
        );

    };


    // ==========================================
    // TIMER ENGINE
    // ==========================================

    useEffect(() => {

        if (!isRunning) {
            return;
        }


        const timer =
            setInterval(() => {

                setSecondsRemaining(
                    (previousSeconds) => {


                        // ==================================
                        // COUNTDOWN
                        // ==================================

                        if (previousSeconds > 1) {

                            return previousSeconds - 1;

                        }


                        // ==================================
                        // STUDY FINISHED
                        // ==================================

                        if (phase === "study") {

                            const studySeconds =
                                STUDY_MODES[
                                    selectedMode
                                ].studyMinutes * 60;


                            // Update completed session count
                            setCompletedSessions(
                                previous =>
                                    previous + 1
                            );


                            // Update Dashboard
                            if (
                                onStudySessionComplete
                            ) {

                                onStudySessionComplete(
                                    studySeconds
                                );

                            }


                            // Save to MongoDB
                            saveStudySession(
                                studySeconds
                            );


                            // Move to break
                            setPhase("break");


                            return (
                                STUDY_MODES[
                                    selectedMode
                                ].breakMinutes * 60
                            );

                        }


                        // ==================================
                        // BREAK FINISHED
                        // ==================================

                        setPhase("study");


                        return (
                            STUDY_MODES[
                                selectedMode
                            ].studyMinutes * 60
                        );

                    }
                );

            }, 1000);


        return () => {

            clearInterval(timer);

        };

    }, [
        isRunning,
        phase,
        selectedMode,
        onStudySessionComplete
    ]);


    // ==========================================
    // CURRENT MODE
    // ==========================================

    const currentMode =
        STUDY_MODES[selectedMode];


    // ==========================================
    // TODAY'S STUDY HOURS
    // ==========================================

    const todayStudyHours =
        todayStudySeconds / 3600;


    // ==========================================
    // DAILY TARGET PROGRESS
    // ==========================================

    const dailyProgress =
        dailyTargetHours > 0
            ? Math.min(
                100,
                (todayStudyHours /
                    dailyTargetHours) * 100
            )
            : 0;


    // ==========================================
    // UI
    // ==========================================

    return (

        <section className="clock-section">


            {/* ==================================
                CLOCK HEADER
            ================================== */}

            <div className="clock-header">

                <div>

                    <p className="card-label">
                        FOCUS SESSION
                    </p>

                    <h2>

                        {phase === "study"
                            ? "Ready to study?"
                            : "Take a short break."}

                    </h2>

                </div>


                <select
                    className="mode-selector"
                    value={selectedMode}
                    onChange={handleModeChange}
                    disabled={isRunning}
                >

                    <option value="pomodoro">
                        Pomodoro
                    </option>

                    <option value="focus">
                        Focus
                    </option>

                    <option value="deepFocus">
                        Deep Focus
                    </option>

                </select>

            </div>


            {/* ==================================
                CLOCK
            ================================== */}

            <div className="clock-container">

                <div className="clock">


                    {/* MODE */}

                    <span className="clock-mode">

                        {phase === "study"
                            ? currentMode.name
                            : "BREAK"}

                    </span>


                    {/* TIME */}

                    <div className="clock-time">

                        {formatTime(
                            secondsRemaining
                        )}

                    </div>


                    {/* STATUS */}

                    <span className="clock-status">

                        {isRunning
                            ? phase === "study"
                                ? "Study session in progress"
                                : "Break in progress"
                            : "Ready to begin"}

                    </span>


                    {/* ACTIONS */}

                    <div className="clock-actions">

                        <button
                            type="button"
                            className="start-button"
                            onClick={handleStartPause}
                        >

                            {isRunning
                                ? "❚❚ Pause"
                                : "▶ Start Session"}

                        </button>


                        <button
                            type="button"
                            className="reset-button"
                            onClick={handleReset}
                        >

                            Reset

                        </button>

                    </div>


                    {/* SESSION COUNT */}

                    <div className="session-count">

                        {completedSessions}{" "}
                        study session
                        {completedSessions !== 1
                            ? "s"
                            : ""}{" "}
                        completed

                    </div>


                    {/* DAILY PROGRESS */}

                    <div className="clock-daily-progress">

                        <div className="clock-daily-progress-header">

                            <span>
                                Today's study
                            </span>

                            <strong>

                                {todayStudyHours.toFixed(1)}h
                                {" / "}
                                {dailyTargetHours || 0}h

                            </strong>

                        </div>


                        <div className="clock-daily-progress-bar">

                            <div
                                className="clock-daily-progress-fill"
                                style={{
                                    width:
                                        `${dailyProgress}%`
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}


export default StudyClock;