import { useLocation, useNavigate } from 'react-router-dom';
import { Appointment } from '../types/appointment';

interface LocationState {
  appointment: Appointment;
}

export default function AppointmentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state?.appointment) {
    return (
      <div className="page">
        <p>Kein Termin gefunden.</p>
        <button className="btn btn-action" onClick={() => navigate('/termine')}>
          Zur Übersicht
        </button>
      </div>
    );
  }

  const { appointment } = state;

  return (
    <div className="page">
      <div className="confirmation">
        {/* UX-Schwäche: Bestätigung wirkt etwas nüchtern und klein –
            Nutzer erkennt nicht auf den ersten Blick, ob der Termin wirklich
            gespeichert wurde */}
        <h1 className="confirmation__heading">Termin gespeichert</h1>
        <p className="confirmation__message">
          Der Termin wurde erfasst und wird bearbeitet.
        </p>

        <div className="confirmation__details">
          <div className="confirmation__row">
            <span className="confirmation__key">Termin-ID</span>
            <span className="confirmation__value">{appointment.id}</span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Kunde</span>
            <span className="confirmation__value">{appointment.customerName}</span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Fahrzeug</span>
            <span className="confirmation__value">{appointment.vehicleModel}</span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Service</span>
            <span className="confirmation__value">{appointment.serviceType}</span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Datum / Uhrzeit</span>
            <span className="confirmation__value">
              {appointment.date} um {appointment.time} Uhr
            </span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Status</span>
            <span className="confirmation__value">
              <span className="badge badge--pending">{appointment.status}</span>
            </span>
          </div>
        </div>

        {/* UX-Schwäche: Nur ein Textlink zurück zur Übersicht –
            keine klare Hauptaktion, kein prominenter Button */}
        <p className="confirmation__back">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/termine'); }}>
            ← Zurück zur Terminübersicht
          </a>
        </p>
      </div>
    </div>
  );
}
