import Link from 'next/link';
import { listProducts } from '@/lib/cart';

export default function Home() {
  const products = listProducts();
  return (
    <main className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {products.map((p) => (
        <div key={p.id} className="border rounded p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
          <p className="flex-grow">{p.description}</p>
          <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
          <Link
            href={`/checkout?slug=${p.slug}&qty=1`}
            className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
          >
            Buy now
          </Link>
        </div>
      ))}
    </main>
  );
}
