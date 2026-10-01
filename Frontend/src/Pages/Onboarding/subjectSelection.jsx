import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./subjectSelection.css";

import prepbsLogo from "../../assets/prepbs-logo.png";

const examSubjects = {
    ioqm: [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Number theory, algebra, geometry and combinatorics",
            symbol: "∑",
        },
    ],

    nsep: [
        {
            id: "physics",
            name: "Physics",
            description: "Mechanics, electricity, optics and modern physics",
            symbol: "Φ",
        },
    ],

    nsec: [
        {
            id: "chemistry",
            name: "Chemistry",
            description: "Physical, organic and inorganic chemistry",
            symbol: "⚗",
        },
    ],

    nsea: [
        {
            id: "astronomy",
            name: "Astronomy",
            description: "Astronomy, physics and mathematical reasoning",
            symbol: "✦",
        },
    ],

    nseb: [
        {
            id: "biology",
            name: "Biology",
            description: "Biological concepts, systems and processes",
            symbol: "⌁",
        },
    ],

    "jee-main": [
        {
            id: "physics",
            name: "Physics",
            description: "Mechanics, electricity, optics and modern physics",
            symbol: "Φ",
        },
        {
            id: "chemistry",
            name: "Chemistry",
            description: "Physical, organic and inorganic chemistry",
            symbol: "⚗",
        },
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Algebra, calculus, geometry and coordinate mathematics",
            symbol: "∑",
        },
    ],

    "jee-advanced": [
        {
            id: "physics",
            name: "Physics",
            description: "Advanced concepts and problem solving",
            symbol: "Φ",
        },
        {
            id: "chemistry",
            name: "Chemistry",
            description: "Advanced physical, organic and inorganic chemistry",
            symbol: "⚗",
        },
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Advanced algebra, calculus and geometry",
            symbol: "∑",
        },
    ],

    neet: [
        {
            id: "physics",
            name: "Physics",
            description: "Mechanics, electricity, optics and modern physics",
            symbol: "Φ",
        },
        {
            id: "chemistry",
            name: "Chemistry",
            description: "Physical, organic and inorganic chemistry",
            symbol: "⚗",
        },
        {
            id: "biology",
            name: "Biology",
            description: "Botany, zoology, genetics and human biology",
            symbol: "⌁",
        },
    ],

    "mht-cet": [
        {
            id: "physics",
            name: "Physics",
            description: "Physics preparation for MHT-CET",
            symbol: "Φ",
        },
        {
            id: "chemistry",
            name: "Chemistry",
            description: "Chemistry preparation for MHT-CET",
            symbol: "⚗",
        },
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Mathematics preparation for MHT-CET",
            symbol: "∑",
        },
        {
            id: "biology",
            name: "Biology",
            description: "Biology preparation for MHT-CET",
            symbol: "⌁",
        },
    ],

    "maharashtra-ssc": [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Algebra, geometry and mathematical reasoning",
            symbol: "∑",
        },
        {
            id: "science",
            name: "Science",
            description: "Physics, chemistry and biology",
            symbol: "⚛",
        },
        {
            id: "english",
            name: "English",
            description: "Grammar, literature and language skills",
            symbol: "A",
        },
        {
            id: "marathi",
            name: "Marathi",
            description: "Language, grammar and literature",
            symbol: "अ",
        },
    ],

    "cbse-class-10": [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Algebra, geometry and mathematical reasoning",
            symbol: "∑",
        },
        {
            id: "science",
            name: "Science",
            description: "Physics, chemistry and biology",
            symbol: "⚛",
        },
        {
            id: "english",
            name: "English",
            description: "Language and literature",
            symbol: "A",
        },
    ],

    "cbse-class-12": [
        {
            id: "physics",
            name: "Physics",
            description: "Class 12 physics preparation",
            symbol: "Φ",
        },
        {
            id: "chemistry",
            name: "Chemistry",
            description: "Class 12 chemistry preparation",
            symbol: "⚗",
        },
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Class 12 mathematics preparation",
            symbol: "∑",
        },
        {
            id: "biology",
            name: "Biology",
            description: "Class 12 biology preparation",
            symbol: "⌁",
        },
    ],

    icse: [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Mathematics preparation",
            symbol: "∑",
        },
        {
            id: "science",
            name: "Science",
            description: "Physics, chemistry and biology",
            symbol: "⚛",
        },
        {
            id: "english",
            name: "English",
            description: "Language and literature",
            symbol: "A",
        },
    ],

    "sof-imo": [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Logical thinking and mathematical problem solving",
            symbol: "∑",
        },
    ],

    "sof-science": [
        {
            id: "science",
            name: "Science",
            description: "Physics, chemistry, biology and scientific reasoning",
            symbol: "⚛",
        },
    ],

    "sof-igko": [
        {
            id: "general-knowledge",
            name: "General Knowledge",
            description: "World knowledge, current affairs and general awareness",
            symbol: "?",
        },
    ],

    "unified-mathematics": [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Mathematical reasoning and problem solving",
            symbol: "∑",
        },
    ],

    nda: [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Mathematics and quantitative reasoning",
            symbol: "∑",
        },
        {
            id: "general-ability",
            name: "General Ability",
            description: "English, science, history, geography and current affairs",
            symbol: "◇",
        },
    ],

    cuet: [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Mathematics and quantitative reasoning",
            symbol: "∑",
        },
        {
            id: "language",
            name: "Language",
            description: "Language and comprehension preparation",
            symbol: "A",
        },
    ],

    "other-exam": [
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Mathematics preparation",
            symbol: "∑",
        },
        {
            id: "science",
            name: "Science",
            description: "Science preparation",
            symbol: "⚛",
        },
        {
            id: "english",
            name: "English",
            description: "English preparation",
            symbol: "A",
        },
        {
            id: "other",
            name: "Other Subject",
            description: "A subject not listed above",
            symbol: "+",
        },
    ],
};

function SubjectSelection() {
    const navigate = useNavigate();

    const selectedExam =
        sessionStorage.getItem("prepbs_exam") || "";

    const [selectedSubject, setSelectedSubject] = useState(
        sessionStorage.getItem("prepbs_selected_subject") || ""
    );

    const subjects = useMemo(() => {
        return examSubjects[selectedExam] || [];
    }, [selectedExam]);

    const handleSelect = (subjectId) => {
        setSelectedSubject(subjectId);
    };

    const handleContinue = () => {
        if (!selectedSubject) return;

        sessionStorage.setItem(
        "prepbs_selected_subject",
        JSON.stringify([selectedSubject])
    );

        navigate("/onboarding/level");
    };

    const handleBack = () => {
        navigate("/onboarding/date");
    };

    return (
        <div className="subject-page">

            {/* Background */}
            <div className="subject-orb subject-orb-one"></div>
            <div className="subject-orb subject-orb-two"></div>

            {/* Header */}
            <header className="subject-header">

                <button
                    type="button"
                    className="subject-back-btn"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    ←
                </button>

                <img
                    src={prepbsLogo}
                    alt="PrepBS"
                    className="subject-logo"
                />

                <div className="subject-progress">

                    <span>04</span>

                    <div className="subject-progress-track">
                        <div className="subject-progress-fill"></div>
                    </div>

                    <span className="subject-progress-total">
                        06
                    </span>

                </div>

            </header>

            {/* Main */}
            <main className="subject-main">

                <section className="subject-heading">

                    <span className="subject-eyebrow">
                        STEP 04 · FOCUS
                    </span>

                    <h1>
                        What do you want
                        <span> to study?</span>
                    </h1>

                    <p>
                        Pick the subject you want PrepBS to focus
                        your preparation around.
                    </p>

                </section>

                {/* Subject cards */}
                <section className="subject-grid">

                    {subjects.length > 0 ? (
                        subjects.map((subject) => {

                            const isSelected =
                                selectedSubject === subject.id;

                            return (
                                <button
                                    key={subject.id}
                                    type="button"
                                    className={`subject-card ${
                                        isSelected
                                            ? "subject-card-selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleSelect(subject.id)
                                    }
                                >

                                    <div className="subject-card-top">

                                        <div className="subject-symbol">
                                            {subject.symbol}
                                        </div>

                                        <div
                                            className={`subject-check ${
                                                isSelected
                                                    ? "subject-check-active"
                                                    : ""
                                            }`}
                                        >
                                            {isSelected ? "✓" : ""}
                                        </div>

                                    </div>

                                    <div className="subject-card-content">

                                        <h2>
                                            {subject.name}
                                        </h2>

                                        <p>
                                            {subject.description}
                                        </p>

                                    </div>

                                    <div className="subject-card-arrow">
                                        →
                                    </div>

                                </button>
                            );
                        })
                    ) : (
                        <div className="subject-empty">

                            <div className="subject-empty-icon">
                                ?
                            </div>

                            <h2>
                                Subject information unavailable
                            </h2>

                            <p>
                                Please go back and select your exam again.
                            </p>

                        </div>
                    )}

                </section>

                {/* Action */}
                <div className="subject-action">

                    <span>
                        {selectedSubject
                            ? "Subject selected"
                            : "Choose one subject to continue"}
                    </span>

                    <button
                        type="button"
                        className={`subject-continue-btn ${
                            selectedSubject
                                ? "subject-continue-active"
                                : ""
                        }`}
                        disabled={!selectedSubject}
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

export default SubjectSelection;