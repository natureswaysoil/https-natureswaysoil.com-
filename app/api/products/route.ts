 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/api/products/route.ts b/app/api/products/route.ts
index d00d95577b0ac514736033ef0a32afcddd015f1d..6c2b4a6d1796e66e68406b3775169c00e0ea44d8 100644
--- a/app/api/products/route.ts
+++ b/app/api/products/route.ts
@@ -1,15 +1,19 @@
 import { NextResponse } from 'next/server';
 import type { Product } from '@/lib/cart';
 import productsData from '@/data/products.json';
 
 const products = productsData as Product[];
 
 export async function GET() {
   // Normalize pricing values to plain numbers for JSON serialization
   const normalized: Product[] = products.map((product: Product) => ({
     ...product,
     price: Number(product.price ?? 0),
+    variations: product.variations?.map((v) => ({
+      ...v,
+      price: Number(v.price ?? 0),
+    })),
   }));
 
   return NextResponse.json(normalized);
 }
 
EOF
)
