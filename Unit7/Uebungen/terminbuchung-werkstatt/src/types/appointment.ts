export type AppointmentStatus = 'Gebucht' | 'Bestätigt' | 'Ausstehend';
export type ServiceType = 'Ölwechsel' | 'Reifenwechsel' | 'Service' | 'Diagnose';

export interface Appointment {
  id: string;
  customerName: string;
  vehicleModel: string;
  serviceType: ServiceType;
  date: string;
  time: string;
  status: AppointmentStatus;
  note: string;
  createdAt: string;
}
