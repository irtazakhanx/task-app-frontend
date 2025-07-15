import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupUser } from '../api/Auth';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
  username: Yup.string().required('Name is required')
});

function Signup() {
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      await SignupUser(values);
      toast.success('Signup Successful');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Signup Failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Sign Up</h2>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="username"
                placeholder="Name"
                className="w-full mb-2 px-3 py-2 border rounded"
                disabled={isSubmitting}
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mb-2" />
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full mb-2 px-3 py-2 border rounded"
                disabled={isSubmitting}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-2" />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full mb-2 px-3 py-2 border rounded"
                disabled={isSubmitting}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-2" />
              <button
                className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition mb-4 disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center">
          <span className="text-gray-600">Already have an account?</span>
          <button onClick={() => navigate('/login')} className="ml-2 text-indigo-600 hover:underline font-semibold">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Signup 