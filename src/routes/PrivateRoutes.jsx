import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TaskManager from '../components/TaskManager'

function PrivateRoutes() {
  const token = localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={token ? <TaskManager /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default PrivateRoutes 