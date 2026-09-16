import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Users,
  MapPin,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Car
} from 'lucide-react';
import Button from '../common/Button';

export default function RideCard({ ride, onSelect, matchId }) {
  const navigate = useNavigate();

  const handleViewMatch = () => {
    if (onSelect) {
      onSelect(ride);
    } else {
      navigate(`/match/${matchId || 'match_01'}`);
    }
  };

  const isHighMatch = (ride.matchScore || 85) >= 90;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 group flex flex-col justify-between">
      <div>
        {/* Top Header: Driver & Match Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={ride.driverAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={ride.driverName}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20 group-hover:ring-indigo-500 transition-all"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                {ride.driverName}
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" title="College Verified Student" />
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Car className="w-3 h-3 text-slate-400" />
                <span>{ride.vehicleType || 'Car'}</span>
                <span>•</span>
                <span className="text-emerald-600 font-medium">★ {ride.driverRating || '4.9'}</span>
              </p>
            </div>
          </div>

          {/* Match Score Badge */}
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-xs ${
              isHighMatch
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isHighMatch ? 'text-emerald-600' : 'text-indigo-600'}`} />
            <span>{ride.matchScore || 85}% Match</span>
          </div>
        </div>

        {/* Route Points */}
        <div className="bg-slate-50/80 rounded-xl p-3 mb-4 space-y-2.5 border border-slate-100">
          <div className="flex items-start gap-2.5 text-xs">
            <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1 flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">Pickup</span>
              <span className="font-semibold text-slate-800 truncate block">{ride.pickup}</span>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-slate-200 ml-1 pl-3.5 -my-1 text-[11px] text-slate-400">
            {ride.waypoints && ride.waypoints.length > 0 ? (
              <span className="truncate block">via {ride.waypoints.join(', ')}</span>
            ) : (
              <span>Express Route</span>
            )}
          </div>

          <div className="flex items-start gap-2.5 text-xs">
            <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">Destination</span>
              <span className="font-semibold text-slate-800 truncate block">{ride.destination}</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Departure</span>
            <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-slate-400" />
              {ride.departureTime}
            </span>
          </div>

          <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Seats Left</span>
            <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <Users className="w-3 h-3 text-slate-400" />
              {ride.availableSeats} of {ride.totalSeats || 4}
            </span>
          </div>

          <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Detour</span>
            <span className="text-xs font-bold text-indigo-700 block mt-0.5">
              {ride.estimatedDetour}
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          <span className="font-bold text-slate-800">{ride.costPerSeat || '₹35'}</span>
          <span className="text-[10px] ml-1">fuel share</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleViewMatch}
          icon={ArrowRight}
          iconPosition="right"
        >
          View Match
        </Button>
      </div>
    </div>
  );
}
