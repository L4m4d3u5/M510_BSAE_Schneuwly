import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CourseStatus } from '../data/mockData';
import { useCourses } from '../hooks/useCourses';

const CourseDetail: React.FC = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>();
    const { courses } = useCourses();
    const course = courses.find((c) => c.id === Number(id));

    if (!course) {
        return (
            <div>
                <Link to="/courses" style={{ color: '#3498db', textDecoration: 'none' }}>
                    ← Zurück zu Kursen
                </Link>
                <h1 className="page-title" style={{ marginTop: '12px' }}>
                    Kurs nicht gefunden
                </h1>
                <p style={{ color: '#666' }}>
                    Es existiert kein Kurs mit der ID <strong>{id}</strong>.
                </p>
            </div>
        );
    }

    return (
        <div>
            <Link to="/courses" style={{ color: '#3498db', textDecoration: 'none' }}>
                ← Zurück zu Kursen
            </Link>
            <h1 className="page-title" style={{ marginTop: '12px' }}>
                {course.title}
            </h1>

            <div className="card" style={{ marginBottom: '30px' }}>
                <div className="card-content">
                    <p>
                        <strong>Datum:</strong>{' '}
                        {new Date(course.date).toLocaleDateString('de-DE')}
                    </p>
                    <p style={{ marginTop: '8px' }}>
                        <strong>Status:</strong>{' '}
                        <span
                            className={
                                course.status === CourseStatus.ACTIVE
                                    ? 'badge badge-active'
                                    : 'badge badge-inactive'
                            }
                        >
                            {course.status === CourseStatus.ACTIVE ? 'Aktiv' : 'Inaktiv'}
                        </span>
                    </p>
                    <p style={{ marginTop: '12px' }}>{course.description}</p>
                </div>
            </div>

            <h2
                style={{
                    marginBottom: '16px',
                    color: '#2c3e50',
                    fontSize: '20px',
                }}
            >
                Teilnehmende ({course.participants.length})
            </h2>

            {course.participants.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">👥</div>
                    Keine Teilnehmenden in diesem Kurs.
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>E-Mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {course.participants.map((participant) => (
                                <tr key={participant.id}>
                                    <td>{participant.name}</td>
                                    <td>{participant.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
