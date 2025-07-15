import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Sign Up</h2>
        <form>
          <input type="text" placeholder="Name" className="w-full mb-4 px-3 py-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full mb-4 px-3 py-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full mb-6 px-3 py-2 border rounded" />
          <button className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition mb-4">Sign Up</button>
        </form>
        <div className="text-center">
          <span className="text-gray-600">Already have an account?</span>
          <button onClick={() => navigate('/login')} className="ml-2 text-indigo-600 hover:underline font-semibold">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Signup 