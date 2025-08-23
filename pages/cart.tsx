import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct, Product } from '@/lib/cart';

export default function CartPage() {
  // Example cart items from localStorage or context
  const [items, setItems] = useState<{ id: string, qty: number }[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Replace this with your actual cart retrieval logic
    const stored = localStorage.getItem('cart');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Fetch product details based on cart items
    async function fetchProducts() {
      const products = await Promise.all(
        items.map(async (item) => {
          const product = await getProduct(item.id);
          return product ? { ...product, qty: item.qty } : null;
        })
      );
      // Type assertion here fixes the TypeScript error
      setCartProducts(products.filter(Boolean) as Product[]);
    }
    if (items.length > 0) {
      fetchProducts();
    }
  }, [items]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cartProducts.map((p) => (
            <div key={p.id} className="border rounded p-4 flex flex-col">
              <Image
                src={p.images?.[0] || '/placeholder-product.png'}
                alt={p.title}
                width={300}
                height={300}
                className="mb-2"
              />
              <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
              <p className="flex-grow">{p.description}</p>
              <p className="mt-2">Quantity: {p.qty}</p>
              <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
              <Link
                href={`/checkout?slug=${p.slug}&qty=${p.qty}`}
                className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
              >
                Checkout
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
