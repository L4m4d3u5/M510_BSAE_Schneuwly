// Datenspeicher – liest und schreibt Songs als JSON-Datei
// Dies ersetzt eine echte Datenbank und ist ideal für Lernprojekte ohne native Dependencies
const fs   = require('fs')
const path = require('path')

const FILE_PATH = path.join(__dirname, 'songs.json')

// Beispieldaten – werden beim ersten Start als songs.json gespeichert
const SEED_SONGS = [
  { id: 1,  title: 'Bohemian Rhapsody',       artist: 'Queen',          album: 'A Night at the Opera', genre: 'Rock',       year: 1975, duration: '5:55', favorite: 1 },
  { id: 2,  title: 'Hotel California',         artist: 'Eagles',          album: 'Hotel California',     genre: 'Rock',       year: 1977, duration: '6:31', favorite: 0 },
  { id: 3,  title: 'Billie Jean',              artist: 'Michael Jackson', album: 'Thriller',             genre: 'Pop',        year: 1982, duration: '4:54', favorite: 1 },
  { id: 4,  title: 'Smells Like Teen Spirit',  artist: 'Nirvana',         album: 'Nevermind',            genre: 'Grunge',     year: 1991, duration: '5:01', favorite: 0 },
  { id: 5,  title: 'Lose Yourself',            artist: 'Eminem',          album: '8 Mile Soundtrack',    genre: 'Hip-Hop',    year: 2002, duration: '5:26', favorite: 1 },
  { id: 6,  title: 'Rolling in the Deep',      artist: 'Adele',           album: '21',                   genre: 'Soul',       year: 2010, duration: '3:48', favorite: 0 },
  { id: 7,  title: 'Blinding Lights',          artist: 'The Weeknd',      album: 'After Hours',          genre: 'Synth-Pop',  year: 2019, duration: '3:20', favorite: 1 },
  { id: 8,  title: 'Shape of You',             artist: 'Ed Sheeran',      album: 'Divide',               genre: 'Pop',        year: 2017, duration: '3:54', favorite: 0 },
  { id: 9,  title: 'Stairway to Heaven',       artist: 'Led Zeppelin',    album: 'Led Zeppelin IV',      genre: 'Rock',       year: 1971, duration: '8:02', favorite: 0 },
  { id: 10, title: 'Superstition',             artist: 'Stevie Wonder',   album: 'Talking Book',         genre: 'Funk',       year: 1972, duration: '4:04', favorite: 1 },
  { id: 11, title: 'One More Time',            artist: 'Daft Punk',       album: 'Discovery',            genre: 'Electronic', year: 2000, duration: '5:20', favorite: 0 },
  { id: 12, title: 'Mr. Brightside',           artist: 'The Killers',     album: 'Hot Fuss',             genre: 'Indie Rock', year: 2003, duration: '3:42', favorite: 1 },
]

// Alle Songs aus der JSON-Datei lesen
// Beim ersten Aufruf wird die Datei mit den Beispieldaten erstellt
function readData() {
  if (!fs.existsSync(FILE_PATH)) {
    const initial = { nextId: SEED_SONGS.length + 1, songs: SEED_SONGS }
    fs.writeFileSync(FILE_PATH, JSON.stringify(initial, null, 2))
    console.log('songs.json wurde mit Beispieldaten erstellt.')
    return initial
  }
  return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'))
}

// Aktuelle Daten in die JSON-Datei zurückschreiben
function writeData(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2))
}

module.exports = { readData, writeData }
