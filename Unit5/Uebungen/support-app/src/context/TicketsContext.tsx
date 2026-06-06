import { createContext, useContext, useState, ReactNode } from 'react';
import { Ticket } from '../types';
import { mockTickets } from '../data/tickets';

interface TicketsContextType {
  tickets: Ticket[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addTicket: (ticket: any) => void;
}

const TicketsContext = createContext<TicketsContextType>({
  tickets: [],
  addTicket: () => {},
});

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addTicket = (ticket: any) => {
    setTickets((prev) => [...prev, ticket as Ticket]);
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);
