import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './App'
import './index.css'

/*
 * FIX: MUI-Theme mit explizit sichtbaren Fokus-Styles.
 * Der Browser-Standard-Fokusring wird durch CssBaseline nicht entfernt;
 * zusätzlich stellen wir sicher, dass :focus-visible deutlich sichtbar ist.
 */
const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        // Ripple und FocusRipple explizit aktiviert
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '3px solid #1976d2',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '2px solid #fff',
            outlineOffset: -2,
          },
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
