import React, { useState } from 'react';
import { coursesData } from '../data/mockData';

const Courses: React.FC = (): React.ReactElement => {
  const [search, setSearch] = useState<string>();

  const filteredCourses = coursesData.filter((course) => {
    if (!search) return true;
    return course.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h1 className="page-title">Kurse</h1>

      <input
        type="text"
        placeholder="Kurs suchen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: '16px',
          padding: '8px 12px',
          width: '100%',
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          borderRadius: '6px',
          fontSize: '14px',
        }}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Kurstitel</th>
              <th>Datum</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{new Date(course.date).toLocaleDateString('de-DE')}</td>
                <td>
                  <span
                    className={
                      course.status === 'active' ? 'badge badge-active' : 'badge badge-inactive'
                    }
                  >
                    {course.status === 'active' ? 'Aktiv' : 'Inaktiv'}
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
