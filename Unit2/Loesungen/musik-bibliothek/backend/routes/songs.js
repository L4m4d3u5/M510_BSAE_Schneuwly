const express = require('express')
const router  = express.Router()
const { readData, writeData } = require('../database')

// GET /api/songs – alle Songs abrufen
// Optional: ?search=... filtert Titel und Interpret
// Optional: ?genre=...  filtert nach Genre
// Optional: ?favorite=true zeigt nur Favoriten
router.get('/', (req, res) => {
  const { search, genre, favorite } = req.query
  let { songs } = readData()

  if (search) {
    const s = search.toLowerCase()
    songs = songs.filter(song =>
      song.title.toLowerCase().includes(s) ||
      song.artist.toLowerCase().includes(s)
    )
  }

  if (genre) {
    songs = songs.filter(song => song.genre === genre)
  }

  if (favorite === 'true') {
    songs = songs.filter(song => song.favorite === 1)
  }

  // Alphabetisch nach Interpret, dann nach Titel sortieren
  songs.sort((a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title))

  res.json(songs)
})

// POST /api/songs – neuen Song anlegen
router.post('/', (req, res) => {
  const { title, artist, album, genre, year, duration } = req.body

  if (!title || !artist) {
    return res.status(400).json({ error: 'Titel und Interpret sind Pflichtfelder.' })
  }

  const data   = readData()
  const newSong = {
    id:       data.nextId++,
    title,
    artist,
    album:    album    || null,
    genre:    genre    || null,
    year:     year     ? Number(year) : null,
    duration: duration || null,
    favorite: 0,
  }

  data.songs.push(newSong)
  writeData(data)
  res.status(201).json(newSong)
})

// DELETE /api/songs/:id – Song löschen
router.delete('/:id', (req, res) => {
  const id   = Number(req.params.id)
  const data = readData()
  const idx  = data.songs.findIndex(s => s.id === id)

  if (idx === -1) {
    return res.status(404).json({ error: 'Song nicht gefunden.' })
  }

  data.songs.splice(idx, 1)
  writeData(data)
  res.status(204).send()
})

// PATCH /api/songs/:id/favorite – Favorit-Status umschalten (0 → 1 oder 1 → 0)
router.patch('/:id/favorite', (req, res) => {
  const id   = Number(req.params.id)
  const data = readData()
  const song = data.songs.find(s => s.id === id)

  if (!song) {
    return res.status(404).json({ error: 'Song nicht gefunden.' })
  }

  song.favorite = song.favorite === 0 ? 1 : 0
  writeData(data)
  res.json(song)
})

module.exports = router
