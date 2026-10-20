import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export default function RegisterUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        className: "",
        school: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.className ||
            !formData.school
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/register`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password,
                    class: formData.className,
                    school: formData.school.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed.");
            }

            setSuccess("Account created successfully.");

            // If your backend returns a token, save it.
            if (data.token) {
                localStorage.setItem("prepbs_token", data.token);
            }

            // Optional: save returned user information.
            if (data.user) {
                localStorage.setItem(
                    "prepbs_user",
                    JSON.stringify(data.user)
                );
            }

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (err) {
            setError(err.message || "Something went wrong.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-background"> 
            <div className="register-page">

            <main className="register-container">

                <section className="register-card">

                    <div className="register-header">

                        <div className="register-logo">
                            <img
                                src="/prepbs-logo.png"
                                alt="PrepBS"
                            />
                        </div>

                        <p className="register-eyebrow">
                            WELCOME TO PREPBS
                        </p>

                        <h1>
                            Create your account
                        </h1>

                        <p className="register-subtitle">
                            Build your personal study space and start preparing smarter.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="register-form"
                    >

                        <div className="register-form-row">

                            <div className="register-input-group">

                                {/* <label htmlFor="register-name">
                                    Full name
                                </label> */}

                                <input
                                    id="register-name"
                                    name="name"
                                    type="text"
                                    placeholder="Your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />

                            </div>


                            <div className="register-input-group">

                                {/* <label htmlFor="register-email">
                                    Email
                                </label> */} 

                                <input
                                    id="register-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />

                            </div>

                        </div>


                        <div className="register-form-row">

                            <div className="register-input-group">

                                {/* <label htmlFor="register-class">
                                    Class
                                </label> */}

                                <select
                                    id="register-class"
                                    name="className"
                                    value={formData.className}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select class
                                    </option>

                                    <option value="8">
                                        Class 8
                                    </option>

                                    <option value="9">
                                        Class 9
                                    </option>

                                    <option value="10">
                                        Class 10
                                    </option>

                                    <option value="11">
                                        Class 11
                                    </option>

                                    <option value="12">
                                        Class 12
                                    </option>

                                    <option value="College">
                                        College
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <div className="register-input-group">

                                {/* <label htmlFor="register-school">
                                    School / College
                                </label> */}

                                <input
                                    id="register-school"
                                    name="school"
                                    type="text"
                                    placeholder="Your school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    autoComplete="organization"
                                />

                            </div>

                        </div>


                        <div className="register-input-group">

                            {/* <label htmlFor="register-password">
                                Password
                            </label> */}

                            <input
                                id="register-password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />

                        </div>


                        <div className="register-input-group">

                            {/* <label htmlFor="register-confirm-password">
                                Confirm password
                            </label> */}

                            <input
                                id="register-confirm-password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Repeat your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />

                        </div>


                        {error && (
                            <div className="register-message-register-error">
                                {error}
                            </div>
                        )}


                        {success && (
                            <div className="register-message-register-success">
                                {success}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="register-primary-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="register-button-loading">

                                    <span className="register-loading-spinner"></span>

                                    Creating account...

                                </span>
                            ) : (
                                "Create account"
                            )}

                        </button>

                    </form>


                    <div className="register-divider">
                        <span>or</span>
                    </div>


                    <p className="register-switch">
                        Already have an account? {" "}

                        <Link to="/login">
                            Sign in
                        </Link>
                    </p>


                    <p className="register-privacy">
                        By continuing, you agree to use PrepBS responsibly for your
                        learning and study management.
                    </p>

                </section>

            </main>

        </div>
        </div>
    );
}   