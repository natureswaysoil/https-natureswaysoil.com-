import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-green-700 text-white">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Nature's Way Soil" width={40} height={40} />
        <span className="font-semibold">Nature's Way Soil®</span>
      </div>
      <nav className="space-x-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/knowledge">Knowledge Base</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/refund">Refund Policy</Link>
      </nav>
    </header>
  );
}
