import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Navigation,
  Compass,
  Car,
  AlertTriangle,
  Info,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  Users
} from 'lucide-react';
import MapPlaceholderVisualizer from '../components/route/MapPlaceholderVisualizer';
import RouteCard from '../components/cards/RouteCard';
import Button from '../components/common/Button';
import {
  MOCK_ROUTE_WAYPOINTS,
  ROUTE_SUMMARY_METRICS
} from '../data/mockData';

export default function RoutePage() {
  const [activeWaypointId, setActiveWaypointId] = useState('wp_01');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Route Engine Visualizer
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">College Commute Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dynamic Route & Waypoint Sequence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Optimized trunk itinerary from College Main Portico to Srirangam North Gate.
          </p>
        </div>

        {/* Demo Tag */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-800 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Demo Map Placeholder (Frontend UI Only)</span>
        </div>
      </div>

      {/* Prominent Schematic Route Visualizer Component */}
      <MapPlaceholderVisualizer
        activeWaypointId={activeWaypointId}
        onSelectWaypoint={setActiveWaypointId}
      />

      {/* Route Breakdown & Details Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vertical Stop Sequence (2 cols on lg) */}
        <div className="lg:col-span-2">
          <RouteCard
            waypoints={MOCK_ROUTE_WAYPOINTS}
            metrics={ROUTE_SUMMARY_METRICS}
          />
        </div>

        {/* Dynamic Route Optimization Diagnostics & CSE Context */}
        <div className="space-y-6">
          {/* Corridor Detour Diagnostic */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Algorithmic Detour Analysis</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Direct Baseline Distance:</span>
                <span className="font-bold text-slate-800">17.2 km (44 mins)</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-indigo-900 font-semibold">Shared Itinerary with 2 Pickups:</span>
                <span className="font-black text-indigo-700">18.4 km (52 mins)</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-emerald-900 font-semibold">Total Added Detour Penalty:</span>
                <span className="font-black text-emerald-700">+1.2 km (8 mins)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
              <strong>Optimization Goal:</strong> The TSP/Dijkstra route variant ensures the driver adds under 10% detour overhead while carrying 3 passengers on the same corridor.
            </div>
          </div>

          {/* Passenger Pickup Manifest */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-600" />
              Rider Pickup Manifest
            </h4>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-slate-800 block truncate">Arun Kumar</span>
                  <span className="text-[10px] text-slate-500">Arch Gate • 05:05 PM (Stop 1)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Confirmed
                </span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                  K
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-slate-800 block truncate">Karthi Keyan</span>
                  <span className="text-[10px] text-slate-500">Samayapuram • 05:25 PM (Stop 2)</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Recommended
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
