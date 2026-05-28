// ─── Typdefinitionen für die Lagerverwaltungs-App ────────────────────────────

export type ArtikelStatus = 'ok' | 'warning' | 'critical'

export interface Artikel {
  id: number
  name: string
  articleNumber: string
  category: string
  location: string      // Lagerort, z.B. "A-02-05"
  stock: number         // Aktueller Bestand
  minStock: number      // Mindestbestand (Untergrenze)
  status: ArtikelStatus // Abgeleitet aus stock / minStock
}

// Hilfsfunktion: Status aus Bestand berechnen
// critical: stock <= minStock
// warning:  stock <= minStock * 1.5
// ok:       stock >  minStock * 1.5
export function berechneStatus(stock: number, minStock: number): ArtikelStatus {
  if (stock <= minStock)           return 'critical'
  if (stock <= minStock * 1.5)     return 'warning'
  return 'ok'
}
