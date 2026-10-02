import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dsaService, AlgorithmData, DSASolutionData } from '../../services/dsaService'

export const AlgorithmDetail: React.FC = () => {
  const { algorithmId } = useParams<{ algorithmId: string }>()
  const [algorithm, setAlgorithm] = useState<AlgorithmData | null>(null)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [submitting, setSubmitting] = useState(false)
  const [solutionResult, setSolutionResult] = useState<DSASolutionData | null>(null)
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'aiFeedback'>('problem')

  useEffect(() => {
    const idNum = Number(algorithmId)
    dsaService.getAlgorithmById(idNum)
      .then((data) => {
        setAlgorithm(data)
        setCode(data.starterCode || 'function solve() {\n  // Write your code here\n}')
      })
      .catch(() => {
        // Fallback default
        const fallback: AlgorithmData = {
          id: idNum || 1,
          title: 'Two Sum',
          category: 'Arrays',
          difficulty: 'Easy',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
          starterCode: 'function twoSum(nums, target) {\n  // Write solution here\n}',
          solutionCode: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}',
          sampleInput: 'nums = [2,7,11,15], target = 9',
          sampleOutput: '[0,1]',
          explanation: 'Store complements in a Hash Map to achieve linear time complexity O(N).',
        }
        setAlgorithm(fallback)
        setCode(fallback.starterCode || '')
      })
  }, [algorithmId])

  const handleSubmit = async () => {
    if (!algorithm || submitting) return
    setSubmitting(true)
    try {
      const res = await dsaService.submitSolution(algorithm.id, code, language)
      setSolutionResult(res)
      setActiveTab('aiFeedback')
    } catch (err) {
      setSolutionResult({
        id: Date.now(),
        algorithmId: algorithm.id,
        submittedCode: code,
        language: language,
        status: 'EVALUATION_ERROR',
        aiFeedback: 'Submission could not be evaluated right now. Please try again later.',
        output: 'No output available.',
      })
      setActiveTab('aiFeedback')
    } finally {
      setSubmitting(false)
    }
  }

  if (!algorithm) {
    return (
      <div className="p-12 text-center text-slate-400">Loading problem details...</div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center space-x-4">
            <Link to="/dsa" className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700">
              ← Back to Challenges
            </Link>
            <h1 className="text-xl font-bold text-white">{algorithm.title}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
              {algorithm.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              {algorithm.difficulty}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md disabled:opacity-50 transition-all"
            >
              {submitting ? 'Evaluating Code...' : 'Submit Solution'}
            </button>
          </div>
        </div>

        {/* Main Grid: Problem vs Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[72vh]">
          {/* Left Panel: Problem / Solution / AI Feedback */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/80 p-2 gap-2">
              <button
                onClick={() => setActiveTab('problem')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'problem' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Problem Description
              </button>
              <button
                onClick={() => setActiveTab('solution')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'solution' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Optimal Solution
              </button>
              {solutionResult && (
                <button
                  onClick={() => setActiveTab('aiFeedback')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'aiFeedback' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  AI Review Result
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
              {activeTab === 'problem' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Challenge Statement</h3>
                  <p className="whitespace-pre-wrap">{algorithm.description}</p>
                  {(algorithm.sampleInput || algorithm.sampleOutput) && (
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      {algorithm.sampleInput && (
                        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Sample Input</h4>
                          <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 mt-2">{algorithm.sampleInput}</pre>
                        </div>
                      )}
                      {algorithm.sampleOutput && (
                        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Sample Output</h4>
                          <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 mt-2">{algorithm.sampleOutput}</pre>
                        </div>
                      )}
                    </div>
                  )}
                  {algorithm.explanation && (
                    <div className="mt-4 p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Approach Hint</h4>
                      <p className="text-xs text-slate-300">{algorithm.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'solution' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Optimal Solution Approach</h3>
                  <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto">
                    {algorithm.solutionCode || '// Solution code available upon request'}
                  </pre>
                </div>
              )}

              {activeTab === 'aiFeedback' && solutionResult && (
                <div className="space-y-4">
                  <div className={`flex items-center space-x-2 text-sm font-bold p-3 rounded-xl border ${
                    solutionResult.status === 'ACCEPTED'
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                      : 'text-rose-300 bg-rose-500/10 border-rose-500/30'
                  }`}>
                    <span>{solutionResult.status === 'ACCEPTED' ? '✓ Status:' : '✕ Status:'}</span>
                    <span>{solutionResult.status}</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Evaluation & Analysis</h4>
                      <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200">{solutionResult.aiFeedback}</pre>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Output</h4>
                        <pre className="whitespace-pre-wrap font-mono text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-xl p-3 mt-2">
                          {solutionResult.output || 'No output available.'}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Complexity</h4>
                        <div className="mt-2 space-y-2 text-slate-200 text-xs">
                          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3">
                            <span className="block text-slate-400">Time</span>
                            <span className="font-semibold">{solutionResult.timeComplexity || 'N/A'}</span>
                          </div>
                          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3">
                            <span className="block text-slate-400">Space</span>
                            <span className="font-semibold">{solutionResult.spaceComplexity || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {solutionResult.status !== 'ACCEPTED' && algorithm.sampleOutput && (
                      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                        <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Expected Output</h4>
                        <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 mt-2">{algorithm.sampleOutput}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Code Playground */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
            <div className="bg-slate-900/90 border-b border-slate-800 p-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">Code Editor ({language})</span>
              <button
                onClick={() => setCode(algorithm.starterCode || '')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Reset Code
              </button>
            </div>
            <div className="flex-1 p-4 bg-slate-950 font-mono text-xs text-indigo-200">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-indigo-200 leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
