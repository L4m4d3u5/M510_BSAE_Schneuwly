import React from 'react';
import { participantsData, coursesData } from '../data/mockData';

function Participants(): React.ReactElement {
  // Hilfsfunktion um Kurstitel von ID zu erhalten
  const getCourseTitle = (courseId: number): string => {
    const course = coursesData.find((c) => c.id === courseId);
    return course ? course.title : 'Unbekannter Kurs';
  };

  return (
    <div>
      <h1 className="page-title">Teilnehmende</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Zugewiesener Kurs</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(participantsData).map((participant) => (
              <tr key={participant.id}>
                <td>{participant.name}</td>
                <td>{participant.email}</td>
                <td>{getCourseTitle(participant.courseId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>⚠️ Bekannte Lücken:</h3>
        <ul style={{ color: '#555', lineHeight: '1.8', marginLeft: '20px' }}>
          <li>Keine Suchfunktion für Teilnehmende</li>
          <li>Keine Filterung nach Kursen</li>
          <li>Keine Detailansicht für Teilnehmende</li>
          <li>Teilnehmerstatus wird nicht angezeigt</li>
          <li>Keine Möglichkeit, Teilnehmende hinzuzufügen/zu bearbeiten</li>
        </ul>
      </div> 
      */}
    </div>
  );
}

export default Participants;
