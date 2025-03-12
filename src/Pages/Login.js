import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import jwtDecode from 'jwt-decode';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
    
            // Extract role properly
            const role = res.data.user?.role;  // Check if user exists before accessing role
            if (role) {
                localStorage.setItem('role', role);
            }
    
            navigate('/dashboard');
        } catch (err) {
            alert('Invalid credentials');
        }
    };
    
    
    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-control mb-2" 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="form-control mb-2" 
                    required 
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
