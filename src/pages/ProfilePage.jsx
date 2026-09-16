import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Car,
  Clock,
  ShieldCheck,
  Award,
  Leaf,
  Settings,
  Edit3,
  Repeat,
  Compass,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import ProfileCard from '../components/cards/ProfileCard';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { useCarpool } from '../../context/CarpoolContext';
import { DEMO_USERS } from '../../data/mockData';

export default function ProfilePage() {
  const { currentUser, updateProfile, switchUser, toggleRole, role } = useCarpool();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form states initialized from current user
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [preferredDeparture, setPreferredDeparture] = useState(
    currentUser.preferences?.preferredDeparture || '05:00 PM'
  );
  const [vehicleModel, setVehicleModel] = useState(currentUser.vehicle?.model || 'Hyundai i20');
  const [licensePlate, setLicensePlate] = useState(currentUser.vehicle?.licensePlate || 'TN-45-AZ-2024');
  const [maxDetourKm, setMaxDetourKm] = useState(
    currentUser.preferences?.maxDetourKm || 3.0
  );

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      preferences: {
        ...currentUser.preferences,
        preferredDeparture,
        maxDetourKm,
      },
      vehicle: currentUser.vehicle
        ? {
            ...currentUser.vehicle,
            model: vehicleModel,
            licensePlate,
          }
        : null,
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Campus Profile
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">College Identity & Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            User Profile & Vehicle Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified college credentials, commute timing, and carpool preferences.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleRole}
            icon={Repeat}
          >
            Switch to {role === 'driver' ? 'Passenger' : 'Driver'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            icon={Edit3}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-2">
          <ProfileCard
            user={currentUser}
            onEdit={() => setIsEditModalOpen(true)}
          />

          {/* Academic CSE Project Demo Switcher */}
          <div className="mt-6 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Switch Demo Account Perspective
                </h4>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                Evaluator Testing
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Select one of the simulated college users below to test the interface from both the Driver and Passenger viewpoints:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    currentUser.id === u.id
                      ? 'border-indigo-600 bg-indigo-50/70 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover mb-2"
                  />
                  <span className="text-xs font-bold text-slate-900 block truncate">{u.name}</span>
                  <span className="text-[10px] text-indigo-600 font-semibold uppercase block">{u.role}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{u.department.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Preferences & Verification Details */}
        <div className="space-y-6">
          {/* Campus Safety & Verification */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Campus Security Status</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Verified College Commuter
            </h4>
            <div className="space-y-2.5 mt-3 text-xs text-slate-600">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Student ID:</span>
                <span className="font-bold text-slate-800">{currentUser.collegeId || 'CSE22045'}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Institutional Email:</span>
                <span className="font-semibold text-emerald-600">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Campus Entry Gate:</span>
                <span className="font-bold text-slate-800">Gate 1 & 2</span>
              </div>
            </div>
          </div>

          {/* Commute Preferences Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-indigo-600" />
              Commute Preferences
            </h4>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Daily Departure Time:</span>
                <span className="font-bold text-slate-900">{currentUser.preferences?.preferredDeparture || '05:00 PM'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Max Acceptable Detour:</span>
                <span className="font-bold text-indigo-600">{currentUser.preferences?.maxDetourKm || 3.5} km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Music Allowed:</span>
                <span className="font-bold text-emerald-600">Yes (Acoustic / Indie)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Trip Conversation:</span>
                <span className="font-bold text-slate-900">{currentUser.preferences?.chatty || 'Moderate'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit College Profile"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Daily Departure Time
            </label>
            <input
              type="text"
              value={preferredDeparture}
              onChange={(e) => setPreferredDeparture(e.target.value)}
              placeholder="05:00 PM"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {currentUser.vehicle && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  License Plate
                </label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Max Acceptable Detour (km)
              </label>
              <span className="text-xs font-bold text-indigo-600">{maxDetourKm} km</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="6.0"
              step="0.5"
              value={maxDetourKm}
              onChange={(e) => setMaxDetourKm(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
