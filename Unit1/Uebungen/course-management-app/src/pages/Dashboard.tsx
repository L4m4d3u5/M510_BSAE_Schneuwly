import React from 'react';
import { coursesData, participantsData } from '../data/mockData';

function Dashboard(): React.ReactElement {
  // Berechne Statistiken
  const totalCourses = coursesData.length;
  const activeCourses = coursesData.filter((c) => c.status === 'active').length;
  const totalParticipants = participantsData.length;

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="dashboard-stats">
        <div className="stat-box">
          <div className="stat-number">{totalCourses}</div>
          <div className="stat-label">Gesamtkurse</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{activeCourses}</div>
          <div className="stat-label">Aktive Kurse</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{totalParticipants}</div>
          <div className="stat-label">Teilnehmende</div>
        </div>
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '20px', color: '#2c3e50', fontSize: '20px' }}>
        Aktuelle Kurse
      </h2>

      <div className="cards-container">
        {coursesData
          .filter((course) => course.status === 'active')
          .map((course) => (
            <div key={course.id} className="card">
              <div className="card-title">{course.title}</div>
              <div className="card-content">
                <p>
                  <strong>Datum:</strong> {new Date(course.date).toLocaleDateString('de-DE')}
                </p>
                <p>{course.description}</p>
                <div className="badge badge-active">Aktiv</div>
              </div>
            </div>
          ))}
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '20px', color: '#2c3e50', fontSize: '20px' }}>
        Übersicht
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Diese Dashboard-Seite zeigt eine Übersicht der Kursverwaltungs-App. Sie können die
        verfügbaren Navigationspunkte nutzen, um zu den Kursen oder Teilnehmenden zu navigieren.
      </p>
    </div>
  );
}

export default Dashboard;
