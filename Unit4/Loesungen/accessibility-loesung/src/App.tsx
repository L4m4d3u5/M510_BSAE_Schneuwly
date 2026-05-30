import { useState } from 'react'
import { Box } from '@mui/material'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import ArticleForm from './pages/ArticleForm'
import ArticleList from './pages/ArticleList'

export type Page = 'dashboard' | 'articles' | 'form'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {/* FIX: <main> mit aria-label für Screenreader */}
      <Box
        component="main"
        aria-label="Hauptinhalt"
        sx={{ flex: 1, p: 3, overflowY: 'auto' }}
      >
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'articles' && <ArticleList />}
        {currentPage === 'form' && <ArticleForm />}
      </Box>
    </Box>
  )
}

export default App
