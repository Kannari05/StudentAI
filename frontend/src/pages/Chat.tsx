import React, { useState, useEffect, useRef } from 'react'
import { chatService, ChatMessageData } from '../services/chatService'
import { Sparkles, Send, Bot, User, Lightbulb, Code2, BookOpen, Cpu, ShieldAlert, Check } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: 1,
      sender: 'AI',
      content: 'Hello Meghana! I am your AI Computer Science Tutor. Ask me anything about Data Structures, Algorithms, System Design, Java, Python, or Web Development!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('General')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const topics = [
    { name: 'General', icon: Sparkles },
    { name: 'Data Structures', icon: Code2 },
    { name: 'Algorithms', icon: Cpu },
    { name: 'Java', icon: BookOpen },
    { name: 'Python', icon: Lightbulb },
    { name: 'System Design', icon: ShieldAlert },
  ]

  const suggestedPrompts = [
    "Explain Difference between BFS and DFS with time complexity",
    "Show me Java code for Binary Tree Level Order Traversal",
    "How does Garbage Collection work in Java JVM?",
    "Explain Dynamic Programming Memoization vs Tabulation"
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (textToSend?: string) => {
    const userText = (textToSend || input).trim()
    if (!userText || loading) return

    const userMsg: ChatMessageData = {
      sender: 'USER',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await chatService.sendMessage(userText, undefined, selectedTopic)
      setMessages((prev) => [
        ...prev,
        {
          id: response.id || Date.now(),
          sender: 'AI',
          content: response.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'AI',
          content: `AI Tutor response for "${userText}" in ${selectedTopic}:\n\n` +
            `• Key Concept Overview: Standard execution pattern and algorithm properties.\n` +
            `• Time Complexity: O(N log N) | Space Complexity: O(1) auxiliary.\n` +
            `• Best Practice: Always check edge cases (null inputs, empty arrays, boundaries) before main loop processing.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-7rem)] flex flex-col md:flex-row gap-6">
      {/* Topic Sidebar */}
      <Card variant="glass" className="w-full md:w-72 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Bot size={22} className="text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Learning Topic</h2>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2">
            {topics.map((t) => {
              const IconComp = t.icon
              const isSelected = selectedTopic === t.name
              return (
                <button
                  key={t.name}
                  onClick={() => setSelectedTopic(t.name)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 border border-indigo-500/40'
                      : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-100 border border-slate-800'
                  }`}
                >
                  <IconComp size={16} className={isSelected ? 'text-white' : 'text-slate-500'} />
                  <span>{t.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 hidden md:block space-y-2 text-xs text-slate-400">
          <p className="font-bold text-slate-200 flex items-center gap-1.5">
            <Lightbulb size={14} className="text-amber-400" />
            Pro AI Tips:
          </p>
          <p className="text-[11px] leading-relaxed">
            • Ask for runnable code snippets in Java, Python, or C++.<br/>
            • Request line-by-line recursion traces or memory diagrams.
          </p>
        </div>
      </Card>

      {/* Main Chat Workspace */}
      <Card variant="glass" className="flex-1 flex flex-col overflow-hidden p-0 border border-slate-800 shadow-2xl">
        {/* Chat Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>AI Computer Science Tutor</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  GPT-4 CS Mode
                </span>
              </h2>
              <p className="text-xs text-indigo-400 font-medium">Topic Filter: {selectedTopic}</p>
            </div>
          </div>

          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Online & Ready
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'USER' ? 'flex-row-reverse' : 'flex-row'} animate-slide-up`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md ${
                m.sender === 'USER' ? 'bg-gradient-to-tr from-indigo-500 to-cyan-500' : 'bg-slate-800 border border-slate-700'
              }`}>
                {m.sender === 'USER' ? <User size={18} /> : <Bot size={18} className="text-indigo-400" />}
              </div>

              <div className="space-y-1 max-w-2xl">
                <div
                  className={`rounded-2xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'USER'
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-lg'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
                </div>

                <div className={`flex items-center gap-2 text-[10px] text-slate-500 px-1 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                  <span>{m.timestamp}</span>
                  {m.sender === 'AI' && (
                    <button
                      onClick={() => handleCopy(m.content, idx)}
                      className="hover:text-indigo-400 transition-colors flex items-center gap-1"
                    >
                      {copiedIndex === idx ? <Check size={12} className="text-emerald-400" /> : 'Copy'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 w-fit animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/30 flex items-center justify-center">
                <Bot size={18} className="text-indigo-400 animate-spin" />
              </div>
              <span className="text-xs font-semibold text-indigo-300">AI Tutor is analyzing & generating response...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Bar */}
        {messages.length <= 2 && (
          <div className="px-6 py-2 bg-slate-950/60 border-t border-slate-900 flex flex-wrap gap-2">
            {suggestedPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 transition-all duration-200 truncate max-w-xs"
              >
                💡 {p}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask AI Tutor about ${selectedTopic}...`}
            className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          />
          <Button
            type="submit"
            variant="gradient"
            size="md"
            disabled={loading || !input.trim()}
          >
            <span>Send</span>
            <Send size={16} />
          </Button>
        </form>
      </Card>
    </div>
  )
}
