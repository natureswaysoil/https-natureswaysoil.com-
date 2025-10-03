import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold hover:text-green-200 transition-colors">
            Nature's Way Soil
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-green-200 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-green-200 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-green-200 transition-colors">
              Contact
            </Link>
            <Link href="/cart" className="hover:text-green-200 transition-colors">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
