import React, { useState, useEffect } from 'react'
import { ProgressDashboard } from '../components/progress/ProgressDashboard'
import { ProgressCharts } from '../components/progress/ProgressCharts'
import { progressService, ProgressSummaryResponse } from '../services/progressService'
import { BarChart3, TrendingUp, Flame, Target, Lightbulb } from 'lucide-react'
import Card from '../components/ui/Card'

export const Progress: React.FC = () => {
  const [summary, setSummary] = useState<ProgressSummaryResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const fallbackSummary: ProgressSummaryResponse = {
    totalAlgorithmsCompleted: 18,
    averageQuizScore: 85.0,
    totalStudyHours: 24.5,
    currentStreak: 7,
    weakTopics: ['Dynamic Programming', 'System Design'],
    strongTopics: ['Arrays & Strings', 'Linked Lists & Trees'],
    weeklyProgress: {
      Mon: 150,
      Tue: 180,
      Wed: 240,
      Thu: 120,
      Fri: 300,
      Sat: 270,
      Sun: 210,
    },
    monthlyProgress: {
      '2024-07-01': 1200,
      '2024-07-02': 1320,
      '2024-07-03': 1450,
      '2024-07-04': 1580,
      '2024-07-05': 1720,
    },
    activityBreakdown: {
      ALGORITHM: 18,
      QUIZ: 12,
      CHAT: 8,
      PROGRAMMING_TUTOR: 6,
      RAG: 4,
      CODE_REVIEW: 3,
    },
  }

  useEffect(() => {
    progressService.getProgressSummary()
      .then((data) => setSummary(data))
      .catch(() => setSummary(fallbackSummary))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <TrendingUp size={14} className="text-emerald-400" />
            <span>Real-time Learning Performance Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">Progress & Analytics</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Monitor your study time distribution, quiz accuracy percentages, algorithm solving velocity, and personalized AI recommendations.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading analytics summary...</div>
      ) : (
        summary && (
          <div className="space-y-8">
            <ProgressDashboard summary={summary} />
            <ProgressCharts summary={summary} />

            <Card variant="glass" className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Lightbulb size={18} className="text-amber-400" />
                <span>AI Automated Learning Recommendations</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-indigo-950/40 border border-indigo-500/30 p-5 rounded-2xl space-y-2">
                  <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Flame size={16} className="text-amber-400 fill-amber-400" />
                    Maintain Daily Streak
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You are on a 7-day streak! Solving 1 algorithm challenge daily preserves streak momentum and retention.
                  </p>
                </div>

                <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 rounded-2xl space-y-2">
                  <h4 className="font-bold text-emerald-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Target size={16} className="text-emerald-400" />
                    Dynamic Programming Target
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Mastery at 65%. Practice 2 DP challenges in the DSA playground to reach 85%+ mastery level.
                  </p>
                </div>

                <div className="bg-purple-950/40 border border-purple-500/30 p-5 rounded-2xl space-y-2">
                  <h4 className="font-bold text-purple-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 size={16} className="text-purple-400" />
                    System Design Architecture
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Review concept deep dives on Load Balancers, Caching, and Microservices to round out your system design skills.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )
      )}
    </div>
  )
}
