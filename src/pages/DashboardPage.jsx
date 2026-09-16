import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Car,
  Search,
  PlusCircle,
  Sparkles,
  Users,
  Clock,
  MapPin,
  TrendingUp,
  Leaf,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Repeat,
  Compass
} from 'lucide-react';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { useCarpool } from '../../context/CarpoolContext';
import { MOCK_ACTIVITY_FEED } from '../../data/mockData';

export default function DashboardPage() {
  const { currentUser, role, toggleRole, rides, matches, myRides } = useCarpool();
  const navigate = useNavigate();

  const isDriver = role === 'driver';
  const upcomingRide = myRides.upcoming[0];

  return (
    <div className="space-y-6">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-700/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/20 uppercase tracking-wider">
                {currentUser.department?.split(' ')[0] || 'College'} • {role.toUpperCase()} MODE
              </span>
              <span className="text-xs text-indigo-300">|</span>
              <span className="text-xs text-indigo-200">
                Logged in as <strong>{currentUser.name}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Good afternoon, {currentUser.name.split(' ')[0]}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl leading-relaxed">
              {isDriver
                ? 'Your Hyundai i20 route to Srirangam is active. 2 co-passengers are matched along your commute corridor with minimal detour.'
                : 'Looking for a ride home after class? Drivers departing near College Gate have matching routes.'}
            </p>
          </div>

          {/* Role Toggle Pill in Banner */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={toggleRole}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all"
            >
              <Repeat className="w-4 h-4 text-indigo-300" />
              <span>Switch to {isDriver ? 'Passenger' : 'Driver'}</span>
            </button>

            {isDriver ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/create-ride')}
                icon={PlusCircle}
                className="bg-white text-indigo-900 hover:bg-slate-100 shadow-md font-bold"
              >
                Publish New Ride
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/find-ride')}
                icon={Search}
                className="bg-white text-indigo-900 hover:bg-slate-100 shadow-md font-bold"
              >
                Search Shared Rides
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Rides */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Rides
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {rides.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">● Active</span>
            <span>in campus corridor today</span>
          </p>
        </div>

        {/* Available Seats */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Seats
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {rides.reduce((acc, r) => acc + (r.availableSeats || 0), 0)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Open carpool seats departing 5:00 PM
          </p>
        </div>

        {/* Recommended Matches */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Matches Found
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {matches.length}
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">
            Up to 94% route similarity
          </p>
        </div>

        {/* Saved Rides / Impact */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Saved Rides
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {currentUser.totalTrips || 42}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {currentUser.savedCo2 || '148 kg'} CO2 emissions offset
          </p>
        </div>
      </div>

      {/* Quick Action Buttons Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/create-ride')}
          className="bg-white hover:bg-indigo-50/50 rounded-2xl p-4 border border-slate-200/80 hover:border-indigo-300 text-left transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Create Ride</h4>
          <p className="text-xs text-slate-500 mt-0.5">Offer spare seats & set your route detour limit</p>
        </button>

        <button
          onClick={() => navigate('/find-ride')}
          className="bg-white hover:bg-teal-50/50 rounded-2xl p-4 border border-slate-200/80 hover:border-teal-300 text-left transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Find Ride</h4>
          <p className="text-xs text-slate-500 mt-0.5">Search drivers traveling along your college route</p>
        </button>

        <button
          onClick={() => navigate('/recommendations')}
          className="bg-white hover:bg-amber-50/50 rounded-2xl p-4 border border-slate-200/80 hover:border-amber-300 text-left transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Recommended Matches</h4>
          <p className="text-xs text-slate-500 mt-0.5">Explore 4-factor dynamic algorithmic match scores</p>
        </button>
      </div>

      {/* Main Grid: Upcoming Ride & Recommended Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upcoming Ride (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Ride Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                  Confirmed Schedule
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Your Next Upcoming Ride
                </h3>
              </div>
              <StatusBadge status={upcomingRide ? upcomingRide.status : 'Confirmed'} />
            </div>

            {upcomingRide ? (
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {upcomingRide.date} at {upcomingRide.time}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Vehicle: {upcomingRide.vehicle} • {upcomingRide.seats}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <NavLink to="/route">
                      <Button variant="outline" size="sm" icon={MapPin}>
                        View Map Itinerary
                      </Button>
                    </NavLink>
                  </div>
                </div>

                {/* Route Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Origin</span>
                    <span className="font-bold text-slate-800">{upcomingRide.pickup}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Destination</span>
                    <span className="font-bold text-slate-800">{upcomingRide.destination}</span>
                  </div>
                </div>

                {/* Co-passengers */}
                <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Matched Rider:</span>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      Arun Kumar (IT Dept - 94% Match)
                    </span>
                  </div>
                  <NavLink to="/match/match_01" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                    Inspect Match Factor Breakdown →
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                No upcoming rides currently scheduled.
              </div>
            )}
          </div>

          {/* Top Matches Preview */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                  Corridor Compatibility
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Recommended Carpool Matches
                </h3>
              </div>
              <NavLink to="/recommendations">
                <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                  View All ({matches.length})
                </Button>
              </NavLink>
            </div>

            <div className="divide-y divide-slate-100 pt-2">
              {matches.slice(0, 2).map((match) => (
                <div key={match.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={match.passenger.avatar}
                      alt={match.passenger.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-800">{match.passenger.name}</h4>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{match.passenger.role}</span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-indigo-600" />
                        <span>Pickup: {match.pickup.split('(')[0]}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-600 block">
                        {match.totalScore}% Match
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Detour: {match.detourKm}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/match/${match.id}`)}
                    >
                      Inspect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity Feed */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                Recent Activity
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Real-Time
              </span>
            </div>

            <div className="space-y-4 pt-4">
              {MOCK_ACTIVITY_FEED.map((item) => (
                <div key={item.id} className="flex items-start gap-3 group">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h5 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <NavLink to="/my-rides" className="block text-center text-xs font-bold text-indigo-600 hover:text-indigo-800">
                View Ride History & Mileage Logs →
              </NavLink>
            </div>
          </div>

          {/* Quick Route Visualizer Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-lg border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-2">
              <Compass className="w-4 h-4" />
              <span>DYNAMIC ROUTE ENGINE</span>
            </div>
            <h4 className="text-base font-extrabold mb-1">
              Active Corridor Simulation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              College Campus → Samayapuram → Srirangam (18.4 km). Waypoint sequence computed with 8-min detour window.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/route')}
              className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold"
            >
              Open Schematic Route Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
