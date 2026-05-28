import React from 'react'
import { articles } from '../data/mockData'

// Dashboard – Übersichtsseite mit wichtigen Kennzahlen
function Dashboard(): React.ReactElement {
  // Kennzahlen aus den Beispieldaten berechnen
  const totalArticles = articles.length
  const criticalArticles = articles.filter(a => a.stock <= a.minStock).length
  const categories = new Set(articles.map(a => a.category)).size

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Übersicht über den aktuellen Lagerstand</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{totalArticles}</div>
          <div className="stat-label">Artikel gesamt</div>
        </div>

        <div className="stat-card stat-card--warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">{criticalArticles}</div>
          <div className="stat-label">Kritische Artikel</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div className="stat-value">{categories}</div>
          <div className="stat-label">Kategorien</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
