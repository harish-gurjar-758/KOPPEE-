import React, { useState } from 'react';
import { loginEmployee } from '../../../Apis/Apis';

export default function Login({ onLoginSuccess }) {
    const [formData, setFormData] = useState({ employeeEmail: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await loginEmployee(formData);
            if (res.token) {
                localStorage.setItem("employeeToken", res.token); // optional for persistence
                onLoginSuccess(); // 🔥 Tell AdminBlock we're logged in
            }
        } catch (err) {
            setError('Login failed. Please check credentials.');
            console.error('Login failed:', err);
        }
    };

    return (
        <div className='Login'>
            <div className='login-container'>
                <div className='login-box'>
                    <h2>Hallo,</h2>
                    <h2>Welcome Back</h2>
                    <p>Hey, welcome back to your special place.</p>

                    <div className="input-box">
                        <input
                            type="email"
                            placeholder='Email'
                            name="employeeEmail"
                            value={formData.employeeEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div
                        className="btn btn-add"
                        onClick={handleSubmit}
                        style={{ marginTop: "10px", height: "45px" }}
                    >Sign In</div>

                </div>
                <div className="login-side-box">
                </div>
            </div>

        </div>
    );
}
