// Typdefinition eines Songs – spiegelt die Datenbanktabelle wider
export interface Song {
  id: number
  title: string
  artist: string
  album: string | null
  genre: string | null
  year: number | null
  duration: string | null
  favorite: number  // SQLite speichert Boolean als 0 (nein) oder 1 (ja)
}

// Typ für das Anlegen eines neuen Songs (ohne id und favorite)
export type NewSong = Omit<Song, 'id' | 'favorite'>
