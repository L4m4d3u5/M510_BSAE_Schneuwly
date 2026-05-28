// Typdefinition für einen Artikel im Lager
export interface Article {
  id: number
  name: string
  articleNumber: string
  category: string
  location: string
  stock: number
  minStock: number
  status: string
}

// Beispieldaten – werden direkt im Projekt verwendet (kein Backend nötig)
export const articles: Article[] = [
  {
    id: 1,
    name: "Industriehandschuhe",
    articleNumber: "ART-1001",
    category: "Verbrauchsmaterial",
    location: "A1",
    stock: 120,
    minStock: 50,
    status: "Aktiv"
  },
  {
    id: 2,
    name: "Schutzbrille",
    articleNumber: "ART-1002",
    category: "Sicherheitsmaterial",
    location: "A2",
    stock: 18,
    minStock: 20,
    status: "Kritisch"
  },
  {
    id: 3,
    name: "Bohrmaschine X200",
    articleNumber: "ART-1003",
    category: "Werkzeuge",
    location: "B1",
    stock: 12,
    minStock: 5,
    status: "Aktiv"
  },
  {
    id: 4,
    name: "Schraubenset M5",
    articleNumber: "ART-1004",
    category: "Ersatzteile",
    location: "B2",
    stock: 250,
    minStock: 100,
    status: "Aktiv"
  },
  {
    id: 5,
    name: "Montagekleber",
    articleNumber: "ART-1005",
    category: "Verbrauchsmaterial",
    location: "C1",
    stock: 9,
    minStock: 15,
    status: "Kritisch"
  },
  {
    id: 6,
    name: "Akku-Pack 18V",
    articleNumber: "ART-1006",
    category: "Elektronik",
    location: "C2",
    stock: 35,
    minStock: 10,
    status: "Aktiv"
  },
  {
    id: 7,
    name: "Messgerät Pro",
    articleNumber: "ART-1007",
    category: "Elektronik",
    location: "D1",
    stock: 4,
    minStock: 6,
    status: "Kritisch"
  },
  {
    id: 8,
    name: "Ersatzklinge 20mm",
    articleNumber: "ART-1008",
    category: "Ersatzteile",
    location: "D2",
    stock: 70,
    minStock: 30,
    status: "Aktiv"
  },
  {
    id: 9,
    name: "Reinigungstücher",
    articleNumber: "ART-1009",
    category: "Verbrauchsmaterial",
    location: "A3",
    stock: 200,
    minStock: 80,
    status: "Aktiv"
  },
  {
    id: 10,
    name: "Sicherung 10A",
    articleNumber: "ART-1010",
    category: "Ersatzteile",
    location: "B3",
    stock: 6,
    minStock: 10,
    status: "Kritisch"
  }
]
