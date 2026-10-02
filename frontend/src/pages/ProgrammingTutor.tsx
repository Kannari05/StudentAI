import React, { useState } from "react";
import { BookOpen, Code2, Bot, Sparkles, CheckCircle2, Lightbulb, Zap, HelpCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export const ProgrammingTutor: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState("data-structures");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const concepts = [
    {
      id: "data-structures",
      title: "Data Structures",
      description:
        "Master Arrays, Linked Lists, Stacks, Queues, Binary Trees, Graphs and HashMaps with time & space complexity analysis.",
      code: `const numbers = [10, 20, 30];\nnumbers.push(40);\nconsole.log("Updated Array:", numbers);`,
    },
    {
      id: "recursion",
      title: "Recursion & Call Stack",
      description:
        "Deconstruct recursive functions, base case evaluation, call stack mechanics, and tree recursion.",
      code: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`,
    },
    {
      id: "oop",
      title: "Object Oriented Programming",
      description:
        "Learn Classes, Objects, Encapsulation, Polymorphism, Abstraction, and Inheritance design patterns.",
      code: `class Student {\n  constructor(name, major) {\n    this.name = name;\n    this.major = major;\n  }\n}`,
    },
    {
      id: "dp",
      title: "Dynamic Programming",
      description:
        "Optimize overlapping subproblems using Top-Down Memoization and Bottom-Up Tabulation tables.",
      code: `dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];`,
    },
    {
      id: "system-design",
      title: "System Design",
      description:
        "Understand scalable client-server architecture, API Gateways, Load Balancers, Redis Caching, and DB Sharding.",
      code: `Client --> Load Balancer --> Server Instance --> Redis Cache / PostgreSQL`,
    },
  ];

  const active =
    concepts.find((item) => item.id === selectedConcept) || concepts[0];

  const askAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setAnswer(
        `AI Explanation for "${question}" in ${active.title}:\n\n` +
        `• Core Principle: Deconstruct problem boundaries and state transformations.\n` +
        `• Practical Example: Real-world implementation in software production.\n` +
        `• Code Practice: Implement edge cases (null values, zero capacity).\n` +
        `• Interview Edge: Be ready to explain space complexity O(N) vs O(1).`
      );

      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <BookOpen size={14} className="text-indigo-400" />
            <span>Interactive Guided Roadmaps</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Programming <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300">CS Tutor</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Select a computer science core topic, review runnable code snippets, and ask the AI Tutor for instant explanations and interview preparation.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="glass" className="p-4 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lessons</p>
          <h2 className="text-2xl font-extrabold text-white mt-1">24</h2>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed</p>
          <h2 className="text-2xl font-extrabold text-emerald-400 mt-1">8</h2>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Progress</p>
          <h2 className="text-2xl font-extrabold text-indigo-400 mt-1">35%</h2>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">AI Questions</p>
          <h2 className="text-2xl font-extrabold text-cyan-400 mt-1">18</h2>
        </Card>
      </div>

      {/* Concept Tabs */}
      <Card variant="glass" className="p-2.5 flex flex-wrap gap-2">
        {concepts.map((concept) => {
          const isActive = selectedConcept === concept.id
          return (
            <button
              key={concept.id}
              onClick={() => {
                setSelectedConcept(concept.id);
                setAnswer("");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 border border-indigo-500/40"
                  : "bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Code2 size={16} className={isActive ? 'text-white' : 'text-indigo-400'} />
              <span>{concept.title}</span>
            </button>
          )
        })}
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson View */}
        <Card variant="glass" className="lg:col-span-2 p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
                Beginner to Advanced
              </span>
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-semibold">
                30 Minutes Module
              </span>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full text-xs font-semibold">
                AI Interactive
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white">
              {active.title}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {active.description}
            </p>
          </div>

          {/* Code Container */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Code2 size={16} className="text-indigo-400" />
              <span>Runnable Code Example</span>
            </h3>
            <div className="code-container p-5 overflow-x-auto">
              <pre className="text-xs font-mono text-cyan-300 leading-relaxed">
                <code>{active.code}</code>
              </pre>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Key Concept Takeaways</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">✓ Master core algorithm principles</div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">✓ Evaluate time & space complexity</div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">✓ Practice edge case validation</div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">✓ Prepare for tech interview questions</div>
            </div>
          </div>
        </Card>

        {/* AI Tutor Assistant Box */}
        <Card variant="glass" className="p-6 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">AI Concept Assistant</h2>
              <p className="text-[11px] text-indigo-400 font-medium">Topic: {active.title}</p>
            </div>
          </div>

          <form onSubmit={askAI} className="space-y-4">
            <textarea
              rows={5}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything (e.g., Explain recursion with a real-world stack trace)..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setQuestion("Explain this topic in simple words")}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                Explain Simply
              </button>

              <button
                type="button"
                onClick={() => setQuestion("Give me a real-world example")}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                Real Example
              </button>

              <button
                type="button"
                onClick={() => setQuestion("Give me interview questions")}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                Interview Questions
              </button>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="md"
              disabled={loading}
              className="w-full"
            >
              <Sparkles size={16} />
              <span>{loading ? "Generating..." : "Ask AI Tutor"}</span>
            </Button>
          </form>

          {answer && (
            <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 space-y-2 animate-slide-up">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} />
                AI Explanation
              </h3>
              <pre className="whitespace-pre-wrap text-slate-200 text-xs font-sans leading-relaxed">{answer}</pre>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};