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
    <>
      <a href="#main-content" className="skip-link">Zum Hauptinhalt springen</a>
      <div className="app-container">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main id="main-content" className="main-content">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'articles' && <ArticleList />}
          {currentPage === 'form' && <ArticleForm />}
        </main>
      </div>
    </>
  )
}

export default App
