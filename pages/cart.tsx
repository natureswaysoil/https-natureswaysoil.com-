import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-state';
import { getProduct } from '@/lib/cart';

export default function CartPage() {
  const { items, clear } = useCart();
import { getProduct, Product } from '@/lib/cart';

export default function CartPage() {
  const { items, clear } = useCart();
  const [products, setProducts] = useState<(Product & { qty: number })[]>([]);

  useEffect(() => {
    const list = items
      .map((i) => {
        const prod = getProduct(i.slug);
        if (!prod) return null;
        return { ...prod, qty: i.qty };
      })
      .filter(Boolean) as any[];
    setProducts(list);
  }, [items]);

  if (products.length === 0) {
    return <p className="p-4">Cart is empty.</p>;
  }

  const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-4">Your Cart</h1>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.slug} className="border p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{p.title}</h2>
              <p>Qty: {p.qty}</p>
            </div>
            <Link
              href={`/checkout?slug=${p.slug}&qty=${p.qty}`}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Checkout
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-bold">Total: ${total.toFixed(2)}</p>
      <button onClick={clear} className="mt-4 underline text-sm">
        Clear cart
      </button>
    </div>
  );
}
