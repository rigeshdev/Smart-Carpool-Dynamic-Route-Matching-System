import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';
import Button from '../components/common/Button';
import { useCarpool } from '../../context/CarpoolContext';
import { DEMO_USERS } from '../../data/mockData';

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [roleSelection, setRoleSelection] = useState('driver'); // 'driver' | 'passenger'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');

  const { setRole, setCurrentUser, addToast, switchUser } = useCarpool();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      addToast(`Account created for ${name || 'Student'} as ${roleSelection.toUpperCase()}!`, 'success');
      setRole(roleSelection);
    } else {
      addToast(`Logged in successfully as ${roleSelection.toUpperCase()}!`, 'success');
      setRole(roleSelection);
    }
    navigate('/dashboard');
  };

  const handleQuickDemo = (userId) => {
    switchUser(userId);
    addToast('Logged in with demo evaluation account!', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full">
        {/* Brand Top Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-3">
            <Car className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isRegister ? 'Create College Account' : 'Welcome to SmartCarpool'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic Route Matching & Peer Carpooling for Campus
          </p>
        </div>

        {/* Auth Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                !isRegister
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isRegister
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Select Your Campus Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRoleSelection('driver')}
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                    roleSelection === 'driver'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Car className="w-5 h-5 mb-1" />
                  <span className="text-xs font-bold">Driver</span>
                  <span className="text-[10px] text-slate-400 font-normal">I offer rides</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleSelection('passenger')}
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                    roleSelection === 'passenger'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Users className="w-5 h-5 mb-1" />
                  <span className="text-xs font-bold">Passenger</span>
                  <span className="text-[10px] text-slate-400 font-normal">I need a ride</span>
                </button>
              </div>
            </div>

            {/* Name field (for registration) */}
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (College Student / Faculty)
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Hariharan S."
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Department (Registration only) */}
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option>B.E. Computer Science & Engineering</option>
                  <option>B.Tech Information Technology</option>
                  <option>B.E. Electronics & Communication</option>
                  <option>B.E. Mechanical Engineering</option>
                  <option>Faculty / Staff</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-full shadow-md shadow-indigo-600/30"
              >
                {isRegister ? 'Register Account' : 'Sign In as ' + (roleSelection === 'driver' ? 'Driver' : 'Passenger')}
              </Button>
            </div>
          </form>

          {/* Quick Demo Credentials for Reviewers */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>1-Click Evaluator Demo Sign In:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('usr_hari_01')}
                className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-left transition-colors"
              >
                <span className="block text-xs font-bold text-slate-800">Hari (Driver)</span>
                <span className="block text-[10px] text-slate-400">College → Srirangam</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('usr_arun_02')}
                className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-left transition-colors"
              >
                <span className="block text-xs font-bold text-slate-800">Arun (Passenger)</span>
                <span className="block text-[10px] text-slate-400">Arch Gate Pickup</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
