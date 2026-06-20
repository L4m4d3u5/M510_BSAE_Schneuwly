import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import NewTicket from './pages/NewTicket';
import TicketConfirmation from './pages/TicketConfirmation';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/new" element={<NewTicket />} />
          <Route path="/tickets/confirmation" element={<TicketConfirmation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
