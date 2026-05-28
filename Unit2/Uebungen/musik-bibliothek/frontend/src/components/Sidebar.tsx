import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar(): React.ReactElement {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-icon">🎵</span>
        <span className="sidebar-title">Musikbibliothek</span>
      </div>

      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <span className="nav-icon">🏠</span>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/songs"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <span className="nav-icon">🎶</span>
              Songs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/favoriten"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <span className="nav-icon">❤️</span>
              Favoriten
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
