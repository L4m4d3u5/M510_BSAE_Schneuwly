import { createContext, useContext, useState, ReactNode } from 'react';
import { Ticket } from '../types';
import { mockTickets } from '../data/tickets';

interface TicketsContextType {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
}

const TicketsContext = createContext<TicketsContextType>({
  tickets: [],
  addTicket: () => {},
});

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const addTicket = (ticket: Ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);
