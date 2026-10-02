import { NavLink } from "react-router-dom";
import {
  Home,
  MessageSquare,
  BookOpen,
  Code2,
  ClipboardCheck,
  FileCode2,
  FileSearch,
  BarChart3,
  User,
  GraduationCap,
  Sparkles,
  Zap,
} from "lucide-react";

const menu = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: MessageSquare, label: "AI Tutor", to: "/chat" },
  { icon: BookOpen, label: "DSA Practice", to: "/dsa" },
  { icon: Code2, label: "Programming", to: "/programming-tutor" },
  { icon: ClipboardCheck, label: "AI Quiz", to: "/quiz" },
  { icon: FileSearch, label: "Document AI", to: "/rag" },
  { icon: FileCode2, label: "Code Review", to: "/code-review" },
  { icon: BarChart3, label: "Progress", to: "/progress" },
  { icon: User, label: "Profile", to: "/profile" },
];

type Props = {
  collapsed?: boolean;
};

export default function Sidebar({ collapsed = false }: Props) {
  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-72"
      } bg-slate-900/90 backdrop-blur-xl text-slate-100 border-r border-slate-800/80 flex flex-col transition-all duration-300 z-30 relative`}
    >
      {/* Brand Header */}
      <div
        className={`${
          collapsed
            ? "flex justify-center py-6"
            : "px-6 py-6 border-b border-slate-800/70"
        }`}
      >
        {collapsed ? (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <GraduationCap size={24} className="text-white" />
          </div>
        ) : (
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <GraduationCap size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>Student</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  AI
                </span>
              </h1>
              <p className="text-[11px] font-medium text-slate-400">
                Next-Gen CS Learning Platform
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500/40"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className="transition-transform group-hover:scale-110 shrink-0" />

              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* AI Assistant Callout */}
      {!collapsed && (
        <div className="px-4 pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-indigo-950/80 p-4 border border-indigo-500/30 shadow-xl">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-2 text-indigo-300">
              <Sparkles size={18} className="animate-spin [animation-duration:8s]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">AI CS Tutor Active</h3>
            </div>

            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Stuck on recursion or algorithms? Ask StudentAI.
            </p>

            <NavLink
              to="/chat"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold rounded-xl py-2.5 shadow-md transition-all duration-200 active:scale-95"
            >
              <Zap size={14} className="fill-white" />
              <span>Launch Tutor</span>
            </NavLink>
          </div>
        </div>
      )}

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="border-t border-slate-800/80 px-6 py-4 flex items-center justify-between text-[11px] text-slate-500">
          <span>StudentAI v2.0</span>
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        </div>
      )}
    </aside>
  );
}