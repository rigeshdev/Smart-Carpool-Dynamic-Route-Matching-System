import React from 'react';
import { HashRouter } from 'react-router-dom';
import { CarpoolProvider } from './context/CarpoolContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <CarpoolProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </CarpoolProvider>
  );
}
