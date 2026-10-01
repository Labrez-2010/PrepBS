import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;
const ONBOARDING_API_URL =
    `${import.meta.env.VITE_API_URL}/api/onboarding`;

export default function LoginUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
    };


    // ==========================================
    // HANDLE LOGIN
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            setLoading(true);


            // ==========================================
            // STEP 1 — LOGIN
            // ==========================================

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password
                })
            });


            const data = await response.json();


            // ==========================================
            // LOGIN FAILED
            // ==========================================

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to sign in."
                );
            }


            // ==========================================
            // STEP 2 — CHECK TOKEN
            // ==========================================

            if (!data.token) {
                throw new Error(
                    "Login successful, but authentication token was not received."
                );
            }


            // ==========================================
            // STEP 3 — STORE TOKEN
            // ==========================================

            localStorage.setItem(
                "prepbs_token",
                data.token
            );


            // ==========================================
            // STEP 4 — STORE USER
            // ==========================================

            if (data.user) {
                localStorage.setItem(
                    "prepbs_user",
                    JSON.stringify(data.user)
                );
            }


            // ==========================================
            // STEP 5 — CHECK ONBOARDING
            // ==========================================

            const onboardingResponse = await fetch(
                `${ONBOARDING_API_URL}/me`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": `Bearer ${data.token}`
                    }
                }
            );


            // ==========================================
            // ONBOARDING EXISTS
            // ==========================================

            if (onboardingResponse.ok) {

                navigate("/dashboard");

                return;
            }


            // ==========================================
            // ONBOARDING DOES NOT EXIST
            // ==========================================

            if (onboardingResponse.status === 404) {

                navigate("/onboarding");

                return;
            }


            // ==========================================
            // AUTHENTICATION FAILED
            // ==========================================

            if (onboardingResponse.status === 401) {

                localStorage.removeItem("prepbs_token");
                localStorage.removeItem("prepbs_user");

                throw new Error(
                    "Your session is invalid. Please sign in again."
                );
            }


            // ==========================================
            // OTHER SERVER ERROR
            // ==========================================

            throw new Error(
                "Unable to check your PrepBS setup. Please try again."
            );

        } catch (requestError) {

            console.error(
                "LOGIN ERROR:",
                requestError
            );

            setError(
                requestError.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="auth-page">

            <main className="auth-container">

                <section className="auth-card">

                    <div className="auth-header">

                        <div className="auth-logo">
                            <img
                                src="/prepbs-logo.png"
                                alt="PrepBS"
                            />
                        </div>

                        <p className="auth-eyebrow">
                            WELCOME BACK
                        </p>

                        <h1>
                            Sign in to PrepBS
                        </h1>

                        <p className="auth-subtitle">
                            Pick up where you left off with your studies.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                    >

                        <div className="input-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />

                        </div>


                        <div className="input-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Your password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                            />

                        </div>


                        {error && (
                            <div className="auth-message error">
                                {error}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="auth-primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in"
                            }
                        </button>

                    </form>


                    <p className="auth-switch">

                        New to PrepBS?{" "}

                        <Link to="/register">
                            Create an account
                        </Link>

                    </p>

                </section>

            </main>

        </div>
    );
}