import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginUser,getUser } from '../api/Auth'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'


const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

function Login() {


  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {

    try {
      await LoginUser(values)
      toast('Login Successfull');
      navigate('/app');
    } catch (error) {
      const message = error?.response?.data?.message;
      // toast.error(message)
      setFieldError('general', message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Field
                name="email"
                placeholder="Email"
                className={`w-full mb-2 px-3 py-2 border rounded ${errors.email ? 'border-red-400' : ''}`}

              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-2" />
              <Field
                name="password"
                placeholder="Password"
                className={`w-full mb-2 px-3 py-2 border rounded ${errors.password ? 'border-red-400' : ''}`}

              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-2" />
              {errors.general && <div className="text-red-500 text-sm mb-2">{errors.general}</div>}
              <button
                className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition mb-4 disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <button onClick={() => navigate('/signup')} className="ml-2 text-indigo-600 hover:underline font-semibold">Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Login 