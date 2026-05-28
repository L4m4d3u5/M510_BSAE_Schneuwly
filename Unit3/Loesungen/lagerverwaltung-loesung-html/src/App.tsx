import Produkttabelle from './components/Produkttabelle'

export default function App() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1.5rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', color: '#1565c0' }}>Lagerverwaltung</h1>
        <p style={{ color: '#666', marginTop: '0.2rem', fontSize: '0.9rem' }}>
          Lösung A – Reines HTML + TypeScript (ohne MUI)
        </p>
      </header>
      <Produkttabelle />
    </div>
  )
}
