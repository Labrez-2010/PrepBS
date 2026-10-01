import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./examSelection.css";

import prepbsLogo from "../../assets/prepbs-logo.png";

const examData = {
    "government-olympiad": [
        {
            id: "ioqm",
            name: "IOQM",
            fullName: "Indian Olympiad Qualifier in Mathematics",
            subject: "Mathematics",
        },
        {
            id: "nsep",
            name: "NSEP",
            fullName: "National Standard Examination in Physics",
            subject: "Physics",
        },
        {
            id: "nsec",
            name: "NSEC",
            fullName: "National Standard Examination in Chemistry",
            subject: "Chemistry",
        },
        {
            id: "nsea",
            name: "NSEA",
            fullName: "National Standard Examination in Astronomy",
            subject: "Astronomy",
        },
        {
            id: "nseb",
            name: "NSEB",
            fullName: "National Standard Examination in Biology",
            subject: "Biology",
        },
    ],

    "private-olympiad": [
        {
            id: "sof-imo",
            name: "SOF IMO",
            fullName: "International Mathematics Olympiad",
            subject: "Mathematics",
        },
        {
            id: "sof-science",
            name: "SOF NSO",
            fullName: "National Science Olympiad",
            subject: "Science",
        },
        {
            id: "sof-igko",
            name: "SOF IGKO",
            fullName: "International General Knowledge Olympiad",
            subject: "General Knowledge",
        },
        {
            id: "unified-mathematics",
            name: "UIMO",
            fullName: "Unified International Mathematics Olympiad",
            subject: "Mathematics",
        },
    ],

    "entrance-exam": [
        {
            id: "jee-main",
            name: "JEE Main",
            fullName: "Joint Entrance Examination Main",
            subject: "Engineering",
        },
        {
            id: "jee-advanced",
            name: "JEE Advanced",
            fullName: "Joint Entrance Examination Advanced",
            subject: "Engineering",
        },
        {
            id: "neet",
            name: "NEET-UG",
            fullName: "National Eligibility cum Entrance Test",
            subject: "Medical",
        },
        {
            id: "mht-cet",
            name: "MHT-CET",
            fullName: "Maharashtra Common Entrance Test",
            subject: "Engineering / Pharmacy",
        },
    ],

    "school-board": [
        {
            id: "maharashtra-ssc",
            name: "Maharashtra SSC",
            fullName: "Maharashtra State Board — Class 10",
            subject: "All Subjects",
        },
        {
            id: "cbse-class-10",
            name: "CBSE Class 10",
            fullName: "Central Board of Secondary Education",
            subject: "All Subjects",
        },
        {
            id: "cbse-class-12",
            name: "CBSE Class 12",
            fullName: "Central Board of Secondary Education",
            subject: "All Subjects",
        },
        {
            id: "icse",
            name: "ICSE",
            fullName: "Indian Certificate of Secondary Education",
            subject: "All Subjects",
        },
    ],

    "competitive-exam": [
        {
            id: "nda",
            name: "NDA",
            fullName: "National Defence Academy Examination",
            subject: "General / Mathematics",
        },
        {
            id: "cuet",
            name: "CUET-UG",
            fullName: "Common University Entrance Test",
            subject: "Multiple Subjects",
        },
    ],

    other: [
        {
            id: "other-exam",
            name: "Other Exam",
            fullName: "An exam not listed here",
            subject: "Custom",
        },
    ],
};

const categoryNames = {
    "government-olympiad": "Government Olympiad",
    "private-olympiad": "Private Olympiad",
    "entrance-exam": "Entrance Exam",
    "school-board": "School / Board Exam",
    "competitive-exam": "Competitive Exam",
    other: "Something Else",
};

function ExamSelection() {
    const navigate = useNavigate();

    const selectedCategory =
        sessionStorage.getItem("prepbs_exam_category") || "";

    const [search, setSearch] = useState("");

    const [selectedExam, setSelectedExam] = useState(
        sessionStorage.getItem("prepbs_exam") || ""
    );

    const exams = examData[selectedCategory] || [];

    const filteredExams = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        if (!searchText) {
            return exams;
        }

        return exams.filter((exam) =>
            `${exam.name} ${exam.fullName} ${exam.subject}`
                .toLowerCase()
                .includes(searchText)
        );
    }, [search, exams]);

    const handleSelect = (examId) => {
        setSelectedExam(examId);
    };

    const handleContinue = () => {
        if (!selectedExam) return;

        sessionStorage.setItem("prepbs_exam", selectedExam);

        navigate("/onboarding/date");
    };

    const handleBack = () => {
        navigate("/onboarding/category");
    };

    return (
        <div className="exam-selection-page">

            <div className="exam-selection-orb exam-selection-orb-one"></div>
            <div className="exam-selection-orb exam-selection-orb-two"></div>

            {/* Header */}
            <header className="exam-selection-header">

                <button
                    className="exam-back-btn"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    ←
                </button>

                <img
                    src={prepbsLogo}
                    alt="PrepBS"
                    className="exam-selection-logo"
                />

                <div className="exam-selection-progress">
                    <span>03</span>

                    <div className="exam-progress-track">
                        <div className="exam-progress-fill"></div>
                    </div>

                    <span className="exam-progress-total">06</span>
                </div>

            </header>

            {/* Main */}
            <main className="exam-selection-main">

                <section className="exam-selection-heading">

                    <span className="exam-step-label">
                        STEP 03 · {categoryNames[selectedCategory] || "EXAM"}
                    </span>

                    <h1>
                        Which exam are
                        <span> you preparing for?</span>
                    </h1>

                    <p>
                        Pick your exam. PrepBS will use it to understand
                        your preparation timeline and priorities.
                    </p>

                </section>

                {/* Search */}
                <div className="exam-search-wrapper">

                    <span className="exam-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search your exam..."
                        aria-label="Search exams"
                    />

                    {search && (
                        <button
                            type="button"
                            className="exam-search-clear"
                            onClick={() => setSearch("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}

                </div>

                {/* Exam list */}
                <section className="exam-list">

                    {filteredExams.length > 0 ? (
                        filteredExams.map((exam) => {

                            const isSelected =
                                selectedExam === exam.id;

                            return (
                                <button
                                    key={exam.id}
                                    type="button"
                                    className={`exam-card ${
                                        isSelected
                                            ? "exam-card-selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleSelect(exam.id)
                                    }
                                >

                                    <div className="exam-card-symbol">
                                        {exam.name.charAt(0)}
                                    </div>

                                    <div className="exam-card-info">

                                        <h2>
                                            {exam.name}
                                        </h2>

                                        <p>
                                            {exam.fullName}
                                        </p>

                                        <span>
                                            {exam.subject}
                                        </span>

                                    </div>

                                    <div
                                        className={`exam-card-check ${
                                            isSelected
                                                ? "exam-card-check-selected"
                                                : ""
                                        }`}
                                    >
                                        {isSelected ? "✓" : ""}
                                    </div>

                                </button>
                            );
                        })
                    ) : (
                        <div className="exam-empty">

                            <div className="exam-empty-icon">
                                ?
                            </div>

                            <h2>
                                We couldn't find that exam
                            </h2>

                            <p>
                                Try a different search or choose
                                another category.
                            </p>

                        </div>
                    )}

                </section>

                {/* Bottom */}
                <div className="exam-selection-action">

                    <span>
                        {selectedExam
                            ? "Exam selected"
                            : `${filteredExams.length} exams available`}
                    </span>

                    <button
                        type="button"
                        className={`exam-continue-btn ${
                            selectedExam
                                ? "exam-continue-active"
                                : ""
                        }`}
                        disabled={!selectedExam}
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

export default ExamSelection;