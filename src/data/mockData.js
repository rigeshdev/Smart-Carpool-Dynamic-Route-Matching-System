// Realistic mock data for Smart Carpool & Dynamic Route Matching System
// College CSE Final Year Project

export const INITIAL_CURRENT_USER = {
  id: 'usr_hari_01',
  name: 'Hariharan (Hari)',
  role: 'driver', // 'driver' | 'passenger'
  email: 'hari.cse@college.edu',
  phone: '+91 98421 87654',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'B.E. Computer Science & Engineering',
  batch: 'Final Year (2022 - 2026)',
  collegeId: 'CSE22045',
  rating: 4.9,
  totalTrips: 42,
  savedCo2: '148 kg',
  vehicle: {
    model: 'Hyundai i20 Asta (White)',
    licensePlate: 'TN-45-AZ-2024',
    totalSeats: 4,
    comfort: 'AC • USB Charging • Smooth driving',
    type: 'Hatchback',
  },
  preferences: {
    preferredDeparture: '05:00 PM',
    maxDetourKm: 3.5,
    musicAllowed: true,
    chatty: 'Moderate',
  }
};

export const DEMO_USERS = [
  INITIAL_CURRENT_USER,
  {
    id: 'usr_arun_02',
    name: 'Arun Kumar',
    role: 'passenger',
    email: 'arun.cse@college.edu',
    phone: '+91 97890 12345',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'B.Tech IT',
    batch: 'Final Year',
    collegeId: 'IT22019',
    rating: 4.8,
    totalTrips: 28,
    savedCo2: '94 kg',
    vehicle: null,
    preferences: {
      preferredDeparture: '05:05 PM',
      maxDetourKm: 2.0,
    }
  },
  {
    id: 'usr_karthi_03',
    name: 'Karthi Keyan',
    role: 'passenger',
    email: 'karthi.mech@college.edu',
    phone: '+91 94432 98765',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'B.E. Mechanical',
    batch: 'Third Year',
    collegeId: 'ME23078',
    rating: 4.7,
    totalTrips: 19,
    savedCo2: '62 kg',
    vehicle: null,
    preferences: {
      preferredDeparture: '05:25 PM',
      maxDetourKm: 4.0,
    }
  }
];

export const MOCK_RIDES = [
  {
    id: 'ride_101',
    driverId: 'usr_hari_01',
    driverName: 'Hariharan (Hari)',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    driverRating: 4.9,
    pickup: 'College Main Campus (Gate 1)',
    destination: 'Srirangam Temple North Gate',
    waypoints: ['Samayapuram Tollway', 'No. 1 Tollgate', 'Thiruvanaikoil'],
    date: '2026-09-17',
    departureTime: '05:00 PM',
    availableSeats: 3,
    totalSeats: 4,
    vehicleType: 'Car (Hyundai i20)',
    estimatedDistance: '18.4 km',
    estimatedDetour: '1.2 km (8 mins)',
    matchScore: 94,
    factors: {
      routeSimilarity: 40, // max 40
      timeCompatibility: 25, // max 25
      pickupDistance: 20, // max 20
      extraDetour: 15, // max 15
    },
    status: 'Upcoming',
    notes: 'Leaving right after Lab session at 5:00 PM. Drop along NH-45/Srirangam.',
    co2SavedKg: 4.8,
    costPerSeat: '₹35 (Fuel share)'
  },
  {
    id: 'ride_102',
    driverId: 'usr_suresh_04',
    driverName: 'Dr. Suresh V. (Faculty)',
    driverAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    driverRating: 5.0,
    pickup: 'Academic Block 3 Parking',
    destination: 'Chathiram Bus Stand, Trichy',
    waypoints: ['Samayapuram Bypass', 'Palpannai Roundabout'],
    date: '2026-09-17',
    departureTime: '05:15 PM',
    availableSeats: 2,
    totalSeats: 4,
    vehicleType: 'Sedan (Honda City)',
    estimatedDistance: '22.0 km',
    estimatedDetour: '2.4 km (12 mins)',
    matchScore: 82,
    factors: {
      routeSimilarity: 34,
      timeCompatibility: 22,
      pickupDistance: 16,
      extraDetour: 10,
    },
    status: 'Upcoming',
    notes: 'Direct route via expressway. Peaceful quiet ride, ideal for study review.',
    co2SavedKg: 5.4,
    costPerSeat: '₹40'
  },
  {
    id: 'ride_103',
    driverId: 'usr_meena_05',
    driverName: 'Meenakshi R. (ECE)',
    driverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    driverRating: 4.8,
    pickup: 'College Girls Hostel Gate',
    destination: 'KK Nagar / Central Bus Stand',
    waypoints: ['Tollgate', 'Mambazhasalai', 'Railway Junction'],
    date: '2026-09-17',
    departureTime: '05:30 PM',
    availableSeats: 1,
    totalSeats: 4,
    vehicleType: 'Compact SUV (Tata Punch)',
    estimatedDistance: '24.5 km',
    estimatedDetour: '3.1 km (15 mins)',
    matchScore: 76,
    factors: {
      routeSimilarity: 31,
      timeCompatibility: 20,
      pickupDistance: 14,
      extraDetour: 11,
    },
    status: 'Upcoming',
    notes: 'Female co-passengers prioritized. Clean car with AC.',
    co2SavedKg: 6.1,
    costPerSeat: '₹45'
  },
  {
    id: 'ride_104',
    driverId: 'usr_vignesh_06',
    driverName: 'Vigneshwaran P.',
    driverAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    driverRating: 4.6,
    pickup: 'College Main Gate',
    destination: 'Thillai Nagar East',
    waypoints: ['Cauvery Bridge', 'Main Guard Gate'],
    date: '2026-09-18',
    departureTime: '04:45 PM',
    availableSeats: 3,
    totalSeats: 4,
    vehicleType: 'Car (Maruti Baleno)',
    estimatedDistance: '19.8 km',
    estimatedDetour: '1.8 km (9 mins)',
    matchScore: 88,
    factors: {
      routeSimilarity: 37,
      timeCompatibility: 24,
      pickupDistance: 15,
      extraDetour: 12,
    },
    status: 'Upcoming',
    notes: 'Leaving right after tutorial class. Punctual departure.',
    co2SavedKg: 5.0,
    costPerSeat: '₹35'
  }
];

export const MOCK_MATCH_RECOMMENDATIONS = [
  {
    id: 'match_01',
    rideId: 'ride_101',
    driver: {
      name: 'Hariharan (Hari)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      role: 'Driver (CSE Final Year)',
      verified: true,
      vehicle: 'Hyundai i20 (TN-45-AZ-2024)'
    },
    passenger: {
      name: 'Arun Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Passenger (IT Final Year)',
      verified: true
    },
    pickup: 'Near College Campus (Arch Gate)',
    destination: 'Srirangam North Chithirai St.',
    departureTime: '05:00 PM (Passenger ready: 05:05 PM)',
    availableSeats: 3,
    totalScore: 94,
    factorBreakdown: [
      { name: 'Route Similarity', score: 40, max: 40, percentage: 100, desc: 'Shared overlap of 92% across NH-45 trunk route' },
      { name: 'Time Compatibility', score: 25, max: 25, percentage: 100, desc: '5 mins buffer window between schedules' },
      { name: 'Pickup Distance', score: 20, max: 20, percentage: 100, desc: 'Pickup is only 350m from driver departure spot' },
      { name: 'Extra Detour', score: 9, max: 15, percentage: 60, desc: 'Estimated detour is only 1.2 km (8 mins)' },
    ],
    detourKm: '1.2 km',
    detourMins: '8 mins',
    routeDistance: '18.4 km',
    co2Reduction: '4.8 kg',
    status: 'Recommended' // 'Recommended' | 'Accepted' | 'Rejected'
  },
  {
    id: 'match_02',
    rideId: 'ride_101',
    driver: {
      name: 'Hariharan (Hari)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      role: 'Driver (CSE Final Year)',
      verified: true,
      vehicle: 'Hyundai i20 (TN-45-AZ-2024)'
    },
    passenger: {
      name: 'Karthi Keyan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Passenger (Mechanical 3rd Yr)',
      verified: true
    },
    pickup: 'Samayapuram Bus Stand Junction',
    destination: 'Srirangam East Gate',
    departureTime: '05:00 PM (Passenger ready: 05:25 PM)',
    availableSeats: 3,
    totalScore: 82,
    factorBreakdown: [
      { name: 'Route Similarity', score: 34, max: 40, percentage: 85, desc: 'Driver naturally passes Samayapuram bypass' },
      { name: 'Time Compatibility', score: 22, max: 25, percentage: 88, desc: 'Driver will reach Samayapuram at approx 5:20 PM' },
      { name: 'Pickup Distance', score: 16, max: 20, percentage: 80, desc: 'Minor 600m diversion to bus shelter' },
      { name: 'Extra Detour', score: 10, max: 15, percentage: 67, desc: 'Extra detour is 2.1 km (11 mins)' },
    ],
    detourKm: '2.1 km',
    detourMins: '11 mins',
    routeDistance: '19.5 km',
    co2Reduction: '4.2 kg',
    status: 'Recommended'
  },
  {
    id: 'match_03',
    rideId: 'ride_102',
    driver: {
      name: 'Dr. Suresh V.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      rating: 5.0,
      role: 'Driver (Faculty)',
      verified: true,
      vehicle: 'Honda City'
    },
    passenger: {
      name: 'Priya Dharshini',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'Passenger (CSE 2nd Yr)',
      verified: true
    },
    pickup: 'College Library Roundabout',
    destination: 'Chathiram Bus Stand',
    departureTime: '05:15 PM (Passenger ready: 05:15 PM)',
    availableSeats: 2,
    totalScore: 76,
    factorBreakdown: [
      { name: 'Route Similarity', score: 31, max: 40, percentage: 78, desc: 'Direct route with minor diversion near junction' },
      { name: 'Time Compatibility', score: 20, max: 25, percentage: 80, desc: 'Exact synchronized departure time' },
      { name: 'Pickup Distance', score: 14, max: 20, percentage: 70, desc: 'Pickup point is 900m detour' },
      { name: 'Extra Detour', score: 11, max: 15, percentage: 73, desc: 'Extra detour is 2.8 km (14 mins)' },
    ],
    detourKm: '2.8 km',
    detourMins: '14 mins',
    routeDistance: '22.0 km',
    co2Reduction: '5.1 kg',
    status: 'Recommended'
  }
];

export const MOCK_USER_RIDES = {
  upcoming: [
    {
      id: 'ride_101',
      date: 'Tomorrow, Sep 17',
      time: '05:00 PM',
      pickup: 'College Campus (Gate 1)',
      destination: 'Srirangam Temple Gate',
      role: 'Driver',
      seats: '3 seats open',
      vehicle: 'Hyundai i20',
      status: 'Confirmed',
      passengers: ['Arun Kumar (Matched)', 'Seat Available', 'Seat Available'],
      detourKm: '1.2 km',
      matchScore: 94
    },
    {
      id: 'ride_105',
      date: 'Friday, Sep 19',
      time: '05:30 PM',
      pickup: 'CSE Lab Block',
      destination: 'Central Bus Stand, Trichy',
      role: 'Driver',
      seats: '2 seats open',
      vehicle: 'Hyundai i20',
      status: 'Pending',
      passengers: ['Pending Requests (1)'],
      detourKm: '2.0 km',
      matchScore: 86
    }
  ],
  completed: [
    {
      id: 'ride_098',
      date: 'Sep 15, 2026',
      time: '05:00 PM',
      pickup: 'College Campus',
      destination: 'Srirangam',
      role: 'Driver',
      seats: '3 passengers carried',
      vehicle: 'Hyundai i20',
      status: 'Completed',
      passengers: ['Arun Kumar', 'Karthi Keyan', 'Vignesh P.'],
      detourKm: '1.4 km',
      co2Saved: '4.8 kg'
    },
    {
      id: 'ride_092',
      date: 'Sep 12, 2026',
      time: '05:15 PM',
      pickup: 'Hostel Block',
      destination: 'Chathiram Bus Stand',
      role: 'Driver',
      seats: '2 passengers carried',
      vehicle: 'Hyundai i20',
      status: 'Completed',
      passengers: ['Dinesh S.', 'Rahul M.'],
      detourKm: '2.1 km',
      co2Saved: '5.2 kg'
    }
  ],
  cancelled: [
    {
      id: 'ride_085',
      date: 'Sep 08, 2026',
      time: '04:30 PM',
      pickup: 'Sports Ground Gate',
      destination: 'KK Nagar',
      role: 'Driver',
      seats: '3 seats',
      vehicle: 'Hyundai i20',
      status: 'Cancelled',
      reason: 'Late college symposium rehearsal'
    }
  ]
};

export const MOCK_ACTIVITY_FEED = [
  {
    id: 'act_01',
    type: 'match_found',
    title: 'High Compatibility Match Detected (94%)',
    description: 'Arun Kumar wants a pickup near College Gate towards Srirangam.',
    time: '12 mins ago',
    badge: '94% Match',
    link: '/match/match_01'
  },
  {
    id: 'act_02',
    type: 'ride_booked',
    title: 'Ride Request Accepted',
    description: 'Karthi Keyan requested pickup at Samayapuram Bus Stand (82% Match).',
    time: '45 mins ago',
    badge: 'Request',
    link: '/match/match_02'
  },
  {
    id: 'act_03',
    type: 'co2_milestone',
    title: 'Sustainability Milestone Reached! 🌿',
    description: 'You have prevented 148 kg of CO2 emissions through 42 shared college rides.',
    time: 'Yesterday',
    badge: 'Milestone',
    link: '/profile'
  },
  {
    id: 'act_04',
    type: 'ride_completed',
    title: 'Trip Completed: College → Srirangam',
    description: 'Shared with 3 fellow students. Fuel cost offset by ₹105.',
    time: 'Sep 15, 2026',
    badge: 'Completed',
    link: '/my-rides'
  }
];

export const MOCK_ROUTE_WAYPOINTS = [
  {
    id: 'wp_01',
    name: 'College Campus (Origin)',
    subtext: 'Starting point: Gate 1 Main Portico',
    type: 'start',
    time: '05:00 PM',
    distance: '0.0 km',
    passed: true,
    coordinates: { x: 80, y: 340 }
  },
  {
    id: 'wp_02',
    name: 'College Arch Stop (Arun Pickup)',
    subtext: 'Passenger 1 pickup: Arun Kumar',
    type: 'pickup',
    time: '05:05 PM',
    distance: '+0.8 km (5 mins)',
    passed: false,
    coordinates: { x: 210, y: 260 }
  },
  {
    id: 'wp_03',
    name: 'Samayapuram Bypass (Karthi Pickup)',
    subtext: 'Passenger 2 pickup: Karthi Keyan',
    type: 'pickup',
    time: '05:25 PM',
    distance: '+7.2 km (20 mins)',
    passed: false,
    coordinates: { x: 380, y: 170 }
  },
  {
    id: 'wp_04',
    name: 'No. 1 Tollgate Roundabout',
    subtext: 'Intermediate trunk milestone (NH-45)',
    type: 'intermediate',
    time: '05:38 PM',
    distance: '+5.4 km (13 mins)',
    passed: false,
    coordinates: { x: 530, y: 240 }
  },
  {
    id: 'wp_05',
    name: 'Srirangam Temple North Gate (Destination)',
    subtext: 'Final trip destination',
    type: 'destination',
    time: '05:52 PM',
    distance: '+5.0 km (14 mins)',
    passed: false,
    coordinates: { x: 720, y: 190 }
  }
];

export const ROUTE_SUMMARY_METRICS = {
  totalDistance: '18.4 km',
  estimatedTravelTime: '52 mins',
  directTravelTime: '44 mins',
  extraDetourDistance: '1.2 km',
  extraDetourTime: '8 mins',
  co2SavedKg: '4.8 kg',
  fuelShareEstimate: '₹120 Total saved / 3 riders',
  sequence: ['College Campus', 'Arun Pickup', 'Samayapuram (Karthi)', 'No. 1 Tollgate', 'Srirangam']
};
