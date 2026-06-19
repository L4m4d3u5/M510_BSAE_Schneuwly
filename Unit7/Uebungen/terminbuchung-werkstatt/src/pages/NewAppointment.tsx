import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appointment, ServiceType } from '../types/appointment';

interface FormData {
  customerName: string;
  vehicleModel: string;
  serviceType: ServiceType | '';
  date: string;
  time: string;
  note: string;
}

interface FormErrors {
  customerName?: string;
  vehicleModel?: string;
  serviceType?: string;
  date?: string;
  time?: string;
}

export default function NewAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    vehicleModel: '',
    serviceType: '',
    date: '',
    time: '',
    note: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Name ist erforderlich';
    if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Fahrzeugmodell ist erforderlich';
    if (!formData.serviceType) newErrors.serviceType = 'Serviceart ist erforderlich';
    if (!formData.date) newErrors.date = 'Datum ist erforderlich';
    if (!formData.time) newErrors.time = 'Uhrzeit ist erforderlich';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newAppointment: Appointment = {
      id: `T-${String(Math.floor(Math.random() * 900) + 100)}`,
      customerName: formData.customerName,
      vehicleModel: formData.vehicleModel,
      serviceType: formData.serviceType as ServiceType,
      date: formData.date,
      time: formData.time,
      note: formData.note,
      status: 'Ausstehend',
      createdAt: new Date().toISOString().split('T')[0],
    };

    navigate('/termine/bestaetigung', { state: { appointment: newAppointment } });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page">
      <h1>Termin buchen</h1>

      {/* UX-Schwäche: Kein einleitender Hinweistext erklärt,
          welche Angaben benötigt werden oder wie das Formular funktioniert */}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          {/* UX-Schwäche: Kein Asterisk (*) für Pflichtfelder */}
          <label htmlFor="customerName">Name</label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Vor- und Nachname"
            className={errors.customerName ? 'input-error' : ''}
          />
          {errors.customerName && <span className="form-error">{errors.customerName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="vehicleModel">Fahrzeugmodell</label>
          <input
            id="vehicleModel"
            name="vehicleModel"
            type="text"
            value={formData.vehicleModel}
            onChange={handleChange}
            placeholder="z. B. VW Golf, BMW 3er"
            className={errors.vehicleModel ? 'input-error' : ''}
          />
          {errors.vehicleModel && <span className="form-error">{errors.vehicleModel}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="serviceType">Serviceart</label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className={errors.serviceType ? 'input-error' : ''}
          >
            <option value="">Auswählen …</option>
            <option value="Ölwechsel">Ölwechsel</option>
            <option value="Reifenwechsel">Reifenwechsel</option>
            <option value="Service">Service</option>
            <option value="Diagnose">Diagnose</option>
          </select>
          {errors.serviceType && <span className="form-error">{errors.serviceType}</span>}
        </div>

        {/* UX-Schwäche: Datum und Uhrzeit stehen in zwei getrennten Spalten ohne
            erklärenden Kontext – Reihenfolge und Format sind nicht selbsterklärend */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Datum</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'input-error' : ''}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">Uhrzeit</label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className={errors.time ? 'input-error' : ''}
            />
            {errors.time && <span className="form-error">{errors.time}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="note">Bemerkung</label>
          <textarea
            id="note"
            name="note"
            rows={3}
            value={formData.note}
            onChange={handleChange}
            placeholder="Optionale Hinweise für die Werkstatt …"
          />
        </div>

        {/* UX-Schwäche: Hauptaktion „Buchen" und Nebenaktion „Abbrechen"
            sind optisch kaum unterscheidbar – gleiche Grösse, ähnliches Gewicht */}
        <div className="form-actions">
          <button type="submit" className="btn btn-action">
            Buchen
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => navigate('/termine')}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
