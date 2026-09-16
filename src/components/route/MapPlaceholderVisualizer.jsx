import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  Compass,
  Car,
  Clock,
  Shield,
  AlertTriangle,
  Info
} from 'lucide-react';
import { MOCK_ROUTE_WAYPOINTS, ROUTE_SUMMARY_METRICS } from '../../data/mockData';

export default function MapPlaceholderVisualizer({ activeWaypointId, onSelectWaypoint }) {
  const [selectedWaypoint, setSelectedWaypoint] = useState(activeWaypointId || 'wp_01');
  const [mapMode, setMapMode] = useState('schematic'); // 'schematic' | 'satellite'

  const waypoints = MOCK_ROUTE_WAYPOINTS;
  const currentSelected = waypoints.find((w) => w.id === selectedWaypoint) || waypoints[0];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl select-none">
      {/* Top Banner: Mandatory Demo Label */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-white text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-amber-300">DEMO MAP PLACEHOLDER</span>
            <span className="text-slate-400 hidden sm:inline ml-1.5 text-[11px]">
              • Simulated CSE Route Matching Engine (No external Map API connected)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
            Simulated GPS Active
          </span>
        </div>
      </div>

      {/* SVG Canvas Map Simulation */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden flex items-center justify-center">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* River & Highway Graphic Lines in background */}
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover pointer-events-none"
        >
          {/* Simulated Cauvery River Flow */}
          <path
            d="M -50,420 C 200,450 400,380 600,430 C 750,460 850,410 900,420"
            fill="none"
            stroke="#1e293b"
            strokeWidth="36"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M -50,420 C 200,450 400,380 600,430 C 750,460 850,410 900,420"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.25"
          />
          <text x="620" y="440" fill="#38bdf8" fontSize="10" opacity="0.5" fontFamily="sans-serif">
            ~ Cauvery River Basin ~
          </text>

          {/* Secondary road network faint lines */}
          <path d="M 50,100 L 750,100" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <path d="M 50,400 L 750,400" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <path d="M 150,50 L 150,450" stroke="#334155" strokeWidth="1" opacity="0.3" />
          <path d="M 450,50 L 450,450" stroke="#334155" strokeWidth="1" opacity="0.3" />
          <path d="M 650,50 L 650,450" stroke="#334155" strokeWidth="1" opacity="0.3" />

          {/* Primary Main Trunk Highway (NH-45) Glowing Shadow */}
          <path
            d="M 80,340 C 140,310 170,280 210,260 C 290,220 320,170 380,170 C 460,170 480,240 530,240 C 620,240 660,190 720,190"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.25"
            filter="blur(6px)"
          />

          {/* Primary Highway Road Base */}
          <path
            d="M 80,340 C 140,310 170,280 210,260 C 290,220 320,170 380,170 C 460,170 480,240 530,240 C 620,240 660,190 720,190"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Animated Dashed Commute Route Line */}
          <path
            d="M 80,340 C 140,310 170,280 210,260 C 290,220 320,170 380,170 C 460,170 480,240 530,240 C 620,240 660,190 720,190"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>

          {/* Simulated Moving Car Indicator */}
          <circle cx="210" cy="260" r="5" fill="#10b981">
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Interactive Waypoint Nodes (Positioned overlay) */}
        <div className="absolute inset-0">
          {waypoints.map((wp, idx) => {
            const isSelected = selectedWaypoint === wp.id;
            const isStart = wp.type === 'start';
            const isDest = wp.type === 'destination';
            const isPickup = wp.type === 'pickup';

            // Coordinates converted to percentages based on 800x500 viewBox
            const leftPct = `${(wp.coordinates.x / 800) * 100}%`;
            const topPct = `${(wp.coordinates.y / 500) * 100}%`;

            return (
              <div
                key={wp.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                style={{ left: leftPct, top: topPct }}
                onClick={() => {
                  setSelectedWaypoint(wp.id);
                  if (onSelectWaypoint) onSelectWaypoint(wp.id);
                }}
              >
                {/* Pulsing ring */}
                <div
                  className={`absolute -inset-2 rounded-full opacity-75 animate-ping pointer-events-none ${
                    isStart
                      ? 'bg-indigo-500'
                      : isDest
                      ? 'bg-rose-500'
                      : isPickup
                      ? 'bg-amber-400'
                      : 'bg-teal-400'
                  }`}
                  style={{ animationDuration: '3s' }}
                />

                {/* Main Pin */}
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs shadow-lg transition-transform duration-200 group-hover:scale-125 ${
                    isSelected ? 'ring-4 ring-white scale-110' : 'ring-2 ring-slate-800'
                  } ${
                    isStart
                      ? 'bg-indigo-600 text-white'
                      : isDest
                      ? 'bg-rose-600 text-white'
                      : isPickup
                      ? 'bg-amber-500 text-slate-900 font-extrabold'
                      : 'bg-teal-500 text-white'
                  }`}
                >
                  {isStart ? 'A' : isDest ? 'B' : `P${idx}`}
                </div>

                {/* Floating label pill */}
                <div
                  className={`absolute top-full mt-1.5 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-lg pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-white text-slate-900 opacity-100 scale-100 ring-2 ring-indigo-500'
                      : 'bg-slate-900/90 text-slate-300 opacity-80 group-hover:opacity-100 scale-95'
                  }`}
                >
                  {wp.name.split('(')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stop Details Tooltip Overlay (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-20 max-w-xs w-full bg-slate-900/90 backdrop-blur-md rounded-xl p-3 border border-slate-700/80 text-white shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">
              Selected Waypoint
            </span>
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {currentSelected.time}
            </span>
          </div>
          <h5 className="text-xs font-extrabold text-white truncate">
            {currentSelected.name}
          </h5>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {currentSelected.subtext}
          </p>
          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-300">
            <span>Segment: {currentSelected.distance}</span>
            <span className="text-emerald-400 font-semibold">Scheduled Stop</span>
          </div>
        </div>

        {/* Controls Overlay (Bottom Right) */}
        <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md rounded-xl p-1 border border-slate-700/80 shadow-lg text-white">
            <button
              onClick={() => setSelectedWaypoint('wp_01')}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
              title="Reset View to College Origin"
            >
              <Compass className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-slate-700" />
            <span className="text-[10px] px-2 font-mono text-indigo-300">NH-45</span>
          </div>
        </div>
      </div>

      {/* Bottom Route Sequence Strip */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            Route Flow:
          </span>
          <div className="flex items-center gap-1.5 text-[11px] font-medium flex-wrap">
            <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
              College Campus
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-semibold">
              Arun Pickup (Arch)
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-semibold">
              Samayapuram (Karthi)
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
              No.1 Tollgate
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
              Srirangam
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span>
            Total: <strong>18.4 km</strong>
          </span>
          <span>•</span>
          <span>
            Detour: <strong className="text-indigo-400">1.2 km (8 mins)</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
