import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, User, Mail, Lock, ArrowRight } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import authService from '../services/authService'

export const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !email || !password) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const response = await authService.register({
        username,
        email,
        password,
      })

      console.log('REGISTER SUCCESS:', response)

      alert('Registration successful! Please login.')

      navigate('/login')
    } catch (error: any) {
      console.error('REGISTER ERROR:', error)

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Registration failed. Please try again.'

      alert(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden ambient-bg">

      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-3">

          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-2xl glow-indigo animate-float">
            <GraduationCap size={36} />
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Create Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-300">
              Account
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400">
            Join StudentAI to unlock personalized AI learning & practice.
          </p>

        </div>

        {/* Register Card */}
        <Card
          variant="glass"
          className="p-8 border-purple-500/30 shadow-2xl"
        >

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
                  placeholder="UserName"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  required
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>

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

            {/* Register Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={loading}
              className="w-full mt-2"
            >

              <span>
                {loading
                  ? 'Creating Account...'
                  : 'Register & Start Learning'}
              </span>

              <ArrowRight size={18} />

            </Button>

          </form>

        </Card>

        {/* Login */}
        <p className="text-center text-xs text-slate-400">

          Already have an account?{' '}

          <Link
            to="/login"
            className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Sign In
          </Link>

        </p>

      </div>

    </div>
  )
}