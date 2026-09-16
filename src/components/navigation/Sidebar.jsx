import React from 'react';
import { NavLink, useNavigate } from 'lucide-react';
import { NavLink as RouterNavLink, useNavigate as useRouterNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  PlusCircle,
  Sparkles,
  Car,
  MapPin,
  User,
  LogOut,
  Repeat,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCarpool } from '../../context/CarpoolContext';

export default function Sidebar() {
  const { currentUser, role, toggleRole, addToast } = useCarpool();
  const navigate = useRouterNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Find Ride', path: '/find-ride', icon: Search },
    { label: 'Create Ride', path: '/create-ride', icon: PlusCircle, highlight: true },
    { label: 'Recommendations', path: '/recommendations', icon: Sparkles, badge: 'AI Match' },
    { label: 'My Rides', path: '/my-rides', icon: Car },
    { label: 'Route Visualizer', path: '/route', icon: MapPin },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    addToast('Logged out of demo session.', 'info');
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 min-h-screen select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <RouterNavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base text-white tracking-tight block leading-tight">
              SmartCarpool
            </span>
            <span className="text-[11px] text-indigo-400 font-medium block">
              Route Matching System
            </span>
          </div>
        </RouterNavLink>
      </div>

      {/* Role Switcher Pill */}
      <div className="p-4 mx-3 my-3 bg-slate-800/60 rounded-2xl border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Active Mode
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
              role === 'driver'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
            }`}
          >
            {role}
          </span>
        </div>
        <button
          onClick={toggleRole}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-700/70 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-semibold text-slate-200 transition-all shadow-xs group"
          title="Switch between Driver and Passenger view"
        >
          <Repeat className="w-3.5 h-3.5 text-indigo-400 group-hover:text-white transition-colors" />
          Switch to {role === 'driver' ? 'Passenger' : 'Driver'}
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <RouterNavLink
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  {item.badge}
                </span>
              )}
            </RouterNavLink>
          );
        })}
      </nav>

      {/* College Project Disclaimer / Badge */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
        <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CSE Final Year Project</span>
        </div>
        <p className="text-[10px] text-slate-500">
          Simulated dynamic route similarity & detour optimization engine.
        </p>
      </div>

      {/* User Info & Logout Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <RouterNavLink to="/profile" className="flex items-center gap-2.5 min-w-0 group">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {currentUser.collegeId || 'College CSE'}
            </p>
          </div>
        </RouterNavLink>

        <button
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
          title="Sign out of demo session"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
