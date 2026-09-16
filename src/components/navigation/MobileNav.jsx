import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  PlusCircle,
  Sparkles,
  Car,
  MapPin,
  User,
  LogOut,
  X,
  Repeat,
  ShieldCheck
} from 'lucide-react';
import { useCarpool } from '../../context/CarpoolContext';

export default function MobileNav({ isOpen, onClose }) {
  const { currentUser, role, toggleRole, addToast } = useCarpool();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Find Ride', path: '/find-ride', icon: Search },
    { label: 'Create Ride', path: '/create-ride', icon: PlusCircle },
    { label: 'Recommendations', path: '/recommendations', icon: Sparkles },
    { label: 'My Rides', path: '/my-rides', icon: Car },
    { label: 'Route Visualizer', path: '/route', icon: MapPin },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    onClose();
    addToast('Logged out of demo session.', 'info');
    navigate('/login');
  };

  return (
    <>
      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-slate-900 text-slate-300 shadow-2xl z-10 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">SmartCarpool</span>
                    <span className="text-[10px] text-indigo-400 block">CSE College Project</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Role Switcher */}
              <div className="p-3 mx-3 my-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Mode
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 uppercase">
                    {role}
                  </span>
                </div>
                <button
                  onClick={toggleRole}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-slate-700 hover:bg-indigo-600 rounded-lg text-xs font-semibold text-white transition-colors"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  Switch to {role === 'driver' ? 'Passenger' : 'Driver'}
                </button>
              </div>

              {/* Links */}
              <nav className="p-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Navigation Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/find-ride"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'
            }`
          }
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Find</span>
        </NavLink>

        <NavLink
          to="/create-ride"
          className="flex flex-col items-center -mt-4"
        >
          <div className="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-indigo-700 mt-0.5">Offer</span>
        </NavLink>

        <NavLink
          to="/recommendations"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'
            }`
          }
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span>Matches</span>
        </NavLink>

        <NavLink
          to="/my-rides"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'
            }`
          }
        >
          <Car className="w-5 h-5 mb-0.5" />
          <span>Rides</span>
        </NavLink>
      </div>
    </>
  );
}
