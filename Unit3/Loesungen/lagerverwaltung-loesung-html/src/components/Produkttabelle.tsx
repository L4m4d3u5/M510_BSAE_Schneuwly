import { useState, useMemo } from 'react'
import { produkte, Produkt } from '../data/mockData'
import styles from './Produkttabelle.module.css'

// ─── Typen ───────────────────────────────────────────────────────────────────
type SortSpalte = keyof Produkt
type SortRichtung = 'asc' | 'desc'

const SPALTEN: { key: SortSpalte; label: string }[] = [
  { key: 'artikelnummer', label: 'Artikelnummer' },
  { key: 'name',          label: 'Name' },
  { key: 'kategorie',     label: 'Kategorie' },
  { key: 'lagerbestand',  label: 'Lagerbestand' },
  { key: 'mindestbestand',label: 'Mindestbestand' },
  { key: 'einheit',       label: 'Einheit' },
  { key: 'preis',         label: 'Preis (CHF)' },
  { key: 'lieferant',     label: 'Lieferant' },
  { key: 'standort',      label: 'Standort' },
]

export default function Produkttabelle() {
  // ─── State ───────────────────────────────────────────────────────────────
  const [seite, setSeite]                     = useState(1)
  const [zeilenProSeite, setZeilenProSeite]   = useState(25)
  const [sortSpalte, setSortSpalte]           = useState<SortSpalte>('id')
  const [sortRichtung, setSortRichtung]       = useState<SortRichtung>('asc')
  const [suche, setSuche]                     = useState('')

  // ─── Sortierung ──────────────────────────────────────────────────────────
  // Klick auf Spaltenheader: gleiche Spalte → Richtung umkehren, neue Spalte → aufsteigend
  function handleSort(spalte: SortSpalte) {
    if (spalte === sortSpalte) {
      setSortRichtung(r => r === 'asc' ? 'desc' : 'asc')
    } else {
      setSortSpalte(spalte)
      setSortRichtung('asc')
    }
    setSeite(1)
  }

  // ─── Gefilterte + sortierte Daten (nur neu berechnen wenn sich etwas ändert)
  const verarbeitet = useMemo(() => {
    const suchtext = suche.toLowerCase()

    // 1. Filtern
    const gefiltert = suchtext
      ? produkte.filter(p =>
          p.name.toLowerCase().includes(suchtext) ||
          p.artikelnummer.toLowerCase().includes(suchtext) ||
          p.kategorie.toLowerCase().includes(suchtext)
        )
      : produkte

    // 2. Sortieren
    return [...gefiltert].sort((a, b) => {
      const va = a[sortSpalte]
      const vb = b[sortSpalte]
      const cmp = typeof va === 'number' && typeof vb === 'number'
        ? va - vb
        : String(va).localeCompare(String(vb), 'de')
      return sortRichtung === 'asc' ? cmp : -cmp
    })
  }, [suche, sortSpalte, sortRichtung])

  // ─── Paginierung ─────────────────────────────────────────────────────────
  const gesamtSeiten  = Math.max(1, Math.ceil(verarbeitet.length / zeilenProSeite))
  // Seite zurücksetzen falls Filter Gesamtanzahl reduziert
  const aktuelleSeite = Math.min(seite, gesamtSeiten)
  const aktuelleZeilen = verarbeitet.slice(
    (aktuelleSeite - 1) * zeilenProSeite,
    aktuelleSeite       * zeilenProSeite
  )

  // Seitenrange für Nummernbuttons (max. 5 Seiten anzeigen)
  const seitenRange = Array.from({ length: Math.min(5, gesamtSeiten) }, (_, i) => {
    const start = Math.max(1, Math.min(aktuelleSeite - 2, gesamtSeiten - 4))
    return start + i
  })

  const unterbestand = verarbeitet.filter(p => p.lagerbestand < p.mindestbestand).length

  return (
    <div className={styles.wrapper}>
      {/* ── Toolbar ──────────────────────────────────────────── */}
      <div className={styles.toolbar}>
        <input
          className={styles.suche}
          type="search"
          placeholder="Suche nach Name, Artikelnummer oder Kategorie …"
          value={suche}
          onChange={e => { setSuche(e.target.value); setSeite(1) }}
        />
        <span className={styles.info}>
          {verarbeitet.length.toLocaleString('de-CH')} Produkte
          {unterbestand > 0 && (
            <span className={styles.warnung}> · ⚠ {unterbestand} unter Mindestbestand</span>
          )}
        </span>
      </div>

      {/* ── Tabelle ──────────────────────────────────────────── */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {SPALTEN.map(({ key, label }) => (
                <th
                  key={key}
                  className={styles.th}
                  onClick={() => handleSort(key)}
                >
                  {label}
                  {/* Sortierpfeil */}
                  <span className={styles.sortPfeil}>
                    {sortSpalte === key ? (sortRichtung === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aktuelleZeilen.length === 0 ? (
              <tr>
                <td colSpan={SPALTEN.length} className={styles.leer}>
                  Keine Produkte gefunden.
                </td>
              </tr>
            ) : (
              aktuelleZeilen.map(produkt => {
                // Zeile rot markieren wenn Lagerbestand unter Mindestbestand
                const istUnterbestand = produkt.lagerbestand < produkt.mindestbestand
                return (
                  <tr
                    key={produkt.id}
                    className={istUnterbestand ? styles.zeileFehler : styles.zeile}
                  >
                    <td>{produkt.artikelnummer}</td>
                    <td>{produkt.name}</td>
                    <td>
                      <span className={styles.badge}>{produkt.kategorie}</span>
                    </td>
                    <td className={styles.zahl}>
                      {produkt.lagerbestand.toLocaleString('de-CH')}
                    </td>
                    <td className={styles.zahl}>
                      {produkt.mindestbestand.toLocaleString('de-CH')}
                    </td>
                    <td>{produkt.einheit}</td>
                    <td className={styles.zahl}>
                      {produkt.preis.toFixed(2)}
                    </td>
                    <td>{produkt.lieferant}</td>
                    <td>
                      <code className={styles.standort}>{produkt.standort}</code>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Paginierung ──────────────────────────────────────── */}
      <div className={styles.paginierung}>
        {/* Zeilen pro Seite */}
        <div className={styles.pagLinks}>
          <label>
            Zeilen pro Seite:&nbsp;
            <select
              value={zeilenProSeite}
              onChange={e => { setZeilenProSeite(Number(e.target.value)); setSeite(1) }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>

        {/* Seitennavigation */}
        <div className={styles.pagMitte}>
          <button onClick={() => setSeite(1)}        disabled={aktuelleSeite === 1}>«</button>
          <button onClick={() => setSeite(s => s - 1)} disabled={aktuelleSeite === 1}>‹</button>

          {seitenRange.map(n => (
            <button
              key={n}
              onClick={() => setSeite(n)}
              className={n === aktuelleSeite ? styles.aktiv : ''}
            >
              {n}
            </button>
          ))}

          <button onClick={() => setSeite(s => s + 1)} disabled={aktuelleSeite === gesamtSeiten}>›</button>
          <button onClick={() => setSeite(gesamtSeiten)} disabled={aktuelleSeite === gesamtSeiten}>»</button>
        </div>

        {/* Seitenanzeige */}
        <div className={styles.pagRechts}>
          Seite {aktuelleSeite} von {gesamtSeiten}
        </div>
      </div>
    </div>
  )
}
