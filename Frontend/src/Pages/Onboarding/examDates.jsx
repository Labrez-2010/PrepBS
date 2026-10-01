import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./examDates.css";

import prepbsLogo from "../../assets/prepbs-logo.png";

function ExamDate() {
    const navigate = useNavigate();

    const selectedExam =
        sessionStorage.getItem("prepbs_exam") || "";

    const [examDate, setExamDate] = useState(
        sessionStorage.getItem("prepbs_exam_date") || ""
    );

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const formatDate = (dateValue) => {
        if (!dateValue) return "";

        const date = new Date(`${dateValue}T00:00:00`);

        return date.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const getDaysRemaining = () => {
        if (!examDate) return null;

        const selected = new Date(`${examDate}T00:00:00`);
        const current = new Date(`${todayString}T00:00:00`);

        const difference =
            selected.getTime() - current.getTime();

        return Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );
    };

    const daysRemaining = getDaysRemaining();

    const handleDateChange = (event) => {
        setExamDate(event.target.value);
    };

    const handleContinue = () => {
        if (!examDate) return;

        sessionStorage.setItem(
            "prepbs_exam_date",
            examDate
        );

        navigate("/onboarding/subject");
    };

    const handleBack = () => {
        navigate("/onboarding/exam");
    };

    return (
        <div className="exam-date-page">

            {/* Background */}
            <div className="exam-date-orb exam-date-orb-one"></div>
            <div className="exam-date-orb exam-date-orb-two"></div>

            {/* Header */}
            <header className="exam-date-header">

                <button
                    type="button"
                    className="exam-date-back"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    ←
                </button>

                <img
                    src={prepbsLogo}
                    alt="PrepBS"
                    className="exam-date-logo"
                />

                <div className="exam-date-progress">

                    <span>04</span>

                    <div className="exam-date-progress-track">
                        <div className="exam-date-progress-fill"></div>
                    </div>

                    <span className="exam-date-progress-total">
                        06
                    </span>

                </div>

            </header>

            {/* Main */}
            <main className="exam-date-main">

                <section className="exam-date-heading">

                    <span className="exam-date-eyebrow">
                        STEP 04 · TIMELINE
                    </span>

                    <h1>
                        When is your
                        <span> exam?</span>
                    </h1>

                    <p>
                        Knowing your exam date helps PrepBS
                        understand how much preparation time you have.
                    </p>

                </section>

                {/* Date Card */}
                <section className="date-picker-card">

                    <div className="date-card-top">

                        <div className="calendar-icon">
                            ◫
                        </div>

                        <div>
                            <span className="date-card-label">
                                EXAM DATE
                            </span>

                            <h2>
                                {examDate
                                    ? formatDate(examDate)
                                    : "Choose your exam date"}
                            </h2>
                        </div>

                    </div>

                    <div className="date-input-container">

                        <label htmlFor="exam-date">
                            Select date
                        </label>

                        <input
                            id="exam-date"
                            type="date"
                            value={examDate}
                            min={todayString}
                            onChange={handleDateChange}
                        />

                    </div>

                </section>

                {/* Timeline information */}
                {examDate && (
                    <div className="days-remaining">

                        <div className="days-number">
                            {daysRemaining}
                        </div>

                        <div className="days-text">
                            <strong>
                                {daysRemaining === 1
                                    ? "day"
                                    : "days"}
                            </strong>

                            <span>
                                remaining until your exam
                            </span>
                        </div>

                    </div>
                )}

                {/* Action */}
                <div className="exam-date-action">

                    <span>
                        {examDate
                            ? "Your timeline is ready"
                            : "Choose a date to continue"}
                    </span>

                    <button
                        type="button"
                        className={`exam-date-continue ${
                            examDate
                                ? "exam-date-continue-active"
                                : ""
                        }`}
                        disabled={!examDate}
                        onClick={handleContinue}
                    >
                        <span>Continue</span>
                        <span>→</span>
                    </button>

                </div>

            </main>

        </div>
    );
}

export default ExamDate;