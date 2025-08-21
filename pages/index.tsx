import Link from 'next/link';
import { useContext } from 'react';
import { listProducts } from '@/lib/cart';
import { CartContext } from '@/lib/cart-context';

export default function Home() {
  const products = listProducts();
  const { addItem } = useContext(CartContext);
  return (
    <div>
      <section className="bg-green-100 text-center py-6">
        <h1 className="text-2xl font-bold">
          Our Goal is to Rejuvenate the Soil One Garden at a Time
        </h1>
      </section>
      <section className="p-6 max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold">About Us – Nature’s Way Soil®</h2>
        <p>
          At Nature’s Way Soil, our mission is simple: to bring life back to the soil, naturally.
        </p>
        <p>
          We’re a family-run farm that saw firsthand the damage years of synthetic fertilizers had done to the land. The soil was tired,
          lifeless, and unable to sustain the healthy crops and pastures we needed. Instead of following the same path, we set out to restore
          the earth the way nature intended—through biology, not chemistry.
        </p>
        <h3 className="font-semibold">Our Promise</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Safe & Natural – Every product we make is safe for children, pets, and pollinators.</li>
          <li>Microbe-Rich Formulas – We use beneficial microbes, worm castings, biochar, and natural extracts to restore soil health.</li>
          <li>Sustainable Farming – From duckweed to compost teas, our ingredients are chosen to recycle nutrients and heal the land.</li>
          <li>Results You Can See – Greener lawns, healthier pastures, stronger roots, and thriving gardens—without synthetic chemicals.</li>
        </ul>
        <h3 className="font-semibold">Why We Do It</h3>
        <p>
          Soil isn’t just dirt—it’s a living ecosystem. By nurturing the microbes and natural processes in the ground, we create healthier plants,
          stronger food systems, and a cleaner environment for future generations.
        </p>
        <p>
          Every bottle and bag of Nature’s Way Soil® carries this commitment: to restore the balance between people, plants, and the planet.
        </p>
      </section>
      <section className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="border rounded p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
            <p className="flex-grow">{p.description}</p>
            <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
            <button
              onClick={() => addItem({ slug: p.slug, qty: 1 })}
              className="mt-4 bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
            <Link
              href={`/checkout?slug=${p.slug}&qty=1`}
              className="mt-2 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
            >
              Buy now
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
