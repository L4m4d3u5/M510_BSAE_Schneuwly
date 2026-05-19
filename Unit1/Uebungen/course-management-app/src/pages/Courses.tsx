import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { coursesData, CourseStatus } from '../data/mockData';

const Courses: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>();
  const [statusFilter, setStatusFilter] = useState<CourseStatus | null>(null);

  const cycleStatus = () => {
    setStatusFilter((prev) =>
      prev === null
        ? CourseStatus.ACTIVE
        : prev === CourseStatus.ACTIVE
          ? CourseStatus.INACTIVE
          : null
    );
  };

  const filteredCourses = coursesData.filter((course) => {
    if (search && !course.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== null && course.status !== statusFilter) return false;
    return true;
  });

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
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Kurstitel</th>
              <th>Anzahl Teilnehmer</th>
              <th>Datum</th>
              <th>Status</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*<div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px', borderLeft: '4px solid #3498db' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>💡 Erweiterungsmöglichkeiten:</h3>
        <ul style={{ color: '#555', lineHeight: '1.8', marginLeft: '20px' }}>
          <li>Suchfunktion implementieren</li>
          <li>Filterfunktion nach Status</li>
          <li>Detailansicht für jeden Kurs</li>
          <li>Anzahl Teilnehmende pro Kurs anzeigen</li>
          <li>Kurse hinzufügen/bearbeiten/löschen</li>
        </ul>
      </div>*/}
    </div>
  );
};

export default Courses;
