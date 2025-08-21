const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'Products (10).csv');
const out = path.join(__dirname, '..', 'data', 'products.json');
const imagesSrc = path.join(__dirname, '..', 'product images for website.txt');

const raw = fs.readFileSync(src, 'utf8').trim();
const lines = raw.split(/\r?\n/).slice(1); // skip header

// Build an image mapping where the key is product ID and the value
// is an array of image paths. Lines in the mapping file are in the
// format `1. /path/to/image.jpg`.
const imageMap = {};
if (fs.existsSync(imagesSrc)) {
  const imgRaw = fs.readFileSync(imagesSrc, 'utf8');
  imgRaw.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*(\d+)\.\s*(.+)$/);
    if (match) {
      const id = Number(match[1]);
      const paths = match[2].split(/\s+/).filter(Boolean);
      if (paths.length) {
        imageMap[id] = paths;
      }
    }
  });
}

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
    images: imageMap[Number(id)] || ['/placeholder-product.png'],
  };
});

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products.`);
