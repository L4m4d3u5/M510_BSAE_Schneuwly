import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Navigation from './components/Navigation'
import Grundlagen from './pages/Grundlagen'
import Eingaben from './pages/Eingaben'
import Layout from './pages/Layout'
import Feedback from './pages/Feedback'
import DataGridSeite from './pages/DataGrid'

export default function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Obere Navigationsleiste */}
      <Navigation />

      {/* Seiteninhalt */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/grundlagen" replace />} />
          <Route path="/grundlagen" element={<Grundlagen />} />
          <Route path="/eingaben" element={<Eingaben />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/datagrid" element={<DataGridSeite />} />
        </Routes>
      </Box>
    </Box>
  )
}
