 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pages/index.tsx b/pages/index.tsx
index b5f56c1efe62c8055a76f202616f07750d246a50..9df9f49b14ea868ebfc70e336ec87fc4d16a818f 100644
--- a/pages/index.tsx
+++ b/pages/index.tsx
@@ -1,23 +1,31 @@
 import Link from 'next/link';
+import Image from 'next/image';
 import { listProducts } from '@/lib/cart';
 
 export default function Home() {
   const products = listProducts();
   return (
     <main className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
       {products.map((p) => (
         <div key={p.id} className="border rounded p-4 flex flex-col">
+          <Image
+            src={p.images[0] || '/placeholder-product.png'}
+            alt={p.title}
+            width={300}
+            height={300}
+            className="mb-2"
+          />
           <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
           <p className="flex-grow">{p.description}</p>
           <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
           <Link
             href={`/checkout?slug=${p.slug}&qty=1`}
             className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
           >
             Buy now
           </Link>
         </div>
       ))}
     </main>
   );
 }
 
EOF
)
