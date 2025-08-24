cat > scripts/generate-products.js <<'JS'
'use strict';

const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'products.csv');
const mapPath = path.join(__dirname, '..', 'product images for website.txt');
const outPath = path.join(__dirname, '..', 'data', 'products.json');

if (!fs.existsSync(csvPath)) {
  console.error(`Missing products.csv at ${csvPath}`);
  process.exit(1);
}

const csv = fs.readFileSync(csvPath, 'utf8').replace(/\r/g, '');
const rows = csv.split('\n').filter(line => line.trim().length);
const dataRows = rows.slice(1); // drop header

const parseCSVLine = (line) =>
  (line.match(/("([^"]|"")*"|[^,]+)|(?<=,)(?=,)|^$/g) || [])
    .map(c => (c || '').trim())
    .map(c => (c.startsWith('"') && c.endsWith('"')) ? c.slice(1, -1).replace(/""/g, '"') : c);

const imageMap = {};
if (fs.existsSync(mapPath)) {
  const mapRaw = fs.readFileSync(mapPath, 'utf8').replace(/\r/g, '');
  mapRaw.split('\n').forEach(line => {
    const m = line.match(/^\s*(\d+)\.\s*(.+)$/);
    if (!m) return;
    const id = Number(m[1]);
    const paths = m[2].split(/\s+/).filter(Boolean);
    if (paths.length) imageMap[id] = paths;
  });
}

const products = dataRows.map(line => {
  const [id, title, description, price, active, sku, variationsRaw = ''] = parseCSVLine(line);

  const variations = String(variationsRaw)
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map(entry => {
      const [name, vPrice] = entry.split(':');
      return { name: (name || '').trim(), price: Number(vPrice) || 0 };
    });

  const numericId = Number(id);

  return {
    id: numericId,
    slug: String(sku || '').toLowerCase(),
    title: String(title || '').trim(),
    description: String(description || '').trim(),
    price: Number(price) || 0,
    active: String(active).toUpperCase() === 'TRUE',
    sku: String(sku || '').trim(),
    images: imageMap[numericId] || ['/placeholder-product.png'],
    variations,
  };
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`Generated ${products.length} products -> ${path.relative(process.cwd(), outPath)}`);
JS
