import React from 'react';
import {
  User,
  Mail,
  Phone,
  Car,
  Clock,
  ShieldCheck,
  Award,
  Leaf,
  Calendar,
  Settings,
  Edit3
} from 'lucide-react';
import Button from '../common/Button';

export default function ProfileCard({ user, onEdit }) {
  const isDriver = user.role === 'driver';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
      {/* Cover / Header Banner */}
      <div className="h-28 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 relative">
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/20 uppercase tracking-wider">
            {user.role} Account
          </span>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0 relative">
        {/* Avatar and Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-4 gap-3">
          <div className="relative inline-block">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-white" title="Verified Campus Student">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            icon={Edit3}
          >
            Edit Profile
          </Button>
        </div>

        {/* User Identity */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {user.name}
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            {user.department} • {user.batch}
          </p>
          <p className="text-xs text-indigo-600 font-semibold mt-0.5">
            Student ID: {user.collegeId || 'CSE22045'}
          </p>
        </div>

        {/* Key Stats Pill Bar */}
        <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Rating</span>
            <span className="text-sm font-black text-amber-500">★ {user.rating || '4.9'}</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Trips</span>
            <span className="text-sm font-black text-slate-800">{user.totalTrips || 42}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">CO2 Saved</span>
            <span className="text-sm font-black text-emerald-600">{user.savedCo2 || '148 kg'}</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2.5 text-xs text-slate-600 py-3 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-800">{user.email}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-800">{user.phone}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Preferred departure: <strong>{user.preferences?.preferredDeparture || '05:00 PM'}</strong></span>
          </div>
        </div>

        {/* Vehicle Information (If Driver) */}
        {user.vehicle && (
          <div className="mt-4 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs">
            <div className="flex items-center gap-2 text-indigo-900 font-bold mb-2">
              <Car className="w-4 h-4 text-indigo-600" />
              <span>Registered Vehicle</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div>
                <span className="text-[10px] text-slate-400 block">Vehicle Model:</span>
                <span className="font-semibold text-slate-900">{user.vehicle.model}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Plate Number:</span>
                <span className="font-semibold text-slate-900">{user.vehicle.licensePlate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Capacity:</span>
                <span className="font-semibold text-slate-900">{user.vehicle.totalSeats} seats</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Amenities:</span>
                <span className="font-semibold text-slate-900">{user.vehicle.comfort}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
