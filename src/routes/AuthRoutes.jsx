import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'

function AuthRoutes() {
  const token = localStorage.getItem('token')
  return (
    <Routes>
      <Route path="login" element={token ? <Navigate to="/app" /> : <Login />} />
      <Route path="signup" element={token ? <Navigate to="/app" /> : <Signup />} />
    </Routes>
  )
}

export default AuthRoutes 