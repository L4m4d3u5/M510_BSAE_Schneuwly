import { useState } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import ArticleForm from './pages/ArticleForm'
import ArticleList from './pages/ArticleList'
import './index.css'

export type Page = 'dashboard' | 'articles' | 'form'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  return (
    <div className="app-container">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'articles' && <ArticleList />}
        {currentPage === 'form' && <ArticleForm />}
      </main>
    </div>
  )
}

export default App
