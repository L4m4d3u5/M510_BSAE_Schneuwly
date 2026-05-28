import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InputIcon from '@mui/icons-material/Input'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import PaletteIcon from '@mui/icons-material/Palette'
import TableChartIcon from '@mui/icons-material/TableChart'

// Routen-Konfiguration für die Navigations-Tabs
const tabs = [
  { label: 'Grundlagen', path: '/grundlagen', icon: <DashboardIcon /> },
  { label: 'Eingaben', path: '/eingaben', icon: <InputIcon /> },
  { label: 'Layout', path: '/layout', icon: <ViewQuiltIcon /> },
  { label: 'Feedback', path: '/feedback', icon: <NotificationsActiveIcon /> },
  { label: 'DataGrid', path: '/datagrid', icon: <TableChartIcon /> },
]

export default function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  // Aktiven Tab anhand der aktuellen Route bestimmen
  const activeTab = tabs.findIndex((t) => location.pathname.startsWith(t.path))

  return (
    // AppBar: obere Navigationsleiste (elevation = Schatten-Stärke)
    <AppBar position="static" elevation={2}>
      <Toolbar>
        {/* Logo / App-Titel */}
        <Tooltip title="MUI – Material UI Komponentenbibliothek">
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <PaletteIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" component="div" sx={{ mr: 4, fontWeight: 700 }}>
          MUI Demo
        </Typography>

        {/* Tabs für die Navigation zwischen den Seiten */}
        <Tabs
          value={activeTab === -1 ? 0 : activeTab}
          onChange={(_event, newValue: number) => navigate(tabs[newValue].path)}
          textColor="inherit"
          // indicatorColor zeigt den aktiven Tab mit einem Unterstrich an
          indicatorColor="secondary"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.path}
              label={tab.label}
              icon={tab.icon}
              // iconPosition: Icon links neben dem Label
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}
