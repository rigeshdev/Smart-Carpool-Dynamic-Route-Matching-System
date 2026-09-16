import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AppLayout from '../layouts/AppLayout';

// Pages
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import CreateRidePage from '../pages/CreateRidePage';
import FindRidePage from '../pages/FindRidePage';
import RecommendationsPage from '../pages/RecommendationsPage';
import MatchDetailsPage from '../pages/MatchDetailsPage';
import RoutePage from '../pages/RoutePage';
import MyRidesPage from '../pages/MyRidesPage';
import ProfilePage from '../pages/ProfilePage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Route>

      {/* Authenticated / App Portal Pages */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/find-ride" element={<FindRidePage />} />
        <Route path="/create-ride" element={<CreateRidePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/match/:matchId" element={<MatchDetailsPage />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/my-rides" element={<MyRidesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
