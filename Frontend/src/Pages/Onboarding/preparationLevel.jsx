import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./preparationLevel.css";

import prepbsLogo from "../../assets/prepbs-logo.png";

const preparationLevels = [
    {
        id: "starting",
        number: "01",
        title: "Just Starting",
        description:
            "I am new to this exam and haven't started serious preparation yet.",
        label: "Fresh Start",
    },
    {
        id: "learning",
        number: "02",
        title: "Building Up",
        description:
            "I know the basics and have started learning the important concepts.",
        label: "Learning",
    },
    {
        id: "practicing",
        number: "03",
        title: "In Practice",
        description:
            "I have covered concepts and regularly solve questions or practice tests.",
        label: "Practicing",
    },
    {
        id: "advanced",
        number: "04",
        title: "Almost Ready",
        description:
            "I have strong preparation and mainly need revision, practice and refinement.",
        label: "Revision",
    },
];

function PreparationLevel() {
    const navigate = useNavigate();

    const [selectedLevel, setSelectedLevel] = useState(
        sessionStorage.getItem("prepbs_preparation_level") || ""
    );

    const handleSelect = (levelId) => {
        setSelectedLevel(levelId);
    };

    const handleContinue = () => {
        if (!selectedLevel) return;

        sessionStorage.setItem(
            "prepbs_preparation_level",
            selectedLevel
        );

        navigate("/onboarding/study-hours");
    };

    const handleBack = () => {
        navigate("/onboarding/subject");
    };

    return (
        <div className="preparation-level-page">

            <div className="preparation-orb preparation-orb-one"></div>
            <div className="preparation-orb preparation-orb-two"></div>

            {/* Header */}
            <header className="preparation-header">

                <button
                    type="button"
                    className="preparation-back-btn"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    ←
                </button>

                <img
                    src={prepbsLogo}
                    alt="PrepBS"
                    className="preparation-logo"
                />

                <div className="preparation-progress">

                    <span>05</span>

                    <div className="preparation-progress-track">
                        <div className="preparation-progress-fill"></div>
                    </div>

                    <span className="preparation-progress-total">
                        06
                    </span>

                </div>

            </header>

            {/* Main */}
            <main className="preparation-main">

                <section className="preparation-heading">

                    <span className="preparation-eyebrow">
                        STEP 05 · YOUR STARTING POINT
                    </span>

                    <h1>
                        Where are you
                        <span> right now?</span>
                    </h1>

                    <p>
                        Tell PrepBS where your preparation currently
                        stands. There is no right or wrong answer.
                    </p>

                </section>

                {/* Levels */}
                <section className="preparation-grid">

                    {preparationLevels.map((level) => {

                        const isSelected =
                            selectedLevel === level.id;

                        return (
                            <button
                                key={level.id}
                                type="button"
                                className={`preparation-card ${
                                    isSelected
                                        ? "preparation-card-selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleSelect(level.id)
                                }
                            >

                                <div className="preparation-card-top">

                                    <span className="preparation-number">
                                        {level.number}
                                    </span>

                                    <span
                                        className={`preparation-check ${
                                            isSelected
                                                ? "preparation-check-active"
                                                : ""
                                        }`}
                                    >
                                        {isSelected ? "✓" : ""}
                                    </span>

                                </div>

                                <div className="preparation-card-content">

                                    <span className="preparation-label">
                                        {level.label}
                                    </span>

                                    <h2>
                                        {level.title}
                                    </h2>

                                    <p>
                                        {level.description}
                                    </p>

                                </div>

                                <span className="preparation-card-arrow">
                                    →
                                </span>

                            </button>
                        );
                    })}

                </section>

                {/* Action */}
                <div className="preparation-action">

                    <span>
                        {selectedLevel
                            ? "Your starting point is set"
                            : "Choose the option that describes you"}
                    </span>

                    <button
                        type="button"
                        className={`preparation-continue ${
                            selectedLevel
                                ? "preparation-continue-active"
                                : ""
                        }`}
                        disabled={!selectedLevel}
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

export default PreparationLevel;