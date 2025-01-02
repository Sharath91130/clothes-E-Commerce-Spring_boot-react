import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react';
import LoginPage from "./LoginPage.jsx";

export default function RegistrationPage() {
    // State variables to handle user inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);

    // Function to handle form submission
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        setError(null); // Clear previous errors

        try {
            // Send user input to the server
            const response = await fetch('http://localhost:9090/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User registered successfully:', data);
                // Redirect to login page
                window.location.href = '/login';
            } else {
                throw new Error(data.error || 'Registration failed');
            }
        } catch (err) {
            setError(err.message); // Display error message
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h1 className="text-center text-primary mb-4">Register</h1>
                {error && <p className="alert alert-danger">{error}</p>}
                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="form-label">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="form-select"
                        >
                            <option value="" disabled>
                                Select your role
                            </option>
                            <option value="CUSTOMER">Customer</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-3">
                    Already a user?
                    <a href="/login" className="text-primary">
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
}
