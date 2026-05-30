import { useState } from 'react'
import { IconButton, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import AddBoxIcon from '@mui/icons-material/AddBox'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import { Page } from '../App'

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

/*
 * ACCESSIBILITY-PROBLEME in dieser Komponente:
 *
 * 1. <div> statt <nav> – die Sidebar hat keine semantische Bedeutung für Screenreader
 * 2. Klickbare <div>-Elemente statt Buttons – nicht per Tastatur bedienbar (kein focus, kein Enter-Handler)
 * 3. MenuIcon-Button ohne aria-label – Screenreader sagt nur "Button", nicht was er tut
 * 4. NotificationsIcon- und SettingsIcon-Buttons ohne aria-label
 * 5. Aktiver Navigationspunkt nur über Hintergrundfarbe erkennbar, kein aria-current
 */
export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    // Problem #1: div statt <nav>
    <nav
      style={{
        width: collapsed ? 60 : 220,
        background: '#1a237e',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 0',
        transition: 'width 0.3s',
        minHeight: '100vh',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', marginBottom: 16 }}>
        {/* Problem #3: IconButton ohne aria-label */}
        <IconButton onClick={() => setCollapsed(!collapsed)} style={{ color: '#fff' }} aria-label="Menü">

          <MenuIcon />
        </IconButton>
        {!collapsed && (
          <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 8 }}>Lagerverwaltung</span>
        )}
      </div>

      <Divider style={{ background: 'rgba(255,255,255,0.2)' }} />

      {/* Problem #2: klickbare divs statt Buttons/Links */}
      <button
        onClick={() => onNavigate('dashboard')}

        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          cursor: 'pointer',
          background: currentPage === 'dashboard' ? 'rgba(255,255,255,0.15)' : 'transparent',
          marginTop: 8,
          color: currentPage === 'dashboard' ? '#fff' : 'rgba(255,255,255,0.7)',
        }}
        aria-current={currentPage === 'dashboard' ? 'page' : undefined}
      >
        <DashboardIcon />
        {!collapsed && <span style={{ marginLeft: 12 }}>Dashboard</span>}
      </button>

      <button
        onClick={() => onNavigate('articles')}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          cursor: 'pointer',
          background: currentPage === 'articles' ? 'rgba(255,255,255,0.15)' : 'transparent',
          color: currentPage === 'articles' ? '#fff' : 'rgba(255,255,255,0.7)',
        }}
        aria-current={currentPage === 'articles' ? 'page' : undefined}
      >
        <InventoryIcon />
        {!collapsed && <span style={{ marginLeft: 12 }}>Artikel</span>}
      </button>

      <button
        onClick={() => onNavigate('form')}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          cursor: 'pointer',
          background: currentPage === 'form' ? 'rgba(255,255,255,0.15)' : 'transparent',
          color: currentPage === 'dashboard' ? '#fff' : 'rgba(255,255,255,0.7)',
        }}
        aria-current={currentPage === 'form' ? 'page' : undefined}
      >
        <AddBoxIcon />
        {!collapsed && <span style={{ marginLeft: 12 }}>Neuer Artikel</span>}
      </button>

      <div style={{ flexGrow: 1 }} />

      <Divider style={{ background: 'rgba(255,255,255,0.2)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
        {/* Problem #4: IconButtons ohne aria-label */}
        <IconButton style={{ color: '#fff' }} aria-label="Benachrichtigungen">
          <NotificationsIcon />
        </IconButton>
        <IconButton style={{ color: '#fff' }} aria-label="Einstellungen">
          <SettingsIcon />
        </IconButton>
      </div>
    </nav>
  )
}
