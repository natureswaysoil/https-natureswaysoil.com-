 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/scripts/generate-products.js b/scripts/generate-products.js
index 7ab9bf63634b1fe97dd17ac6082eaafbec14c2e8..f754a9dde8ce8e1d8b7533a2e680b0c48b6c82b1 100644
--- a/scripts/generate-products.js
+++ b/scripts/generate-products.js
@@ -1,59 +1,53 @@
- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
-diff --git a/scripts/generate-products.js b/scripts/generate-products.js
-index 3b1069248d1ebb1f4f7a3cc772a7cd88918b353b..36fba76d83e2f00c84804fa501bc47ee20c042b3 100644
---- a/scripts/generate-products.js
-+++ b/scripts/generate-products.js
-@@ -5,41 +5,49 @@ const src = path.join(__dirname, '..', 'Products (10).csv');
- const out = path.join(__dirname, '..', 'data', 'products.json');
- const imagesSrc = path.join(__dirname, '..', 'product images for website.txt');
- 
- const raw = fs.readFileSync(src, 'utf8').trim();
- const lines = raw.split(/\r?\n/).slice(1); // skip header
- 
- // Build an image mapping where the key is product ID and the value
- // is an array of image paths. Lines in the mapping file are in the
- // format `1. /path/to/image.jpg`.
- const imageMap = {};
- if (fs.existsSync(imagesSrc)) {
-   const imgRaw = fs.readFileSync(imagesSrc, 'utf8');
-   imgRaw.split(/\r?\n/).forEach((line) => {
-     const match = line.match(/^\s*(\d+)\.\s*(.+)$/);
-     if (match) {
-       const id = Number(match[1]);
-       const paths = match[2].split(/\s+/).filter(Boolean);
-       if (paths.length) {
-         imageMap[id] = paths;
-       }
-     }
-   });
- }
- 
- const products = lines.map((line) => {
--  const [id, title, description, price, active, sku] = line.split(',');
-+  const [id, title, description, price, active, sku, variationsRaw = ''] = line.split(',');
-+  const variations = variationsRaw
-+    .split(';')
-+    .filter(Boolean)
-+    .map((entry) => {
-+      const [name, vPrice] = entry.split(':');
-+      return { name, price: Number(vPrice) };
-+    });
-   return {
-     id: Number(id),
-     slug: sku.toLowerCase(),
-     title,
-     description,
-     price: Number(price),
-     active: active === 'TRUE',
-     sku,
-     images: imageMap[Number(id)] || ['/placeholder-product.png'],
-+    variations,
-   };
- });
- 
- fs.mkdirSync(path.dirname(out), { recursive: true });
- fs.writeFileSync(out, JSON.stringify(products, null, 2));
- console.log(`Generated ${products.length} products.`);
- 
-EOF
-)
+const fs = require('fs');
+const path = require('path');
+
+const src = path.join(__dirname, '..', 'products.csv');
+const out = path.join(__dirname, '..', 'data', 'products.json');
+const imagesSrc = path.join(__dirname, '..', 'product images for website.txt');
+
+const raw = fs.readFileSync(src, 'utf8').trim();
+const lines = raw.split(/\r?\n/).slice(1); // skip header
+
+// Build an image mapping where the key is product ID and the value
+// is an array of image paths. Lines in the mapping file are in the
+// format `1. /path/to/image.jpg`.
+const imageMap = {};
+if (fs.existsSync(imagesSrc)) {
+  const imgRaw = fs.readFileSync(imagesSrc, 'utf8');
+  imgRaw.split(/\r?\n/).forEach((line) => {
+    const match = line.match(/^\s*(\d+)\.\s*(.+)$/);
+    if (match) {
+      const id = Number(match[1]);
+      const paths = match[2].split(/\s+/).filter(Boolean);
+      if (paths.length) {
+        imageMap[id] = paths;
+      }
+    }
+  });
+}
+
+const products = lines.map((line) => {
+  const [id, title, description, price, active, sku, variationsRaw = ''] = line.split(',');
+  const variations = variationsRaw
+    .split(';')
+    .filter(Boolean)
+    .map((entry) => {
+      const [name, vPrice] = entry.split(':');
+      return { name, price: Number(vPrice) };
+    });
+  return {
+    id: Number(id),
+    slug: sku.toLowerCase(),
+    title,
+    description,
+    price: Number(price),
+    active: active === 'TRUE',
+    sku,
+    images: imageMap[Number(id)] || ['/placeholder-product.png'],
+    variations,
+  };
+});
+
+fs.mkdirSync(path.dirname(out), { recursive: true });
+fs.writeFileSync(out, JSON.stringify(products, null, 2));
+console.log(`Generated ${products.length} products.`);
 
EOF
)
diff --git a/scripts/generate-products.js b/scripts/generate-products.js
index 7ab9bf63634b1fe97dd17ac6082eaafbec14c2e8..e920a55d0afef4f0c7327fa23ea1df688eafeb7c 100644
--- a/scripts/generate-products.js
+++ b/scripts/generate-products.js
@@ -1,59 +1,59 @@
- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
-diff --git a/scripts/generate-products.js b/scripts/generate-products.js
-index 3b1069248d1ebb1f4f7a3cc772a7cd88918b353b..36fba76d83e2f00c84804fa501bc47ee20c042b3 100644
---- a/scripts/generate-products.js
-+++ b/scripts/generate-products.js
-@@ -5,41 +5,49 @@ const src = path.join(__dirname, '..', 'Products (10).csv');
- const out = path.join(__dirname, '..', 'data', 'products.json');
- const imagesSrc = path.join(__dirname, '..', 'product images for website.txt');
- 
- const raw = fs.readFileSync(src, 'utf8').trim();
- const lines = raw.split(/\r?\n/).slice(1); // skip header
- 
- // Build an image mapping where the key is product ID and the value
- // is an array of image paths. Lines in the mapping file are in the
- // format `1. /path/to/image.jpg`.
- const imageMap = {};
- if (fs.existsSync(imagesSrc)) {
-   const imgRaw = fs.readFileSync(imagesSrc, 'utf8');
-   imgRaw.split(/\r?\n/).forEach((line) => {
-     const match = line.match(/^\s*(\d+)\.\s*(.+)$/);
-     if (match) {
-       const id = Number(match[1]);
-       const paths = match[2].split(/\s+/).filter(Boolean);
-       if (paths.length) {
-         imageMap[id] = paths;
-       }
-     }
-   });
- }
- 
- const products = lines.map((line) => {
--  const [id, title, description, price, active, sku] = line.split(',');
-+  const [id, title, description, price, active, sku, variationsRaw = ''] = line.split(',');
-+  const variations = variationsRaw
-+    .split(';')
-+    .filter(Boolean)
-+    .map((entry) => {
-+      const [name, vPrice] = entry.split(':');
-+      return { name, price: Number(vPrice) };
-+    });
-   return {
-     id: Number(id),
-     slug: sku.toLowerCase(),
-     title,
-     description,
-     price: Number(price),
-     active: active === 'TRUE',
-     sku,
-     images: imageMap[Number(id)] || ['/placeholder-product.png'],
-+    variations,
-   };
- });
- 
- fs.mkdirSync(path.dirname(out), { recursive: true });
- fs.writeFileSync(out, JSON.stringify(products, null, 2));
- console.log(`Generated ${products.length} products.`);
- 
-EOF
-)
+const fs = require('fs');
+const path = require('path');
+
+const src = path.join(__dirname, '..', 'products.csv');
+const out = path.join(__dirname, '..', 'data', 'products.json');
+const imagesSrc = path.join(__dirname, '..', 'product images for website.txt');
+
+const raw = fs.readFileSync(src, 'utf8').trim();
+const lines = raw.split(/\r?\n/).slice(1); // skip header
+
+// Build an image mapping where the key is product ID and the value
+// is an array of image paths. Lines in the mapping file are in the
+// format `1. /path/to/image.jpg`.
+const imageMap = {};
+if (fs.existsSync(imagesSrc)) {
+  const imgRaw = fs.readFileSync(imagesSrc, 'utf8');
+  imgRaw.split(/\r?\n/).forEach((line) => {
+    const match = line.match(/^\s*(\d+)\.\s*(.+)$/);
+    if (match) {
+      const id = Number(match[1]);
+      const paths = match[2].split(/\s+/).filter(Boolean);
+      if (paths.length) {
+        imageMap[id] = paths;
+      }
+    }
+  });
+}
+
+const parseCSVLine = (str) =>
+  str
+    .match(/(".*?"|[^",]+)(?=,|$)/g)
+    .map((s) => s.replace(/^"|"$/g, ''));
+
+const products = lines.map((line) => {
+  const [id, title, description, price, active, sku, variationsRaw = ''] =
+    parseCSVLine(line);
+  const variations = variationsRaw
+    .split(';')
+    .filter(Boolean)
+    .map((entry) => {
+      const [name, vPrice] = entry.split(':');
+      return { name, price: Number(vPrice) };
+    });
+  return {
+    id: Number(id),
+    slug: sku.toLowerCase(),
+    title,
+    description,
+    price: Number(price),
+    active: active === 'TRUE',
+    sku,
+    images: imageMap[Number(id)] || ['/placeholder-product.png'],
+    variations,
+  };
+});
+
+fs.mkdirSync(path.dirname(out), { recursive: true });
+fs.writeFileSync(out, JSON.stringify(products, null, 2));
+console.log(`Generated ${products.length} products.`);

