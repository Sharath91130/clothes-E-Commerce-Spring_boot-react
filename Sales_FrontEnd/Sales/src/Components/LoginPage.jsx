import React, { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch('http://localhost:9090/api/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });
            const data = await response.json();
            if (response.ok) {



                const {role} = data.data;
                console.log(role)
                if (role==='ADMIN') {
                    window.location.href = 'https://www.flipkart.com';
                } else  if(role==='CUSTOMER'){
                    window.location.href = 'https://www.amazon.com';
                }

            }
        }
            catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h1 className="text-center text-primary mb-4">Login</h1>
                {success && <p className="alert alert-success">Login successful!</p>}
                {error && <p className="alert alert-danger">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
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
                        <label htmlFor="password" className="form-label">Password</label>
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
                    <button type="submit" className="btn btn-primary w-100">Sign In</button>
                </form>
            </div>
        </div>
    );
}
