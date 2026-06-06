/**
 * AppFooter – einheitlicher Footer für alle Seiten.
 *
 * Props:
 *  - pageLabel: optionaler Text links (z. B. Seitenname)
 *  - userName: Name des angemeldeten Benutzers (rechts)
 */

interface AppFooterProps {
  pageLabel?: string;
  userName?: string;
}

export default function AppFooter({ pageLabel, userName }: AppFooterProps) {
  return (
    <footer
      style={{
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #e0e0e0',
        padding: '10px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        color: '#888888',
        flexShrink: 0,
      }}
    >
      <span>{pageLabel ?? 'Support App'}</span>
      <span>Support App v1.0</span>
      <span>{userName ?? ''}</span>
    </footer>
  );
}
