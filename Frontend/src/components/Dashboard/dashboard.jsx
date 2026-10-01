import React, { useEffect, useState } from "react";
import "./dashboard.css";
import StudyClock from "./StudyClock";

const ONBOARDING_API_URL =
    `${import.meta.env.VITE_API_URL}/api/onboarding`;

const STUDY_SESSION_API_URL =
    `${import.meta.env.VITE_API_URL}/api/study-sessions`;

function Dashboard() {

    const [onboarding, setOnboarding] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Logged-in user
    const [user, setUser] = useState(null);

    // Profile menu
    const [profileOpen, setProfileOpen] = useState(false);

    // Today's completed study time
    const [todayStudySeconds, setTodayStudySeconds] =
        useState(0);


    // ==========================================
    // GET STORED USER
    // ==========================================

    useEffect(() => {

        const storedUser =
            localStorage.getItem("prepbs_user");

        if (storedUser) {

            try {

                setUser(
                    JSON.parse(storedUser)
                );

            } catch (error) {

                console.error(
                    "USER DATA ERROR:",
                    error
                );

            }

        }

    }, []);


    // ==========================================
    // GET USER ONBOARDING
    // ==========================================

    useEffect(() => {

        const fetchOnboarding = async () => {

            const token =
                localStorage.getItem("prepbs_token");

            if (!token) {

                setError(
                    "Authentication required."
                );

                setLoading(false);

                return;
            }

            try {

                const response = await fetch(
                    `${ONBOARDING_API_URL}/me`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to load your dashboard."
                    );

                }

                setOnboarding(
                    data.onboarding
                );

            } catch (error) {

                console.error(
                    "DASHBOARD DATA ERROR:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load dashboard."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchOnboarding();

    }, []);


    // ==========================================
    // GET TODAY'S STUDY TIME
    // ==========================================

    useEffect(() => {

        const fetchTodayStudyTime = async () => {

            const token =
                localStorage.getItem("prepbs_token");

            if (!token) {
                return;
            }

            try {

                const response = await fetch(
                    `${STUDY_SESSION_API_URL}/today?timestamp=${Date.now()}`,
                    {
                        method: "GET",

                        cache: "no-store",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to load today's study time."
                    );

                }

                setTodayStudySeconds(
                    data.totalStudySeconds || 0
                );

            } catch (error) {

                console.error(
                    "TODAY STUDY TIME ERROR:",
                    error
                );

            }

        };

        fetchTodayStudyTime();

    }, []);


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem(
            "prepbs_token"
        );

        localStorage.removeItem(
            "prepbs_user"
        );

        window.location.href = "/login";
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="dashboard-state">
                Loading your dashboard...
            </div>
        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (
            <div className="dashboard-state error">
                {error}
            </div>
        );

    }


    // ==========================================
    // SAFETY CHECK
    // ==========================================

    if (!onboarding) {

        return (
            <div className="dashboard-state">
                No onboarding data found.
            </div>
        );

    }


    // ==========================================
    // DATA FROM MONGODB
    // ==========================================

    const {
        examCategory,
        exam,
        examDate,
        selectedSubject,
        preparationLevel,
        dailyStudyHour
    } = onboarding;


    // ==========================================
    // USER PROFILE
    // ==========================================

    const userInitial =
        user?.name
            ? user.name
                .charAt(0)
                .toUpperCase()
            : "U";


    // ==========================================
    // EXAM COUNTDOWN
    // ==========================================

    const today = new Date();

    const targetDate =
        new Date(examDate);

    const difference =
        targetDate.getTime() -
        today.getTime();

    const daysRemaining =
        Math.max(
            0,
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            )
        );


    // ==========================================
    // DAILY TARGET
    // ==========================================

    const dailyTarget =
        Number(dailyStudyHour) || 0;


    // ==========================================
    // DAILY STUDY PROGRESS
    // ==========================================

    const dailyTargetSeconds =
        dailyTarget * 60 * 60;

    const progressPercentage =
        dailyTargetSeconds > 0
            ? Math.min(
                100,
                (todayStudySeconds /
                    dailyTargetSeconds) * 100
            )
            : 0;


    // ==========================================
    // CONVERT SECONDS → HOURS / MINUTES
    // ==========================================

    const studyHours =
        Math.floor(
            todayStudySeconds / 3600
        );

    const studyMinutes =
        Math.floor(
            (todayStudySeconds % 3600) / 60
        );


    // ==========================================
    // STUDY SESSION COMPLETED
    // ==========================================

    const handleStudySessionComplete =
        (studySeconds) => {

            setTodayStudySeconds(
                previousSeconds =>
                    previousSeconds +
                    studySeconds
            );

        };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="dashboard">


            {/* ==================================
                HEADER
            ================================== */}

            <header className="dashboard-header">

                <div>

                    <p className="dashboard-label">
                        STUDY DASHBOARD
                    </p>

                    <h1>
                        Your preparation starts here.
                    </h1>

                    <p className="dashboard-subtitle">
                        Stay consistent and keep moving
                        toward your exam.
                    </p>

                </div>


                {/* ==================================
                    PROFILE
                ================================== */}

                <div className="profile-wrapper">

                    <button
                        type="button"
                        className="profile-circle"
                        title={
                            user?.name ||
                            "Profile"
                        }
                        onClick={() =>
                            setProfileOpen(
                                previous =>
                                    !previous
                            )
                        }
                    >
                        {userInitial}
                    </button>


                    {profileOpen && (

                        <div className="profile-menu">

                            <div className="profile-menu-info">

                                <strong>
                                    {user?.name ||
                                        "User"}
                                </strong>

                                <span>
                                    {user?.email ||
                                        ""}
                                </span>

                            </div>


                            <div className="profile-menu-divider" />


                            <button
                                type="button"
                                className="logout-button"
                                onClick={
                                    handleLogout
                                }
                            >
                                Log out
                            </button>

                        </div>

                    )}

                </div>

            </header>


            {/* ==================================
                OVERVIEW
            ================================== */}

            <section className="dashboard-overview">


                {/* ==================================
                    EXAM
                ================================== */}

                <div className="dashboard-card exam-card">

                    <p className="card-label">
                        CURRENT EXAM
                    </p>

                    <h2>
                        {exam}
                    </h2>


                    <div className="exam-info">

                        <span>
                            Category
                        </span>

                        <strong>
                            {examCategory}
                        </strong>

                    </div>


                    <div className="exam-info">

                        <span>
                            Exam date
                        </span>

                        <strong>
                            {new Date(examDate)
                                .toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    }
                                )}
                        </strong>

                    </div>


                    <div className="exam-info">

                        <span>
                            Days remaining
                        </span>

                        <strong>
                            {daysRemaining}
                        </strong>

                    </div>

                </div>


                {/* ==================================
                    DAILY TARGET
                ================================== */}

                <div className="dashboard-card progress-card">

                    <p className="card-label">
                        DAILY STUDY TARGET
                    </p>


                    <div className="progress-time">

                        <strong>
                            {studyHours}h{" "}
                            {String(studyMinutes)
                                .padStart(2, "0")}m
                        </strong>

                        <span>
                            / {dailyTarget}h
                        </span>

                    </div>


                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    `${progressPercentage}%`
                            }}
                        />

                    </div>


                    <p className="progress-text">

                        {progressPercentage >= 100
                            ? "Daily study target completed."
                            : `Your daily target is ${dailyTarget} hour${dailyTarget !== 1 ? "s" : ""}.`
                        }

                    </p>

                </div>

            </section>


            {/* ==================================
                STUDY CLOCK
            ================================== */}

            <StudyClock
                dailyTargetHours={dailyTarget}
                todayStudySeconds={
                    todayStudySeconds
                }
                onStudySessionComplete={
                    handleStudySessionComplete
                }
            />


            {/* ==================================
                BOTTOM
            ================================== */}

            <section className="dashboard-bottom">


                {/* ==================================
                    PREPARATION
                ================================== */}

                <div className="dashboard-card">

                    <p className="card-label">
                        PREPARATION
                    </p>

                    <h3>
                        Your preparation level
                    </h3>

                    <div className="empty-state">

                        {preparationLevel}

                    </div>

                </div>


                {/* ==================================
                    SUBJECTS
                ================================== */}

                <div className="dashboard-card">

                    <p className="card-label">
                        YOUR SUBJECTS
                    </p>

                    <h3>
                        Subjects
                    </h3>


                    <div className="subject-list">

                        {selectedSubject.map(
                            (subject, index) => (

                                <div
                                    className="subject-item"
                                    key={index}
                                >
                                    {subject}
                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>

        </div>

    );

}


export default Dashboard;