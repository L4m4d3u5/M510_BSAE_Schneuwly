import React from 'react'

// Einstellungsseite – Platzhalter für zukünftige Konfigurationsoptionen
function Settings(): React.ReactElement {
  return (
    <div>
      <h1 className="page-title">Einstellungen</h1>
      <p className="page-subtitle">Konfigurationsoptionen für die Lagerverwaltungs-App</p>

      <div className="settings-section">
        <h2 className="settings-section-title">Allgemein</h2>
        <p className="settings-placeholder">
          Hier können in einer späteren Version allgemeine Einstellungen wie
          Sprache, Zeitzone und Darstellungsoptionen konfiguriert werden.
        </p>
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Benachrichtigungen</h2>
        <p className="settings-placeholder">
          Hier können in einer späteren Version Schwellenwerte für Warnungen
          und Benachrichtigungsregeln festgelegt werden.
        </p>
      </div>
    </div>
  )
}

export default Settings
