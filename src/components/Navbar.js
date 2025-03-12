import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">Task Manager</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/task-form">Add Task</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                    <Link className="nav-link" to="/">Logout</Link>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;