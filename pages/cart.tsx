import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadCart, removeItem, subtotalCents, type CartItem } from '@/lib/cart';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  const handleRemove = (id: string) => {
    setItems(removeItem(id));
  };

  const subtotal = (subtotalCents(items) / 100).toFixed(2);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.title}</span>
                <span>Qty: {item.qty}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 underline ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="font-bold">Subtotal: ${subtotal}</p>
          <Link
            href="/checkout"
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </Link>
        </>
      )}
      <Link href="/" className="text-green-600 underline mt-4 block">
        Continue shopping
      </Link>
    </div>
  );
}




