// Typen für die Anwendung
export interface Course {
  id: number;
  title: string;
  date: string;
  status: 'active' | 'inactive';
  description: string;
}

export interface Participant {
  id: number;
  name: string;
  email: string;
  courseId: number;
}

// Beispieldaten für Kurse
export const coursesData: Course[] = [
  {
    id: 1,
    title: 'React Grundlagen',
    date: '2024-03-15',
    status: 'active',
    description: 'Einführung in React und funktionale Komponenten',
  },
  {
    id: 2,
    title: 'JavaScript Fortgeschrittene',
    date: '2024-04-20',
    status: 'active',
    description: 'Asynchrone Programmierung und APIs',
  },
  {
    id: 3,
    title: 'CSS und responsive Design',
    date: '2024-02-10',
    status: 'inactive',
    description: 'Modernes CSS mit Flexbox und Grid',
  },
  {
    id: 4,
    title: 'Web APIs',
    date: '2024-05-05',
    status: 'active',
    description: 'Arbeit mit Fetch, DOM und LocalStorage',
  },
  {
    id: 5,
    title: 'Node.js Einführung',
    date: '2024-06-01',
    status: 'inactive',
    description: 'Backend-Entwicklung mit Node.js',
  },
];

// Beispieldaten für Teilnehmende
export const participantsData: Participant[] = [
  {
    id: 1,
    name: 'Anna Mueller',
    email: 'anna.mueller@example.com',
    courseId: 1,
  },
  {
    id: 2,
    name: 'Benjamin Schmidt',
    email: 'benjamin.schmidt@example.com',
    courseId: 1,
  },
  {
    id: 3,
    name: 'Clara Wagner',
    email: 'clara.wagner@example.com',
    courseId: 2,
  },
  {
    id: 4,
    name: 'David Bauer',
    email: 'david.bauer@example.com',
    courseId: 2,
  },
  {
    id: 5,
    name: 'Emma Klein',
    email: 'emma.klein@example.com',
    courseId: 3,
  },
  {
    id: 6,
    name: 'Florian Weber',
    email: 'florian.weber@example.com',
    courseId: 4,
  },
  {
    id: 7,
    name: 'Greta Fischer',
    email: 'greta.fischer@example.com',
    courseId: 1,
  },
  {
    id: 8,
    name: 'Heinrich Keller',
    email: 'heinrich.keller@example.com',
    courseId: 5,
  },
];
