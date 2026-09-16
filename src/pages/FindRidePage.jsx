import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  Filter,
  Sparkles,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import Button from '../components/common/Button';
import LocationInput from '../components/common/LocationInput';
import RideCard from '../components/cards/RideCard';
import { useCarpool } from '../../context/CarpoolContext';

export default function FindRidePage() {
  const { rides, searchParams, setSearchParams, addToast } = useCarpool();
  const navigate = useNavigate();

  const [pickup, setPickup] = useState(searchParams.pickup || 'College Main Campus');
  const [destination, setDestination] = useState(searchParams.destination || 'Srirangam');
  const [date, setDate] = useState(searchParams.date || '2026-09-17');
  const [departureTime, setDepartureTime] = useState(searchParams.departureTime || '05:00 PM');
  const [passengers, setPassengers] = useState(searchParams.passengers || 1);
  const [filterTier, setFilterTier] = useState('all'); // 'all' | 'high' | 'low_detour'

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      pickup,
      destination,
      date,
      departureTime,
      passengers,
    });
    addToast(`Calculated route similarity for "${destination}". Displaying best matches.`, 'success');
  };

  const handleReset = () => {
    setPickup('College Main Campus');
    setDestination('Srirangam');
    setDate('2026-09-17');
    setDepartureTime('05:00 PM');
    setPassengers(1);
    setFilterTier('all');
    addToast('Search filters reset to default college corridor.', 'info');
  };

  // Filter rides based on inputs and quick filters
  const filteredRides = rides.filter((ride) => {
    if (filterTier === 'high' && (ride.matchScore || 0) < 90) return false;
    if (filterTier === 'low_detour' && parseFloat(ride.estimatedDetour) > 2.0) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Passenger Portal
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">Dynamic Route Search</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Find Matching College Carpools
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enter your pickup stop to discover drivers traveling along your campus route.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            icon={RotateCcw}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Main Search Filter Box */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LocationInput
              label="Your Desired Pickup Location"
              value={pickup}
              onChange={setPickup}
              required
              placeholder="e.g. Near College Arch / Samayapuram"
            />

            <LocationInput
              label="Destination Drop Location"
              value={destination}
              onChange={setDestination}
              required
              isDestination
              placeholder="e.g. Srirangam / Chathiram Bus Stand"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Preferred Departure Time
              </label>
              <input
                type="text"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                placeholder="05:00 PM"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Required Seats
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPassengers(num)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      passengers === num
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num} {num === 1 ? 'Seat' : 'Seats'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              icon={Search}
              className="w-full shadow-md shadow-indigo-600/25"
            >
              Find Matching Rides
            </Button>
          </div>
        </form>
      </div>

      {/* Results Header & Quick Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">
            Available Rides Along Route ({filteredRides.length})
          </h3>
          <span className="text-xs text-slate-400">
            • Ranked by algorithm compatibility
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterTier('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
              filterTier === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Rides
          </button>
          <button
            onClick={() => setFilterTier('high')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
              filterTier === 'high'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            High Match (90%+)
          </button>
          <button
            onClick={() => setFilterTier('low_detour')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
              filterTier === 'low_detour'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Minimal Detour (&lt;2km)
          </button>
        </div>
      </div>

      {/* Matching Ride Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredRides.map((ride, idx) => (
          <RideCard
            key={ride.id}
            ride={ride}
            matchId={idx === 0 ? 'match_01' : idx === 1 ? 'match_02' : 'match_03'}
          />
        ))}
      </div>
    </div>
  );
}
