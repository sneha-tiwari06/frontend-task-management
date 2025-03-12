import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import TaskForm from './Pages/Task';
import Navbar from './components/Navbar';
import UserList from './Pages/Users';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/task-form" element={<TaskForm />} />
            </Routes>
        </Router>
    );
}
export default App;