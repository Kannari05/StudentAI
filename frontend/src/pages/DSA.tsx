import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dsaService, AlgorithmData } from '../services/dsaService'
import { Zap, Search, Filter, ArrowRight, Code2, CheckCircle, BarChart2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export const DSA: React.FC = () => {
  const [algorithms, setAlgorithms] = useState<AlgorithmData[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [loading, setLoading] = useState(true)

  const fallbackAlgorithms: AlgorithmData[] = [
    {
      id: 1,
      title: 'Two Sum',
      category: 'Arrays',
      difficulty: 'Easy',
      description: 'Find two numbers in an array that add up to a target value using a Hash Map.',
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      category: 'Trees & Linked Lists',
      difficulty: 'Easy',
      description: 'Reverse a singly linked list in-place using iterative pointer manipulation.',
    },
    {
      id: 3,
      title: 'Valid Palindrome',
      category: 'Strings',
      difficulty: 'Easy',
      description: 'Determine if a string is a valid palindrome ignoring non-alphanumeric chars.',
    },
    {
      id: 4,
      title: 'Binary Tree Level Order Traversal',
      category: 'Trees & Linked Lists',
      difficulty: 'Medium',
      description: 'Return level order traversal of binary tree node values using Breadth First Search (BFS).',
    },
    {
      id: 5,
      title: 'Longest Substring Without Repeating Characters',
      category: 'Strings',
      difficulty: 'Medium',
      description: 'Find the length of the longest substring without repeating characters using Sliding Window technique.',
    },
    {
      id: 6,
      title: 'Merge K Sorted Lists',
      category: 'Trees & Linked Lists',
      difficulty: 'Hard',
      description: 'Merge k sorted linked lists into one sorted list using a Min-Heap / Priority Queue.',
    },
  ]

  useEffect(() => {
    dsaService.getAlgorithms()
      .then((data) => {
        if (data && data.length > 0) setAlgorithms(data)
        else setAlgorithms(fallbackAlgorithms)
      })
      .catch(() => setAlgorithms(fallbackAlgorithms))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', 'Arrays', 'Strings', 'Trees & Linked Lists', 'Dynamic Programming', 'Graphs']
  const difficulties = ['All', 'Easy', 'Medium', 'Hard']

  const filtered = algorithms.filter((algo) => {
    const matchesSearch = algo.title.toLowerCase().includes(search.toLowerCase()) ||
                          algo.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || algo.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || algo.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
      case 'Hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/30'
      default: return 'bg-slate-800 text-slate-300 border-slate-700'
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Zap size={14} className="text-amber-400 fill-amber-400" />
              <span>LeetCode & CS Exam Preparation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              DSA Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Playground</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Select an algorithm challenge, code your solution, and receive instant AI analysis on time complexity, space optimization, and edge case coverage.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Card variant="glass" className="px-4 py-3 text-center border-indigo-500/30">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available</p>
              <p className="text-2xl font-extrabold text-white mt-0.5">{filtered.length}</p>
            </Card>
            <Card variant="glass" className="px-4 py-3 text-center border-emerald-500/30">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Solved</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">18</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <Card variant="glass" className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Search Challenge</label>
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by title, concept, hash map..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Algorithm Challenge Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading algorithm challenges...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((algo) => (
            <Link key={algo.id} to={`/dsa/${algo.id}`} className="group">
              <Card variant="glass" className="p-6 h-full flex flex-col justify-between hover:border-indigo-500/50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      {algo.category}
                    </span>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getDifficultyBadge(algo.difficulty)}`}>
                      {algo.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {algo.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {algo.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Code2 size={14} className="text-indigo-400" />
                    AI Feedback Included
                  </span>
                  <span className="text-indigo-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Solve Problem <ArrowRight size={14} />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
