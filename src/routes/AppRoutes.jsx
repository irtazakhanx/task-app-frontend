import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import TaskManager from '../components/TaskManager';
import ProtectedRoute from './ProtectedRoute';



function AppRoutes() {

const token = localStorage.getItem('token')

    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


            <Route
                path="/app"
                element={
                    <ProtectedRoute>
                        <TaskManager />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/"
                element={
                    token ? <Navigate to="/app" replace /> : <Navigate to="/login" replace />
                }
            />

        </Routes>
    );
}

export default AppRoutes; 