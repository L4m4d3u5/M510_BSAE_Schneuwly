import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AppointmentList from './pages/AppointmentList';
import NewAppointment from './pages/NewAppointment';
import AppointmentConfirmation from './pages/AppointmentConfirmation';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/termine" element={<AppointmentList />} />
          <Route path="/termine/neu" element={<NewAppointment />} />
          <Route path="/termine/bestaetigung" element={<AppointmentConfirmation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
