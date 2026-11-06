export type CategoryKey =
  | 'sparkles'
  | 'spinners'
  | 'flower-pots'
  | 'pencils'
  | 'bombs'
  | 'fancy'
  | 'gift-boxes'
  | 'walas'
  | 'comets'
  | 'shots'
  | 'peacocks'
  | 'rockets'
  | 'ladi'
  | 'roll-caps'
  | 'vanitha'
  | 'toy-guns'
  | 'exclusive'
  | 'custom';

export type CategoryMeta = {
  key: CategoryKey;
  label: string;
  accent: string;
};

export const categories: CategoryMeta[] = [
  { key: 'sparkles', label: 'Sparkles & Threads', accent: '#f5c451' },
  { key: 'spinners', label: 'Spinners', accent: '#ff9f43' },
  { key: 'flower-pots', label: 'Flower Pots', accent: '#ff6b6b' },
  { key: 'pencils', label: 'Pencils & Candles', accent: '#7dd3fc' },
  { key: 'bombs', label: 'Bombs', accent: '#f87171' },
  { key: 'fancy', label: 'Fancy Crackers', accent: '#f472b6' },
  { key: 'gift-boxes', label: 'Gift Boxes', accent: '#facc15' },
  { key: 'walas', label: 'Walas', accent: '#fb923c' },
  { key: 'comets', label: 'Comets', accent: '#38bdf8' },
  { key: 'shots', label: 'Shots & Cakes', accent: '#a78bfa' },
  { key: 'peacocks', label: 'Peacocks', accent: '#34d399' },
  { key: 'rockets', label: 'Rockets', accent: '#60a5fa' },
  { key: 'ladi', label: 'Ladi', accent: '#fbbf24' },
  { key: 'roll-caps', label: 'Roll Caps & Guns', accent: '#c084fc' },
  { key: 'vanitha', label: 'Vanitha Premium', accent: '#fda4af' },
  { key: 'toy-guns', label: 'Toy Guns', accent: '#94a3b8' },
  { key: 'exclusive', label: 'Exclusive 2026', accent: '#f5c451' },
  { key: 'custom', label: 'Custom', accent: '#f59e0b' },
];

export const categoryMap = new Map(categories.map((category) => [category.key, category]));

export const categoryLabel = (key: CategoryKey) => categoryMap.get(key)?.label ?? key;
