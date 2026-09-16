import React from 'react';
import {
  MapPin,
  Clock,
  Navigation,
  CheckCircle2,
  CircleDot,
  ArrowDown,
  Car
} from 'lucide-react';

export default function RouteCard({ waypoints, metrics }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      {/* Route Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Dynamic Itinerary & Stops</h4>
            <p className="text-xs text-slate-500">Ordered sequence for minimal detour</p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Optimal Sequence
        </span>
      </div>

      {/* Vertical Waypoint Timeline */}
      <div className="py-4 relative space-y-4">
        {waypoints.map((wp, idx) => {
          const isStart = wp.type === 'start';
          const isEnd = wp.type === 'destination';
          const isPickup = wp.type === 'pickup';

          return (
            <div key={wp.id || idx} className="relative flex items-start gap-3.5 group">
              {/* Connector line */}
              {idx < waypoints.length - 1 && (
                <div className="absolute left-[15px] top-7 bottom-[-16px] w-0.5 bg-slate-200 group-hover:bg-indigo-300 transition-colors" />
              )}

              {/* Node Icon */}
              <div className="relative z-10 flex-shrink-0 mt-0.5">
                {isStart ? (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-600/30">
                    A
                  </div>
                ) : isEnd ? (
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-rose-600/30">
                    B
                  </div>
                ) : isPickup ? (
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-amber-500/30">
                    P{idx}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                    •
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="flex-1 bg-slate-50/80 rounded-xl p-3 border border-slate-100 hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    {wp.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {wp.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{wp.subtext}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                  <span>Segment: {wp.distance}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metrics Summary Strip */}
      {metrics && (
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-400 block">Total Distance</span>
            <span className="font-bold text-slate-800">{metrics.totalDistance}</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-400 block">Est. Travel Time</span>
            <span className="font-bold text-slate-800">{metrics.estimatedTravelTime}</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-400 block">Extra Detour</span>
            <span className="font-bold text-indigo-600">{metrics.extraDetourDistance}</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-400 block">CO2 Prevented</span>
            <span className="font-bold text-emerald-600">{metrics.co2SavedKg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
