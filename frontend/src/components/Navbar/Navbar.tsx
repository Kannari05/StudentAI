import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../../store/authSlice";
import {
  LogOut,
  Bell,
  Search,
  Menu,
  User,
  Sparkles,
  Zap,
} from "lucide-react";

type Props = {
  onToggleSidebar?: () => void;
  collapsed?: boolean;
};

export default function Navbar({ onToggleSidebar }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    dispatch(logout());
    queryClient.clear();
    navigate("/login", { replace: true });
  };
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between z-20">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 transition-all duration-200 active:scale-95"
          title="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden md:block w-80 lg:w-96">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search concepts, algorithms, quizzes..."
            className="w-full pl-10 pr-14 py-2.5 rounded-xl border border-slate-700/70 bg-slate-950/60 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-slate-700">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* AI Tutor Quick Button */}
        <Link
          to="/chat"
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-200 active:scale-95"
        >
          <Sparkles size={16} className="animate-pulse" />
          <span>Ask AI Tutor</span>
        </Link>

        {/* Level / XP Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold">
          <Zap size={14} className="text-amber-400 fill-amber-400" />
          <span>Level 5 Scholar</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 transition-all duration-200"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 glass-card rounded-2xl p-4 shadow-2xl z-50 animate-slide-up border border-slate-700">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Notifications</h4>
                <span className="text-[10px] text-indigo-400 font-medium">3 New</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/40">
                  <p className="font-semibold text-slate-200">🎯 Quiz Mastered!</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Scored 90% on Java OOP Principles.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/40">
                  <p className="font-semibold text-slate-200">⚡ Streak Maintained!</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">7 days consecutive learning active.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={18} aria-hidden="true" />
          <span>Logout</span>
        </button>

        {/* User Profile Info */}
        <Link to="/profile" className="flex items-center gap-3 pl-2 group">
          <div className="hidden sm:block text-right">
            <h3 className="text-xs font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
              Meghana
            </h3>
            <p className="text-[10px] font-medium text-slate-400">
              Computer Science
            </p>
          </div>

          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform duration-200">
              <User size={20} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
          </div>
        </Link>
      </div>
    </header>
  );
}