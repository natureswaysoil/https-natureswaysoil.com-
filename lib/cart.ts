 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/lib/cart.ts b/lib/cart.ts
index f2d8930751366ac5415cfc5c90142260c0aeff9a..2f770394c3fcade8bc0cc0a46113c3961a3b0071 100644
--- a/lib/cart.ts
+++ b/lib/cart.ts
@@ -1,124 +1,23 @@
- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
-diff --git a/lib/cart.ts b/lib/cart.ts
-index a86557be07021952421c166754ca31c5b4691aac..2f770394c3fcade8bc0cc0a46113c3961a3b0071 100644
---- a/lib/cart.ts
-+++ b/lib/cart.ts
-@@ -1,93 +1,23 @@
-- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
--diff --git a/lib/cart.ts b/lib/cart.ts
--index 941f71144e3651fd87db49d6d4baf46f8f638d42..2f770394c3fcade8bc0cc0a46113c3961a3b0071 100644
----- a/lib/cart.ts
--+++ b/lib/cart.ts
--@@ -1,22 +1,23 @@
-- import productsData from '@/data/products.json';
-- 
-- export type Product = {
--   id: number;
--   slug: string;
--   title: string;
--   description: string;
--   price: number;
--   active: boolean;
--   sku: string;
--   images: string[];
--+  variations?: { name: string; price: number }[];
-- };
-- 
-- const products = productsData as Product[];
-- 
-- export function listProducts(): Product[] {
--   return products.filter((p) => p.active);
-- }
-- 
-- export function getProduct(slug: string): Product | undefined {
--   return products.find((p) => p.slug === slug && p.active);
-- }
-- 
--EOF
--)
-+import productsData from '@/data/products.json';
- 
--diff --git a/lib/cart.ts b/lib/cart.ts
--index 38b327239510d6ebdde88f4af3e007ac73cfcd0b..2f770394c3fcade8bc0cc0a46113c3961a3b0071 100644
----- a/lib/cart.ts
--+++ b/lib/cart.ts
--@@ -1,32 +1,23 @@
--- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
---diff --git a/lib/cart.ts b/lib/cart.ts
---index 941f71144e3651fd87db49d6d4baf46f8f638d42..2f770394c3fcade8bc0cc0a46113c3961a3b0071 100644
------ a/lib/cart.ts
---+++ b/lib/cart.ts
---@@ -1,22 +1,23 @@
--- import productsData from '@/data/products.json';
--- 
--- export type Product = {
---   id: number;
---   slug: string;
---   title: string;
---   description: string;
---   price: number;
---   active: boolean;
---   sku: string;
---   images: string[];
---+  variations?: { name: string; price: number }[];
--- };
--- 
--- const products = productsData as Product[];
--- 
--- export function listProducts(): Product[] {
---   return products.filter((p) => p.active);
--- }
--- 
--- export function getProduct(slug: string): Product | undefined {
---   return products.find((p) => p.slug === slug && p.active);
--- }
--- 
---EOF
---)
--+import productsData from '@/data/products.json';
--+
--+export type Product = {
--+  id: number;
--+  slug: string;
--+  title: string;
--+  description: string;
--+  price: number;
--+  active: boolean;
--+  sku: string;
--+  images: string[];
--+  variations?: { name: string; price: number }[];
--+};
--+
--+const products = productsData as Product[];
--+
--+export function listProducts(): Product[] {
--+  return products.filter((p) => p.active);
--+}
--+
--+export function getProduct(slug: string): Product | undefined {
--+  return products.find((p) => p.slug === slug && p.active);
--+}
-+export type Product = {
-+  id: number;
-+  slug: string;
-+  title: string;
-+  description: string;
-+  price: number;
-+  active: boolean;
-+  sku: string;
-+  images: string[];
-+  variations?: { name: string; price: number }[];
-+};
-+
-+const products = productsData as Product[];
-+
-+export function listProducts(): Product[] {
-+  return products.filter((p) => p.active);
-+}
-+
-+export function getProduct(slug: string): Product | undefined {
-+  return products.find((p) => p.slug === slug && p.active);
-+}
- 
-EOF
-)
+import productsData from '@/data/products.json';
+
+export type Product = {
+  id: number;
+  slug: string;
+  title: string;
+  description: string;
+  price: number;
+  active: boolean;
+  sku: string;
+  images: string[];
+  variations?: { name: string; price: number }[];
+};
+
+const products = productsData as Product[];
+
+export function listProducts(): Product[] {
+  return products.filter((p) => p.active);
+}
+
+export function getProduct(slug: string): Product | undefined {
+  return products.find((p) => p.slug === slug && p.active);
}

