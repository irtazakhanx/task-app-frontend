import { Routes, Route, Navigate } from 'react-router-dom'
import AuthRoutes from './routes/AuthRoutes'
import PrivateRoutes from './routes/PrivateRoutes'

function App() {

  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="app/*" element={<PrivateRoutes />} />
    </Routes>
  )
}

export default App
