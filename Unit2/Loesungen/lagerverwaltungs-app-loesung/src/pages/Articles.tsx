import React, { useState } from 'react'
import { articles, Article } from '../data/mockData.ts'

// Hilfsfunktion: Gibt alle eindeutigen Werte eines Feldes zurück
// Wird verwendet, um die Dropdown-Optionen dynamisch zu befüllen
function getUniqueValues(field: keyof Article): string[] {
  const values = articles.map(a => String(a[field]))
  return Array.from(new Set(values)).sort()
}

// Artikelseite – zeigt alle Artikel mit Such- und Filterfunktion
// Lösung: Suche, drei kombinierbare Filter und visuelle Hervorhebung kritischer Artikel
function Articles(): React.ReactElement {
  // --- State für Suche und Filter ---

  // Suchbegriff: filtert den Artikelnamen (case-insensitive)
  const [searchText, setSearchText] = useState('')

  // Aktive Filter (leerer String = kein Filter aktiv)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterLocation, setFilterLocation] = useState('')

  // --- Optionen für die Dropdown-Filter ---
  const categories = getUniqueValues('category')
  const statuses = getUniqueValues('status')
  const locations = getUniqueValues('location')

  // --- Gefilterte Liste berechnen ---
  // Alle aktiven Kriterien werden mit && verknüpft (UND-Verknüpfung)
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.name
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const matchesCategory =
      filterCategory === '' || article.category === filterCategory

    const matchesStatus =
      filterStatus === '' || article.status === filterStatus

    const matchesLocation =
      filterLocation === '' || article.location === filterLocation

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation
  })

  return (
    <div>
      <h1 className="page-title">Artikel</h1>
      <p className="page-subtitle">Alle Lagerartikel im Überblick</p>

      {/* Such- und Filterbereich */}
      <div className="filter-bar">
        {/* Freitextsuche nach Artikelname */}
        <input
          type="text"
          placeholder="Artikel suchen..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="search-input"
        />

        {/* Dropdown-Filter: Kategorie */}
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">Alle Kategorien</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Dropdown-Filter: Status */}
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="">Alle Status</option>
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Dropdown-Filter: Lagerort */}
        <select
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          className="filter-select"
        >
          <option value="">Alle Lagerorte</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Anzahl der angezeigten Treffer */}
      <p className="result-count">
        {filteredArticles.length} von {articles.length} Artikeln
      </p>

      {/* Artikeltabelle */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artikelnummer</th>
              <th>Kategorie</th>
              <th>Lagerort</th>
              <th>Bestand</th>
              <th>Mindestbestand</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map(article => {
              // Kritisch = Bestand hat den Mindestbestand erreicht oder unterschritten
              const isCritical = article.stock <= article.minStock

              return (
                // Kritische Zeilen erhalten eine rote Hintergrundfarbe (via CSS-Klasse)
                <tr key={article.id} className={isCritical ? 'row-critical' : ''}>
                  <td>{article.name}</td>
                  <td className="text-mono">{article.articleNumber}</td>
                  <td>{article.category}</td>
                  <td className="text-mono">{article.location}</td>
                  <td className={isCritical ? 'text-danger' : ''}>{article.stock}</td>
                  <td>{article.minStock}</td>
                  <td>
                    {/* Status-Badge mit dynamischer CSS-Klasse (aktiv / kritisch) */}
                    <span className={`status-badge status-badge--${article.status.toLowerCase()}`}>
                      {article.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredArticles.length === 0 && (
          <p className="empty-message">Keine Artikel gefunden.</p>
        )}
      </div>
    </div>
  )
}

export default Articles
