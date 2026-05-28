import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseStatus } from '../data/mockData';
import { useCourses } from '../hooks/useCourses';

const EMPTY_FORM = { title: '', date: '', status: CourseStatus.ACTIVE, description: '' };

const Courses: React.FC = (): React.ReactElement => {
    const navigate = useNavigate();
    const { courses, addCourse, deleteCourse, nextId } = useCourses();

    const [search, setSearch] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<CourseStatus | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<{ title?: string; date?: string }>({});

    const cycleStatus = () => {
        setStatusFilter((prev) =>
            prev === null
                ? CourseStatus.ACTIVE
                : prev === CourseStatus.ACTIVE
                  ? CourseStatus.INACTIVE
                  : null
        );
    };

    const filteredCourses = courses.filter((course) => {
        if (search && !course.title.toLowerCase().includes(search.toLowerCase())) return false;
        if (statusFilter !== null && course.status !== statusFilter) return false;
        return true;
    });

    const openModal = () => {
        setForm(EMPTY_FORM);
        setErrors({});
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm(EMPTY_FORM);
        setErrors({});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { title?: string; date?: string } = {};
        if (!form.title.trim()) newErrors.title = 'Titel ist erforderlich';
        if (!form.date) newErrors.date = 'Datum ist erforderlich';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        addCourse({
            id: nextId(),
            title: form.title.trim(),
            date: form.date,
            status: form.status,
            description: form.description.trim(),
            participants: [],
        });
        closeModal();
    };

    return (
        <div>
            <h1 className="page-title">Kurse</h1>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input
                    type="text"
                    placeholder="Kurs suchen..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        boxSizing: 'border-box',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                    }}
                />
                <button
                    onClick={cycleStatus}
                    style={{
                        padding: '8px 16px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        backgroundColor: statusFilter !== null ? '#3498db' : undefined,
                        color: statusFilter !== null ? '#fff' : undefined,
                    }}
                >
                    {statusFilter === null
                        ? 'nach status filtern'
                        : statusFilter === CourseStatus.ACTIVE
                          ? 'Aktiv'
                          : 'Inaktiv'}
                </button>
                <button className="btn-primary" onClick={openModal}>
                    + Neuen Kurs
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Kurstitel</th>
                            <th>Anzahl Teilnehmer</th>
                            <th>Datum</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.map((course) => (
                            <tr
                                key={course.id}
                                onClick={() => navigate(`/courses/${course.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{course.title}</td>
                                <td>{course.participants.length}</td>
                                <td>{new Date(course.date).toLocaleDateString('de-DE')}</td>
                                <td>
                                    <span
                                        className={
                                            course.status === CourseStatus.ACTIVE
                                                ? 'badge badge-active'
                                                : 'badge badge-inactive'
                                        }
                                    >
                                        {course.status === CourseStatus.ACTIVE ? 'Aktiv' : 'Inaktiv'}
                                    </span>
                                </td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    {confirmDeleteId === course.id ? (
                                        <span style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px' }}>
                                            <span style={{ color: '#555' }}>Wirklich?</span>
                                            <button
                                                className="btn-danger"
                                                onClick={() => {
                                                    deleteCourse(course.id);
                                                    setConfirmDeleteId(null);
                                                }}
                                            >
                                                Ja
                                            </button>
                                            <button
                                                className="btn-secondary"
                                                style={{ padding: '4px 10px', fontSize: '13px' }}
                                                onClick={() => setConfirmDeleteId(null)}
                                            >
                                                Nein
                                            </button>
                                        </span>
                                    ) : (
                                        <button
                                            className="btn-danger"
                                            onClick={() => setConfirmDeleteId(course.id)}
                                        >
                                            Löschen
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">Neuen Kurs erstellen</span>
                            <button
                                onClick={closeModal}
                                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-group">
                                <label className="form-label">Titel</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="Kurstitel eingeben"
                                />
                                {errors.title && <p className="form-error">{errors.title}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Datum</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                />
                                {errors.date && <p className="form-error">{errors.date}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-input"
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({ ...form, status: e.target.value as CourseStatus })
                                    }
                                >
                                    <option value={CourseStatus.ACTIVE}>Aktiv</option>
                                    <option value={CourseStatus.INACTIVE}>Inaktiv</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Beschreibung</label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Kursbeschreibung (optional)"
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={closeModal}>
                                    Abbrechen
                                </button>
                                <button type="submit" className="btn-primary">
                                    Kurs erstellen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
