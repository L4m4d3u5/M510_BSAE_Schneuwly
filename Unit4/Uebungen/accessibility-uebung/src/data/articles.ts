export interface Article {
  id: number
  name: string
  sku: string
  quantity: number
  minQuantity: number
  category: string
  status: 'ok' | 'low' | 'empty'
}

export const articles: Article[] = [
  { id: 1, name: 'Bürostuhl Comfort Pro', sku: 'STH-001', quantity: 15, minQuantity: 5, category: 'Möbel', status: 'ok' },
  { id: 2, name: 'Schreibtisch Höhenverstellbar', sku: 'TBL-002', quantity: 3, minQuantity: 5, category: 'Möbel', status: 'low' },
  { id: 3, name: 'Monitor 27 Zoll 4K', sku: 'MON-003', quantity: 0, minQuantity: 2, category: 'Elektronik', status: 'empty' },
  { id: 4, name: 'Tastatur Wireless DE', sku: 'KEY-004', quantity: 8, minQuantity: 3, category: 'Elektronik', status: 'ok' },
  { id: 5, name: 'Maus Ergonomisch', sku: 'MSE-005', quantity: 2, minQuantity: 3, category: 'Elektronik', status: 'low' },
  { id: 6, name: 'Aktenschrank 4-türig', sku: 'CAB-006', quantity: 0, minQuantity: 1, category: 'Möbel', status: 'empty' },
  { id: 7, name: 'Kopierpapier A4 500 Blatt', sku: 'PAP-007', quantity: 50, minQuantity: 10, category: 'Büromaterial', status: 'ok' },
  { id: 8, name: 'Kugelschreiber Blau 10er-Pack', sku: 'PEN-008', quantity: 4, minQuantity: 10, category: 'Büromaterial', status: 'low' },
]
