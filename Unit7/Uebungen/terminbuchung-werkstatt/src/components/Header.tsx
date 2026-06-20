import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">🔧</span>
        <span className="header__title">Werkstatt Termine</span>
      </div>
      {/* UX-Schwäche: kein deutliches Active-Highlighting – aktuell aktive Seite
          ist nur subtil erkennbar */}
      <nav className="header__nav">
        <NavLink to="/" end className="header__nav-link">
          Übersicht
        </NavLink>
        <NavLink to="/termine" className="header__nav-link">
          Termine
        </NavLink>
      </nav>
    </header>
  );
}
