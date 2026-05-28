import { Artikel, berechneStatus } from '../types'

// ─── Artikeldaten ─────────────────────────────────────────────────────────────
// 80 Artikel verteilt auf 6 Kategorien.
// Der Status wird automatisch aus stock / minStock berechnet.

const rohdaten: Omit<Artikel, 'status'>[] = [
  // ── Elektronik (15 Artikel) ─────────────────────────────────────────────
  { id:  1, name: 'Kondensator 100µF',       articleNumber: 'ELE-0001', category: 'Elektronik',        location: 'A-01-01', stock:  850, minStock:  200 },
  { id:  2, name: 'Widerstand 10kΩ',         articleNumber: 'ELE-0002', category: 'Elektronik',        location: 'A-01-02', stock:  120, minStock:  300 },
  { id:  3, name: 'Transistor NPN BC547',    articleNumber: 'ELE-0003', category: 'Elektronik',        location: 'A-01-03', stock:  430, minStock:  150 },
  { id:  4, name: 'LED Rot 5mm',             articleNumber: 'ELE-0004', category: 'Elektronik',        location: 'A-01-04', stock: 1200, minStock:  500 },
  { id:  5, name: 'Relais 12V',              articleNumber: 'ELE-0005', category: 'Elektronik',        location: 'A-01-05', stock:   45, minStock:   80 },
  { id:  6, name: 'Sicherung 5A',            articleNumber: 'ELE-0006', category: 'Elektronik',        location: 'A-02-01', stock:  200, minStock:  200 },
  { id:  7, name: 'Diode 1N4007',            articleNumber: 'ELE-0007', category: 'Elektronik',        location: 'A-02-02', stock:  900, minStock:  250 },
  { id:  8, name: 'IC NE555',                articleNumber: 'ELE-0008', category: 'Elektronik',        location: 'A-02-03', stock:   30, minStock:   50 },
  { id:  9, name: 'Optokoppler PC817',       articleNumber: 'ELE-0009', category: 'Elektronik',        location: 'A-02-04', stock:  150, minStock:  100 },
  { id: 10, name: 'Spule 100µH',             articleNumber: 'ELE-0010', category: 'Elektronik',        location: 'A-02-05', stock:  310, minStock:  120 },
  { id: 11, name: 'Elektrolytkondensator 1µF', articleNumber: 'ELE-0011', category: 'Elektronik',      location: 'A-03-01', stock:  600, minStock:  300 },
  { id: 12, name: 'Zenerdiode 5.1V',         articleNumber: 'ELE-0012', category: 'Elektronik',        location: 'A-03-02', stock:   75, minStock:  100 },
  { id: 13, name: 'Quarz 16MHz',             articleNumber: 'ELE-0013', category: 'Elektronik',        location: 'A-03-03', stock:  180, minStock:  150 },
  { id: 14, name: 'Mosfet IRF540',           articleNumber: 'ELE-0014', category: 'Elektronik',        location: 'A-03-04', stock:   20, minStock:   60 },
  { id: 15, name: 'Schottky-Diode 1A',       articleNumber: 'ELE-0015', category: 'Elektronik',        location: 'A-03-05', stock:  400, minStock:  200 },

  // ── Werkzeug (12 Artikel) ────────────────────────────────────────────────
  { id: 16, name: 'Hammer 300g',             articleNumber: 'WZG-0001', category: 'Werkzeug',          location: 'B-01-01', stock:   18, minStock:   10 },
  { id: 17, name: 'Schraubenzieher PH2',     articleNumber: 'WZG-0002', category: 'Werkzeug',          location: 'B-01-02', stock:    6, minStock:   15 },
  { id: 18, name: 'Kombizange 180mm',        articleNumber: 'WZG-0003', category: 'Werkzeug',          location: 'B-01-03', stock:   25, minStock:    8 },
  { id: 19, name: 'Kabelmesser',             articleNumber: 'WZG-0004', category: 'Werkzeug',          location: 'B-01-04', stock:   12, minStock:   10 },
  { id: 20, name: 'Metallsäge 300mm',        articleNumber: 'WZG-0005', category: 'Werkzeug',          location: 'B-02-01', stock:    3, minStock:    5 },
  { id: 21, name: 'Bohrer HSS Ø8mm',         articleNumber: 'WZG-0006', category: 'Werkzeug',          location: 'B-02-02', stock:   40, minStock:   20 },
  { id: 22, name: 'Gabelschlüssel SW13',     articleNumber: 'WZG-0007', category: 'Werkzeug',          location: 'B-02-03', stock:   14, minStock:    8 },
  { id: 23, name: 'Messschieber 150mm',      articleNumber: 'WZG-0008', category: 'Werkzeug',          location: 'B-02-04', stock:    5, minStock:    5 },
  { id: 24, name: 'Multimeter Digital',      articleNumber: 'WZG-0009', category: 'Werkzeug',          location: 'B-03-01', stock:    8, minStock:    4 },
  { id: 25, name: 'Lötkolben 40W',           articleNumber: 'WZG-0010', category: 'Werkzeug',          location: 'B-03-02', stock:    2, minStock:    5 },
  { id: 26, name: 'Winkelschneider',         articleNumber: 'WZG-0011', category: 'Werkzeug',          location: 'B-03-03', stock:   11, minStock:    6 },
  { id: 27, name: 'Sägeblatt 24Z',           articleNumber: 'WZG-0012', category: 'Werkzeug',          location: 'B-03-04', stock:   30, minStock:   15 },

  // ── Bürobedarf (10 Artikel) ──────────────────────────────────────────────
  { id: 28, name: 'Drucker-Papier A4',       articleNumber: 'BUE-0001', category: 'Bürobedarf',        location: 'C-01-01', stock:  800, minStock:  200 },
  { id: 29, name: 'Kugelschreiber Blau',     articleNumber: 'BUE-0002', category: 'Bürobedarf',        location: 'C-01-02', stock:  150, minStock:  100 },
  { id: 30, name: 'Toner HP LaserJet',       articleNumber: 'BUE-0003', category: 'Bürobedarf',        location: 'C-01-03', stock:    2, minStock:    5 },
  { id: 31, name: 'Ordner A4 7cm',           articleNumber: 'BUE-0004', category: 'Bürobedarf',        location: 'C-01-04', stock:   60, minStock:   30 },
  { id: 32, name: 'Briefumschläge C5',       articleNumber: 'BUE-0005', category: 'Bürobedarf',        location: 'C-02-01', stock:  500, minStock:  100 },
  { id: 33, name: 'Haftnotizen 75×75mm',     articleNumber: 'BUE-0006', category: 'Bürobedarf',        location: 'C-02-02', stock:   90, minStock:   50 },
  { id: 34, name: 'Bleistift HB',            articleNumber: 'BUE-0007', category: 'Bürobedarf',        location: 'C-02-03', stock:   40, minStock:   60 },
  { id: 35, name: 'Textmarker Gelb',         articleNumber: 'BUE-0008', category: 'Bürobedarf',        location: 'C-02-04', stock:   80, minStock:   40 },
  { id: 36, name: 'Klebeband 19mm',          articleNumber: 'BUE-0009', category: 'Bürobedarf',        location: 'C-03-01', stock:  120, minStock:   60 },
  { id: 37, name: 'Locher 2-fach',           articleNumber: 'BUE-0010', category: 'Bürobedarf',        location: 'C-03-02', stock:   10, minStock:    8 },

  // ── Reinigung (10 Artikel) ───────────────────────────────────────────────
  { id: 38, name: 'Allzweckreiniger 5L',     articleNumber: 'REI-0001', category: 'Reinigung',         location: 'D-01-01', stock:   12, minStock:   10 },
  { id: 39, name: 'Desinfektionsmittel 2L',  articleNumber: 'REI-0002', category: 'Reinigung',         location: 'D-01-02', stock:    4, minStock:   15 },
  { id: 40, name: 'Bodenreiniger 10L',       articleNumber: 'REI-0003', category: 'Reinigung',         location: 'D-01-03', stock:   30, minStock:   20 },
  { id: 41, name: 'Glasreiniger 1L',         articleNumber: 'REI-0004', category: 'Reinigung',         location: 'D-01-04', stock:   18, minStock:   12 },
  { id: 42, name: 'Papiertücher Rolle',      articleNumber: 'REI-0005', category: 'Reinigung',         location: 'D-02-01', stock:   50, minStock:   30 },
  { id: 43, name: 'Handseife 500ml',         articleNumber: 'REI-0006', category: 'Reinigung',         location: 'D-02-02', stock:    8, minStock:   20 },
  { id: 44, name: 'Mülltüten 120L',          articleNumber: 'REI-0007', category: 'Reinigung',         location: 'D-02-03', stock:  100, minStock:   50 },
  { id: 45, name: 'Wischmopp-Set',           articleNumber: 'REI-0008', category: 'Reinigung',         location: 'D-02-04', stock:    6, minStock:    5 },
  { id: 46, name: 'Spülmittel 1L',           articleNumber: 'REI-0009', category: 'Reinigung',         location: 'D-03-01', stock:   25, minStock:   15 },
  { id: 47, name: 'WC-Reiniger 750ml',       articleNumber: 'REI-0010', category: 'Reinigung',         location: 'D-03-02', stock:    3, minStock:   10 },

  // ── Sicherheit (13 Artikel) ──────────────────────────────────────────────
  { id: 48, name: 'Schutzhelm Gr. M',        articleNumber: 'SIC-0001', category: 'Sicherheitsausrüstung', location: 'E-01-01', stock:   20, minStock:   10 },
  { id: 49, name: 'Schutzhandschuhe L',      articleNumber: 'SIC-0002', category: 'Sicherheitsausrüstung', location: 'E-01-02', stock:    8, minStock:   20 },
  { id: 50, name: 'Sicherheitsschuhe Gr.42', articleNumber: 'SIC-0003', category: 'Sicherheitsausrüstung', location: 'E-01-03', stock:    4, minStock:    6 },
  { id: 51, name: 'Warnweste Gr. L',         articleNumber: 'SIC-0004', category: 'Sicherheitsausrüstung', location: 'E-01-04', stock:   35, minStock:   15 },
  { id: 52, name: 'Schutzbrille klar',       articleNumber: 'SIC-0005', category: 'Sicherheitsausrüstung', location: 'E-02-01', stock:   15, minStock:   10 },
  { id: 53, name: 'Gehörschutzstöpsel',      articleNumber: 'SIC-0006', category: 'Sicherheitsausrüstung', location: 'E-02-02', stock:  200, minStock:   80 },
  { id: 54, name: 'Atemschutzmaske FFP2',    articleNumber: 'SIC-0007', category: 'Sicherheitsausrüstung', location: 'E-02-03', stock:   10, minStock:   30 },
  { id: 55, name: 'Absperrband 500m',        articleNumber: 'SIC-0008', category: 'Sicherheitsausrüstung', location: 'E-02-04', stock:   12, minStock:    8 },
  { id: 56, name: 'Feuerlöscher 6kg',        articleNumber: 'SIC-0009', category: 'Sicherheitsausrüstung', location: 'E-03-01', stock:    3, minStock:    4 },
  { id: 57, name: 'Erste-Hilfe-Set',         articleNumber: 'SIC-0010', category: 'Sicherheitsausrüstung', location: 'E-03-02', stock:    5, minStock:    5 },
  { id: 58, name: 'Knieschützer',            articleNumber: 'SIC-0011', category: 'Sicherheitsausrüstung', location: 'E-03-03', stock:   22, minStock:   10 },
  { id: 59, name: 'Gehörschutzkapsel',       articleNumber: 'SIC-0012', category: 'Sicherheitsausrüstung', location: 'E-03-04', stock:    9, minStock:    8 },
  { id: 60, name: 'Chemikalienschutzanzug',  articleNumber: 'SIC-0013', category: 'Sicherheitsausrüstung', location: 'E-04-01', stock:    1, minStock:    3 },

  // ── Maschinenteile (20 Artikel) ──────────────────────────────────────────
  { id: 61, name: 'Kugellager 6205',         articleNumber: 'MAS-0001', category: 'Maschinenteile',    location: 'F-01-01', stock:   24, minStock:   10 },
  { id: 62, name: 'Keilriemen A42',          articleNumber: 'MAS-0002', category: 'Maschinenteile',    location: 'F-01-02', stock:    3, minStock:    8 },
  { id: 63, name: 'Dichtring Ø50mm',         articleNumber: 'MAS-0003', category: 'Maschinenteile',    location: 'F-01-03', stock:   80, minStock:   40 },
  { id: 64, name: 'Zahnrad Modul 2, Z30',    articleNumber: 'MAS-0004', category: 'Maschinenteile',    location: 'F-01-04', stock:    5, minStock:    5 },
  { id: 65, name: 'Wellenkupplung Ø20mm',    articleNumber: 'MAS-0005', category: 'Maschinenteile',    location: 'F-02-01', stock:    7, minStock:    4 },
  { id: 66, name: 'Gleitlager Bronze Ø30',   articleNumber: 'MAS-0006', category: 'Maschinenteile',    location: 'F-02-02', stock:   12, minStock:    8 },
  { id: 67, name: 'Hydraulikschlauch DN10',  articleNumber: 'MAS-0007', category: 'Maschinenteile',    location: 'F-02-03', stock:   15, minStock:   10 },
  { id: 68, name: 'O-Ring 40×3mm',           articleNumber: 'MAS-0008', category: 'Maschinenteile',    location: 'F-02-04', stock:  300, minStock:  100 },
  { id: 69, name: 'Flansch DN50',            articleNumber: 'MAS-0009', category: 'Maschinenteile',    location: 'F-03-01', stock:    2, minStock:    4 },
  { id: 70, name: 'Kettenrad Z16',           articleNumber: 'MAS-0010', category: 'Maschinenteile',    location: 'F-03-02', stock:   10, minStock:    6 },
  { id: 71, name: 'Motorlager Ø62mm',        articleNumber: 'MAS-0011', category: 'Maschinenteile',    location: 'F-03-03', stock:    6, minStock:    5 },
  { id: 72, name: 'Simmerring 30×50×10',     articleNumber: 'MAS-0012', category: 'Maschinenteile',    location: 'F-03-04', stock:   18, minStock:   10 },
  { id: 73, name: 'Schmiernippel M8',        articleNumber: 'MAS-0013', category: 'Maschinenteile',    location: 'F-04-01', stock:  120, minStock:   60 },
  { id: 74, name: 'Druckfeder 50mm',         articleNumber: 'MAS-0014', category: 'Maschinenteile',    location: 'F-04-02', stock:   40, minStock:   25 },
  { id: 75, name: 'Führungsschiene 500mm',   articleNumber: 'MAS-0015', category: 'Maschinenteile',    location: 'F-04-03', stock:    4, minStock:    6 },
  { id: 76, name: 'Gleitlager IGUS Ø25',     articleNumber: 'MAS-0016', category: 'Maschinenteile',    location: 'F-04-04', stock:   30, minStock:   15 },
  { id: 77, name: 'Zahnriemen HTD 900',      articleNumber: 'MAS-0017', category: 'Maschinenteile',    location: 'F-05-01', stock:    2, minStock:    5 },
  { id: 78, name: 'Planetengetriebe i=5',    articleNumber: 'MAS-0018', category: 'Maschinenteile',    location: 'F-05-02', stock:    1, minStock:    2 },
  { id: 79, name: 'Stopfen Ø20mm',           articleNumber: 'MAS-0019', category: 'Maschinenteile',    location: 'F-05-03', stock:   90, minStock:   50 },
  { id: 80, name: 'Buchse 20/26×30mm',       articleNumber: 'MAS-0020', category: 'Maschinenteile',    location: 'F-05-04', stock:   14, minStock:   10 },
]

// Status automatisch berechnen und Typ hinzufügen
export const artikel: Artikel[] = rohdaten.map(a => ({
  ...a,
  status: berechneStatus(a.stock, a.minStock),
}))
