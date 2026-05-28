import React, { useState, useEffect } from 'react'
import { getSongs } from '../services/api.ts'
import type { Song } from '../types/song.ts'

// Dashboard – Übersicht der Musikbibliothek mit Kennzahlen
function Dashboard(): React.ReactElement {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Songs beim ersten Laden der Seite abrufen
  useEffect(() => {
    getSongs()
      .then(data => setSongs(data))
      .catch(() => setError('Backend nicht erreichbar. Bitte starte den Server.'))
      .finally(() => setLoading(false))
  }, [])

  // Kennzahlen aus den geladenen Songs berechnen
  const totalSongs     = songs.length
  const totalFavorites = songs.filter(s => s.favorite === 1).length
  const totalGenres    = new Set(songs.map(s => s.genre).filter(Boolean)).size

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Übersicht deiner Musikbibliothek</p>

      {error && <div className="info-box info-box--error">⚠️ {error}</div>}

      {loading ? (
        <p className="empty-message">Wird geladen…</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎵</div>
            <div className="stat-value">{totalSongs}</div>
            <div className="stat-label">Songs gesamt</div>
          </div>

          <div className="stat-card stat-card--highlight">
            <div className="stat-icon">❤️</div>
            <div className="stat-value">{totalFavorites}</div>
            <div className="stat-label">Favoriten</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎸</div>
            <div className="stat-value">{totalGenres}</div>
            <div className="stat-label">Genres</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
