import React, { useState } from 'react'
import { User, Shield, Flame, Trophy, CheckCircle2, Zap, Settings, Award } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export const Profile: React.FC = () => {
  const [username, setUsername] = useState('Meghana')
  const [email, setEmail] = useState('meghana@studentai.edu')
  const [role] = useState(localStorage.getItem('userRole') || 'STUDENT')
  const [saved, setSaved] = useState(false)

  const achievements = [
    { title: '7-Day Study Streak', icon: Flame, desc: 'Maintained a 7-day continuous learning streak.', unlocked: true, color: 'from-amber-500 to-orange-500' },
    { title: 'DSA Master', icon: Zap, desc: 'Solved 15+ algorithmic coding challenges.', unlocked: true, color: 'from-indigo-500 to-cyan-500' },
    { title: 'Quiz Scholar', icon: Trophy, desc: 'Scored 85%+ on 5 computer science quizzes.', unlocked: true, color: 'from-purple-500 to-pink-500' },
    { title: 'RAG Explorer', icon: Award, desc: 'Uploaded & queried 5+ lecture study materials.', unlocked: true, color: 'from-emerald-500 to-teal-500' },
    { title: 'Code Reviewer', icon: CheckCircle2, desc: 'Submitted 10+ code blocks for AI code audit.', unlocked: true, color: 'from-cyan-500 to-blue-600' },
    { title: 'System Architect', icon: Shield, desc: 'Completed System Design concept deep dives.', unlocked: false, color: 'from-slate-700 to-slate-800' },
  ]

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-2xl glow-indigo shrink-0">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{username}</h1>
              <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">{email}</p>
            <p className="text-xs text-amber-400 font-semibold flex items-center justify-center sm:justify-start gap-1 pt-1">
              <Flame size={16} className="fill-amber-400" />
              <span>Active 7-Day Study Streak • Level 5 Scholar</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <Card variant="glass" className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Settings size={20} className="text-indigo-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Account Settings</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Account Role</label>
              <input
                type="text"
                value={role}
                disabled
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="md"
              className="w-full"
            >
              Save Profile Changes
            </Button>

            {saved && (
              <p className="text-center text-xs text-emerald-400 font-semibold animate-slide-up">
                ✓ Profile saved successfully!
              </p>
            )}
          </form>
        </Card>

        {/* Achievements Grid */}
        <Card variant="glass" className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Award size={20} className="text-amber-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Achievements & Badges</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((item, idx) => {
              const IconComp = item.icon
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                    item.unlocked
                      ? 'bg-slate-900/70 border-slate-800'
                      : 'bg-slate-950/40 border-slate-800/40 opacity-40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                    <IconComp size={20} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-white">{item.title}</h3>
                      {item.unlocked && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
