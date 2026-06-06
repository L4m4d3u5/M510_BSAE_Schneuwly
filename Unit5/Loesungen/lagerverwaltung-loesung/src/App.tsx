import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ArtikelSeite from './pages/Artikel';
import Warnungen from './pages/Warnungen';
import Einstellungen from './pages/Einstellungen';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div id="app-shell">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/artikel" element={<ArtikelSeite />} />
            <Route path="/warnungen" element={<Warnungen />} />
            <Route path="/einstellungen" element={<Einstellungen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
