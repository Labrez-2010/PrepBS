import React from "react";
import { useNavigate } from "react-router-dom";
import "./onboarding.css";

import prepbsLogo from "../../assets/prepbs-logo.png";

function Onboarding() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/onboarding/category");
    };

    return (
        <div className="onboarding-page">

            {/* Background decoration */}
            <div className="onboarding-orb onboarding-orb-one"></div>
            <div className="onboarding-orb onboarding-orb-two"></div>

            {/* Header */}
            <header className="onboarding-header">

                <div className="onboarding-brand">
                    <img
                        src={prepbsLogo}
                        alt="PrepBS"
                        className="onboarding-logo"
                    />
                </div>

                <div className="onboarding-progress">
                    <span className="progress-current">01</span>

                    <div className="progress-line">
                        <div className="progress-line-active"></div>
                    </div>

                    <span className="progress-total">06</span>
                </div>

            </header>

            {/* Main */}
            <main className="onboarding-main">

                <div className="welcome-label">
                    <span className="welcome-label-dot"></span>
                    PERSONALIZE YOUR PREPARATION
                </div>

                <h1>
                    Let's build your
                    <span> preparation plan.</span>
                </h1>

                <p className="onboarding-description">
                    A few quick choices are all we need to understand
                    what you're preparing for and shape PrepBS around you.
                </p>

                <button
                    className="start-onboarding-btn"
                    onClick={handleStart}
                >
                    <span>Let's Start</span>

                    <span className="start-arrow">
                        →
                    </span>
                </button>

                <p className="onboarding-time">
                    Takes less than a minute
                </p>

            </main>

            {/* Footer */}
            <footer className="onboarding-footer">

                <span>
                    PREPBS
                </span>

                <span>
                    PLAN · PRACTICE · PROGRESS
                </span>

            </footer>

        </div>
    );
}

export default Onboarding;