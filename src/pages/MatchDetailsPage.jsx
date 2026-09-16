import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  Car,
  Users,
  Route,
  Navigation,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Phone,
  ArrowLeft,
  Info,
  Compass,
  Check,
  Send
} from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ScoreCard from '../components/cards/ScoreCard';
import StatusBadge from '../components/common/StatusBadge';
import { useCarpool } from '../../context/CarpoolContext';

export default function MatchDetailsPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { matches, acceptMatch, rejectMatch, addToast, role } = useCarpool();

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [isAcceptedSuccessModal, setIsAcceptedSuccessModal] = useState(false);

  // Find match or fallback to first match
  const match = matches.find((m) => m.id === matchId) || matches[0];

  if (!match) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-bold text-slate-800">Match Not Found</h2>
        <Button variant="primary" onClick={() => navigate('/recommendations')} className="mt-4">
          Back to Recommendations
        </Button>
      </div>
    );
  }

  const handleAccept = () => {
    acceptMatch(match.id);
    setIsAcceptedSuccessModal(true);
  };

  const handleReject = () => {
    rejectMatch(match.id);
    navigate('/recommendations');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    addToast(`Message sent to ${match.passenger.name}: "${contactMessage}"`, 'success');
    setContactMessage('');
    setIsContactModalOpen(false);
  };

  const isAccepted = match.status === 'Accepted';
  const isRejected = match.status === 'Rejected';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches</span>
        </button>

        <div className="flex items-center gap-2">
          <StatusBadge status={match.status} />
          <div className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{match.totalScore}% Compatibility Score</span>
          </div>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
              Corridor Co-Passenger Match
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-0.5">
              Trip Match: {match.driver.name} & {match.passenger.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Dynamic compatibility report for College ⇄ Srirangam route corridor.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsContactModalOpen(true)}
              icon={MessageSquare}
            >
              Contact User
            </Button>

            {!isAccepted && !isRejected && (
              <>
                <Button
                  variant="danger"
                  size="md"
                  onClick={handleReject}
                  icon={XCircle}
                >
                  Reject
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAccept}
                  icon={CheckCircle2}
                  className="shadow-md shadow-indigo-600/30"
                >
                  Accept Ride
                </Button>
              </>
            )}

            {isAccepted && (
              <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                <Check className="w-4 h-4" />
                <span>Ride Accepted & Confirmed</span>
              </div>
            )}
          </div>
        </div>

        {/* User Profiles Row (Driver & Passenger) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Driver Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-indigo-600 block mb-2">
              Driver Details
            </span>
            <div className="flex items-center gap-3">
              <img
                src={match.driver.avatar}
                alt={match.driver.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                  {match.driver.name}
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                </h4>
                <p className="text-xs text-slate-500">{match.driver.role}</p>
                <p className="text-[11px] text-indigo-700 font-medium mt-0.5">
                  Vehicle: {match.driver.vehicle}
                </p>
              </div>
            </div>
          </div>

          {/* Passenger Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-amber-600 block mb-2">
              Matched Co-Passenger Details
            </span>
            <div className="flex items-center gap-3">
              <img
                src={match.passenger.avatar}
                alt={match.passenger.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/20"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                  {match.passenger.name}
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </h4>
                <p className="text-xs text-slate-500">{match.passenger.role}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Verified College Roll ID
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Itinerary & Stops Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            Route Specifications
          </h3>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Pickup Location</span>
            <p className="text-xs font-bold text-slate-800">{match.pickup}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Final Destination</span>
            <p className="text-xs font-bold text-slate-800">{match.destination}</p>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Departure Schedule:</span>
              <span className="font-bold text-slate-800">{match.departureTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Available Seats:</span>
              <span className="font-bold text-indigo-600">{match.availableSeats} open</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Extra Detour:</span>
              <span className="font-bold text-amber-600">{match.detourKm} ({match.detourMins})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">CO2 Prevention:</span>
              <span className="font-bold text-emerald-600">{match.co2Reduction}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/route')}
            icon={Compass}
            className="w-full mt-2"
          >
            View on Schematic Map
          </Button>
        </div>

        {/* Detailed Algorithmic Score Card (2 Cols) */}
        <div className="md:col-span-2">
          <ScoreCard
            totalScore={match.totalScore}
            routeSimilarity={match.factorBreakdown[0].score}
            timeCompatibility={match.factorBreakdown[1].score}
            pickupDistance={match.factorBreakdown[2].score}
            extraDetour={match.factorBreakdown[3].score}
          />
        </div>
      </div>

      {/* Contact User Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title={`Contact ${match.passenger.name}`}
      >
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 mb-2">
            <img
              src={match.passenger.avatar}
              alt={match.passenger.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">{match.passenger.name}</p>
              <p className="text-[11px] text-slate-500">{match.passenger.role}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Direct Message / Coordination Note
            </label>
            <textarea
              rows={3}
              required
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="e.g. Hi! I can pick you up near College Arch right at 5:05 PM. Look for the white Hyundai i20."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              Simulated encrypted campus messaging
            </span>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              icon={Send}
              iconPosition="right"
            >
              Send Note
            </Button>
          </div>
        </form>
      </Modal>

      {/* Accepted Success Modal */}
      <Modal
        isOpen={isAcceptedSuccessModal}
        onClose={() => setIsAcceptedSuccessModal(false)}
        title="Ride Confirmed!"
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Co-Passenger Successfully Matched!
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              {match.passenger.name} has been added to your upcoming ride itinerary. The pickup waypoint is scheduled at {match.pickup}.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAcceptedSuccessModal(false)}
            >
              Stay Here
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsAcceptedSuccessModal(false);
                navigate('/route');
              }}
            >
              View Updated Route Map
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
