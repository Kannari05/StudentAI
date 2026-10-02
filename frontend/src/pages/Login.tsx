import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/authSlice'
import {
  GraduationCap,
  Sparkles,
  Lock,
  User,
  ArrowRight
} from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import authService from '../services/authService'
import OtpLogin from '../components/auth/OtpLogin'

export const Login: React.FC = () => {
  const [otpMode, setOtpMode] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      alert('Please enter username and password')
      return
    }

    setLoading(true)

    try {
      const response = await authService.login({
        username,
        password,
      })



      dispatch(
        setCredentials({
          user: {
            id: response.userId,
            username: response.username,
            email: response.email,
            role: response.role,
          },
          token: response.token,
        })
      )

      navigate('/dashboard')

    } catch (error: any) {

      console.error('LOGIN ERROR:', error)

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Login failed. Please check your username and password.'

      alert(message)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden ambient-bg">

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">

        <div className="text-center space-y-3">

          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-2xl glow-indigo animate-float">
            <GraduationCap size={36} />
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300">
              StudentAI
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400">
            Sign in to access your AI CS tutor, DSA playground, and quizzes.
          </p>

        </div>

        <Card
          variant="glass"
          className="p-8 border-indigo-500/30 shadow-2xl"
        >

          <div className="flex gap-3 mb-6">
            <Button type="button" variant={otpMode ? 'primary' : 'outline'} onClick={() => setOtpMode(true)}>Email OTP</Button>
            <Button type="button" variant={!otpMode ? 'primary' : 'outline'} onClick={() => setOtpMode(false)}>Password</Button>
          </div>
          {otpMode ? <OtpLogin /> : <>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>

              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Username
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>

                <a
                  href="#forgot"
                  className="text-[11px] font-semibold text-indigo-400 hover:underline"
                >
                  Forgot password?
                </a>

              </div>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  required
                />

              </div>

            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={loading}
              className="w-full mt-2"
            >

              <span>
                {loading
                  ? 'Signing In...'
                  : 'Sign In to Dashboard'}
              </span>

              <ArrowRight size={18} />

            </Button>

          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">

            <button
              type="button"
              onClick={() => {
                setUsername('Meghana')
                setPassword('password123')
              }}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >

              <Sparkles size={14} />

              <span>
                Fill Demo Student Credentials
              </span>

            </button>

          </div>

          </>}
        </Card>

        <p className="text-center text-xs text-slate-400">

          Don&apos;t have an account?{' '}

          <Link
            to="/register"
            className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  )
}