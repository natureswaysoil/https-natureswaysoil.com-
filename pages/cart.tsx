 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pages/cart.tsx b/pages/cart.tsx
index 376874bef7c35ef7e33d67976395eea184abad9f..c3451b472174eaee651b9a6bdbea2f10d9d7e0b3 100644
--- a/pages/cart.tsx
+++ b/pages/cart.tsx
@@ -1,105 +1,95 @@
- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
-diff --git a/pages/cart.tsx b/pages/cart.tsx
-index 837cd8d0512531d5a082b71acaae94346f0de566..c3451b472174eaee651b9a6bdbea2f10d9d7e0b3 100644
---- a/pages/cart.tsx
-+++ b/pages/cart.tsx
-@@ -1,70 +1,95 @@
- import { useEffect, useState } from 'react';
- import Image from 'next/image';
- import Link from 'next/link';
- import { getProduct, Product } from '@/lib/cart';
- 
- // Extend the Product type to include qty
- type CartProduct = Product & { qty: number };
- 
- export default function CartPage() {
-   const [items, setItems] = useState<{ id: string; qty: number }[]>([]);
-   const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
- 
-+  function removeItem(id: string) {
-+    setItems((prev) => {
-+      const updated = prev.filter((i) => i.id !== id);
-+      if (typeof window !== 'undefined') {
-+        localStorage.setItem('cart', JSON.stringify(updated));
-+      }
-+      return updated;
-+    });
-+    setCartProducts((prev) => prev.filter((p) => p.id !== id));
-+  }
-+
-   useEffect(() => {
-     // SSR safety: localStorage only available in browser
-     if (typeof window !== 'undefined') {
-       const stored = localStorage.getItem('cart');
-       if (stored) {
-         setItems(JSON.parse(stored));
-       }
-     }
-   }, []);
- 
-+  useEffect(() => {
-+    if (typeof window !== 'undefined') {
-+      localStorage.setItem('cart', JSON.stringify(items));
-+    }
-+  }, [items]);
-+
-   useEffect(() => {
-     async function fetchProducts() {
-       const products = await Promise.all(
-         items.map(async (item) => {
-           const product = await getProduct(item.id);
-           return product ? { ...product, qty: item.qty } : null;
-         })
-       );
-       setCartProducts(products.filter(Boolean) as CartProduct[]);
-     }
-     if (items.length > 0) {
-       fetchProducts();
-+    } else {
-+      setCartProducts([]);
-     }
-   }, [items]);
- 
-   return (
-     <main className="p-8">
-       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
-       {cartProducts.length === 0 ? (
-         <p>Your cart is empty.</p>
-       ) : (
-         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
-           {cartProducts.map((p) => (
-             <div key={p.id} className="border rounded p-4 flex flex-col">
-               <Image
-                 src={p.images?.[0] || '/placeholder-product.png'}
-                 alt={p.title}
-                 width={300}
-                 height={300}
-                 className="mb-2"
-               />
-               <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
-               <p className="flex-grow">{p.description}</p>
-               <p className="mt-2">Quantity: {p.qty}</p>
-               <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
-               <Link
-                 href={`/checkout?slug=${p.slug}&qty=${p.qty}`}
-                 className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
-               >
-                 Checkout
-               </Link>
-+              <button
-+                onClick={() => removeItem(p.id)}
-+                className="mt-2 text-sm text-red-600 underline"
-+              >
-+                Remove
-+              </button>
-             </div>
-           ))}
-         </div>
-       )}
-     </main>
-   );
--}
-+}
- 
-EOF
-)
+import { useEffect, useState } from 'react';
+import Image from 'next/image';
+import Link from 'next/link';
+import { getProduct, Product } from '@/lib/cart';
+
+// Extend the Product type to include qty
+type CartProduct = Product & { qty: number };
+
+export default function CartPage() {
+  const [items, setItems] = useState<{ id: string; qty: number }[]>([]);
+  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
+
+  function removeItem(id: string) {
+    setItems((prev) => {
+      const updated = prev.filter((i) => i.id !== id);
+      if (typeof window !== 'undefined') {
+        localStorage.setItem('cart', JSON.stringify(updated));
+      }
+      return updated;
+    });
+    setCartProducts((prev) => prev.filter((p) => p.id !== id));
+  }
+
+  useEffect(() => {
+    // SSR safety: localStorage only available in browser
+    if (typeof window !== 'undefined') {
+      const stored = localStorage.getItem('cart');
+      if (stored) {
+        setItems(JSON.parse(stored));
+      }
+    }
+  }, []);
+
+  useEffect(() => {
+    if (typeof window !== 'undefined') {
+      localStorage.setItem('cart', JSON.stringify(items));
+    }
+  }, [items]);
+
+  useEffect(() => {
+    async function fetchProducts() {
+      const products = await Promise.all(
+        items.map(async (item) => {
+          const product = await getProduct(item.id);
+          return product ? { ...product, qty: item.qty } : null;
+        })
+      );
+      setCartProducts(products.filter(Boolean) as CartProduct[]);
+    }
+    if (items.length > 0) {
+      fetchProducts();
+    } else {
+      setCartProducts([]);
+    }
+  }, [items]);
+
+  return (
+    <main className="p-8">
+      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
+      {cartProducts.length === 0 ? (
+        <p>Your cart is empty.</p>
+      ) : (
+        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
+          {cartProducts.map((p) => (
+            <div key={p.id} className="border rounded p-4 flex flex-col">
+              <Image
+                src={p.images?.[0] || '/placeholder-product.png'}
+                alt={p.title}
+                width={300}
+                height={300}
+                className="mb-2"
+              />
+              <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
+              <p className="flex-grow">{p.description}</p>
+              <p className="mt-2">Quantity: {p.qty}</p>
+              <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
+              <Link
+                href={`/checkout?slug=${p.slug}&qty=${p.qty}`}
+                className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
+              >
+                Checkout
+              </Link>
+              <button
+                onClick={() => removeItem(p.id)}
+                className="mt-2 text-sm text-red-600 underline"
+              >
+                Remove
+              </button>
+            </div>
+          ))}
+        </div>
+      )}
+    </main>
+  );
+}
 
EOF
)
