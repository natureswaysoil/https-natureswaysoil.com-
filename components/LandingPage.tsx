import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import productsData from '@/data/products.json';
import { addItem, type Product } from '@/lib/cart';
import type { LandingContent } from '@/lib/cms';

function ProductCard({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variations ? product.variations[0] : undefined);
  const price = variant ? variant.price : product.price;

  return (
    <div className="border rounded p-4 flex flex-col">
      <Image
        src={product.images[0] || '/placeholder-product.png'}
        alt={product.title}
        width={300}
        height={300}
        className="mb-2"
      />
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      {product.details && (
        <ul className="text-left list-disc list-inside flex-grow">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
      {product.variations && (
        <select
          className="border p-1 mt-2"
          value={variant?.name}
          onChange={(e) =>
            setVariant(product.variations!.find((v) => v.name === e.target.value))
          }
        >
          {product.variations.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} - ${v.price.toFixed(2)}
            </option>
          ))}
        </select>
      )}
      <p className="mt-2 font-bold">${price.toFixed(2)}</p>
      <button
        className="mt-4 bg-green-600 text-white px-3 py-1 rounded"
        onClick={() =>
          addItem({
            id: product.slug + (variant ? `-${variant.name}` : ''),
            title: product.title + (variant ? ` (${variant.name})` : ''),
            price_cents: Math.round(price * 100),
            image: product.images[0],
            qty: 1,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}

export default function LandingPage({ content }: { content: LandingContent }) {
        const products: Product[] = productsData;
        return (
                <>
                        <header className="flex justify-center py-4">
                                <Image src="/logo.png" alt="Nature's Way Soil logo" width={150} height={150} />
                        </header>
                        <section className="flex flex-col items-center text-center bg-green-100 p-8">
                                <h1 className="text-3xl font-bold mb-4">{content.heroTitle}</h1>
                                <p className="max-w-xl mb-6">{content.mission}</p>
                                <Link href="#products" className="bg-green-600 text-white px-4 py-2 rounded shadow">
                                        Shop Now
                                </Link>
                        </section>

			<section className="p-8 bg-white text-center">
				<h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
				<ul className="max-w-3xl mx-auto text-left list-disc list-inside space-y-2">
					{content.promise.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</section>

			<section className="p-8 text-center bg-green-50">
				<h2 className="text-2xl font-semibold mb-4">Why We Do It</h2>
				{content.why.map((p, i) => (
					<p key={i} className={i === 0 ? 'max-w-2xl mx-auto mb-2' : 'max-w-2xl mx-auto'}>
						{p}
					</p>
				))}
			</section>

			<section className="p-8 flex justify-center bg-gray-100">
				<div className="w-full max-w-3xl aspect-video">
					<iframe
						className="w-full h-full rounded"
						src={content.videoUrl}
						title="Benefits of Nature's Way Soil products"
						allowFullScreen
					></iframe>
				</div>
			</section>

                        <main id="products" className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {products.map((p) => (
                                        <ProductCard key={p.id ?? p.slug} product={p} />
                                ))}
                        </main>

			<section className="p-8 text-center bg-green-100">
				<h2 className="text-2xl font-semibold mb-4">Ready to restore your soil?</h2>
				<Link href="#products" className="bg-green-600 text-white px-4 py-2 rounded shadow">
					Browse Products
				</Link>
                                <p className="mt-4">
                                        <a
                                                href="https://www.amazon.com/s?k=Nature%27s+Way+Soil+Products"
                                                className="text-green-700 underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                        >
                                                Visit Nature's Way Soil Products on Amazon
                                        </a>
                                </p>
                                <p className="mt-2 text-sm">Secure checkout powered by Stripe.</p>
                        </section>
                </>
        );
}
