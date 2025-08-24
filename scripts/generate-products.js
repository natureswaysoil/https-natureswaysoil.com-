# from *any* folder inside your repo
mkdir -p scripts

cat > scripts/generate-products.js <<'JS'
'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Input files (relative to repo root)
 * - products.csv  (header row + rows: id,title,description,price,active,sku,variations)
 * - product images for website.txt  (lines like: "12. /img/a.jpg /img/b.jpg")
 * Output:
 * - data/products.json
 */

const csvPath   = path.join(__dirname, '..', 'products.csv');
const mapPath   = path.join(__dirname, '..', 'product images for website.txt');
const outPath   = path.join(__dirname, '..', 'data', 'products.json');

if (!fs.existsSync(csvPath)) {
  console.error(`Missing products.csv at ${csvPath}`);
  process.exit(1);
}

// Read CSV (keep header to slice off), ignore blank lines
const csv = fs.readFileSync(csvPath, 'utf8').replace(/\r/g, '');
const rows = csv.split('\n').filter(Boolean);
const dataRows = rows.slice(1); // drop header

// Minimal CSV parser: splits on commas but respects "quoted, fields"
const parseCSVLine = (line) =>
  (line.match(/("([^"]|"")*"|[^,]+)|(?<=,)(?=,)|^$/g) || [])
    .map((cell) => (cell || '').trim())
    .map((cell) =>
      cell.startsWith('"') && cell.endsWith('"')
        ? cell.slice(1, -1).replace(/""/g, '"')
        : cell
    );

// Build image map: "123. /a.jpg /b.jpg"
const imageMap = {};
if (fs.existsSync(mapPath)) {
  const mapRaw = fs.readFileSync(mapPath, 'utf8').replace(/\r/g, '');
  mapRaw.split('\n').forEach((line) => {
    const m = line.match(/^\s*(\d+)\.\s*(.+)$/);
    if (!m) return;
    const id = Number(m[1]);
    const paths = m[2].split(/\s+/).filter(Boolean);
    if (paths.length) imageMap[id] = paths;
  });
}

const products = dataRows.map((rawLine, i) => {
  const cells = parseCSVLine(rawLine);

  // CSV columns (7 expected; allow missing variations)
  const [id, title, description, price, active, sku, variationsRaw = ''] = cells;

  const variations = String(variationsRaw)
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, vPrice] = entry.split(':');
      return { name: (name || '').trim(), price: Number(vPrice) || 0 };
    });

  const numericId = Number(id);
  const images = imageMap[numericId] || ['/placeholder-product.png'];

  return {
    id: numericId,
    slug: String(sku || '').toLowerCase(),
    title: String(title || '').trim(),
    description: String(description || '').trim(),
    price: Number(price) || 0,
    active: String(active).toUpperCase() === 'TRUE',
    sku: String(sku || '').trim(),
    images,
    variations,
  };
});

// Ensure output folder
fs.mkdirSync(path.dirname(outPath), { recursive: true });
// Write JSON
fs.writeFileSync(outPath, JSON.stringify(products, null, 2), 'utf8');

console.log(`Generated ${products.length} products -> ${path.relative(process.cwd(), outPath)}`);
JS

# Run the generator
node scripts/generate-products.js

