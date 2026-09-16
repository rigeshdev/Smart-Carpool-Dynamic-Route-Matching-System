import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Sparkles,
  Users,
  ChevronDown,
  Repeat,
  Shield,
  Car
} from 'lucide-react';
import { useCarpool } from '../../context/CarpoolContext';
import { DEMO_USERS } from '../../data/mockData';

export default function Navbar({ onOpenMobileMenu }) {
  const { currentUser, role, toggleRole, switchUser, addToast } = useCarpool();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & breadcrumb/title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Campus Carpool
            </span>
            <span className="text-xs text-slate-400 hidden md:inline">•</span>
            <span className="text-xs font-medium text-slate-500 hidden md:inline">
              CSE Project Demo
            </span>
          </div>
        </div>

        {/* Center: Search shortcut */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div
            onClick={() => navigate('/find-ride')}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100 hover:bg-slate-200/70 rounded-xl cursor-pointer text-xs text-slate-500 transition-colors border border-transparent hover:border-slate-300"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search routes, stops (e.g. Samayapuram, Srirangam)...</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-white text-[10px] text-slate-400 font-mono shadow-xs border border-slate-200">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: Actions, Role toggle & Profile Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Toggle */}
          <button
            onClick={toggleRole}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              role === 'driver'
                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
            }`}
            title="Toggle Driver / Passenger Mode"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span className="capitalize">{role}</span>
          </button>

          {/* Quick Demo Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="hidden sm:inline font-semibold">{currentUser.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-40 animate-scale-up">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Test User
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Test passenger/driver route match perspectives
                  </p>
                </div>
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                      setShowUserMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs hover:bg-slate-50 transition-colors ${
                      currentUser.id === user.id ? 'bg-indigo-50/70 font-bold text-indigo-700' : 'text-slate-700'
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 capitalize">{user.role} • {user.department.split(' ')[0]}</p>
                    </div>
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                  <NavLink
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-3 py-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    View Full Profile & Vehicle Info →
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
