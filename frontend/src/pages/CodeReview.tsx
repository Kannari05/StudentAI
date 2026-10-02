import React, { useState } from 'react'
import { CodeReviewInput } from '../components/codereview/CodeReviewInput'
import { CodeReviewResults } from '../components/codereview/CodeReviewResults'
import { CodeReview as CodeReviewType } from '../services/codeReviewService'
import { Search, BarChart3, Lightbulb, Zap, FileCode2 } from 'lucide-react'
import Card from '../components/ui/Card'

type CodeReviewState = 'input' | 'results'

export const CodeReview: React.FC = () => {
  const [reviewState, setReviewState] = useState<CodeReviewState>('input')
  const [currentReview, setCurrentReview] = useState<CodeReviewType | null>(null)

  const handleReviewComplete = (review: CodeReviewType) => {
    setCurrentReview(review)
    setReviewState('results')
  }

  const handleNewReview = () => {
    setCurrentReview(null)
    setReviewState('input')
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <FileCode2 size={14} className="text-amber-400" />
            <span>AI Automated Code Diagnostics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400">Review & Audit</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Paste your code snippet below to perform automated security audits, analyze time/space complexity, locate subtle bugs, and receive production-ready refactored code.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {reviewState === 'input' && (
          <CodeReviewInput onReviewComplete={handleReviewComplete} />
        )}

        {reviewState === 'results' && currentReview && (
          <CodeReviewResults review={currentReview} onNewReview={handleNewReview} />
        )}

        {/* Features Card */}
        {reviewState === 'input' && (
          <Card variant="glass" className="p-6">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              <span>Automated Code Audit Suite</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <Search size={20} />
                </div>
                <h3 className="text-xs font-bold text-white">Bug Detection</h3>
                <p className="text-[11px] text-slate-400 leading-snug">Locate edge-case bugs & memory safety flaws</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-xs font-bold text-white">Complexity Rating</h3>
                <p className="text-[11px] text-slate-400 leading-snug">Evaluate Big-O Time & Space complexity</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-xs font-bold text-white">Best Practices</h3>
                <p className="text-[11px] text-slate-400 leading-snug">Clean code principles & design patterns</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h3 className="text-xs font-bold text-white">Refactored Code</h3>
                <p className="text-[11px] text-slate-400 leading-snug">Get optimized ready-to-use refactored code</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
