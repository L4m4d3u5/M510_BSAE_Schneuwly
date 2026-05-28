import { Box, Typography } from '@mui/material'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import ProduktDataGrid from './components/ProduktDataGrid'

export default function App() {
  return (
    <Box sx={{ maxWidth: 1500, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <WarehouseIcon sx={{ fontSize: 36, color: 'primary.main' }} />
        <Box>
          <Typography variant="h5" fontWeight={700} color="primary">
            Lagerverwaltung
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lösung B – MUI DataGrid
          </Typography>
        </Box>
      </Box>

      <ProduktDataGrid />
    </Box>
  )
}
