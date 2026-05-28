import React, { useState, useEffect } from 'react'
import type { Song } from '../types/song.ts'
import { getSongs, deleteSong, toggleFavorite } from '../services/api.ts'

// Favoriten-Seite – zeigt nur Songs, die als Favorit markiert sind
function Favorites(): React.ReactElement {
  const [songs, setSongs]     = useState<Song[]>([])
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  // Nur Songs mit favorite === 1 anzeigen, danach client-seitig nach Suche filtern
  const favorites = songs
    .filter(s => s.favorite === 1)
    .filter(s =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase())
    )

  useEffect(() => {
    getSongs()
      .then(data => setSongs(data))
      .catch(() => setError('Backend nicht erreichbar. Bitte starte den Server.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleToggleFavorite(id: number) {
    try {
      const updated = await toggleFavorite(id)
      setSongs(prev => prev.map(s => s.id === updated.id ? updated : s))
    } catch {
      setError('Favorit konnte nicht aktualisiert werden.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteSong(id)
      setSongs(prev => prev.filter(s => s.id !== id))
    } catch {
      setError('Song konnte nicht gelöscht werden.')
    }
  }

  return (
    <div>
      <h1 className="page-title">Favoriten</h1>
      <p className="page-subtitle">Deine favorisierten Songs</p>

      {error && (
        <div className="info-box info-box--error">
          ⚠️ {error}
          <button className="close-btn" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Suche innerhalb der Favoriten */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Suche nach Titel oder Interpret…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <p className="result-count">{favorites.length} Favoriten</p>

      {loading ? (
        <p className="empty-message">Wird geladen…</p>
      ) : favorites.length === 0 ? (
        <div className="info-box info-box--info">
          Noch keine Favoriten vorhanden. Markiere Songs auf der Songs-Seite mit ❤️.
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>♥</th>
                <th>Titel</th>
                <th>Interpret</th>
                <th>Album</th>
                <th>Genre</th>
                <th>Jahr</th>
                <th>Länge</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {favorites.map(song => (
                <tr key={song.id}>
                  <td>
                    <button
                      className="btn-icon"
                      onClick={() => handleToggleFavorite(song.id)}
                      title="Favorit entfernen"
                    >
                      ❤️
                    </button>
                  </td>
                  <td className="text-strong">{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.album ?? '—'}</td>
                  <td>{song.genre ?? '—'}</td>
                  <td>{song.year ?? '—'}</td>
                  <td className="text-mono">{song.duration ?? '—'}</td>
                  <td>
                    <button
                      className="btn-icon btn-icon--delete"
                      onClick={() => handleDelete(song.id)}
                      title="Song löschen"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Favorites
