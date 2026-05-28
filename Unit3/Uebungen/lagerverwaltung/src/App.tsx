import { produkte } from './data/mockData'

export default function App() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#1565c0' }}>Lagerverwaltung</h1>
        <p style={{ color: '#666', marginTop: '0.25rem' }}>
          {produkte.length} Produkte geladen · Übung: Tabelle mit Paginierung
        </p>
      </header>

      <main>
        {/*
         * ═══════════════════════════════════════════════════════════════════
         *  TODO: Implementiere hier eine Tabelle mit Paginierung
         * ═══════════════════════════════════════════════════════════════════
         *
         * Die Produktdaten stehen in der Variable `produkte` zur Verfügung.
         * Jedes Produkt hat folgende Felder:
         *
         *   id             – Eindeutige ID (number)
         *   artikelnummer  – z.B. "ELE-00001" (string)
         *   name           – Produktname (string)
         *   kategorie      – z.B. "Elektronik" (string)
         *   lagerbestand   – Aktuelle Menge (number)
         *   mindestbestand – Mindestmenge (number)
         *   einheit        – z.B. "Stk", "Liter", "Meter" (string)
         *   preis          – Preis in CHF (number)
         *   lieferant      – Lieferantenname (string)
         *   standort       – Regal-Standort z.B. "A-01-03" (string)
         *
         * Anforderungen (Details im README):
         *   1. Alle Produkte in einer Tabelle anzeigen
         *   2. Paginierung: wählbar 10 / 25 / 50 Zeilen pro Seite
         *   3. Seitennavigation (Vor / Zurück / Seitenzahl)
         *   4. Zeilen mit lagerbestand < mindestbestand farblich markieren
         *
         * Du kannst eine neue Komponente erstellen (z.B. src/components/Produkttabelle.tsx)
         * und sie hier einbinden.
         */}
        <div
          style={{
            background: '#fff3cd',
            border: '2px dashed #ffc107',
            borderRadius: 8,
            padding: '2rem',
            textAlign: 'center',
            color: '#856404',
          }}
        >
          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            👉 Implementiere hier deine Tabelle mit Paginierung
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Lies zuerst die Aufgabenstellung im <code>README.md</code>
          </p>
        </div>
      </main>
    </div>
  )
}
