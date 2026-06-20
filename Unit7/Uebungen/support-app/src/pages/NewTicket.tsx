import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, TicketPriority } from '../types/ticket';

interface FormData {
  title: string;
  description: string;
  priority: TicketPriority | '';
  category: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  priority?: string;
  category?: string;
}

export default function NewTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: '',
    category: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Titel ist erforderlich';
    if (!formData.description.trim()) newErrors.description = 'Beschreibung ist erforderlich';
    if (!formData.priority) newErrors.priority = 'Priorität ist erforderlich';
    if (!formData.category) newErrors.category = 'Kategorie ist erforderlich';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newTicket: Ticket = {
      id: `TK-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      title: formData.title,
      description: formData.description,
      priority: formData.priority as TicketPriority,
      category: formData.category,
      status: 'Offen',
      createdAt: new Date().toISOString().split('T')[0],
    };

    navigate('/tickets/confirmation', { state: { ticket: newTicket } });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page">
      <div className="page__header">
        <h1>Neues Ticket erstellen</h1>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Kurze Beschreibung des Problems"
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Beschreibung</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Beschreiben Sie das Problem genauer …"
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priorität</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={errors.priority ? 'input-error' : ''}
            >
              <option value="">Bitte wählen …</option>
              <option value="Niedrig">Niedrig</option>
              <option value="Mittel">Mittel</option>
              <option value="Hoch">Hoch</option>
            </select>
            {errors.priority && <span className="form-error">{errors.priority}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategorie</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'input-error' : ''}
            >
              <option value="">Bitte wählen …</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Netzwerk">Netzwerk</option>
              <option value="Zugang">Zugang</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Ticket erstellen
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/tickets')}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
