 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pages/cart.tsx b/pages/cart.tsx
index 6aebe4ec880966d75d95b987278a9fd840f33fe1..bd0174d1ac4a253719d6f0e698fc5447dea6d1f4 100644
--- a/pages/cart.tsx
+++ b/pages/cart.tsx
@@ -1,271 +1,67 @@
- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
-diff --git a/pages/cart.tsx b/pages/cart.tsx
-index 4c19aba3d6f284199c84a8b38335761a4c1f950c..bd0174d1ac4a253719d6f0e698fc5447dea6d1f4 100644
---- a/pages/cart.tsx
-+++ b/pages/cart.tsx
-@@ -1,195 +1,67 @@
-- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
--diff --git a/pages/cart.tsx b/pages/cart.tsx
--index f73f2e4ba5b85bdc396262e7d80fb838da152d14..bd0174d1ac4a253719d6f0e698fc5447dea6d1f4 100644
----- a/pages/cart.tsx
--+++ b/pages/cart.tsx
--@@ -1,133 +1,67 @@
-- import { useEffect, useState } from 'react';
-- import Image from 'next/image';
-- import Link from 'next/link';
-- import { getProduct, Product } from '@/lib/cart';
-- 
-- type CartItem = {
---	slug: string;
---	qty: number;
--+  slug: string;
--+  qty: number;
-- };
-- 
-- export default function CartPage() {
---	const [items, setItems] = useState<CartItem[]>([]);
--+  const [items, setItems] = useState<CartItem[]>([]);
-- 
---	useEffect(() => {
---		const stored = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
---		setItems(stored);
---	}, []);
--+  useEffect(() => {
--+    const stored = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
--+    setItems(stored);
--+  }, []);
-- 
---	const clear = () => {
---		localStorage.removeItem('cart');
---		setItems([]);
---	};
--+  const clear = () => {
--+    localStorage.removeItem('cart');
--+    setItems([]);
--+  };
-- 
---	const cartProducts = items
---import { useEffect, useState } from 'react';
---import Image from 'next/image';
---import Link from 'next/link';
---import { getProduct, Product } from '@/lib/cart';
---
---type CartItem = {
---	slug: string;
---	qty: number;
---};
---
---export default function CartPage() {
---	const [items, setItems] = useState<CartItem[]>([]);
---
---	useEffect(() => {
---		const stored = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
---		setItems(stored);
---	}, []);
---
---	const clear = () => {
---		localStorage.removeItem('cart');
---		setItems([]);
---	};
---
---	const cartProducts = items
---		.map((item) => {
---			const product = getProduct(item.slug);
---			return product ? { product, qty: item.qty } : null;
---		})
---		.filter(Boolean) as { product: Product; qty: number }[];
--+  const cartProducts = items
--+    .map((item) => {
--+      const product = getProduct(item.slug);
--+      return product ? { product, qty: item.qty } : null;
--+    })
--+    .filter(Boolean) as { product: Product; qty: number }[];
-- 
---	return (
---		<div className="p-8">
---			<h1 className="text-2xl font-bold mb-4">Your Cart</h1>
---			{cartProducts.length === 0 ? (
---				<p>Your cart is empty.</p>
---			) : (
---				<>
---					<ul className="space-y-4">
---						{cartProducts.map(({ product, qty }) => (
---							<li key={product.id} className="flex items-center space-x-4">
---								<Image
---									src={product.images[0] || '/placeholder-product.png'}
---									alt={product.title}
---									width={64}
---									height={64}
---								/>
---								<span className="flex-grow">
---									{product.title} × {qty}
---								</span>
---								<span>${(product.price * qty).toFixed(2)}</span>
---							</li>
---						))}
---					</ul>
---					<button
---						onClick={clear}
---						className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
---					>
---						Clear Cart
---					</button>
---					<Link href="/" className="ml-4 text-green-600 underline">
---						Continue shopping
---					</Link>
---				</>
---			)}
---		</div>
---	);
--+  return (
--+    <div className="p-8">
--+      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
--+      {cartProducts.length === 0 ? (
--+        <p>Your cart is empty.</p>
--+      ) : (
--+        <>
--+          <ul className="space-y-4">
--+            {cartProducts.map(({ product, qty }) => (
--+              <li key={product.id} className="flex items-center space-x-4">
--+                <Image
--+                  src={product.images[0] || '/placeholder-product.png'}
--+                  alt={product.title}
--+                  width={64}
--+                  height={64}
--+                />
--+                <span className="flex-grow">
--+                  {product.title} × {qty}
--+                </span>
--+                <span>${(product.price * qty).toFixed(2)}</span>
--+              </li>
--+            ))}
--+          </ul>
--+          <button
--+            onClick={clear}
--+            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
--+          >
--+            Clear Cart
--+          </button>
--+          <Link href="/" className="ml-4 text-green-600 underline">
--+            Continue shopping
--+          </Link>
--+        </>
--+      )}
--+    </div>
--+  );
-- }
---+    })
---+    .filter(Boolean) as { product: Product; qty: number }[];
---+
---+  return (
---+    <div className="p-8">
---+      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
---+      {cartProducts.length === 0 ? (
---+        <p>Your cart is empty.</p>
---+      ) : (
---+        <>
---+          <ul className="space-y-4">
---+            {cartProducts.map(({ product, qty }) => (
---+              <li key={product.id} className="flex items-center space-x-4">
---+                <Image
---+                  src={product.images[0] || '/placeholder-product.png'}
---+                  alt={product.title}
---+                  width={64}
---+                  height={64}
---+                />
---+                <span className="flex-grow">
---+                  {product.title} × {qty}
---+                </span>
---+                <span>${(product.price * qty).toFixed(2)}</span>
---+              </li>
---+            ))}
---+          </ul>
---+          <button
---+            onClick={clear}
---+            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
---+          >
---+            Clear Cart
---+          </button>
---+          <Link href="/" className="ml-4 text-green-600 underline">
---+            Continue shopping
---+          </Link>
---+        </>
---+      )}
---+    </div>
---+  );
---+}
--- 
---EOF
-- 
--EOF
--)
-+import { useEffect, useState } from 'react';
-+import Image from 'next/image';
-+import Link from 'next/link';
-+import { getProduct, Product } from '@/lib/cart';
-+
-+type CartItem = {
-+  slug: string;
-+  qty: number;
-+};
-+
-+export default function CartPage() {
-+  const [items, setItems] = useState<CartItem[]>([]);
-+
-+  useEffect(() => {
-+    const stored = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
-+    setItems(stored);
-+  }, []);
-+
-+  const clear = () => {
-+    localStorage.removeItem('cart');
-+    setItems([]);
-+  };
-+
-+  const cartProducts = items
-+    .map((item) => {
-+      const product = getProduct(item.slug);
-+      return product ? { product, qty: item.qty } : null;
-+    })
-+    .filter(Boolean) as { product: Product; qty: number }[];
-+
-+  return (
-+    <div className="p-8">
-+      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
-+      {cartProducts.length === 0 ? (
-+        <p>Your cart is empty.</p>
-+      ) : (
-+        <>
-+          <ul className="space-y-4">
-+            {cartProducts.map(({ product, qty }) => (
-+              <li key={product.id} className="flex items-center space-x-4">
-+                <Image
-+                  src={product.images[0] || '/placeholder-product.png'}
-+                  alt={product.title}
-+                  width={64}
-+                  height={64}
-+                />
-+                <span className="flex-grow">
-+                  {product.title} × {qty}
-+                </span>
-+                <span>${(product.price * qty).toFixed(2)}</span>
-+              </li>
-+            ))}
-+          </ul>
-+          <button
-+            onClick={clear}
-+            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
-+          >
-+            Clear Cart
-+          </button>
-+          <Link href="/" className="ml-4 text-green-600 underline">
-+            Continue shopping
-+          </Link>
-+        </>
-+      )}
-+    </div>
-+  );
-+}
- 
-EOF
-)
+import { useEffect, useState } from 'react';
+import Image from 'next/image';
+import Link from 'next/link';
+import { getProduct, Product } from '@/lib/cart';
+
+type CartItem = {
+  slug: string;
+  qty: number;
+};
+
+export default function CartPage() {
+  const [items, setItems] = useState<CartItem[]>([]);
+
+  useEffect(() => {
+    const stored = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
+    setItems(stored);
+  }, []);
+
+  const clear = () => {
+    localStorage.removeItem('cart');
+    setItems([]);
+  };
+
+  const cartProducts = items
+    .map((item) => {
+      const product = getProduct(item.slug);
+      return product ? { product, qty: item.qty } : null;
+    })
+    .filter(Boolean) as { product: Product; qty: number }[];
+
+  return (
+    <div className="p-8">
+      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
+      {cartProducts.length === 0 ? (
+        <p>Your cart is empty.</p>
+      ) : (
+        <>
+          <ul className="space-y-4">
+            {cartProducts.map(({ product, qty }) => (
+              <li key={product.id} className="flex items-center space-x-4">
+                <Image
+                  src={product.images[0] || '/placeholder-product.png'}
+                  alt={product.title}
+                  width={64}
+                  height={64}
+                />
+                <span className="flex-grow">
+                  {product.title} × {qty}
+                </span>
+                <span>${(product.price * qty).toFixed(2)}</span>
+              </li>
+            ))}
+          </ul>
+          <button
+            onClick={clear}
+            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
+          >
+            Clear Cart
+          </button>
+          <Link href="/" className="ml-4 text-green-600 underline">
+            Continue shopping
+          </Link>
+        </>
+      )}
+    </div>
+  );
+}
 
EOF
)
