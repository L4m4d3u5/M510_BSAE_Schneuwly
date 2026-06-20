import { Link } from 'react-router-dom';
import { mockAppointments } from '../data/mockAppointments';
import AppointmentCard from '../components/AppointmentCard';

export default function AppointmentList() {
  return (
    <div className="page">
      {/* UX-Schwäche: Überschrift und „Neuen Termin"-Button sind nicht klar getrennt –
          der Button erscheint erst nach der Liste, was dazu führt dass er leicht übersehen wird */}
      <h1>Termine</h1>
      <p className="page__subtitle">{mockAppointments.length} Termine vorhanden</p>

      <div className="appointment-list">
        {mockAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>

      {/* UX-Schwäche: Button am Ende der Liste – Nutzer scrollen an ihm vorbei */}
      <div className="list-bottom-action">
        <Link to="/termine/neu" className="btn btn-plain">
          Neuen Termin buchen
        </Link>
      </div>
    </div>
  );
}
