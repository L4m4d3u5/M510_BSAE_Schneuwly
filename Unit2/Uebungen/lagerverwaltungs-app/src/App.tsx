import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Articles from './pages/Articles'
import Warnings from './pages/Warnings'
import Settings from './pages/Settings'
import './App.css'

// Hauptkomponente – definiert das Layout und alle Routen
function App(): React.ReactElement {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar wird auf jeder Seite angezeigt */}
        <Sidebar />

        {/* Hauptinhalt – wechselt je nach aktiver Route */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/artikel" element={<Articles />} />
            <Route path="/warnungen" element={<Warnings />} />
            <Route path="/einstellungen" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
