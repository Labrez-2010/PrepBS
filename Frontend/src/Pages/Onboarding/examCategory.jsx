import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./examCategory.css";

const examCategories = [
    {
        id: "government-olympiad",
        title: "Government Olympiad",
        description: "National-level olympiads and government academic competitions.",
        icon: "◎",
    },
    {
        id: "private-olympiad",
        title: "Private Olympiad",
        description: "Olympiads and academic competitions conducted by private organizations.",
        icon: "✦",
    },
    {
        id: "entrance-exam",
        title: "Entrance Exam",
        description: "Exams that help you enter a college, university or professional course.",
        icon: "↗",
    },
    {
        id: "school-board",
        title: "School / Board Exam",
        description: "Prepare for your school, state board or national board examinations.",
        icon: "▤",
    },
    {
        id: "competitive-exam",
        title: "Competitive Exam",
        description: "Competitive examinations that test academic knowledge and aptitude.",
        icon: "◇",
    },
    {
        id: "other",
        title: "Something Else",
        description: "Preparing for an exam that doesn't fit the categories above.",
        icon: "＋",
    },
];

function ExamCategory() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(
        sessionStorage.getItem("prepbs_exam_category") || ""
    );

    const handleSelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleContinue = () => {
        if (!selectedCategory) return;

        sessionStorage.setItem(
            "prepbs_exam_category",
            selectedCategory
        );

        navigate("/onboarding/exam");
    };

    const handleBack = () => {
        navigate("/onboarding");
    };

    return (
        <div className="category-page">

            {/* Background */}
            <div className="category-orb category-orb-one"></div>
            <div className="category-orb category-orb-two"></div>

            {/* Header */}
            <header className="category-header">

                <button
                    className="category-back-btn"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    ←
                </button>

                <img
                    src="/src/assets/prepbs-logo.png"
                    alt="PrepBS"
                    className="category-logo"
                />

                <div className="category-progress">
                    <span className="category-progress-current">
                        02
                    </span>

                    <div className="category-progress-track">
                        <div className="category-progress-fill"></div>
                    </div>

                    <span className="category-progress-total">
                        06
                    </span>
                </div>

            </header>

            {/* Main */}
            <main className="category-main">

                <div className="category-heading">

                    <span className="category-eyebrow">
                        STEP 02
                    </span>

                    <h1>
                        What are you
                        <span> preparing for?</span>
                    </h1>

                    <p>
                        Choose the category that best matches your
                        preparation. You can refine the exact exam next.
                    </p>

                </div>

                {/* Category Cards */}
                <div className="category-grid">

                    {examCategories.map((category) => {

                        const isSelected =
                            selectedCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                type="button"
                                className={`category-card ${
                                    isSelected
                                        ? "category-card-selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleSelect(category.id)
                                }
                            >

                                <div className="category-card-top">

                                    <div className="category-icon">
                                        {category.icon}
                                    </div>

                                    <div
                                        className={`category-check ${
                                            isSelected
                                                ? "category-check-visible"
                                                : ""
                                        }`}
                                    >
                                        ✓
                                    </div>

                                </div>

                                <div className="category-card-content">

                                    <h2>
                                        {category.title}
                                    </h2>

                                    <p>
                                        {category.description}
                                    </p>

                                </div>

                                <div className="category-card-arrow">
                                    →
                                </div>

                            </button>
                        );
                    })}

                </div>

                {/* Bottom action */}
                <div className="category-action">

                    <span className="category-selection-status">
                        {selectedCategory
                            ? "Category selected"
                            : "Select one category to continue"}
                    </span>

                    <button
                        type="button"
                        className={`category-continue-btn ${
                            selectedCategory
                                ? "category-continue-active"
                                : ""
                        }`}
                        disabled={!selectedCategory}
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

export default ExamCategory;