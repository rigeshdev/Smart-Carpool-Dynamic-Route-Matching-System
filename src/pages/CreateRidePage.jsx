import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  Route,
  Navigation,
  FileText,
  ShieldCheck,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import Button from '../components/common/Button';
import LocationInput from '../components/common/LocationInput';
import { useCarpool } from '../context/CarpoolContext';

export default function CreateRidePage() {
  const { publishRide, currentUser } = useCarpool();
  const navigate = useNavigate();

  const [pickup, setPickup] = useState('College Main Campus (Gate 1)');
  const [destination, setDestination] = useState('Srirangam Temple North Gate');
  const [date, setDate] = useState('2026-09-17');
  const [departureTime, setDepartureTime] = useState('05:00 PM');
  const [availableSeats, setAvailableSeats] = useState(3);
  const [vehicleType, setVehicleType] = useState('Car (Hyundai i20)');
  const [preferredRoute, setPreferredRoute] = useState('NH-45 Express via Samayapuram');
  const [maxDetour, setMaxDetour] = useState(2.5); // km
  const [notes, setNotes] = useState('Leaving right after CSE lab session. Punctual departure.');

  const handleSubmit = (e) => {
    e.preventDefault();

    publishRide({
      pickup,
      destination,
      date,
      departureTime,
      availableSeats,
      vehicleType,
      preferredRoute,
      maxDetour,
      notes
    });

    navigate('/my-rides');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Driver Portal
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">Route Offer Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Publish a College Commute Ride
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Offer your empty car seats to fellow college students traveling along your daily route.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Driver: <strong>{currentUser.name}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Origin & Destination
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Set your primary departure college gate and drop location
              </p>
            </div>

            <div className="space-y-4">
              <LocationInput
                label="Pickup Location (College Origin)"
                value={pickup}
                onChange={setPickup}
                required
                placeholder="e.g. College Main Campus (Gate 1)"
              />

              <LocationInput
                label="Final Destination"
                value={destination}
                onChange={setDestination}
                required
                isDestination
                placeholder="e.g. Srirangam Temple North Gate"
              />
            </div>

            {/* Date, Time & Seats */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-indigo-600" />
                Schedule & Capacity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                {/* Departure Time */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Departure Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    placeholder="e.g. 05:00 PM"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Available Seats <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setAvailableSeats(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          availableSeats === num
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle & Detour Preferences */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Route className="w-4 h-4 text-indigo-600" />
                Route & Detour Constraints
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Vehicle Type / Model
                  </label>
                  <input
                    type="text"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    placeholder="e.g. Car (Hyundai i20)"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Preferred Corridor / Highway
                  </label>
                  <select
                    value={preferredRoute}
                    onChange={(e) => setPreferredRoute(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option>NH-45 Express via Samayapuram</option>
                    <option>Expressway via No. 1 Tollgate</option>
                    <option>Trichy Trunk Road via Chathiram</option>
                    <option>Inner Ring Road via Thillai Nagar</option>
                  </select>
                </div>
              </div>

              {/* Detour tolerance slider */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">
                    Maximum Acceptable Detour
                  </span>
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                    {maxDetour} km (approx. {Math.round(maxDetour * 4)} mins)
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.5"
                  value={maxDetour}
                  onChange={(e) => setMaxDetour(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0.5 km (Strict Trunk)</span>
                  <span>3.0 km (Moderate)</span>
                  <span>6.0 km (Flexible)</span>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="border-t border-slate-100 pt-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Additional Notes for Co-Passengers
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Leaving right after Lab at 5:00 PM. Clean car, pleasant music, co-riders welcome."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-full shadow-lg shadow-indigo-600/30 text-base"
              >
                Publish Ride & Start Corridor Matching
              </Button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Live Route Summary Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Live Itinerary Preview
            </h3>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Origin</span>
                <span className="text-xs font-bold text-slate-800">{pickup}</span>
              </div>

              <div className="text-center text-slate-400 text-xs">
                ↓ (Max Detour Allowed: {maxDetour} km)
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Destination</span>
                <span className="text-xs font-bold text-slate-800">{destination}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Departure:</span>
                <span className="font-bold text-slate-800">{date} at {departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seats Offered:</span>
                <span className="font-bold text-indigo-600">{availableSeats} passengers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="font-medium text-slate-800">{vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Est. Fuel Offset:</span>
                <span className="font-bold text-emerald-600">₹35 / seat</span>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
              <strong>Matching Pipeline:</strong> Once published, students heading in this direction will see your ride ranked by route overlap and time buffer.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
