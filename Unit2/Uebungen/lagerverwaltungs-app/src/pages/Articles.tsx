import React from 'react'
// TODO: Import der Artikeldaten einkommentieren, sobald die Tabelle implementiert wird
// import { articles } from '../data/mockData'

// Artikelseite - zeigt alle Artikel in einer Tabelle an
function Articles(): React.ReactElement {
  return (
    <div>
      <h1 className="page-title">Artikel</h1>
      <p className="page-subtitle">Alle Lagerartikel im Ueberblick</p>

      {/* TODO: Tabelle mit allen Artikeln ausgeben */}
      {/* Tipp: articles aus mockData importieren und mit .map() ueber die Liste iterieren */}
      {/* Felder: name, articleNumber, category, location, stock, minStock, status */}

      <p style={{ color: '#94a3b8' }}>Artikelliste noch nicht implementiert.</p>
    </div>
  )
}

export default Articles
