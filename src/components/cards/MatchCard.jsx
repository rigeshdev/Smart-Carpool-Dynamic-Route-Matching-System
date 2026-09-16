import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronRight,
  Route,
  Navigation,
  Compass
} from 'lucide-react';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';

export default function MatchCard({ match }) {
  const navigate = useNavigate();

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 80) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const getProgressColor = (name) => {
    switch (name) {
      case 'Route Similarity':
        return 'bg-indigo-600';
      case 'Time Compatibility':
        return 'bg-teal-500';
      case 'Pickup Distance':
        return 'bg-emerald-500';
      case 'Extra Detour':
        return 'bg-amber-500';
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
      {/* Top Bar: Driver & Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img
            src={match.driver.avatar}
            alt={match.driver.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-slate-800">{match.driver.name}</h4>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-xs text-slate-500">{match.driver.role} • {match.driver.vehicle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {match.status && match.status !== 'Recommended' && (
            <StatusBadge status={match.status} size="sm" />
          )}
          <div
            className={`px-3 py-1.5 rounded-xl border font-black text-sm flex items-center gap-1.5 ${getScoreColor(
              match.totalScore
            )}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{match.totalScore}% Match</span>
          </div>
        </div>
      </div>

      {/* Passenger & Journey overview */}
      <div className="py-3.5 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Pickup Point</span>
          <p className="font-semibold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
            <span className="truncate">{match.pickup}</span>
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Destination</span>
          <p className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <span className="truncate">{match.destination}</span>
          </p>
        </div>
      </div>

      {/* Factor Breakdown Section */}
      <div className="py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700 tracking-tight flex items-center gap-1.5">
            <Route className="w-3.5 h-3.5 text-indigo-600" />
            Route Compatibility Breakdown
          </span>
          <span className="text-[10px] font-medium text-slate-400">
            Simulated Factor Weights
          </span>
        </div>

        <div className="space-y-2.5">
          {match.factorBreakdown.map((factor, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">{factor.name}</span>
                <span className="font-bold text-slate-800">
                  {factor.score}/{factor.max} pts ({Math.round((factor.score / factor.max) * 100)}%)
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                    factor.name
                  )}`}
                  style={{ width: `${(factor.score / factor.max) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">{factor.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detour & Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px]">Extra Detour:</span>
            <span className="font-bold text-slate-800">{match.detourKm} ({match.detourMins})</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <span className="text-slate-400 block text-[10px]">CO2 Saved:</span>
            <span className="font-bold text-emerald-600">{match.co2Reduction}</span>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/match/${match.id}`)}
          icon={ArrowRight}
          iconPosition="right"
        >
          View Match Details
        </Button>
      </div>
    </div>
  );
}
