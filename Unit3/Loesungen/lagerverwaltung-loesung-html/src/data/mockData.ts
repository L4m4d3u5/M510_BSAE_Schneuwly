export interface Produkt {
  id: number
  artikelnummer: string
  name: string
  kategorie: string
  lagerbestand: number
  mindestbestand: number
  einheit: string
  preis: number
  lieferant: string
  standort: string
}

// ─── Deterministischer Pseudozufallsgenerator ────────────────────────────────
// Verwendet einen festen Seed, damit die Daten bei jedem Start identisch sind.
function erstelleRNG(seed: number) {
  let s = seed >>> 0
  return {
    next(): number {
      s = Math.imul(s ^ (s >>> 16), 0x45d9f3b)
      s = Math.imul(s ^ (s >>> 16), 0x45d9f3b)
      s = s ^ (s >>> 16)
      return (s >>> 0) / 0xffffffff
    },
    int(min: number, max: number): number {
      return Math.floor(this.next() * (max - min + 1)) + min
    },
    float(min: number, max: number, stellen = 2): number {
      return parseFloat((this.next() * (max - min) + min).toFixed(stellen))
    },
    wahl<T>(arr: T[]): T {
      return arr[Math.floor(this.next() * arr.length)]
    },
  }
}

// ─── Kategorie-Konfigurationen ───────────────────────────────────────────────
const kategorien = [
  {
    name: 'Elektronik',
    kuerzel: 'ELE',
    regal: 'A',
    einheit: 'Stk',
    basisNamen: ['Kondensator', 'Widerstand', 'Transistor', 'Diode', 'LED', 'Relais', 'Sensor', 'IC-Chip', 'Spule', 'Optokoppler'],
    varianten:  ['100nF', '470nF', '1µF', '10µF', '47Ω', '100Ω', '1kΩ', '10kΩ', 'NPN', 'PNP'],
    lieferanten: ['Würth Elektronik', 'Reichelt GmbH', 'Conrad Electronic'],
    preisMin: 0.10, preisMax: 18.00,
    bestandMax: 3000, mindestMin: 100, mindestMax: 500,
  },
  {
    name: 'Werkzeug',
    kuerzel: 'WZG',
    regal: 'B',
    einheit: 'Stk',
    basisNamen: ['Hammer', 'Schraubenzieher', 'Zange', 'Säge', 'Bohrer', 'Schlüssel', 'Winkel', 'Feile', 'Meißel', 'Stechbeitel'],
    varianten:  ['100mm', '150mm', '200mm', '250mm', '300mm', 'Kreuz PH1', 'Kreuz PH2', 'Schlitz 4mm', 'Schlitz 6mm', 'Torx T20'],
    lieferanten: ['Würth GmbH', 'Knipex', 'Stanley', 'Hazet'],
    preisMin: 3.50, preisMax: 85.00,
    bestandMax: 200, mindestMin: 5, mindestMax: 20,
  },
  {
    name: 'Bürobedarf',
    kuerzel: 'BUE',
    regal: 'C',
    einheit: 'Stk',
    basisNamen: ['Kugelschreiber', 'Bleistift', 'Ordner', 'Locher', 'Heftgerät', 'Kleber', 'Schere', 'Lineal', 'Tacker', 'Radiergummi'],
    varianten:  ['Schwarz', 'Blau', 'Rot', 'A4', 'A5', '5cm', 'Breit', 'Schmal', '80g/m²', '160g/m²'],
    lieferanten: ['Staples AG', 'Büroshop24', 'Lyreco'],
    preisMin: 0.30, preisMax: 25.00,
    bestandMax: 1000, mindestMin: 50, mindestMax: 200,
  },
  {
    name: 'Reinigung',
    kuerzel: 'REI',
    regal: 'D',
    einheit: 'Liter',
    basisNamen: ['Allzweckreiniger', 'Desinfektionsmittel', 'Glasreiniger', 'WC-Reiniger', 'Bodenreiniger', 'Entkalker', 'Fettreiniger', 'Scheuermilch', 'Spülmittel', 'Handseife'],
    varianten:  ['1L', '2L', '5L', '10L', 'Konzentrat', 'Gebrauchsfertig', 'Parfümfrei', 'Zitrus', 'Lavendel', 'Neutral'],
    lieferanten: ['Diversey', 'Dr. Schnell', 'Kärcher', 'Vermop'],
    preisMin: 2.00, preisMax: 45.00,
    bestandMax: 500, mindestMin: 20, mindestMax: 100,
  },
  {
    name: 'Verpackung',
    kuerzel: 'VER',
    regal: 'E',
    einheit: 'Stk',
    basisNamen: ['Karton', 'Luftpolsterfolie', 'Klebeband', 'Stretchfolie', 'Schrumpffolie', 'Palette', 'Blisterpack', 'Versandtasche', 'Füllmaterial', 'Etikett'],
    varianten:  ['200×150×100mm', '300×200×150mm', '400×300×200mm', '500×400×300mm', '600×400×300mm', '50m Rolle', '100m Rolle', 'Transparent', 'Braun', 'Weiß'],
    lieferanten: ['RAJA AG', 'Neoform', 'Uline', 'Safepack'],
    preisMin: 0.10, preisMax: 12.00,
    bestandMax: 2000, mindestMin: 100, mindestMax: 500,
  },
  {
    name: 'Sicherheit',
    kuerzel: 'SIC',
    regal: 'F',
    einheit: 'Stk',
    basisNamen: ['Schutzhelm', 'Schutzhandschuhe', 'Sicherheitsschuhe', 'Warnweste', 'Schutzbrille', 'Gehörschutz', 'Atemschutzmaske', 'Knieschützer', 'Sicherheitsnetz', 'Absperrband'],
    varianten:  ['Gr. S', 'Gr. M', 'Gr. L', 'Gr. XL', 'Gr. XXL', 'Klasse 1', 'Klasse 2', 'Klasse 3', 'EN 388', 'EN 397'],
    lieferanten: ['3M', 'Uvex', 'Honeywell', 'Ansell'],
    preisMin: 1.50, preisMax: 120.00,
    bestandMax: 300, mindestMin: 10, mindestMax: 50,
  },
  {
    name: 'Maschinenteile',
    kuerzel: 'MAS',
    regal: 'G',
    einheit: 'Stk',
    basisNamen: ['Kugellager', 'Zahnrad', 'Keilriemen', 'Wellenkupplung', 'Gleitlager', 'Kettenrad', 'Dämpfer', 'Dichtring', 'Flansch', 'Buchse'],
    varianten:  ['Ø10mm', 'Ø15mm', 'Ø20mm', 'Ø25mm', 'Ø30mm', 'Ø40mm', 'Ø50mm', 'Ø60mm', 'Ø80mm', 'Ø100mm'],
    lieferanten: ['SKF', 'FAG', 'NSK', 'Bosch Rexroth'],
    preisMin: 2.00, preisMax: 280.00,
    bestandMax: 150, mindestMin: 5, mindestMax: 30,
  },
  {
    name: 'Hydraulik',
    kuerzel: 'HYD',
    regal: 'H',
    einheit: 'Stk',
    basisNamen: ['Hydraulikventil', 'Hydraulikpumpe', 'Hydraulikschlauch', 'Hydraulikzylinder', 'Drucksensor', 'Druckminderer', 'Manometer', 'Ölfilter', 'Hydraulikmotor', 'Rückschlagventil'],
    varianten:  ['50 bar', '100 bar', '160 bar', '200 bar', '250 bar', '315 bar', 'DN6', 'DN10', 'DN16', 'DN25'],
    lieferanten: ['Bosch Rexroth', 'Parker', 'Eaton', 'Hydac'],
    preisMin: 15.00, preisMax: 650.00,
    bestandMax: 80, mindestMin: 2, mindestMax: 15,
  },
  {
    name: 'Befestigung',
    kuerzel: 'BEF',
    regal: 'I',
    einheit: 'Stk',
    basisNamen: ['Sechskantschraube', 'Zylinderschraube', 'Senkschraube', 'Gewindestange', 'Sechskantmutter', 'Unterlegscheibe', 'Federring', 'Dübel', 'Niet', 'Bolzen'],
    varianten:  ['M4×10', 'M4×20', 'M5×16', 'M5×30', 'M6×20', 'M6×40', 'M8×25', 'M8×50', 'M10×30', 'M10×60'],
    lieferanten: ['Würth', 'Bossard', 'Kerb-Konus', 'SFS Group'],
    preisMin: 0.02, preisMax: 3.50,
    bestandMax: 10000, mindestMin: 500, mindestMax: 2000,
  },
  {
    name: 'Elektrik',
    kuerzel: 'ELK',
    regal: 'J',
    einheit: 'Meter',
    basisNamen: ['NYM-Kabel', 'H07V-K Ader', 'Koaxialkabel', 'Netzwerkkabel', 'Steuerkabel', 'Schlauchleitung', 'Silikon-Kabel', 'Litzenkabel', 'Patchkabel', 'Erdungskabel'],
    varianten:  ['1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '3G1.5', '3G2.5', '5G1.5', '5G2.5'],
    lieferanten: ['Lapp Kabel', 'Helukabel', 'Ölflex', 'Prysmian'],
    preisMin: 0.50, preisMax: 8.50,
    bestandMax: 1000, mindestMin: 50, mindestMax: 200,
  },
  {
    name: 'Chemie',
    kuerzel: 'CHE',
    regal: 'K',
    einheit: 'Liter',
    basisNamen: ['Hydrauliköl', 'Getriebeöl', 'Motoröl', 'Kompressoröl', 'Schneidöl', 'Kühlmittel', 'Bremsflüssigkeit', 'Frostschutzmittel', 'Korrosionsschutz', 'Schmierfett'],
    varianten:  ['ISO VG 32', 'ISO VG 46', 'ISO VG 68', 'ISO VG 100', 'SAE 5W-30', 'SAE 10W-40', '1L', '5L', '20L', '200L'],
    lieferanten: ['Shell', 'Castrol', 'Mobil', 'Total Energies'],
    preisMin: 3.00, preisMax: 95.00,
    bestandMax: 400, mindestMin: 10, mindestMax: 50,
  },
  {
    name: 'Lager & Transport',
    kuerzel: 'LAG',
    regal: 'L',
    einheit: 'Stk',
    basisNamen: ['Gitterbox', 'Kunststoffbehälter', 'Stapelkasten', 'Palette', 'Rollwagen', 'Hubwagen', 'Sackkarre', 'Regalfach', 'Trennwand', 'Beschriftungsschild'],
    varianten:  ['600×400×320mm', '400×300×220mm', '300×200×120mm', '800×600mm', 'Gr. S', 'Gr. M', 'Gr. L', '500kg', '1000kg', '2000kg'],
    lieferanten: ['BITO Lagertechnik', 'SSI Schäfer', 'Jungheinrich', 'Toyota MH'],
    preisMin: 5.00, preisMax: 450.00,
    bestandMax: 100, mindestMin: 2, mindestMax: 20,
  },
]

// ─── Standort-Generator ──────────────────────────────────────────────────────
function erstelleStandort(regal: string, index: number): string {
  const reihe = Math.floor(index / 10) + 1
  const fach  = (index % 10) + 1
  return `${regal}-${String(reihe).padStart(2, '0')}-${String(fach).padStart(2, '0')}`
}

// ─── Produktgenerator ────────────────────────────────────────────────────────
function generiereProdukte(): Produkt[] {
  const rng = erstelleRNG(42)
  const produkte: Produkt[] = []
  let id = 1

  for (const kat of kategorien) {
    let index = 0
    for (let b = 0; b < kat.basisNamen.length; b++) {
      for (let v = 0; v < kat.varianten.length; v++) {
        const lagerbestand = rng.int(0, kat.bestandMax)
        const mindestbestand = rng.int(kat.mindestMin, kat.mindestMax)

        produkte.push({
          id,
          artikelnummer: `${kat.kuerzel}-${String(id).padStart(5, '0')}`,
          name: `${kat.basisNamen[b]} ${kat.varianten[v]}`,
          kategorie: kat.name,
          lagerbestand,
          mindestbestand,
          einheit: kat.einheit,
          preis: rng.float(kat.preisMin, kat.preisMax),
          lieferant: rng.wahl(kat.lieferanten),
          standort: erstelleStandort(kat.regal, index),
        })
        id++
        index++
      }
    }
  }

  return produkte
}

// 12 Kategorien × 100 Produkte = 1200 Produkte
export const produkte: Produkt[] = generiereProdukte()
