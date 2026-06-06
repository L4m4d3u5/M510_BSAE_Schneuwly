import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  const links = [
    { path: '/', label: 'Dashboard' },
    { path: '/artikel', label: 'Artikel' },
    { path: '/warnungen', label: 'Warnungen' },
    { path: '/einstellungen', label: 'Einstellungen' },
  ];

  return (
    <nav
      style={{
        backgroundColor: '#1a237e',
        color: 'white',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        height: '54px',
        gap: '4px',
      }}
    >
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '17px',
          marginRight: '20px',
          letterSpacing: '0.3px',
        }}
      >
        Lagerverwaltung
      </span>

      {links.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          style={({ isActive }) => ({
            color: isActive ? '#90caf9' : 'rgba(255,255,255,0.72)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: isActive ? 600 : 400,
            padding: '6px 12px',
            borderRadius: '4px',
            backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
            transition: 'background-color 0.15s',
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
