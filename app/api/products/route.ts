 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/api/products/route.ts b/app/api/products/route.ts
index 1441fb18f75194b118aab3281c03ff6f1a8ac619..6c2b4a6d1796e66e68406b3775169c00e0ea44d8 100644
--- a/app/api/products/route.ts
+++ b/app/api/products/route.ts
@@ -1,136 +1,19 @@
- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
-diff --git a/app/api/products/route.ts b/app/api/products/route.ts
-index 7eb1b66562fc4ac6cdb178598726bdfc03dbd189..6c2b4a6d1796e66e68406b3775169c00e0ea44d8 100644
---- a/app/api/products/route.ts
-+++ b/app/api/products/route.ts
-@@ -1,108 +1,19 @@
-- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
--diff --git a/app/api/products/route.ts b/app/api/products/route.ts
--index 7b43e971abf934f994cde12b83e851838246e2b4..6c2b4a6d1796e66e68406b3775169c00e0ea44d8 100644
----- a/app/api/products/route.ts
--+++ b/app/api/products/route.ts
--@@ -1,80 +1,19 @@
--- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
---diff --git a/app/api/products/route.ts b/app/api/products/route.ts
---index d00d95577b0ac514736033ef0a32afcddd015f1d..6c2b4a6d1796e66e68406b3775169c00e0ea44d8 100644
------ a/app/api/products/route.ts
---+++ b/app/api/products/route.ts
---@@ -1,15 +1,19 @@
--- import { NextResponse } from 'next/server';
--- import type { Product } from '@/lib/cart';
--- import productsData from '@/data/products.json';
--- 
--- const products = productsData as Product[];
--- 
--- export async function GET() {
---   // Normalize pricing values to plain numbers for JSON serialization
---   const normalized: Product[] = products.map((product: Product) => ({
---     ...product,
---     price: Number(product.price ?? 0),
---+    variations: product.variations?.map((v) => ({
---+      ...v,
---+      price: Number(v.price ?? 0),
---+    })),
---   }));
--- 
---   return NextResponse.json(normalized);
--- }
--- 
---EOF
---)
---diff --git a/app/api/products/route.ts b/app/api/products/route.ts
---index c4ab0a330929373254f1d81fb96396a4b823308e..6c2b4a6d1796e66e68406b3775169c00e0ea44d8 100644
------ a/app/api/products/route.ts
---+++ b/app/api/products/route.ts
---@@ -1,28 +1,19 @@
---- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
----diff --git a/app/api/products/route.ts b/app/api/products/route.ts
----index d00d95577b0ac514736033ef0a32afcddd015f1d..6c2b4a6d1796e66e68406b3775169c00e0ea44d8 100644
------- a/app/api/products/route.ts
----+++ b/app/api/products/route.ts
----@@ -1,15 +1,19 @@
---- import { NextResponse } from 'next/server';
---- import type { Product } from '@/lib/cart';
---- import productsData from '@/data/products.json';
---- 
---- const products = productsData as Product[];
---- 
---- export async function GET() {
----   // Normalize pricing values to plain numbers for JSON serialization
----   const normalized: Product[] = products.map((product: Product) => ({
----     ...product,
----     price: Number(product.price ?? 0),
----+    variations: product.variations?.map((v) => ({
----+      ...v,
----+      price: Number(v.price ?? 0),
----+    })),
----   }));
---- 
----   return NextResponse.json(normalized);
---- }
---- 
----EOF
----)
---+import { NextResponse } from 'next/server';
---+import type { Product } from '@/lib/cart';
---+import productsData from '@/data/products.json';
---+
---+const products = productsData as Product[];
---+
---+export async function GET() {
---+  // Normalize pricing values to plain numbers for JSON serialization
---+  const normalized: Product[] = products.map((product: Product) => ({
---+    ...product,
---+    price: Number(product.price ?? 0),
---+    variations: product.variations?.map((v) => ({
---+      ...v,
---+      price: Number(v.price ?? 0),
---+    })),
---+  }));
---+
---+  return NextResponse.json(normalized);
---+}
--+import { NextResponse } from 'next/server';
--+import type { Product } from '@/lib/cart';
--+import productsData from '@/data/products.json';
--+
--+const products = productsData as Product[];
--+
--+export async function GET() {
--+  // Normalize pricing values to plain numbers for JSON serialization
--+  const normalized: Product[] = products.map((product: Product) => ({
--+    ...product,
--+    price: Number(product.price ?? 0),
--+    variations: product.variations?.map((v) => ({
--+      ...v,
--+      price: Number(v.price ?? 0),
--+    })),
--+  }));
--+
--+  return NextResponse.json(normalized);
--+}
-- 
--EOF
--)
-+import { NextResponse } from 'next/server';
-+import type { Product } from '@/lib/cart';
-+import productsData from '@/data/products.json';
-+
-+const products = productsData as Product[];
-+
-+export async function GET() {
-+  // Normalize pricing values to plain numbers for JSON serialization
-+  const normalized: Product[] = products.map((product: Product) => ({
-+    ...product,
-+    price: Number(product.price ?? 0),
-+    variations: product.variations?.map((v) => ({
-+      ...v,
-+      price: Number(v.price ?? 0),
-+    })),
-+  }));
-+
-+  return NextResponse.json(normalized);
-+}
- 
-EOF
-)
+import { NextResponse } from 'next/server';
+import type { Product } from '@/lib/cart';
+import productsData from '@/data/products.json';
+
+const products = productsData as Product[];
+
+export async function GET() {
+  // Normalize pricing values to plain numbers for JSON serialization
+  const normalized: Product[] = products.map((product: Product) => ({
+    ...product,
+    price: Number(product.price ?? 0),
+    variations: product.variations?.map((v) => ({
+      ...v,
+      price: Number(v.price ?? 0),
+    })),
+  }));
+
+  return NextResponse.json(normalized);
+}
 
EOF
)
