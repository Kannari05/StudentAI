import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import {
  Sparkles,
  Zap,
  BookOpen,
  Code2,
  FileSearch,
  ClipboardCheck,
  FileCode2,
  ArrowRight,
  CheckCircle2,
  Flame,
  Clock,
  Target,
  Trophy,
} from "lucide-react";

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Algorithms Solved",
      value: "18",
      change: "+3 this week",
      icon: Zap,
      gradient: "from-indigo-500 to-cyan-500",
      glowColor: "indigo",
    },
    {
      title: "Quizzes Completed",
      value: "12",
      change: "85% Avg Score",
      icon: Target,
      gradient: "from-purple-500 to-pink-500",
      glowColor: "purple",
    },
    {
      title: "Study Streak",
      value: "7 Days",
      change: "Personal Best!",
      icon: Flame,
      gradient: "from-amber-500 to-orange-500",
      glowColor: "amber",
    },
    {
      title: "Study Hours",
      value: "24.5 hrs",
      change: "This Month",
      icon: Clock,
      gradient: "from-emerald-500 to-teal-500",
      glowColor: "emerald",
    },
  ];

  const featureCards = [
    {
      title: "AI Chat Tutor",
      desc: "Ask questions, clarify concepts, and get instant step-by-step guidance.",
      link: "/chat",
      badge: "AI Powered",
      icon: Sparkles,
      color: "from-indigo-500 to-cyan-500",
    },
    {
      title: "DSA Practice Playground",
      desc: "Solve algorithmic challenges with real-time AI code optimization feedback.",
      link: "/dsa",
      badge: "Popular",
      icon: Zap,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Programming Tutor",
      desc: "Master Java, Python, DBMS, and OOP with interactive guided roadmaps.",
      link: "/programming-tutor",
      badge: "Guided Path",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Document AI (RAG)",
      desc: "Upload textbook PDFs and generate summaries and instant Q&A context.",
      link: "/rag",
      badge: "RAG Engine",
      icon: FileSearch,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "AI Quiz Generator",
      desc: "Test your skills with dynamically generated computer science quizzes.",
      link: "/quiz",
      badge: "Interactive",
      icon: ClipboardCheck,
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Code Review & Audit",
      desc: "Scan your code for bugs, performance leaks, and security vulnerabilities.",
      link: "/code-review",
      badge: "Code Audit",
      icon: FileCode2,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/90 via-slate-900 to-indigo-950/90 border border-indigo-500/30 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles size={14} className="animate-spin [animation-duration:6s]" />
            <span>Welcome Back, Meghana 👋</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What concept will you <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300">master today?</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Accelerate your Computer Science journey with personalized AI tutoring, real-time code analysis, DSA practice, and interactive quizzes.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link to="/chat">
              <Button variant="gradient" size="lg">
                <Sparkles size={18} />
                <span>Ask AI Tutor</span>
              </Button>
            </Link>

            <Link to="/dsa">
              <Button variant="outline" size="lg">
                <Zap size={18} />
                <span>Practice DSA</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <Card key={idx} variant="glass" className="p-6 hover:border-indigo-500/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-medium text-emerald-400 mt-1 flex items-center gap-1">
                    <span>{stat.change}</span>
                  </p>
                </div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  <IconComponent size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-indigo-400" size={22} />
            <span>Continue Learning</span>
          </h2>
          <span className="text-xs text-indigo-400 font-semibold hover:underline cursor-pointer">
            View All Courses →
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card variant="glass" className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Java Course
                </span>
                <h3 className="font-bold text-lg text-white mt-2">Java OOP Principles</h3>
              </div>
              <span className="text-xs font-bold text-indigo-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                75%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full w-3/4"></div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Lesson 6 of 8</span>
              <Link to="/programming-tutor">
                <Button variant="primary" size="sm">
                  Resume →
                </Button>
              </Link>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Algorithms
                </span>
                <h3 className="font-bold text-lg text-white mt-2">DSA Arrays & Strings</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                50%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full w-1/2"></div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Challenge 5 of 10</span>
              <Link to="/dsa">
                <Button variant="emerald" size="sm">
                  Resume →
                </Button>
              </Link>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Database
                </span>
                <h3 className="font-bold text-lg text-white mt-2">DBMS & SQL Queries</h3>
              </div>
              <span className="text-xs font-bold text-purple-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                25%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full w-1/4"></div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Module 2 of 8</span>
              <Link to="/programming-tutor">
                <Button variant="ghost" size="sm">
                  Resume →
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Learning Modules Grid */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 flex items-center gap-2">
          <Zap className="text-cyan-400" size={22} />
          <span>AI Learning Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <Link key={idx} to={card.link} className="group">
                <Card variant="glass" className="p-6 h-full flex flex-col justify-between hover:border-indigo-500/50">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp size={22} />
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400">
                    <span>Explore Feature</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Activity & Goal Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" size={20} />
            <span>Recent Learning Activity</span>
          </h2>

          <div className="space-y-3.5 text-xs text-slate-300">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Passed "Java OOP Foundations" Quiz
              </span>
              <span className="text-[10px] text-slate-500">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                Asked AI Tutor about "Graph BFS vs DFS"
              </span>
              <span className="text-[10px] text-slate-500">Yesterday</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Submitted Code Review for "Binary Tree Traversal"
              </span>
              <span className="text-[10px] text-slate-500">2 days ago</span>
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="text-amber-400" size={20} />
              <span>Today's Study Goal</span>
            </h2>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              On Track
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-2">
            Target: 4 hours focused study & coding practice.
          </p>

          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-indigo-500 h-3 rounded-full w-3/4"></div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
            <span>3 of 4 hours completed</span>
            <span className="font-semibold text-indigo-400">75% Achieved</span>
          </div>
        </Card>
      </div>
    </div>
  );
};