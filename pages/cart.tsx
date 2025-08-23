import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct, Product } from '@/lib/cart';

type CartItem = {
	slug: string;
	qty: number;
};

export default function CartPage() {
	const [items, setItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
		setItems(stored);
	}, []);

	const clear = () => {
		localStorage.removeItem('cart');
		setItems([]);
	};

	const cartProducts = items
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct, Product } from '@/lib/cart';

type CartItem = {
	slug: string;
	qty: number;
};

export default function CartPage() {
	const [items, setItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
		setItems(stored);
	}, []);

	const clear = () => {
		localStorage.removeItem('cart');
		setItems([]);
	};

	const cartProducts = items
		.map((item) => {
			const product = getProduct(item.slug);
			return product ? { product, qty: item.qty } : null;
		})
		.filter(Boolean) as { product: Product; qty: number }[];

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Your Cart</h1>
			{cartProducts.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<ul className="space-y-4">
						{cartProducts.map(({ product, qty }) => (
							<li key={product.id} className="flex items-center space-x-4">
								<Image
									src={product.images[0] || '/placeholder-product.png'}
									alt={product.title}
									width={64}
									height={64}
								/>
								<span className="flex-grow">
									{product.title} × {qty}
								</span>
								<span>${(product.price * qty).toFixed(2)}</span>
							</li>
						))}
					</ul>
					<button
						onClick={clear}
						className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
					>
						Clear Cart
					</button>
					<Link href="/" className="ml-4 text-green-600 underline">
						Continue shopping
					</Link>
				</>
			)}
		</div>
	);
}
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
