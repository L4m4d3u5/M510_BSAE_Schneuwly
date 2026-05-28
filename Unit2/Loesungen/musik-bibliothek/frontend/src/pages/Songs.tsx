import React, { useState, useEffect } from 'react'
import type { Song, NewSong } from '../types/song.ts'
import { getSongs, createSong, deleteSong, toggleFavorite } from '../services/api.ts'

// Songs-Seite – Übersicht aller Songs mit Suche, Filter, Hinzufügen und Löschen
function Songs(): React.ReactElement {
  const [songs, setSongs]         = useState<Song[]>([])
  const [search, setSearch]       = useState('')
  const [filterGenre, setFilterGenre] = useState('')
  const [showForm, setShowForm]   = useState(false)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  // Alle verfügbaren Genres aus den geladenen Songs ableiten
  const allGenres = Array.from(
    new Set(songs.map(s => s.genre).filter((g): g is string => g !== null))
  ).sort()

  // Client-seitige Filterung – kombiniert Suche und Genre-Filter
  const filteredSongs = songs.filter(song => {
    const matchesSearch =
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = filterGenre === '' || song.genre === filterGenre
    return matchesSearch && matchesGenre
  })

  // Songs vom Backend laden (aufgerufen beim ersten Rendern)
  useEffect(() => {
    getSongs()
      .then(data => setSongs(data))
      .catch(() => setError('Backend nicht erreichbar. Bitte starte den Server.'))
      .finally(() => setLoading(false))
  }, [])

  // Song löschen – aktualisiert die lokale Liste ohne Reload
  async function handleDelete(id: number) {
    try {
      await deleteSong(id)
      setSongs(prev => prev.filter(s => s.id !== id))
    } catch {
      setError('Song konnte nicht gelöscht werden.')
    }
  }

  // Favorit-Status umschalten – aktualisiert den betroffenen Song in der Liste
  async function handleToggleFavorite(id: number) {
    try {
      const updated = await toggleFavorite(id)
      setSongs(prev => prev.map(s => s.id === updated.id ? updated : s))
    } catch {
      setError('Favorit konnte nicht aktualisiert werden.')
    }
  }

  // Neuen Song speichern – fügt ihn sortiert in die lokale Liste ein
  async function handleCreate(newSong: NewSong) {
    try {
      const created = await createSong(newSong)
      setSongs(prev =>
        [...prev, created].sort(
          (a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title)
        )
      )
      setShowForm(false)
    } catch {
      setError('Song konnte nicht gespeichert werden.')
    }
  }

  return (
    <div>
      {/* Seitenkopf mit Titel und Button zum Ein-/Ausblenden des Formulars */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Songs</h1>
          <p className="page-subtitle">Alle Songs in deiner Bibliothek</p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? '✕ Abbrechen' : '＋ Neuer Song'}
        </button>
      </div>

      {/* Formular für neuen Song – wird ein-/ausgeblendet */}
      {showForm && <SongForm onSubmit={handleCreate} />}

      {/* Fehlermeldung */}
      {error && (
        <div className="info-box info-box--error">
          ⚠️ {error}
          <button className="close-btn" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Suche und Genre-Filter */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Suche nach Titel oder Interpret…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={filterGenre}
          onChange={e => setFilterGenre(e.target.value)}
          className="filter-select"
        >
          <option value="">Alle Genres</option>
          {allGenres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <p className="result-count">{filteredSongs.length} Songs</p>

      {/* Tabelle */}
      {loading ? (
        <p className="empty-message">Wird geladen…</p>
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
              {filteredSongs.map(song => (
                <tr key={song.id}>
                  <td>
                    {/* Herz-Button zum Favorisieren / Entfavorisieren */}
                    <button
                      className="btn-icon"
                      onClick={() => handleToggleFavorite(song.id)}
                      title="Favorit umschalten"
                    >
                      {song.favorite === 1 ? '❤️' : '🤍'}
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
          {filteredSongs.length === 0 && (
            <p className="empty-message">Keine Songs gefunden.</p>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Formular-Komponente ────────────────────────────────────────────────────
// Wird innerhalb der Songs-Seite als ein-/ausblendbares Panel angezeigt

interface SongFormProps {
  onSubmit: (song: NewSong) => void
}

function SongForm({ onSubmit }: SongFormProps): React.ReactElement {
  const [form, setForm] = useState<NewSong>({
    title: '', artist: '', album: null, genre: null, year: null, duration: null,
  })

  // Typsichere Aktualisierung der Formularfelder
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => {
      const updated = { ...prev }
      if (name === 'title')    updated.title    = value
      if (name === 'artist')   updated.artist   = value
      if (name === 'album')    updated.album    = value || null
      if (name === 'genre')    updated.genre    = value || null
      if (name === 'year')     updated.year     = value ? Number(value) : null
      if (name === 'duration') updated.duration = value || null
      return updated
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="song-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Neuer Song</h2>
      <div className="form-grid">
        <label className="form-field">
          <span>Titel *</span>
          <input type="text" name="title" value={form.title}
            onChange={handleChange} placeholder="z.B. Bohemian Rhapsody" required />
        </label>
        <label className="form-field">
          <span>Interpret *</span>
          <input type="text" name="artist" value={form.artist}
            onChange={handleChange} placeholder="z.B. Queen" required />
        </label>
        <label className="form-field">
          <span>Album</span>
          <input type="text" name="album" value={form.album ?? ''}
            onChange={handleChange} placeholder="z.B. A Night at the Opera" />
        </label>
        <label className="form-field">
          <span>Genre</span>
          <input type="text" name="genre" value={form.genre ?? ''}
            onChange={handleChange} placeholder="z.B. Rock" />
        </label>
        <label className="form-field">
          <span>Jahr</span>
          <input type="number" name="year" value={form.year ?? ''}
            onChange={handleChange} placeholder="z.B. 1975" min={1900} max={2099} />
        </label>
        <label className="form-field">
          <span>Länge</span>
          <input type="text" name="duration" value={form.duration ?? ''}
            onChange={handleChange} placeholder="z.B. 3:45" />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary">Song speichern</button>
      </div>
    </form>
  )
}

export default Songs
