import { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '@/lib/cart-context';
import { getProduct } from '@/lib/cart';

export default function CartPage() {
  const { items, removeItem } = useContext(CartContext);
  const products = items.map((item) => {
    const prod = getProduct(item.slug);
    return prod ? { ...prod, qty: item.qty } : null;
  }).filter(Boolean) as (ReturnType<typeof getProduct> & { qty: number })[];

  const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-4">Cart</h1>
      {products.length === 0 && <p>Your cart is empty.</p>}
      {products.map((p) => (
        <div key={p.slug} className="mb-4 flex justify-between border-b pb-2">
          <div>
            <div className="font-medium">{p.title}</div>
            <div>${p.price.toFixed(2)} × {p.qty}</div>
          </div>
          <div className="space-x-2">
            <Link href={`/checkout?slug=${p.slug}&qty=${p.qty}`} className="bg-green-600 text-white px-3 py-1 rounded">Buy</Link>
            <button onClick={() => removeItem(p.slug)} className="text-red-500">Remove</button>
          </div>
        </div>
      ))}
      {products.length > 0 && (
        <div className="font-bold mt-4">Total: ${total.toFixed(2)}</div>
      )}
    </div>
  );
}

