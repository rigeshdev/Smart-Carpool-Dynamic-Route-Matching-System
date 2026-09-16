import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Route,
  Clock,
  MapPin,
  Navigation,
  Info,
  SlidersHorizontal,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import MatchCard from '../components/cards/MatchCard';
import ScoreCard from '../components/cards/ScoreCard';
import Button from '../components/common/Button';
import { useCarpool } from '../context/CarpoolContext';

export default function RecommendationsPage() {
  const { matches } = useCarpool();
  const navigate = useNavigate();

  const [selectedMatchTab, setSelectedMatchTab] = useState('all');

  const filteredMatches = matches.filter((m) => {
    if (selectedMatchTab === 'top') return m.totalScore >= 90;
    if (selectedMatchTab === 'moderate') return m.totalScore < 90 && m.totalScore >= 75;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Matching Engine
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">CSE Algorithmic Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Recommended Carpool Matches
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dynamic compatibility calculated using multi-criteria route overlap, schedule buffer, and detour minimization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/route')}
            icon={Navigation}
          >
            Open Route Visualizer
          </Button>
        </div>
      </div>

      {/* Educational CSE Algorithm Formulation Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-indigo-700/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Matching Formula Architecture (CSE Final Year Demo)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
              Weighted Corridor Scoring Model
            </h2>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Match compatibility is computed across 4 independent normalized dimensions:
            </p>

            {/* Visual Formula Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md border border-white/15">
                <span className="text-[10px] text-indigo-300 uppercase block font-bold">Route Overlap</span>
                <span className="text-base font-black text-white">40%</span>
                <span className="text-[10px] text-slate-300 block">Geometry overlap</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md border border-white/15">
                <span className="text-[10px] text-teal-300 uppercase block font-bold">Time Synchrony</span>
                <span className="text-base font-black text-white">25%</span>
                <span className="text-[10px] text-slate-300 block">Schedule buffer</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md border border-white/15">
                <span className="text-[10px] text-emerald-300 uppercase block font-bold">Pickup Distance</span>
                <span className="text-base font-black text-white">20%</span>
                <span className="text-[10px] text-slate-300 block">Proximity to origin</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md border border-white/15">
                <span className="text-[10px] text-amber-300 uppercase block font-bold">Extra Detour</span>
                <span className="text-base font-black text-white">15%</span>
                <span className="text-[10px] text-slate-300 block">Deviation penalty</span>
              </div>
            </div>
          </div>

          {/* Academic Simulation Notice */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60 max-w-sm text-xs text-slate-300">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
              <Info className="w-4 h-4" />
              <span>Evaluation Prototype</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Factor scores displayed are simulated UI mock values engineered for demonstration of route-matching concepts.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedMatchTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedMatchTab === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Recommended ({matches.length})
          </button>
          <button
            onClick={() => setSelectedMatchTab('top')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedMatchTab === 'top'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tier 1: High Match (90%+)
          </button>
          <button
            onClick={() => setSelectedMatchTab('moderate')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedMatchTab === 'moderate'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tier 2: Moderate Match (75-89%)
          </button>
        </div>
      </div>

      {/* Match Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
