import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/lib/cart-context';

export default function Header() {
  const { items } = useContext(CartContext);
  return (
    <header className="bg-green-700 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Nature's Way Soil logo" className="h-10 w-10 mr-2" />
          <div>
            <div className="text-xl font-bold">Nature's Way Soil®</div>
            <div className="text-sm">Bring Life Back to the Soil</div>
          </div>
        </div>
        <nav className="space-x-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/cart">Cart ({items.length})</Link>
          <Link href="/knowledge">Knowledge Base</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refund">Refund</Link>
        </nav>
      </div>
    </header>
  );
}

