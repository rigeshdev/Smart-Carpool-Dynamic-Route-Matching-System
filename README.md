# Smart-Carpool-Dynamic-Route-Matching-System
> **Smart Carpool & Dynamic Route Matching System**
> **College CSE Final Year Project — Frontend UI Demonstration**

A modern, responsive, and SaaS-grade carpool recommendation web application designed for college campus commutes. It simulates dynamic route matching, time compatibility scoring, pickup proximity, and detour minimization along common student travel corridors.

---

## 🚀 Quick Start & Presentation Options

You have **two seamless ways** to present or evaluate this application:

### Option 1: Instant Browser Preview (Zero Setup Needed)
Simply open [`preview.html`](./preview.html) directly in any modern browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
- **No Node.js or npm installation required**
- Fully interactive with all 10 pages, role switching, mock data, factor calculations, and route visualizer!

### Option 2: Full Vite + React Developer Server
When running in your local development environment or college lab with Node.js installed:

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev

# 3. Open in your browser (default port 3000)
http://localhost:3000
```

---

## 📱 Implemented Pages & Features

| # | Page | Path | Key Highlights |
|---|------|------|----------------|
| 1 | **Landing Page** | `/` | Hero section, tagline *"Smart rides. Better routes. Shared journeys."*, 3-step workflow, features grid, live demo preview card, and footer. |
| 2 | **Login / Register UI** | `/login` | Role selector (Driver / Passenger), email/password inputs, 1-click evaluator demo sign-in for Hari (Driver) and Arun (Passenger). |
| 3 | **Dashboard** | `/dashboard` | Welcome banner, active mode badge, key statistics (Active Rides, Seats, Matches, Saved CO2), upcoming ride card, quick action cards, and activity feed. |
| 4 | **Create Ride Page** | `/create-ride` | Driver form for campus origin, destination, departure time, seats counter, vehicle type, corridor selector, max detour slider (km), and live itinerary preview. |
| 5 | **Find Ride Page** | `/find-ride` | Passenger search form with campus autocomplete, quick filter pills (All, High Match >90%, Low Detour <2km), and dynamic ride cards. |
| 6 | **Recommended Matches** | `/recommendations` | Multi-factor compatibility dashboard displaying Route Similarity (40%), Time Synchrony (25%), Pickup Distance (20%), and Extra Detour (15%) with progress meters. |
| 7 | **Match Details Page** | `/match/:id` | Deep-dive comparison between driver and passenger profiles, factor breakdown, interactive "Accept Ride", "Reject", and "Contact User" modals. |
| 8 | **Route Visualizer** | `/route` | Vector SVG route map schematic with animated glowing highway, Cauvery river baseline, pulsing waypoint markers (College → Arun → Samayapuram → Srirangam), and turn-by-turn stop sequence. Labeled clearly with **Demo Map Placeholder** banner. |
| 9 | **My Rides Page** | `/my-rides` | Tabbed interface for Upcoming, Completed, and Cancelled rides with status badges, passenger manifest, and interactive cancel actions. |
| 10 | **Profile Page** | `/profile` | Student avatar, verified institutional credentials, vehicle specifications, commute preferences, and interactive "Edit Profile" modal. |

---

## 👥 Realistic Mock Demonstration Data

- **Driver:**
  - **Hariharan (Hari)** — Final Year CSE (`CSE22045`), driving a White Hyundai i20 (`TN-45-AZ-2024`).
  - Departs College Main Campus (Gate 1) at 5:00 PM with 3 open seats towards Srirangam Temple.
- **Co-Passengers:**
  - **Arun Kumar** — Final Year IT (`IT22019`), pickup near College Arch Gate at 5:05 PM (**94% Match**, 1.2 km detour).
  - **Karthi Keyan** — 3rd Year Mechanical (`ME23078`), pickup at Samayapuram Bus Stand at 5:25 PM (**82% Match**, 2.1 km detour).

---

## ⚙️ Matching Factors Formulation (CSE Model)

$$\text{Match Score} = W_{route} \cdot S_{route} + W_{time} \cdot S_{time} + W_{dist} \cdot S_{dist} + W_{detour} \cdot S_{detour}$$

- **Route Similarity ($W_{route} = 40\%$):** Geometric road segment overlap along the primary NH-45 trunk highway.
- **Time Compatibility ($W_{time} = 25\%$):** Synchrony buffer window between driver departure and passenger readiness.
- **Pickup Distance ($W_{dist} = 20\%$):** Proximity between passenger pickup stop and driver starting point.
- **Extra Detour ($W_{detour} = 15\%$):** Penalty applied to additional mileage and delay introduced to the driver's schedule.

---

## 📂 Project Architecture

```
Project/
├── preview.html             # Standalone instant browser preview (double-click to open)
├── index.html               # Vite HTML entry point
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind theme colors & tokens
├── postcss.config.js        # PostCSS plugins
├── README.md                # Project documentation
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main App component with HashRouter
    ├── index.css            # Base styles, Tailwind directives & animations
    ├── context/
    │   └── CarpoolContext.jsx  # Global state (role toggle, rides, matches, toasts)
    ├── data/
    │   └── mockData.js      # Mock users, rides, matches, and waypoints
    ├── layouts/
    │   ├── AppLayout.jsx    # Sidebar + Topbar + Content layout
    │   └── PublicLayout.jsx # Public header + footer layout
    ├── routes/
    │   └── AppRoutes.jsx    # React Router v6 route configuration
    ├── components/
    │   ├── common/
    │   │   ├── Button.jsx
    │   │   ├── Modal.jsx
    │   │   ├── StatusBadge.jsx
    │   │   ├── LocationInput.jsx
    │   │   └── Toast.jsx
    │   ├── navigation/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── MobileNav.jsx
    │   ├── cards/
    │   │   ├── RideCard.jsx
    │   │   ├── MatchCard.jsx
    │   │   ├── ScoreCard.jsx
    │   │   ├── RouteCard.jsx
    │   │   └── ProfileCard.jsx
    │   └── route/
    │       └── MapPlaceholderVisualizer.jsx
    └── pages/
        ├── LandingPage.jsx
        ├── AuthPage.jsx
        ├── DashboardPage.jsx
        ├── CreateRidePage.jsx
        ├── FindRidePage.jsx
        ├── RecommendationsPage.jsx
        ├── MatchDetailsPage.jsx
        ├── RoutePage.jsx
        ├── MyRidesPage.jsx
        └── ProfilePage.jsx
```

---

## 🛡️ Scope Notice

As requested for Phase 1 of this CSE project, this build is **strictly frontend-only**:
- No live backend or database connections
- No real GPS hardware or live external map API tokens required
- No live payment processing
- All data and interactions run smoothly via local React state and realistic academic test sets
