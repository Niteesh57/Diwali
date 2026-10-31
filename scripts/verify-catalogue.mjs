import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const products = JSON.parse(readFileSync(join(here, '..', 'src', 'data', 'products.json'), 'utf8'));

const categories = new Set([
  'sparkles',
  'spinners',
  'flower-pots',
  'pencils',
  'bombs',
  'fancy',
  'gift-boxes',
  'walas',
  'comets',
  'shots',
  'peacocks',
  'rockets',
  'ladi',
  'roll-caps',
  'vanitha',
  'toy-guns',
  'exclusive',
]);

const errors = [];
const ids = new Set();
const snos = new Set();

for (const product of products) {
  const label = product.id ?? '(missing id)';
  if (!product.id) errors.push(`${label}: missing id`);
  if (ids.has(product.id)) errors.push(`${label}: duplicate id`);
  ids.add(product.id);

  if (!Number.isInteger(product.sno)) errors.push(`${label}: sno is not an integer`);
  if (snos.has(product.sno)) errors.push(`${label}: duplicate sno ${product.sno}`);
  snos.add(product.sno);
  if (!categories.has(product.category)) errors.push(`${label}: unknown category ${product.category}`);
  if (!['standard', 'wide'].includes(product.collection)) {
    errors.push(`${label}: invalid collection ${product.collection}`);
  }
  if (typeof product.name !== 'string' || product.name.trim().length === 0) {
    errors.push(`${label}: empty name`);
  }
  const hasPrice = typeof product.price === 'number' && product.price > 0;
  const hasRange = product.price === null && typeof product.priceLabel === 'string';
  if (!hasPrice && !hasRange) errors.push(`${label}: price must be a positive number or a labeled range`);
  if (product.designs && !Array.isArray(product.designs)) errors.push(`${label}: designs must be an array`);
}

const expected = 145;
if (products.length !== expected) {
  errors.push(`expected ${expected} rows (144 price-list items + 5D glasses), found ${products.length}`);
}

const sequence = [...snos].sort((a, b) => a - b);
for (let index = 0; index < sequence.length; index += 1) {
  if (sequence[index] !== index + 1) {
    errors.push(`sno sequence breaks at position ${index + 1} (found ${sequence[index]})`);
    break;
  }
}

const counts = products.reduce((accumulator, product) => {
  accumulator[product.category] = (accumulator[product.category] ?? 0) + 1;
  return accumulator;
}, {});

const priced = products.filter((product) => typeof product.price === 'number');
const total = priced.reduce((sum, product) => sum + product.price, 0);

console.log(`Catalogue rows: ${products.length}`);
console.log(`Collections: ${products.filter((p) => p.collection === 'standard').length} standard, ${products.filter((p) => p.collection === 'wide').length} wide`);
console.log(`Categories: ${Object.keys(counts).length}`);
for (const [category, count] of Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`  ${category.padEnd(14)} ${count}`);
}
console.log(`Priced items: ${priced.length} · price ranges: ${products.length - priced.length}`);
console.log(`Sum of one of each listed price: ₹${total.toFixed(2)}`);

if (errors.length > 0) {
  console.error('\nCatalogue validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('\nCatalogue OK — S.No 1–145, unique ids, all prices present.');
