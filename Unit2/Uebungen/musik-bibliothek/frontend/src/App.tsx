import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Songs from './pages/Songs.tsx'
import Favorites from './pages/Favorites.tsx'
import './App.css'

// Hauptkomponente – definiert das Layout und alle Routen
function App(): React.ReactElement {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/favoriten" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
