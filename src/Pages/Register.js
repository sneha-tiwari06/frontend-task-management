// frontend/src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is user
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/auth/register', { name, email, password, role });
            alert('Registration successful! Please login.');
            navigate('/');
        } catch (err) {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} className="form-control mb-2" required />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="form-control mb-2" required />
                <select className="form-control mb-2" onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="btn btn-success">Register</button>
            </form>
        </div>
    );
};
export default Register;