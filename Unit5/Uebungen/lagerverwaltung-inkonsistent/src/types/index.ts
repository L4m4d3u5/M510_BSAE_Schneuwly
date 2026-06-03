export type ArtikelStatus = 'aktiv' | 'kritisch' | 'nicht-verfügbar' | 'pausiert';

export interface Artikel {
  id: number;
  name: string;
  kategorie: string;
  bestand: number;
  minBestand: number;
  preis: number;
  status: ArtikelStatus;
  lagerort: string;
}
