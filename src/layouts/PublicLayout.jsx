import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Car, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import Button from '../components/common/Button';
import ToastContainer from '../components/common/Toast';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight block leading-tight">
                SmartCarpool
              </span>
              <span className="text-[11px] text-indigo-600 font-bold block">
                Dynamic Route Matching System
              </span>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <NavLink to="/" className="hover:text-indigo-600 transition-colors">Home</NavLink>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <NavLink to="/route" className="hover:text-indigo-600 transition-colors">Route Demo</NavLink>
            <NavLink to="/recommendations" className="hover:text-indigo-600 transition-colors">Algorithm</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <NavLink to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </NavLink>
            <NavLink to="/dashboard">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Open App
              </Button>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Car className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-white text-base">Smart Carpool System</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
                Dynamic Route Matching System designed for college student and faculty daily commutes. Minimizing travel detour, cutting student transportation expenses, and reducing carbon emissions.
              </p>
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Department of Computer Science & Engineering</span>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Quick Navigation
              </h5>
              <ul className="space-y-2 text-xs">
                <li><NavLink to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</NavLink></li>
                <li><NavLink to="/find-ride" className="hover:text-white transition-colors">Find a Ride</NavLink></li>
                <li><NavLink to="/create-ride" className="hover:text-white transition-colors">Publish / Offer a Ride</NavLink></li>
                <li><NavLink to="/recommendations" className="hover:text-white transition-colors">Match Compatibility Engine</NavLink></li>
                <li><NavLink to="/route" className="hover:text-white transition-colors">Dynamic Itinerary Visualizer</NavLink></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Project Information
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">
                Final Year CSE Project Simulation. Built with React, Tailwind CSS, and Dynamic Optimization algorithms.
              </p>
              <p className="text-[11px] text-slate-500">
                Demo datasets: Hari (Driver), Arun (Passenger), Karthi (Passenger). Route: College → Srirangam.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Smart Carpool & Dynamic Route Matching System. Academic Project.</p>
            <p className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-current" /> for greener campus commutes
            </p>
          </div>
        </div>
      </footer>

      {/* Global Toast */}
      <ToastContainer />
    </div>
  );
}
