import React from 'react'
import { articles } from '../data/mockData.ts'

// Dashboard – Übersichtsseite mit wichtigen Kennzahlen
// Lösung: Kennzahlen werden dynamisch aus den Beispieldaten berechnet
function Dashboard(): React.ReactElement {
  // Gesamtanzahl aller Artikel
  const totalArticles = articles.length

  // Kritische Artikel: Bestand <= Mindestbestand
  const criticalArticles = articles.filter(a => a.stock <= a.minStock).length

  // Anzahl eindeutiger Kategorien via Set
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
