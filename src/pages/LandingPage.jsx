import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Car,
  Search,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  Users,
  Leaf,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Compass,
  Repeat
} from 'lucide-react';
import Button from '../components/common/Button';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Project Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>College CSE Project • Smart Campus Mobility</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Smart Carpool & <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500">
                Dynamic Route Matching
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-semibold text-indigo-900/80 mt-4 mb-3">
              "Smart rides. Better routes. Shared journeys."
            </p>

            {/* Brief Explanation */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              A peer-to-peer carpool platform built specifically for college students and faculty. Our dynamic multi-factor algorithm matches riders along common commute corridors by measuring route overlap, time synchrony, and minimizing detours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/find-ride')}
                icon={Search}
                className="w-full sm:w-auto shadow-lg shadow-indigo-600/25"
              >
                Find a Ride
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/create-ride')}
                icon={PlusCircle}
                className="w-full sm:w-auto border-indigo-200 hover:border-indigo-300 text-indigo-700"
              >
                Offer a Ride
              </Button>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Student ID Only
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Dynamic Detour Thresholds
              </span>
              <span className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-teal-600" />
                Carbon Footprint Reductions
              </span>
            </div>
          </div>

          {/* Interactive Demo Preview Card */}
          <div className="mt-14 max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] uppercase font-bold text-indigo-600 tracking-wider">
                  Live Algorithmic Demonstration
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  Hari's Evening Commute (College → Srirangam)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  94% Match Compatibility
                </span>
                <NavLink to="/recommendations">
                  <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                    View Logic
                  </Button>
                </NavLink>
              </div>
            </div>

            {/* Simulation Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                  <Car className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Driver: Hari</span>
                </div>
                <p className="text-xs font-semibold text-slate-800">College Main Campus (Gate 1)</p>
                <p className="text-[11px] text-slate-500 mt-1">Leaves 5:00 PM • 3 seats open in Hyundai i20</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Passenger: Arun</span>
                </div>
                <p className="text-xs font-semibold text-slate-800">Near College Arch (Pickup 1)</p>
                <p className="text-[11px] text-slate-500 mt-1">Ready 5:05 PM • Only 350m diversion</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Compass className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">System Detour</span>
                </div>
                <p className="text-xs font-semibold text-slate-800">Extra: 1.2 km (8 mins)</p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">Saves ₹105 fuel & 4.8kg CO2</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Seamless Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              How Dynamic Route Matching Works
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Three simple steps connect drivers and co-riders without requiring manual coordination or long out-of-the-way detours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative group hover:bg-white hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Enter Commute & Seats
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Drivers enter departure time, college gate, and spare seats. Passengers specify their desired pickup point and campus destination.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative group hover:bg-white hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-teal-500/30 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Evaluate 4 Match Factors
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our algorithm scores matches based on Route Similarity (40%), Time Compatibility (25%), Pickup Distance (20%), and Extra Detour (15%).
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative group hover:bg-white hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Share Trip & Offset Costs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Driver accepts match with one click. Waypoints automatically insert into the itinerary for a seamless shared trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Engineered for Campus Efficiency
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Features Built for College Commuters
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Solving everyday transportation challenges for college students and staff with algorithmic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                Dynamic Detour Limits
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Drivers set strict maximum detour tolerances (e.g. max 3 km / 10 mins). Matches outside this window are safely deprioritized.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                Verified Campus Community
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Restricted to verified college emails and registered roll numbers. Safe, trustworthy peer rides with department badges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                Multi-Factor Scoring
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Transparent compatibility calculation showing exact percentage contributions of route overlap, schedule buffer, and distance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                Green Campus Analytics
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tracks collective carbon emissions avoided and fuel expenses saved across semesters, advancing green campus initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-gradient-to-tr from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ready to experience smart shared campus rides?
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto mb-8">
            Test the full prototype now. Switch between Driver and Passenger perspectives, publish rides, and inspect route matches.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/dashboard')}
              icon={ArrowRight}
              iconPosition="right"
              className="bg-white text-indigo-900 hover:bg-slate-100 shadow-xl"
            >
              Launch Dashboard Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Role Sign In UI
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
