import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dailyStudyHours.css";
import prepbsLogo from "../../assets/prepbs-logo.png";

const studyOptions = [
    {
        value: 1,
        title: "1 Hour",
        subtitle: "Light & consistent",
    },
    {
        value: 2,
        title: "2 Hours",
        subtitle: "Steady progress",
    },
    {
        value: 3,
        title: "3 Hours",
        subtitle: "Focused preparation",
    },
    {
        value: 4,
        title: "4 Hours",
        subtitle: "Serious preparation",
    },
    {
        value: 5,
        title: "5 Hours",
        subtitle: "High commitment",
    },
    {
        value: 6,
        title: "6+ Hours",
        subtitle: "Intensive preparation",
    },
];


function DailyStudyHours() {

    const navigate = useNavigate();

    const [selectedHours, setSelectedHours] = useState(null);
    const [loading, setLoading] = useState(false);


    // ==========================================
    // FINISH ONBOARDING
    // ==========================================

    const handleContinue = async () => {

        if (!selectedHours || loading) {
            return;
        }


        // ==========================================
        // GET AUTH TOKEN
        // ==========================================

        const token =
            localStorage.getItem("prepbs_token");

        if (!token) {
            alert("Authentication required. Please login again.");
            navigate("/login");
            return;
        }


        // ==========================================
        // SAVE FINAL STUDY HOURS TEMPORARILY
        // ==========================================

        sessionStorage.setItem(
            "prepbs_daily_study_hour",
            selectedHours
        );


        // ==========================================
        // GET ONBOARDING DATA
        // ==========================================

        let selectedSubject;

        try {

            const storedSubject =
                sessionStorage.getItem(
                    "prepbs_selected_subject"
                );

            selectedSubject = storedSubject
                ? JSON.parse(storedSubject)
                : null;

        } catch (error) {

            console.error(
                "SUBJECT DATA PARSE ERROR:",
                error
            );

            alert(
                "There was a problem with your selected subject. Please go back and select it again."
            );

            return;
        }


        // ==========================================
        // CREATE COMPLETE ONBOARDING DATA
        // ==========================================

        const onboardingData = {

            examCategory:
                sessionStorage.getItem(
                    "prepbs_exam_category"
                ),

            exam:
                sessionStorage.getItem(
                    "prepbs_exam"
                ),

            examDate:
                sessionStorage.getItem(
                    "prepbs_exam_date"
                ),

            selectedSubject,

            preparationLevel:
                sessionStorage.getItem(
                    "prepbs_preparation_level"
                ),

            dailyStudyHour: selectedHours
        };


        // ==========================================
        // VALIDATE ONBOARDING DATA
        // ==========================================

        const hasMissingData =
            !onboardingData.examCategory ||
            !onboardingData.exam ||
            !onboardingData.examDate ||
            !Array.isArray(
                onboardingData.selectedSubject
            ) ||
            onboardingData.selectedSubject.length === 0 ||
            !onboardingData.preparationLevel ||
            onboardingData.dailyStudyHour === null ||
            onboardingData.dailyStudyHour === undefined;


        if (hasMissingData) {

            alert(
                "Some onboarding information is missing. Please complete all steps."
            );

            return;
        }


        // ==========================================
        // SEND DATA TO BACKEND
        // ==========================================

        try {

            setLoading(true);


            const response = await fetch(
                "http://localhost:3000/api/onboarding",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(
                        onboardingData
                    )
                }
            );


            // ==========================================
            // READ RESPONSE
            // ==========================================

            const data =
                await response.json();


            // ==========================================
            // HANDLE ERROR
            // ==========================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to save onboarding"
                );
            }


            // ==========================================
            // SUCCESS
            // ==========================================

            console.log(
                "ONBOARDING SAVED:",
                data
            );


            // ==========================================
            // REMOVE TEMPORARY DATA
            // ==========================================

            sessionStorage.removeItem(
                "prepbs_exam_category"
            );

            sessionStorage.removeItem(
                "prepbs_exam"
            );

            sessionStorage.removeItem(
                "prepbs_exam_date"
            );

            sessionStorage.removeItem(
                "prepbs_selected_subject"
            );

            sessionStorage.removeItem(
                "prepbs_preparation_level"
            );

            sessionStorage.removeItem(
                "prepbs_daily_study_hour"
            );


            // ==========================================
            // GO TO DASHBOARD
            // ==========================================

            navigate("/dashboard");


        } catch (error) {

            console.error(
                "ONBOARDING SUBMISSION ERROR:",
                error
            );

            alert(
                error.message ||
                "Something went wrong while completing onboarding."
            );


        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="study-hours-page">

            {/* Background */}
            <div className="study-orb study-orb-one"></div>
            <div className="study-orb study-orb-two"></div>


            {/* Header */}
            <header className="study-hours-header">

                <img
                    src={prepbsLogo}
                    alt="PrepBS"
                    className="study-hours-logo"
                />


                <div className="study-progress">

                    <span>06</span>

                    <div className="progress-line">

                        <div className="progress-fill"></div>

                    </div>

                    <span>06</span>

                </div>

            </header>


            {/* Main */}
            <main className="study-hours-main">

                <div className="study-hours-content">

                    <p className="study-eyebrow">
                        YOUR COMMITMENT
                    </p>


                    <h1>
                        How much time can
                        <br />
                        you give PrepBS?
                    </h1>


                    <p className="study-description">
                        Choose a realistic daily study time.
                        PrepBS will use this to shape your
                        preparation plan around you.
                    </p>


                    {/* Study Options */}
                    <div className="study-options">

                        {studyOptions.map(
                            (option) => (

                                <button
                                    key={option.value}
                                    type="button"

                                    className={
                                        `study-option ${
                                            selectedHours === option.value
                                                ? "selected"
                                                : ""
                                        }`
                                    }

                                    onClick={() =>
                                        setSelectedHours(
                                            option.value
                                        )
                                    }

                                >

                                    <div className="study-option-number">

                                        {option.value === 6
                                            ? "6+"
                                            : option.value}

                                    </div>


                                    <div className="study-option-info">

                                        <strong>
                                            {option.title}
                                        </strong>

                                        <span>
                                            {option.subtitle}
                                        </span>

                                    </div>


                                    <div className="study-option-check">

                                        {selectedHours === option.value
                                            ? "✓"
                                            : ""}

                                    </div>

                                </button>

                            )
                        )}

                    </div>


                    {/* Commitment Preview */}
                    <div
                        className={
                            `commitment-preview ${
                                selectedHours
                                    ? "visible"
                                    : ""
                            }`
                        }
                    >

                        {selectedHours && (

                            <>

                                <span>
                                    Daily commitment
                                </span>

                                <strong>

                                    {selectedHours === 6
                                        ? "6+ hours"
                                        : `${selectedHours} hour${
                                            selectedHours > 1
                                                ? "s"
                                                : ""
                                        }`
                                    }

                                </strong>

                            </>

                        )}

                    </div>


                    {/* Actions */}
                    <div className="study-actions">

                        <button
                            type="button"
                            className="study-back"

                            onClick={() =>
                                navigate(
                                    "/onboarding/level"
                                )
                            }

                            disabled={loading}
                        >
                            ← Back
                        </button>


                        <button
                            type="button"
                            className="study-finish"

                            disabled={
                                !selectedHours ||
                                loading
                            }

                            onClick={handleContinue}
                        >

                            {loading
                                ? "Saving..."
                                : "Finish Setup"}

                            {!loading && (
                                <span>→</span>
                            )}

                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}


export default DailyStudyHours;