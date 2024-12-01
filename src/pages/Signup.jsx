import React, { useState } from "react";
import { postAPI } from "../utils/fetchapi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                username,
                password,
            };

            let data = await postAPI("auth/signup", payload, null);
            if (data?.status) {
                toast.success("Sign up successful! Please log in.");
                navigate("/signin"); // Navigate to the sign-in page after successful signup
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <h3 className="signup-heading">Create an Account</h3>
            <p className="signup-intro">Fill out the form below to create a new account.</p>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    required
                />
                <button type="submit" className="signup-button" disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
            </form>
            <p className="signin-text">
                Already have an account? <a href="#" onClick={() => navigate("/")}>Sign In</a>
            </p>
        </div>
    );
}

export default Signup;
