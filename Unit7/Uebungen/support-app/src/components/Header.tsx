import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">⚙</span>
        <span className="header__title">Support App</span>
      </div>
      <nav className="header__nav">
        <NavLink to="/" end className="header__nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/tickets" className="header__nav-link">
          Tickets
        </NavLink>
        <NavLink to="/tickets/new" className="header__nav-link">
          Neues Ticket
        </NavLink>
      </nav>
    </header>
  );
}
