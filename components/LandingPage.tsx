import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/data/products.json';
import videoConfig from '@/config/videos.json';
import AutoplayHeroVideo from '@/components/AutoplayHeroVideo';
import type { Product } from '@/lib/cart';
import type { LandingContent } from '@/lib/cms';

export default function LandingPage({ content }: { content: LandingContent }) {
        const products: Product[] = productsData;
        const heroVideo = videoConfig.heroVideo;
        
        return (
                <>
                        {/* Autoplay Educational Video Hero */}
                        {heroVideo.enabled && (
                                <AutoplayHeroVideo 
                                        videoUrl={heroVideo.url}
                                        title={heroVideo.title}
                                        description={heroVideo.description}
                                />
                        )}

                        <section className="flex flex-col items-center text-center bg-green-100 p-8">
                                <Image
                                        src={content.heroImage}
                                        alt="Nature's Way Soil logo"
                                        width={300}
                                        height={300}
                                        className="mb-4"
                                />
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
                                        <div key={p.id} className="border rounded p-4 flex flex-col hover:shadow-lg transition-shadow">
                                                <Link href={`/products/${p.slug}`}>
                                                        <Image
                                                                src={p.images[0] || '/placeholder-product.png'}
                                                                alt={p.title}
                                                                width={300}
                                                                height={300}
                                                                className="mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                                                        />
                                                </Link>
                                                <Link href={`/products/${p.slug}`} className="hover:text-green-600 transition-colors">
                                                        <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
                                                </Link>
                                                <p className="flex-grow text-sm text-gray-600">{p.description}</p>
                                                <p className="mt-2 font-bold text-green-600">${p.price.toFixed(2)}</p>
                                                <div className="mt-4 flex gap-2">
                                                        <Link
                                                                href={`/products/${p.slug}`}
                                                                className="flex-1 inline-block bg-gray-100 text-gray-800 px-3 py-2 rounded text-center hover:bg-gray-200 transition-colors text-sm"
                                                        >
                                                                View Details
                                                        </Link>
                                                        <Link
                                                                href={`/checkout?slug=${p.slug}&qty=1`}
                                                                className="flex-1 inline-block bg-green-600 text-white px-3 py-2 rounded text-center hover:bg-green-700 transition-colors text-sm"
                                                        >
                                                                Buy Now
                                                        </Link>
                                                </div>
                                        </div>
                                ))}
                        </main>

                        <section className="p-8 text-center bg-green-100">
                                <h2 className="text-2xl font-semibold mb-4">Ready to restore your soil?</h2>
                                <Link href="#products" className="bg-green-600 text-white px-4 py-2 rounded shadow">
                                        Browse Products
                                </Link>
                                <p className="mt-4">
                                        Prefer Amazon?{' '}
                                        <a
                                                href="https://www.amazon.com"
                                                className="text-green-700 underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                        >
                                                Find us on Amazon
                                        </a>
                                        .
                                </p>
                                <p className="mt-2 text-sm">Secure checkout powered by Stripe.</p>
                        </section>
                </>
        );
}
