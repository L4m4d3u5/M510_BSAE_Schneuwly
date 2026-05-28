// API-Service – kapselt alle HTTP-Anfragen an das Backend
// Die Basis-URL /api wird vom Vite-Dev-Server auf http://localhost:4000 proxied
import type { Song, NewSong } from '../types/song.ts'

const BASE = '/api'

// Alle Songs laden
export async function getSongs(): Promise<Song[]> {
  const res = await fetch(`${BASE}/songs`)
  if (!res.ok) throw new Error('Fehler beim Laden der Songs')
  return res.json()
}

// Neuen Song anlegen – gibt den gespeicherten Song mit id zurück
export async function createSong(data: NewSong): Promise<Song> {
  const res = await fetch(`${BASE}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Fehler beim Speichern des Songs')
  return res.json()
}

// Song anhand der ID löschen
export async function deleteSong(id: number): Promise<void> {
  const res = await fetch(`${BASE}/songs/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Fehler beim Löschen des Songs')
}

// Favorit-Status eines Songs umschalten – gibt den aktualisierten Song zurück
export async function toggleFavorite(id: number): Promise<Song> {
  const res = await fetch(`${BASE}/songs/${id}/favorite`, { method: 'PATCH' })
  if (!res.ok) throw new Error('Fehler beim Aktualisieren des Favoriten')
  return res.json()
}
