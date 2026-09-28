import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const API_URL = "http://localhost:3000/api/auth";

export default function LoginUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError("");
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
        setLoading(true);
        const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        }),
    });
    const data = await response.json();

        if (!response.ok) {
        throw new Error(data.message || "Unable to sign in.");
    }

        if (data.token) {
        localStorage.setItem("prepbs_token", data.token);
    }
        if (data.user) {
        localStorage.setItem("prepbs_user", JSON.stringify(data.user));
    }
        navigate("/dashboard");
    } catch (requestError) {
        setError(requestError.message || "Something went wrong.");
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
                <img src="/prepbs-logo.png" alt="PrepBS" />
            </div>
            <p className="auth-eyebrow">WELCOME BACK</p>
            <h1>Sign in to PrepBS</h1>
            <p className="auth-subtitle">
                Pick up where you left off with your studies.
            </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
                <label htmlFor="email">Email</label>
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
                <label htmlFor="password">Password</label>
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

            {error && <div className="auth-message error">{error}</div>}

            <button
                type="submit"
                className="auth-primary-button"
                disabled={loading}
            >
                {loading ? "Signing in..." : "Sign in"}
            </button>
            </form>

            <p className="auth-switch">
            New to PrepBS? <Link to="/register">Create an account</Link>
            </p>
        </section>
        </main>
    </div>
    );
}