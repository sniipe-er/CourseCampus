import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const registerSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  name: yup.string().required('Name is required'),
  role: yup.string().oneOf(['student', 'instructor'], 'Invalid role').required('Role is required'),
})

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const { register: registerField, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema)
  })

  const onSubmit = async (data) => {
    setError('')
    let result

    if (isLogin) {
      result = await login(data.email, data.password)
    } else {
      result = await register(data.email, data.password, data.name, data.role)
    }

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-hero">
          <h2 className="text-center text-3xl font-bold text-white drop-shadow-lg">
            {isLogin ? 'Sign in to CourseCampus' : 'Create your account'}
          </h2>
          <p className="text-center text-sm text-cyan-100">
            {isLogin
              ? 'Secure access to your learning dashboard'
              : 'Secure access to your learning dashboard'}
          </p>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...registerField('name')}
                  type="text"
                  placeholder="e.g. John Doe"
                  className="mt-1 block w-full px-3 py-2 border border-blue-300 bg-blue-50 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...registerField('email')}
                type="email"
                placeholder="example@gmail.com"
                className="mt-1 block w-full px-3 py-2 border border-blue-300 bg-blue-50 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...registerField('password')}
                type="password"
                placeholder={isLogin ? '6+ characters' : 'Choose a strong password'}
                className="mt-1 block w-full px-3 py-2 border border-blue-300 bg-blue-50 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  {...registerField('role')}
                  className="mt-1 block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm bg-blue-50 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="">Select role</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
              </div>
            )}
          </div>

          <div className="auth-submit-wrapper">
            <button
              type="submit"
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="auth-toggle-wrapper">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="py-2 px-6 border border-cyan-400 text-cyan-200 hover:text-white rounded-md bg-cyan-800/30 hover:bg-cyan-700/50"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>

      <footer className="auth-footer">
        <p>CourseCampus © 2026 • Powered by Innovation</p>
        <p className="text-xs text-gray-400">Terms · Privacy · Help</p>
      </footer>
    </div>
  )
}