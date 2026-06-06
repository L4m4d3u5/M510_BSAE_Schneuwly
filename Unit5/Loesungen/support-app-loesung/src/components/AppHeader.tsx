/**
 * AppHeader – einheitlicher Header für alle Seiten.
 *
 * Props:
 *  - title: Seitentitel (wird rechts neben dem App-Namen angezeigt)
 *  - userName: Name des angemeldeten Benutzers
 *  - onLogout: Callback für den Abmelden-Button
 *  - nav: optionale Navigation links (Array von { label, onClick })
 */

interface NavItem {
  label: string;
  onClick: () => void;
}

interface AppHeaderProps {
  title: string;
  userName: string;
  onLogout: () => void;
  nav?: NavItem[];
}

export default function AppHeader({ title, userName, onLogout, nav = [] }: AppHeaderProps) {
  return (
    <header
      style={{
        backgroundColor: '#1565c0',
        color: 'white',
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexShrink: 0,
      }}
    >
      {/* App-Name */}
      <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>
        Support App
      </span>

      {/* Trennstrich + Seitentitel */}
      {title && (
        <>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ fontSize: '14px', opacity: 0.85 }}>{title}</span>
        </>
      )}

      {/* Navigation */}
      <nav style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
        {nav.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.8)',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '4px 10px',
              borderRadius: '4px',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Benutzername */}
      <span style={{ fontSize: '13px', opacity: 0.75, marginLeft: nav.length ? '8px' : 'auto' }}>
        {userName}
      </span>

      {/* Abmelden */}
      <button
        onClick={onLogout}
        style={{
          padding: '5px 14px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.35)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        Abmelden
      </button>
    </header>
  );
}
