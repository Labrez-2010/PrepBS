import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginUser from "./Pages/Auth/loginUser.jsx";
import RegisterUser from "./Pages/Auth/registerUser.jsx";
import Onboarding from "./Pages/Onboarding/onboarding.jsx";
import ExamCategory from "./Pages/Onboarding/examCategory.jsx";
import ExamSelection from "./Pages/Onboarding/examSelection.jsx";
import ExamDate from "./Pages/Onboarding/examDates.jsx";
import SubjectSelection from "./Pages/Onboarding/subjectSelection.jsx";
import PreparationLevel from "./Pages/Onboarding/preparationLevel.jsx";
import DailyStudyHours from "./Pages/Onboarding/dailyStudyHours.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding/category" element={<ExamCategory />} />
        <Route path="/onboarding/exam" element={<ExamSelection />} />
        <Route path="/onboarding/date" element={<ExamDate />} />
        <Route path="/onboarding/subject" element={<SubjectSelection />} />
        <Route path="/onboarding/level" element={<PreparationLevel />} />
        <Route path="/onboarding/study-hours" element={<DailyStudyHours />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />


        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />


        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;