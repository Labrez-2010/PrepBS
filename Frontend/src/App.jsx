import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginUser from "./Pages/Auth/loginUser.jsx";
import RegisterUser from "./Pages/Auth/registerUser.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Temporary dashboard route */}
        <Route
          path="/dashboard"
          element={
            <div style={{ padding: "40px", fontFamily: "system-ui" }}>
              <h1>Welcome to PrepBS</h1>
              <p>Dashboard coming next.</p>
            </div>
          }
        />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;