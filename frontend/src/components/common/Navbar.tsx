import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const userRole = localStorage.getItem('userRole') || 'USER'

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/chat', label: 'AI Tutor', icon: '🤖' },
    { path: '/dsa', label: 'DSA Practice', icon: '⚡' },
    { path: '/programming-tutor', label: 'Concepts', icon: '💡' },
    { path: '/rag', label: 'Doc Analysis', icon: '📚' },
    { path: '/quiz', label: 'Quizzes', icon: '🎯' },
    { path: '/code-review', label: 'Code Review', icon: '🔍' },
    { path: '/progress', label: 'Progress', icon: '📈' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ]

  if (userRole === 'ADMIN') {
    navLinks.push({ path: '/admin', label: 'Admin', icon: '⚙️' })
  }

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="flex items-center space-x-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              <span className="text-2xl">🎓</span>
              <span>StudentAI</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/')
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
