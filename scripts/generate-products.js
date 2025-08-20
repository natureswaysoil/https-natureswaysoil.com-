const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'Products (10).csv');
const out = path.join(__dirname, '..', 'data', 'products.json');

const raw = fs.readFileSync(src, 'utf8').trim();
const lines = raw.split(/\r?\n/).slice(1); // skip header
const products = lines.map((line) => {
  const [id, title, description, price, active, sku] = line.split(',');
  return {
    id: Number(id),
    slug: sku.toLowerCase(),
    title,
    description,
    price: Number(price),
    active: active === 'TRUE',
    sku,
  };
});

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products.`);
