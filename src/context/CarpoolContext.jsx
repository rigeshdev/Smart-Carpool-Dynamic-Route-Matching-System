import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_CURRENT_USER,
  DEMO_USERS,
  MOCK_RIDES,
  MOCK_MATCH_RECOMMENDATIONS,
  MOCK_USER_RIDES
} from '../data/mockData';

const CarpoolContext = createContext();

export function CarpoolProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(INITIAL_CURRENT_USER);
  const [role, setRole] = useState(INITIAL_CURRENT_USER.role); // 'driver' | 'passenger'
  const [rides, setRides] = useState(MOCK_RIDES);
  const [matches, setMatches] = useState(MOCK_MATCH_RECOMMENDATIONS);
  const [myRides, setMyRides] = useState(MOCK_USER_RIDES);
  const [toasts, setToasts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    pickup: 'College Main Campus',
    destination: 'Srirangam',
    date: '2026-09-17',
    departureTime: '05:00 PM',
    passengers: 1,
  });

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleRole = () => {
    const newRole = role === 'driver' ? 'passenger' : 'driver';
    setRole(newRole);
    setCurrentUser((prev) => ({
      ...prev,
      role: newRole,
    }));
    addToast(`Switched active mode to ${newRole.toUpperCase()}`, 'success');
  };

  const switchUser = (userId) => {
    const found = DEMO_USERS.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setRole(found.role);
      addToast(`Switched user profile to ${found.name} (${found.role})`, 'info');
    }
  };

  const publishRide = (rideData) => {
    const newRideId = `ride_${Date.now()}`;
    const formattedRide = {
      id: newRideId,
      driverId: currentUser.id,
      driverName: currentUser.name,
      driverAvatar: currentUser.avatar,
      driverRating: currentUser.rating,
      pickup: rideData.pickup,
      destination: rideData.destination,
      waypoints: rideData.preferredRoute ? [rideData.preferredRoute] : ['NH-45 Express'],
      date: rideData.date,
      departureTime: rideData.departureTime,
      availableSeats: parseInt(rideData.availableSeats, 10) || 3,
      totalSeats: parseInt(rideData.availableSeats, 10) || 3,
      vehicleType: rideData.vehicleType || 'Car',
      estimatedDistance: '19.2 km',
      estimatedDetour: `${rideData.maxDetour || 2.0} km`,
      matchScore: 92,
      factors: {
        routeSimilarity: 38,
        timeCompatibility: 24,
        pickupDistance: 18,
        extraDetour: 12,
      },
      status: 'Upcoming',
      notes: rideData.notes || 'Published via Smart Carpool system.',
      co2SavedKg: 4.5,
      costPerSeat: '₹35'
    };

    setRides((prev) => [formattedRide, ...prev]);

    // Also add to My Rides
    setMyRides((prev) => ({
      ...prev,
      upcoming: [
        {
          id: newRideId,
          date: rideData.date,
          time: rideData.departureTime,
          pickup: rideData.pickup,
          destination: rideData.destination,
          role: 'Driver',
          seats: `${rideData.availableSeats} seats open`,
          vehicle: rideData.vehicleType || 'Car',
          status: 'Confirmed',
          passengers: ['No passengers yet'],
          detourKm: `${rideData.maxDetour || 2.0} km`,
          matchScore: 92
        },
        ...prev.upcoming,
      ]
    }));

    addToast('Ride successfully published and route matching activated!', 'success');
    return newRideId;
  };

  const acceptMatch = (matchId) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId ? { ...m, status: 'Accepted' } : m
      )
    );
    addToast('Ride match request accepted! Confirmed notification sent.', 'success');
  };

  const rejectMatch = (matchId) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId ? { ...m, status: 'Rejected' } : m
      )
    );
    addToast('Match declined.', 'info');
  };

  const cancelUpcomingRide = (rideId) => {
    setMyRides((prev) => {
      const target = prev.upcoming.find((r) => r.id === rideId);
      if (!target) return prev;
      return {
        ...prev,
        upcoming: prev.upcoming.filter((r) => r.id !== rideId),
        cancelled: [
          { ...target, status: 'Cancelled', reason: 'Cancelled by user' },
          ...prev.cancelled
        ]
      };
    });
    addToast('Ride cancelled.', 'info');
  };

  const updateProfile = (updatedData) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updatedData
    }));
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <CarpoolContext.Provider
      value={{
        currentUser,
        role,
        setRole,
        toggleRole,
        switchUser,
        rides,
        matches,
        myRides,
        toasts,
        addToast,
        removeToast,
        searchParams,
        setSearchParams,
        publishRide,
        acceptMatch,
        rejectMatch,
        cancelUpcomingRide,
        updateProfile
      }}
    >
      {children}
    </CarpoolContext.Provider>
  );
}

export function useCarpool() {
  const context = useContext(CarpoolContext);
  if (!context) {
    throw new Error('useCarpool must be used within a CarpoolProvider');
  }
  return context;
}
