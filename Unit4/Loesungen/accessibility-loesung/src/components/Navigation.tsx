import { useState } from 'react'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
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

const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { page: 'articles', label: 'Artikelübersicht', icon: <InventoryIcon /> },
  { page: 'form', label: 'Neuer Artikel', icon: <AddBoxIcon /> },
]

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    /*
     * FIX #1: Box component="nav" mit aria-label – korrekte semantische Rolle
     */
    <Box
      component="nav"
      aria-label="Hauptnavigation"
      sx={{
        width: collapsed ? 64 : 220,
        bgcolor: '#1a237e',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        flexShrink: 0,
        transition: 'width 0.3s',
      }}
    >
      <Toolbar sx={{ justifyContent: collapsed ? 'center' : 'space-between', px: 1 }}>
        {!collapsed && (
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            Lagerverwaltung
          </Typography>
        )}
        {/*
         * FIX #2: IconButton mit aria-label und Tooltip
         */}
        <Tooltip title={collapsed ? 'Navigation ausklappen' : 'Navigation einklappen'}>
          <IconButton
            aria-label={collapsed ? 'Navigation ausklappen' : 'Navigation einklappen'}
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

      {/*
       * FIX #3: Navigationspunkte als <List> mit <ListItemButton> –
       * vollständig per Tastatur bedienbar, korrekte Rolle "button"/"link"
       * FIX #4: aria-current="page" markiert den aktiven Eintrag für Screenreader
       */}
      <List component="ul" sx={{ flexGrow: 1, py: 1, listStyle: 'none' }}>
        {navItems.map(({ page, label, icon }) => (
          <ListItem key={page} disablePadding>
            <Tooltip title={collapsed ? label : ''} placement="right">
              <ListItemButton
                onClick={() => onNavigate(page)}
                selected={currentPage === page}
                aria-current={currentPage === page ? 'page' : undefined}
                sx={{
                  color: '#fff',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 1.5 : 2,
                  '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)' },
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: '#fff',
                    minWidth: collapsed ? 0 : 40,
                    // Icon-Bedeutung für Screenreader: wenn collapsed, wird der Tooltip-Text angesagt
                  }}
                >
                  {icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={label} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

      {/*
       * FIX #5: IconButtons mit aria-label und Tooltip
       */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1 }}>
        <Tooltip title="Benachrichtigungen">
          <IconButton aria-label="Benachrichtigungen" sx={{ color: '#fff' }}>
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Einstellungen">
          <IconButton aria-label="Einstellungen" sx={{ color: '#fff' }}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
