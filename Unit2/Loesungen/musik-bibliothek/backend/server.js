const express = require('express')
const cors = require('cors')
const songsRouter = require('./routes/songs')

const app = express()
const PORT = 4000

// Middleware
app.use(cors())           // Erlaubt Anfragen vom Vite-Dev-Server (localhost:3000)
app.use(express.json())   // JSON-Request-Body automatisch parsen

// Routen
app.use('/api/songs', songsRouter)

// Server starten
app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`)
})
