// Typen für die Anwendung
export interface Course {
  id: number;
  title: string;
  date: string;
  status: CourseStatus;
  description: string;
  participants: Participant[]; // Optionales Feld für Teilnehmende
}

export interface Participant {
  id: number;
  name: string;
  email: string;
  courseId: number;
}

export enum CourseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// Beispieldaten für Teilnehmende
export const participantsData: Record<number, Participant> = {
  1: {
    id: 1,
    name: 'Anna Mueller',
    email: 'anna.mueller@example.com',
    courseId: 1,
  },
  2: {
    id: 2,
    name: 'Benjamin Schmidt',
    email: 'benjamin.schmidt@example.com',
    courseId: 1,
  },
  3: {
    id: 3,
    name: 'Clara Wagner',
    email: 'clara.wagner@example.com',
    courseId: 2,
  },
  4: {
    id: 4,
    name: 'David Bauer',
    email: 'david.bauer@example.com',
    courseId: 2,
  },
  5: {
    id: 5,
    name: 'Emma Klein',
    email: 'emma.klein@example.com',
    courseId: 3,
  },
  6: {
    id: 6,
    name: 'Florian Weber',
    email: 'florian.weber@example.com',
    courseId: 4,
  },
  7: {
    id: 7,
    name: 'Greta Fischer',
    email: 'greta.fischer@example.com',
    courseId: 1,
  },
  8: {
    id: 8,
    name: 'Heinrich Keller',
    email: 'heinrich.keller@example.com',
    courseId: 5,
  },
};

// Beispieldaten für Kurse
export const coursesData: Course[] = [
  {
    id: 1,
    title: 'React Grundlagen',
    date: '2024-03-15',
    status: CourseStatus.ACTIVE,
    description: 'Einführung in React und funktionale Komponenten',
    participants: [participantsData[1], participantsData[2], participantsData[7]],
  },
  {
    id: 2,
    title: 'JavaScript Fortgeschrittene',
    date: '2024-04-20',
    status: CourseStatus.ACTIVE,
    description: 'Asynchrone Programmierung und APIs',
    participants: [participantsData[3], participantsData[4]],
  },
  {
    id: 3,
    title: 'CSS und responsive Design',
    date: '2024-02-10',
    status: CourseStatus.INACTIVE,
    description: 'Modernes CSS mit Flexbox und Grid',
    participants: [
      participantsData[5],
      participantsData[1],
      participantsData[2],
      participantsData[7],
    ],
  },
  {
    id: 4,
    title: 'Web APIs',
    date: '2024-05-05',
    status: CourseStatus.ACTIVE,
    description: 'Arbeit mit Fetch, DOM und LocalStorage',
    participants: [participantsData[6], participantsData[3]],
  },
  {
    id: 5,
    title: 'Node.js Einführung',
    date: '2024-06-01',
    status: CourseStatus.INACTIVE,
    description: 'Backend-Entwicklung mit Node.js',
    participants: [],
  },
];
