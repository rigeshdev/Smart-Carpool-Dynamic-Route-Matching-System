import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  Clock,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PlusCircle,
  Search,
  Leaf,
  Navigation,
  ArrowRight
} from 'lucide-react';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { useCarpool } from '../context/CarpoolContext';

export default function MyRidesPage() {
  const { myRides, cancelUpcomingRide, role } = useCarpool();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'cancelled'

  const ridesList = myRides[activeTab] || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Trip History
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">Ride Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My College Carpool Rides
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your upcoming shared schedules, past completed commutes, and cancelled bookings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/find-ride')}
            icon={Search}
          >
            Find a Ride
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/create-ride')}
            icon={PlusCircle}
            className="shadow-sm"
          >
            Offer New Ride
          </Button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex rounded-2xl bg-slate-200/70 p-1 max-w-md">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'upcoming'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Upcoming ({myRides.upcoming.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'completed'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Completed ({myRides.completed.length})
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'cancelled'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cancelled ({myRides.cancelled.length})
        </button>
      </div>

      {/* Rides List */}
      {ridesList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Car className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No {activeTab} rides found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            You don't have any {activeTab} college carpool rides at this moment.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/create-ride')}
            icon={PlusCircle}
          >
            Create a New Commute Ride
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ridesList.map((ride) => {
            const isUpcoming = activeTab === 'upcoming';
            const isCompleted = activeTab === 'completed';

            return (
              <div
                key={ride.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Date, Time & Status */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          {ride.date}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {ride.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                        Role: {ride.role}
                      </span>
                      <StatusBadge status={ride.status} size="sm" />
                    </div>
                  </div>

                  {/* Route points */}
                  <div className="py-4 space-y-2.5 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                          Pickup Location
                        </span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {ride.pickup}
                        </span>
                      </div>
                    </div>

                    <div className="border-l-2 border-dashed border-slate-200 ml-1 pl-3.5 -my-1 text-[11px] text-slate-400">
                      Vehicle: {ride.vehicle} • {ride.seats}
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                          Destination
                        </span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {ride.destination}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Passengers / Co-riders summary */}
                  {ride.passengers && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Passengers / Bookings
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ride.passengers.map((p, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-medium"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Impact metrics for completed */}
                  {isCompleted && ride.co2Saved && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-center justify-between mb-4">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Leaf className="w-4 h-4 text-emerald-600" />
                        Carbon Impact Prevented:
                      </span>
                      <span className="font-black">{ride.co2Saved} CO2</span>
                    </div>
                  )}

                  {/* Cancel reason if cancelled */}
                  {ride.reason && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-800 mb-4">
                      <strong>Cancellation Reason:</strong> {ride.reason}
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/route')}
                    icon={Navigation}
                  >
                    View Route Map
                  </Button>

                  {isUpcoming && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => cancelUpcomingRide(ride.id)}
                    >
                      Cancel Ride
                    </Button>
                  )}

                  {isCompleted && (
                    <span className="text-xs font-semibold text-emerald-600">
                      ✓ Trip Finished
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
