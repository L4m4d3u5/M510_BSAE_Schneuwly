import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Courses from './pages/Courses.tsx';
import Participants from './pages/Participants.tsx';
import './App.css';

function App(): React.ReactElement {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/participants" element={<Participants />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Sidebar(): React.ReactElement {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">📚 Kursverwaltung</div>
      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/courses"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Kurse
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/participants"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Teilnehmende
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default App;
