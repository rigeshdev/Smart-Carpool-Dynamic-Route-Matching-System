import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const COMMON_COLLEGE_LOCATIONS = [
  'College Main Campus (Gate 1)',
  'Academic Block 3 Parking',
  'College Library Roundabout',
  'College Girls Hostel Gate',
  'Samayapuram Bus Stand Junction',
  'Samayapuram Tollway Bypass',
  'No. 1 Tollgate Roundabout',
  'Thiruvanaikoil Trunk Road',
  'Srirangam Temple North Gate',
  'Srirangam Rajagopuram Entrance',
  'Chathiram Bus Stand, Trichy',
  'Central Bus Stand / Railway Junction',
  'Thillai Nagar Main Road',
  'KK Nagar Bus Terminal'
];

export default function LocationInput({
  label,
  value,
  onChange,
  placeholder = 'Enter college or city location...',
  icon: Icon = MapPin,
  isDestination = false,
  required = false
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const filtered = COMMON_COLLEGE_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes((value || '').toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
          <Icon className={`w-4 h-4 ${isDestination ? 'text-rose-500' : 'text-indigo-600'}`} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors shadow-xs"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Auto-suggest dropdown */}
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute z-30 left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-100 max-h-48 overflow-y-auto py-1">
          <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Popular College Commute Spots
          </div>
          {filtered.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(item);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-slate-400" />
              <span>{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
