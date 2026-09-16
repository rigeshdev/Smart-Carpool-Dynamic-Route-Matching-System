import React from 'react';
import { Route, Clock, MapPin, Navigation, Info } from 'lucide-react';

export default function ScoreCard({
  totalScore = 94,
  routeSimilarity = 40,
  timeCompatibility = 25,
  pickupDistance = 20,
  extraDetour = 15,
  showExplanation = true
}) {
  const factors = [
    {
      label: 'Route Similarity',
      weight: '40% Weight',
      score: routeSimilarity,
      max: 40,
      icon: Route,
      color: 'bg-indigo-600',
      textColor: 'text-indigo-600',
      desc: 'Geometric overlap ratio of the passenger route against the primary trunk road.'
    },
    {
      label: 'Time Compatibility',
      weight: '25% Weight',
      score: timeCompatibility,
      max: 25,
      icon: Clock,
      color: 'bg-teal-500',
      textColor: 'text-teal-600',
      desc: 'Variance between driver departure time and passenger ready schedule window.'
    },
    {
      label: 'Pickup Distance',
      weight: '20% Weight',
      score: pickupDistance,
      max: 20,
      icon: MapPin,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      desc: 'Direct Euclidean & road distance from driver origin to passenger pickup stop.'
    },
    {
      label: 'Extra Detour',
      weight: '15% Weight',
      score: extraDetour,
      max: 15,
      icon: Navigation,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      desc: 'Total additional mileage and detour delay introduced to the driver itinerary.'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
      {/* Overall Score Circle / Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            System Match Score
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
            {totalScore}% Overall Compatibility
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Calculated by multi-criteria weighted detour ranking
          </p>
        </div>

        <div className="flex items-center gap-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl px-5 py-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-indigo-500 block">Status</span>
            <span className="text-xs font-bold text-indigo-900">
              {totalScore >= 90 ? 'Ideal Shared Route' : 'Compatible Match'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-600/30">
            {totalScore}%
          </div>
        </div>
      </div>

      {/* 4 Algorithmic Factor Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        {factors.map((f, idx) => {
          const Icon = f.icon;
          const pct = Math.round((f.score / f.max) * 100);

          return (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-xl p-4 border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${f.textColor} bg-white shadow-xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block leading-tight">
                        {f.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {f.weight}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-800">
                    {f.score} / {f.max} ({pct}%)
                  </span>
                </div>

                <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden my-2">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${f.color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {showExplanation && (
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {f.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-800">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Note:</strong> These metrics are generated by simulated dynamic matching logic for the CSE project demo. In production, real-time map heuristics and machine learning weights will compute precise telemetry.
        </p>
      </div>
    </div>
  );
}
