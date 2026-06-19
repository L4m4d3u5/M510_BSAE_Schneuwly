import { Appointment } from '../types/appointment';

interface AppointmentCardProps {
  appointment: Appointment;
}

const statusClass: Record<Appointment['status'], string> = {
  Bestätigt: 'badge badge--confirmed',
  Gebucht: 'badge badge--booked',
  Ausstehend: 'badge badge--pending',
};

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className="appointment-card">
      <div className="appointment-card__header">
        <span className="appointment-card__id">{appointment.id}</span>
        <span className={statusClass[appointment.status]}>{appointment.status}</span>
      </div>
      <h3 className="appointment-card__name">{appointment.customerName}</h3>
      <div className="appointment-card__meta">
        {/* UX-Schwäche: Datum und Uhrzeit stehen nebeneinander ohne klare Beschriftung */}
        <span>{appointment.date}</span>
        <span>{appointment.time} Uhr</span>
        <span>{appointment.vehicleModel}</span>
        <span>{appointment.serviceType}</span>
      </div>
      {appointment.note && (
        <p className="appointment-card__note">Bemerkung: {appointment.note}</p>
      )}
    </div>
  );
}
