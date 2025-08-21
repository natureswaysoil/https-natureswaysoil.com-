import Link from 'next/link';
import Image from 'next/image';
import { listProducts } from '@/lib/cart';
import { useCart } from '@/lib/cart-state';

export default function Home() {
  const products = listProducts();
  const { add } = useCart();
  return (
    <main className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {products.map((p) => (
        <div key={p.id} className="border rounded p-4 flex flex-col">
          <Image src={p.image} alt="" width={400} height={300} className="object-cover mb-2" />
          <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
          <p className="flex-grow">{p.description}</p>
          <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => add(p.slug)}
              className="flex-1 bg-green-200 text-green-800 px-3 py-1 rounded"
            >
              Add to cart
            </button>
            <Link
              href={`/checkout?slug=${p.slug}&qty=1`}
              className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-center"
            >
              Buy now
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
