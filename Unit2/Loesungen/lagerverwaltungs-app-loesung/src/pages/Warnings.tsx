import React from 'react'
import { articles } from '../data/mockData.ts'

// Warnungsseite – zeigt nur Artikel, bei denen der Bestand den Mindestbestand unterschreitet
// Lösung: articles wird mit .filter() auf kritische Bestände reduziert
function Warnings(): React.ReactElement {
  // Nur Artikel mit Bestand <= Mindestbestand anzeigen
  const criticalArticles = articles.filter(a => a.stock <= a.minStock)

  return (
    <div>
      <h1 className="page-title">Warnungen</h1>
      <p className="page-subtitle">
        Artikel, bei denen der Bestand den Mindestbestand erreicht oder unterschritten hat
      </p>

      {/* Wenn keine kritischen Artikel vorhanden: Erfolgsmeldung anzeigen */}
      {criticalArticles.length === 0 ? (
        <div className="info-box info-box--success">
          ✅ Alle Artikel sind ausreichend bevorratet.
        </div>
      ) : (
        <>
          <div className="info-box info-box--warning">
            ⚠️ Es gibt <strong>{criticalArticles.length}</strong> Artikel mit kritischem Bestand.
          </div>

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
                  <th>Differenz</th>
                </tr>
              </thead>
              <tbody>
                {criticalArticles.map(article => (
                  <tr key={article.id} className="row-critical">
                    <td>{article.name}</td>
                    <td className="text-mono">{article.articleNumber}</td>
                    <td>{article.category}</td>
                    <td className="text-mono">{article.location}</td>
                    <td className="text-danger">{article.stock}</td>
                    <td>{article.minStock}</td>
                    {/* Differenz: negativer Wert zeigt an, um wie viel der Bestand zu tief ist */}
                    <td className="text-danger">
                      {article.stock - article.minStock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Warnings
